import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type Character, type PreviewPosition, type PreviewPositions } from "@/lib/types";
import { motion } from "@/lib/motion";
import { getPetDisplayScale } from "@/lib/petDisplay";
import CharacterBody from "./FrameBuilder/CharacterBody";
import PetGlyph from "./PetGlyph";

interface CharacterPreviewProps {
  characters: Character[];
  label: string;
  pets?: string[];
  previewPositions?: PreviewPositions;
  onPreviewPositionsChange?: (updater: (prev: PreviewPositions) => PreviewPositions) => void;
}

interface DragState {
  id: string;
  originMouseX: number;
  originMouseY: number;
  originPosX: number;
  originPosY: number;
}

interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

type ObjectKind = "char" | "pet";

const COL = 76;
const CHAR_SCALE = 0.82;
const PET_SCALE = 0.72;
const CHAR_MARGINS: Margins = { top: 50, bottom: 44, left: 22, right: 22 };
const PET_MARGINS: Margins = { top: 18, bottom: 26, left: 18, right: 22 };

function clamp(pos: PreviewPosition, width: number, height: number, margins: Margins): PreviewPosition {
  return {
    x: Math.max(margins.left, Math.min(width - margins.right, pos.x)),
    y: Math.max(margins.top, Math.min(height - margins.bottom, pos.y)),
  };
}

function samePosition(a?: PreviewPosition, b?: PreviewPosition) {
  return !!a && !!b && a.x === b.x && a.y === b.y;
}

function petMargins(id: string): Margins {
  const scale = getPetDisplayScale(id);
  return {
    top: Math.ceil(PET_MARGINS.top * scale),
    bottom: Math.ceil(PET_MARGINS.bottom * scale),
    left: Math.ceil(PET_MARGINS.left * scale),
    right: Math.ceil(PET_MARGINS.right * scale),
  };
}

function marginsFor(id: string, kind: ObjectKind): Margins {
  return kind === "char" ? CHAR_MARGINS : petMargins(id);
}

export default function CharacterPreview({
  characters,
  label,
  pets = [],
  previewPositions,
  onPreviewPositionsChange,
}: CharacterPreviewProps) {
  const n = Math.max(characters.length, 1);
  const petCount = pets.length;
  const width = Math.max(170, n * COL + 24, petCount * 42 + 32);
  const height = petCount > 0 ? 232 : 194;
  const charIds = useMemo(() => characters.map((char) => char.id), [characters]);
  const allIds = useMemo(() => [...charIds, ...pets], [charIds, pets]);
  const allIdsKey = allIds.join("|");
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const moveRef = useRef<(e: MouseEvent | TouchEvent) => void>(() => {});
  const detachRef = useRef<() => void>(() => {});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getDefaultPos = useCallback((id: string, kind: ObjectKind): PreviewPosition => {
    if (kind === "char") {
      const index = Math.max(0, charIds.indexOf(id));
      const startX = width / 2 - ((Math.max(charIds.length, 1) - 1) * COL) / 2;
      return { x: startX + index * COL, y: petCount > 0 ? 92 : 96 };
    }

    const index = Math.max(0, pets.indexOf(id));
    const petStartX = width / 2 - ((Math.max(petCount, 1) - 1) * 42) / 2;
    return { x: petStartX + index * 42, y: height - 30 };
  }, [charIds, height, petCount, pets, width]);

  const kindOf = useCallback((id: string): ObjectKind => (pets.includes(id) ? "pet" : "char"), [pets]);

  const getPos = useCallback((id: string): PreviewPosition => {
    const kind = kindOf(id);
    return previewPositions?.[id] ?? clamp(getDefaultPos(id, kind), width, height, marginsFor(id, kind));
  }, [getDefaultPos, height, kindOf, previewPositions, width]);

  const setPositions = useCallback((updater: (prev: PreviewPositions) => PreviewPositions) => {
    onPreviewPositionsChange?.(updater);
  }, [onPreviewPositionsChange]);

  useEffect(() => {
    if (!onPreviewPositionsChange) return;

    onPreviewPositionsChange((prev) => {
      const next: PreviewPositions = {};
      let changed = Object.keys(prev).some((id) => !allIds.includes(id));

      allIds.forEach((id) => {
        const kind = kindOf(id);
        const pos = clamp(prev[id] ?? getDefaultPos(id, kind), width, height, marginsFor(id, kind));
        next[id] = pos;
        if (!samePosition(prev[id], pos)) {
          changed = true;
        }
      });

      return changed ? next : prev;
    });

    setSelectedId((current) => (current && allIds.includes(current) ? current : null));
  }, [allIds, allIdsKey, getDefaultPos, height, kindOf, onPreviewPositionsChange, width]);

  const clientToSVG = useCallback((clientX: number, clientY: number): PreviewPosition => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (width / rect.width),
      y: (clientY - rect.top) * (height / rect.height),
    };
  }, [height, width]);

  const pointer = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if ("changedTouches" in e && e.changedTouches.length) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const mouse = e as MouseEvent;
    return { x: mouse.clientX, y: mouse.clientY };
  };

  const endInteraction = useCallback(() => {
    dragRef.current = null;
    detachRef.current();
    detachRef.current = () => {};
  }, []);

  const beginInteraction = useCallback(() => {
    detachRef.current();
    const move = (e: MouseEvent | TouchEvent) => moveRef.current(e);
    const end = () => endInteraction();
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    window.addEventListener("touchcancel", end);
    detachRef.current = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
      window.removeEventListener("touchcancel", end);
    };
  }, [endInteraction]);

  moveRef.current = (e: MouseEvent | TouchEvent) => {
    if (!dragRef.current) return;
    if (e.cancelable) e.preventDefault();

    const point = pointer(e);
    const svgPos = clientToSVG(point.x, point.y);
    const { id, originMouseX, originMouseY, originPosX, originPosY } = dragRef.current;
    const kind = kindOf(id);
    const nextPos = clamp({
      x: originPosX + (svgPos.x - originMouseX),
      y: originPosY + (svgPos.y - originMouseY),
    }, width, height, marginsFor(id, kind));

    setPositions((prev) => ({ ...prev, [id]: nextPos }));
  };

  const startDrag = useCallback((id: string, e: React.MouseEvent | React.TouchEvent) => {
    if (!onPreviewPositionsChange) return;
    e.preventDefault();
    e.stopPropagation();

    const point = pointer(e);
    const svgPos = clientToSVG(point.x, point.y);
    const current = getPos(id);
    setSelectedId(id);
    dragRef.current = {
      id,
      originMouseX: svgPos.x,
      originMouseY: svgPos.y,
      originPosX: current.x,
      originPosY: current.y,
    };
    beginInteraction();
  }, [beginInteraction, clientToSVG, getPos, onPreviewPositionsChange]);

  useEffect(() => endInteraction, [endInteraction]);

  const selectedFilter = (id: string) => (selectedId === id ? "url(#formika-preview-glow)" : undefined);
  const isDragging = (id: string) => dragRef.current?.id === id;

  return (
    <div className="bg-card border border-primary/40 rounded-3xl h-full min-h-[340px] flex flex-col items-center justify-center p-5 relative overflow-hidden select-none shadow-[0_0_0_1px_rgba(255,106,0,0.25),0_18px_40px_rgba(0,0,0,0.5)]">
      <div className="absolute top-4 left-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">
        {label}
      </div>

      <motion.div
        key={`${n}-${petCount}`}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ maxWidth: "100%", maxHeight: "300px", touchAction: "none" }}
          onMouseDown={() => setSelectedId(null)}
          onTouchStart={() => setSelectedId(null)}
          data-testid="character-preview-canvas"
        >
          <defs>
            <filter id="formika-preview-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FF6A00" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FF6A00" floodOpacity="0.45" />
            </filter>
          </defs>

          {characters.map((char) => {
            const pos = getPos(char.id);
            const dragging = isDragging(char.id);

            return (
              <g
                key={char.id}
                transform={`translate(${pos.x}, ${pos.y}) scale(${CHAR_SCALE})`}
                filter={selectedFilter(char.id)}
                style={{ cursor: dragging ? "grabbing" : "grab" }}
                onMouseDown={(e) => startDrag(char.id, e)}
                onTouchStart={(e) => startDrag(char.id, e)}
                data-testid={`preview-character-${char.id}`}
              >
                <rect x="-30" y="-66" width="60" height="124" fill="transparent" style={{ pointerEvents: "all" }} />
                <CharacterBody char={char} />
              </g>
            );
          })}

          {pets.map((id) => {
            const pos = getPos(id);
            const dragging = isDragging(id);
            const petScale = PET_SCALE * getPetDisplayScale(id);

            return (
              <g
                key={id}
                transform={`translate(${pos.x}, ${pos.y}) scale(${petScale})`}
                filter={selectedFilter(id)}
                style={{ cursor: dragging ? "grabbing" : "grab" }}
                onMouseDown={(e) => startDrag(id, e)}
                onTouchStart={(e) => startDrag(id, e)}
                data-testid={`preview-pet-${id}`}
              >
                <rect x="-24" y="-26" width="58" height="62" fill="transparent" style={{ pointerEvents: "all" }} />
                <PetGlyph id={id} />
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}

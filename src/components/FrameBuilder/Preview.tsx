import { useRef, useState, useCallback, useEffect, type Dispatch, type SetStateAction } from "react";
import {
  FrameOrderState,
  HEART_IMG,
  getCatalogItemId,
} from "@/lib/types";
import { useTranslation } from "react-i18next";
import { getAccessoryDisplay } from "@/lib/accessoryDisplay";
import { getPetDisplayScale } from "@/lib/petDisplay";
import { motion } from "@/lib/motion";
import CharacterBody from "./CharacterBody";
import PetGlyph from "../PetGlyph";
import AccessoryGlyph from "../AccessoryGlyph";

interface PreviewProps {
  state: FrameOrderState;
  onChange: Dispatch<SetStateAction<FrameOrderState>>;
}

interface Pos { x: number; y: number }
type PosMap = Record<string, Pos>;

interface DragState {
  id: string;
  originMouseX: number;
  originMouseY: number;
  originPosX: number;
  originPosY: number;
}

function getFrameDims(size: FrameOrderState["size"]) {
  if (size === "10x15") return { w: 240, h: 340 };
  if (size === "22x17") return { w: 400, h: 300 };
  return { w: 300, h: 400 }; // 17x22 default
}

type Kind = "char" | "pet" | "acc" | "heart";

function kindOf(id: string): Kind {
  const catalogId = getCatalogItemId(id);

  return catalogId.startsWith("HEART-") ? "heart"
    : catalogId.startsWith("P-") || /^cat\d+$/i.test(catalogId) || /^dog\d+$/i.test(catalogId) ? "pet"
    : (catalogId.startsWith("A-") && !catalogId.startsWith("A-A")) || /^accessory\d+$/i.test(catalogId) ? "acc"
    : "char";
}

// Default layout: characters in a row in the middle, pets bottom-left, accs bottom-right, bgaccs scattered
function defaultPos(id: string, allIds: string[], innerW: number, innerH: number): Pos {
  const idx = allIds.indexOf(id);
  const total = allIds.length;
  const kind = kindOf(id);

  if (kind === "char") {
    const spacing = Math.min(70, (innerW - 40) / Math.max(total, 1));
    const startX = innerW / 2 - ((total - 1) * spacing) / 2;
    return { x: startX + idx * spacing, y: innerH * 0.45 };
  }
  if (kind === "pet") {
    return { x: 30 + idx * 28, y: innerH - 30 };
  }
  if (kind === "heart") {
    // Scatter hearts across the background
    const cols = 4;
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const stepX = (innerW - 56) / (cols - 1);
    return { x: 28 + col * stepX, y: 34 + row * 44 };
  }
  // accessories
  return { x: innerW - 30 - idx * 22, y: innerH - 30 };
}

interface Margins { top: number; bottom: number; left: number; right: number }
const DEFAULT_MARGINS: Margins = { top: 18, bottom: 18, left: 18, right: 18 };
const PET_MARGINS: Margins = {
  top: 30,
  bottom: 30,
  left: 22,
  right: 22,
};

const PET_BASE_SCALE = 0.9;

// A single character body spans roughly y∈[-60,40] and x∈[-23,23] in its own
// (unscaled) coordinates. On the arrange step the requested preview scale is
// fixed, while translate keeps changing from drag.
const ARRANGE_CHARACTER_SCALE = 1.1;

/*
 * Сердечко раньше было нарисовано со смещением относительно точки вращения:
 * картинка занимала x=[-20; 40] и y=[-20; 40], а вращалась вокруг (0, 0).
 * Поэтому при повороте оно визуально "ездило" по окружности.
 *
 * Оставляем прежнее положение на макете, но переносим геометрический центр
 * сердечка в точку вращения.
 */
const HEART_RENDER_SIZE = 60;
const HEART_RENDER_HALF = HEART_RENDER_SIZE / 2;
const HEART_CENTER_OFFSET = 10;

/* Большой и понятный контрол поворота — удобен мышью и пальцем. */
const HEART_ROTATE_HANDLE_Y = -53;
const HEART_ROTATE_HANDLE_RADIUS = 9.5;
const HEART_ROTATE_TOUCH_RADIUS = 18;

// Character drag-clamp margins follow the rendered scale (scaled bounding box).
function charMargins(scale: number): Margins {
  return {
    top: Math.ceil(60 * scale),
    bottom: Math.ceil(42 * scale),
    left: Math.ceil(24 * scale),
    right: Math.ceil(24 * scale),
  };
}

function marginsFor(id: string, scale: number): Margins {
  const kind = kindOf(id);
  if (kind === "char") return charMargins(scale);
  if (kind === "pet") {
    const petScale = getPetDisplayScale(id);
    return {
      top: Math.ceil(PET_MARGINS.top * petScale),
      bottom: Math.ceil(PET_MARGINS.bottom * petScale),
      left: Math.ceil(PET_MARGINS.left * petScale),
      right: Math.ceil(PET_MARGINS.right * petScale),
    };
  }
  return DEFAULT_MARGINS;
}

// Clamp position so element stays within inner frame
function clamp(pos: Pos, innerW: number, innerH: number, m: Margins = DEFAULT_MARGINS): Pos {
  return {
    x: Math.max(m.left, Math.min(innerW - m.right, pos.x)),
    y: Math.max(m.top, Math.min(innerH - m.bottom, pos.y)),
  };
}

function getLightingFilter(lighting: FrameOrderState["lighting"]) {
  if (lighting === "LED-гирлянда") return "drop-shadow(0 0 14px rgba(255, 215, 0, 0.45))";
  // Blue-red glow (no purple): a blue halo paired with a red halo
  if (lighting === "LED RGB") return "drop-shadow(0 -2px 16px rgba(40, 90, 255, 0.55)) drop-shadow(0 2px 16px rgba(255, 40, 60, 0.5))";
  // Soft multi-colour rainbow glow
  if (lighting === "LED с облаками") return "drop-shadow(0 0 12px rgba(255, 90, 90, 0.4)) drop-shadow(0 0 12px rgba(120, 200, 120, 0.38)) drop-shadow(0 0 14px rgba(90, 140, 255, 0.4))";
  return "none";
}

export default function Preview({ state, onChange }: PreviewProps) {
  const { t } = useTranslation();
  const { w, h } = getFrameDims(state.size);
  const BORDER = 18;
  const innerW = w - BORDER * 2;
  const innerH = h - BORDER * 2;

  const frameColor  = state.color === "Чёрная" ? "#1c1c1c" : "#f0f0f0";
  // Inner background is always off-white for both frame colours.
  const innerBg     = "#F5F1EA";
  const frameBorder = state.color === "Чёрная" ? "#111" : "#bbb";
  const glowFilter  = getLightingFilter(state.lighting);
  const charScaleValue = ARRANGE_CHARACTER_SCALE;

  // All element ids in the order
  const charIds  = state.characters.map(c => c.id);
  const petIds   = state.pets;
  const accIds   = state.accessories;
  // Heart instance ids: one per heart unit, e.g. HEART-01#0, HEART-01#1
  const heartIds = Object.entries(state.hearts).flatMap(([code, qty]) =>
    Array.from({ length: qty }, (_, i) => `${code}#${i}`)
  );
  const allIds   = [...charIds, ...petIds, ...accIds, ...heartIds];

  const positions = state.previewPositions ?? {};
  const rotations = state.previewRotations ?? {};
  const [localPositions, setLocalPositions] = useState<PosMap>(positions);
  const localPositionsRef = useRef<PosMap>(positions);
  const pendingDragPosRef = useRef<{ id: string; pos: Pos } | null>(null);
  const dragFrameRef = useRef<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dragRef   = useRef<DragState | null>(null);
  const rotateRef = useRef<{ id: string } | null>(null);
  const detachRef = useRef<() => void>(() => {});
  const moveRef   = useRef<(e: MouseEvent | TouchEvent) => void>(() => {});
  const svgRef    = useRef<SVGSVGElement>(null);

  const groupOf = (id: string): string[] =>
    charIds.includes(id) ? charIds
      : petIds.includes(id) ? petIds
      : accIds.includes(id) ? accIds
      : heartIds;

  const setLocalPositionsSafely = useCallback((updater: (prev: PosMap) => PosMap) => {
    setLocalPositions((prev) => {
      const next = updater(prev);
      localPositionsRef.current = next;
      return next;
    });
  }, []);

  const commitPosition = useCallback((id: string, pos: Pos) => {
    onChange((prevState) => ({
      ...prevState,
      previewPositions: {
        ...(prevState.previewPositions ?? {}),
        [id]: pos,
      },
    }));
  }, [onChange]);

  // Initialize positions for new elements, keep existing ones.
  // The preview uses local positions while dragging and writes to the main
  // builder state only when the pointer is released.
  useEffect(() => {
    if (dragRef.current) return;

    const source = state.previewPositions ?? {};
    const next: PosMap = {};

    allIds.forEach((id) => {
      const raw = source[id] ?? defaultPos(id, groupOf(id), innerW, innerH);
      next[id] = clamp(
        raw,
        innerW,
        innerH,
        marginsFor(id, charScaleValue),
      );
    });

    localPositionsRef.current = next;
    setLocalPositions(next);

    const changed =
      Object.keys(source).some((id) => !allIds.includes(id)) ||
      allIds.some((id) => {
        const prev = source[id];
        const current = next[id];
        return !prev || prev.x !== current.x || prev.y !== current.y;
      });

    if (changed) {
      onChange((prevState) => ({
        ...prevState,
        previewPositions: next,
      }));
    }

    // Drop the selection if the selected element no longer exists.
    setSelectedId((prev) => (prev && allIds.includes(prev) ? prev : null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.characters.length, state.pets.join(), state.accessories.join(), heartIds.join(), state.size]);

  const clientToSVG = (clientX: number, clientY: number): Pos => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const scaleX = w / rect.width;
    const scaleY = h / rect.height;
    return {
      x: (clientX - rect.left) * scaleX - BORDER,
      y: (clientY - rect.top) * scaleY - BORDER,
    };
  };

  const getPos = (id: string, group: string[]): Pos =>
    localPositions[id] ??
    clamp(
      defaultPos(id, group, innerW, innerH),
      innerW,
      innerH,
      marginsFor(id, charScaleValue),
    );

  const isDragging = (id: string) => dragRef.current?.id === id;

  // Unified pointer (mouse + touch) coordinate reader
  const pointer = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if ("changedTouches" in e && e.changedTouches.length) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const m = e as MouseEvent;
    return { x: m.clientX, y: m.clientY };
  };

  // Release any interaction immediately and detach window listeners.
  // A dragged position is committed to the main builder state only once here.
  const endInteraction = useCallback(() => {
    const activeDrag = dragRef.current;

    if (dragFrameRef.current !== null) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
    }

    if (pendingDragPosRef.current) {
      const { id, pos } = pendingDragPosRef.current;
      localPositionsRef.current = {
        ...localPositionsRef.current,
        [id]: pos,
      };
      setLocalPositions(localPositionsRef.current);
      pendingDragPosRef.current = null;
    }

    if (activeDrag) {
      const finalPos = localPositionsRef.current[activeDrag.id];
      if (finalPos) {
        commitPosition(activeDrag.id, finalPos);
      }
    }

    dragRef.current = null;
    rotateRef.current = null;
    detachRef.current();
    detachRef.current = () => {};
  }, [commitPosition]);

  // While interacting, track the pointer on the whole window so drag/rotate keeps
  // working outside the SVG and always releases on mouseup / touchend / touchcancel.
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

  // Keep the latest move logic in a ref so the window listeners never go stale
  moveRef.current = (e: MouseEvent | TouchEvent) => {
    const pt = pointer(e);
    const svgPos = clientToSVG(pt.x, pt.y);
    if (rotateRef.current) {
      if (e.cancelable) e.preventDefault();
      const { id } = rotateRef.current;
      const storedPos = getPos(id, heartIds);
      const center = {
        x: storedPos.x + HEART_CENTER_OFFSET,
        y: storedPos.y + HEART_CENTER_OFFSET,
      };
      const deg =
        Math.atan2(svgPos.y - center.y, svgPos.x - center.x) *
          (180 / Math.PI) +
        90;
      const norm = ((deg % 360) + 360) % 360;
      onChange((current) => ({
        ...current,
        previewRotations: {
          ...(current.previewRotations ?? {}),
          [id]: norm,
        },
      }));
      return;
    }
    if (dragRef.current) {
      if (e.cancelable) e.preventDefault();
      const { id, originMouseX, originMouseY, originPosX, originPosY } = dragRef.current;
      const newPos = clamp({
        x: originPosX + (svgPos.x - originMouseX),
        y: originPosY + (svgPos.y - originMouseY),
      }, innerW, innerH, marginsFor(id, charScaleValue));
      pendingDragPosRef.current = { id, pos: newPos };

      if (dragFrameRef.current === null) {
        dragFrameRef.current = requestAnimationFrame(() => {
          dragFrameRef.current = null;
          const pending = pendingDragPosRef.current;
          if (!pending) return;

          setLocalPositionsSafely((prev) => ({
            ...prev,
            [pending.id]: pending.pos,
          }));
        });
      }
    }
  };

  const startDrag = useCallback((id: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    const pt = pointer(e);
    const svgPos = clientToSVG(pt.x, pt.y);
    const current = getPos(id, groupOf(id));
    pendingDragPosRef.current = null;
    dragRef.current = {
      id,
      originMouseX: svgPos.x,
      originMouseY: svgPos.y,
      originPosX: current.x,
      originPosY: current.y,
    };
    beginInteraction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localPositions, charIds, petIds, accIds, heartIds, innerW, innerH, beginInteraction]);

  const startRotate = useCallback((id: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    rotateRef.current = { id };
    beginInteraction();
  }, [beginInteraction]);

  // Safety: always release listeners and animation frames on unmount.
  useEffect(() => endInteraction, [endInteraction]);

  return (
    <div className="bg-card border border-border rounded-3xl h-full min-h-[500px] lg:min-h-[620px] xl:min-h-[680px] flex flex-col items-center justify-center p-2 sm:p-3 relative overflow-hidden select-none">
      <div className="absolute top-4 left-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">
        {t("frameBuilder.preview.label")}
      </div>
      <div className="absolute top-4 right-4 text-[10px] text-muted-foreground/60 font-medium">
        {t("frameBuilder.preview.dragHint")}
      </div>

      <motion.div
        className="flex w-full items-center justify-center"
        key={`${state.size}-${state.color}`}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ filter: glowFilter }}
      >
        <svg
          ref={svgRef}
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="shadow-2xl"
          style={{
            width: "min(100%, 680px)",
            height: "auto",
            maxHeight: "min(74vh, 720px)",
            touchAction: "none",
            cursor: dragRef.current ? "grabbing" : "default",
          }}
          onMouseDown={() => setSelectedId(null)}
          onTouchStart={() => setSelectedId(null)}
        >
          <defs>
            {/* Soft premium orange glow for the selected element */}
            <filter id="formika-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FF6A00" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FF6A00" floodOpacity="0.45" />
            </filter>
          </defs>
          {/* Frame border */}
          <rect x="0" y="0" width={w} height={h} rx="5" fill={frameColor} stroke={frameBorder} strokeWidth="1.5" />
          {/* Thin inner mat line */}
          <rect x="6" y="6" width={w - 12} height={h - 12} rx="3" fill="none"
            stroke={state.color === "Чёрная" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"} strokeWidth="1" />
          {/* Inner canvas */}
          <rect x={BORDER} y={BORDER} width={innerW} height={innerH} fill={innerBg} />

          {/* Background hearts — decorative, rendered above the background but below characters */}
          <g transform={`translate(${BORDER}, ${BORDER})`}>
            {heartIds.map(id => {
              const p = getPos(id, heartIds);
              const code = id.split("#")[0];
              const src = HEART_IMG[code];
              const dragging = isDragging(id);
              const selected = selectedId === id;
              const rot = rotations[id] ?? 0;
              const centerX = p.x + HEART_CENTER_OFFSET;
              const centerY = p.y + HEART_CENTER_OFFSET;

              return (
                <g
                  key={id}
                  transform={`translate(${centerX}, ${centerY}) rotate(${rot})`}
                  style={{ cursor: dragging ? "grabbing" : "grab" }}
                  onMouseDown={(e) => startDrag(id, e)}
                  onTouchStart={(e) => startDrag(id, e)}
                >
                  {/*
                   * Увеличенная зона захвата сердечка.
                   * Само изображение теперь центрировано относительно (0, 0),
                   * поэтому при повороте оно не смещается по кругу.
                   */}
                  <rect
                    x={-HEART_RENDER_HALF - 6}
                    y={-HEART_RENDER_HALF - 6}
                    width={HEART_RENDER_SIZE + 12}
                    height={HEART_RENDER_SIZE + 12}
                    rx="12"
                    fill="transparent"
                    style={{ pointerEvents: "all" }}
                  />

                  {src && (
                    <g filter={selected ? "url(#formika-glow)" : undefined}>
                      <image
                        href={src}
                        x={-HEART_RENDER_HALF}
                        y={-HEART_RENDER_HALF}
                        width={HEART_RENDER_SIZE}
                        height={HEART_RENDER_SIZE}
                        preserveAspectRatio="xMidYMid meet"
                        style={{ pointerEvents: "all" }}
                      />
                    </g>
                  )}

                  {selected && (
                    <g>
                      {/* Спокойная рамка без сильного свечения. */}
                      <rect
                        x={-HEART_RENDER_HALF - 3}
                        y={-HEART_RENDER_HALF - 3}
                        width={HEART_RENDER_SIZE + 6}
                        height={HEART_RENDER_SIZE + 6}
                        rx="11"
                        fill="none"
                        stroke="rgba(255,106,0,0.72)"
                        strokeWidth="1.05"
                        strokeDasharray="3.5 3.5"
                        style={{ pointerEvents: "none" }}
                      />

                      {/* Тонкая соединительная линия. */}
                      <line
                        x1="0"
                        y1={-HEART_RENDER_HALF - 3}
                        x2="0"
                        y2={HEART_ROTATE_HANDLE_Y + HEART_ROTATE_HANDLE_RADIUS - 1}
                        stroke="rgba(255,106,0,0.72)"
                        strokeWidth="1.15"
                        strokeLinecap="round"
                        style={{ pointerEvents: "none" }}
                      />

                      {/*
                       * Чистая кнопка поворота без размытого ореола.
                       * Иконка легче и визуально ближе к интерфейсу редактора.
                       */}
                      <g
                        transform={`translate(0 ${HEART_ROTATE_HANDLE_Y})`}
                        style={{ pointerEvents: "none" }}
                      >
                        <circle
                          r={HEART_ROTATE_HANDLE_RADIUS}
                          fill="rgba(24,18,14,0.96)"
                          stroke="rgba(255,106,0,0.88)"
                          strokeWidth="1.25"
                        />

                        <circle
                          r={HEART_ROTATE_HANDLE_RADIUS - 2.2}
                          fill="none"
                          stroke="rgba(255,255,255,0.07)"
                          strokeWidth="0.7"
                        />

                        <path
                          d="M -3.4 -3.1 A 4.8 4.8 0 1 1 -4.0 2.5"
                          fill="none"
                          stroke="#FF8A32"
                          strokeWidth="1.45"
                          strokeLinecap="round"
                        />

                        <path
                          d="M -5.55 0.95 L -3.85 2.95 L -1.55 2.15"
                          fill="none"
                          stroke="#FF8A32"
                          strokeWidth="1.45"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <circle
                          cx="0"
                          cy="0"
                          r="1.15"
                          fill="rgba(255,138,50,0.32)"
                        />
                      </g>

                      {/*
                       * Большая невидимая зона — особенно важна на телефоне.
                       * Палец может начать вращение не попадая точно в иконку.
                       */}
                      <circle
                        cx="0"
                        cy={HEART_ROTATE_HANDLE_Y}
                        r={HEART_ROTATE_TOUCH_RADIUS}
                        fill="transparent"
                        style={{
                          cursor: rotateRef.current?.id === id
                            ? "grabbing"
                            : "grab",
                          pointerEvents: "all",
                          touchAction: "none",
                        }}
                        onMouseDown={(e) => startRotate(id, e)}
                        onTouchStart={(e) => startRotate(id, e)}
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* Characters */}
          <g transform={`translate(${BORDER}, ${BORDER})`}>
            {state.characters.map((char) => {
              const p = getPos(char.id, charIds);
              const dragging   = isDragging(char.id);
              return (
                <g key={char.id}
                  transform={`translate(${p.x}, ${p.y}) scale(${charScaleValue})`}
                  filter={selectedId === char.id ? "url(#formika-glow)" : undefined}
                  style={{ cursor: dragging ? "grabbing" : "grab" }}
                  onMouseDown={(e) => startDrag(char.id, e)}
                  onTouchStart={(e) => startDrag(char.id, e)}
                >
                  <rect x="-32" y="-64" width="64" height="124" fill="transparent" style={{ pointerEvents: "all" }} />
                  <CharacterBody char={char} showName />
                </g>
              );
            })}
          </g>

          {/* Pets */}
          <g transform={`translate(${BORDER}, ${BORDER})`}>
            {petIds.map(id => {
              const p = getPos(id, petIds);
              const dragging = isDragging(id);
              const petScale = PET_BASE_SCALE * getPetDisplayScale(id);
              return (
                <g key={id} transform={`translate(${p.x}, ${p.y})`}
                  filter={selectedId === id ? "url(#formika-glow)" : undefined}
                  style={{ cursor: dragging ? "grabbing" : "grab" }}
                  onMouseDown={(e) => startDrag(id, e)}
                  onTouchStart={(e) => startDrag(id, e)}
                >
                  <rect x="-20" y="-22" width="40" height={state.petNames?.[id]?.trim() ? "58" : "46"} fill="transparent" style={{ pointerEvents: "all" }} />
                  <g transform={`scale(${petScale})`}>
                    <PetGlyph id={id} showLabel={false} />
                  </g>
                  {state.petNames?.[id]?.trim() && (
                    <text x="0" y="22" textAnchor="middle" fontSize="6.5" fill="#111111" fontWeight="bold"
                      style={{ pointerEvents: "none", userSelect: "none" }}>
                      {state.petNames[id].trim()}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Accessories */}
          <g transform={`translate(${BORDER}, ${BORDER})`}>
            {accIds.map(id => {
              const p = getPos(id, accIds);
              const dragging = isDragging(id);
              const display = getAccessoryDisplay(id, "frame");
              const hitWidth = Math.max(36, display.width);
              const hitHeight = Math.max(36, display.height);
              return (
                <g key={id} transform={`translate(${p.x}, ${p.y})`}
                  filter={selectedId === id ? "url(#formika-glow)" : undefined}
                  style={{ cursor: dragging ? "grabbing" : "grab" }}
                  onMouseDown={(e) => startDrag(id, e)}
                  onTouchStart={(e) => startDrag(id, e)}
                >
                  <rect
                    x={display.offsetX - hitWidth / 2}
                    y={display.offsetY - hitHeight / 2}
                    width={hitWidth}
                    height={hitHeight}
                    fill="transparent"
                    style={{ pointerEvents: "all" }}
                  />
                  <AccessoryGlyph
                    id={id}
                    width={display.width}
                    height={display.height}
                    offsetX={display.offsetX}
                    offsetY={display.offsetY}
                  />
                </g>
              );
            })}
          </g>

          {/* Empty state */}
          {allIds.length === 0 && (
            <text x={w / 2} y={h / 2} textAnchor="middle"
              fontSize="11" fill="rgba(255,255,255,0.18)" fontFamily="serif">
              {t("frameBuilder.preview.emptyHint")}
            </text>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

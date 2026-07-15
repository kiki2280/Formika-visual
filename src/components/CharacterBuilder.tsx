import { useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Character, makeCharacter } from "@/lib/types";
import { isFixedAccessory } from "@/lib/accessoryDisplay";
import CharacterEditor from "./CharacterEditor";
import CharacterBody from "./FrameBuilder/CharacterBody";

interface CharacterBuilderProps {
  characters: Character[];
  onChange: (characters: Character[]) => void;
  maxCharacters?: number;
  minCharacters?: number;
  extraCharacterPrice?: number;
  note?: string;
  addButtonLabel?: string;
  showAccessories?: boolean;
  showName?: boolean;
}

const DEFAULT_CLOTHING = { top: "TOP-13", bottom: "BOTTOM-13" };
const VBW = 200;
const VBH = 320;
const CX = 100;
const CY = 170;
const SCALE = 2.6;

function InteractiveFigure({
  char,
  onChange,
  showName,
}: {
  char: Character;
  onChange: (c: Character) => void;
  showName: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const dragRef = useRef<string | null>(null);
  const moveRef = useRef<(e: MouseEvent | TouchEvent) => void>(() => {});
  const detachRef = useRef<() => void>(() => {});
  const charRef = useRef(char);
  charRef.current = char;

  const toLocal = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const svgX = (clientX - rect.left) * (VBW / rect.width);
    const svgY = (clientY - rect.top) * (VBH / rect.height);
    return { x: (svgX - CX) / SCALE, y: (svgY - CY) / SCALE };
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current = null;
    detachRef.current();
    detachRef.current = () => {};
  }, []);

  moveRef.current = (e: MouseEvent | TouchEvent) => {
    const accId = dragRef.current;
    if (!accId || isFixedAccessory(accId)) return;
    if (e.cancelable) e.preventDefault();
    const pt = "touches" in e && e.touches.length
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
    const loc = toLocal(pt.x, pt.y);
    const clamped = {
      x: Math.max(-30, Math.min(30, loc.x)),
      y: Math.max(-55, Math.min(40, loc.y)),
    };
    const cur = charRef.current;
    onChange({ ...cur, accessoryPositions: { ...(cur.accessoryPositions ?? {}), [accId]: clamped } });
  };

  const startDrag = useCallback((accId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFixedAccessory(accId)) {
      setSelected(null);
      return;
    }
    setSelected(accId);
    dragRef.current = accId;
    detachRef.current();
    const move = (ev: MouseEvent | TouchEvent) => moveRef.current(ev);
    const end = () => endDrag();
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
  }, [endDrag]);

  useEffect(() => endDrag, [endDrag]);
  const hasDraggableAccessories = char.accessories.some((accId) => !isFixedAccessory(accId));

  return (
    <div className="bg-card border border-primary/30 rounded-3xl p-5 flex flex-col items-center justify-center shadow-[0_0_0_1px_rgba(255,106,0,0.2),0_18px_40px_rgba(0,0,0,0.5)] min-h-[360px]">
      <svg
        ref={svgRef}
        width={VBW}
        height={VBH}
        viewBox={`0 0 ${VBW} ${VBH}`}
        style={{ maxWidth: "100%", maxHeight: 360, touchAction: "none" }}
        onMouseDown={() => setSelected(null)}
        onTouchStart={() => setSelected(null)}
      >
        <g transform={`translate(${CX}, ${CY}) scale(${SCALE})`}>
          <CharacterBody
            char={char}
            showName={showName}
            nameColor="rgba(255,255,255,0.88)"
            onAccessoryDown={startDrag}
            selectedAccessory={selected}
          />
        </g>
      </svg>
      {hasDraggableAccessories && (
        <p className="text-[11px] text-muted-foreground mt-2 text-center">
          Перетащите аксессуар, чтобы разместить его в руке
        </p>
      )}
    </div>
  );
}

export default function CharacterBuilder({
  characters,
  onChange,
  maxCharacters = 4,
  minCharacters = 1,
  extraCharacterPrice,
  note,
  addButtonLabel = "Добавить человечка",
  showAccessories = true,
  showName = true,
}: CharacterBuilderProps) {
  const [active, setActive] = useState(0);
  const activeIndex = Math.min(active, characters.length - 1);

  useEffect(() => {
    setActive((current) => Math.max(0, Math.min(current, characters.length - 1)));
  }, [characters.length]);

  const addCharacter = () => {
    if (characters.length >= maxCharacters) return;
    onChange([...characters, makeCharacter(undefined, DEFAULT_CLOTHING)]);
    setActive(characters.length);
  };

  const updateCharacter = (index: number, character: Character) => {
    const next = [...characters];
    next[index] = character;
    onChange(next);
  };

  const removeCharacter = (index: number) => {
    if (characters.length <= 1) return;
    const next = [...characters];
    next.splice(index, 1);
    onChange(next);
    setActive((current) => Math.max(0, Math.min(current, next.length - 1)));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {characters.map((char, i) => (
          <button
            key={char.id}
            type="button"
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
              i === activeIndex
                ? "border-primary bg-primary/10 text-primary shadow-[0_0_0_2px_rgba(255,106,0,0.8)]"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
            data-testid={`character-tab-${i}`}
          >
            Человечек {i + 1}
            {i > 0 && extraCharacterPrice !== undefined && (
              <span className="ml-1.5 text-xs opacity-80">+{extraCharacterPrice} €</span>
            )}
          </button>
        ))}
        {characters.length < maxCharacters && (
          <button
            type="button"
            onClick={addCharacter}
            className="px-4 py-2 rounded-full border border-dashed border-primary/50 text-sm font-semibold text-primary hover:bg-primary/10 transition-all flex items-center gap-1.5"
            data-testid="btn-add-character"
          >
            <Plus className="w-4 h-4" />
            {addButtonLabel}
          </button>
        )}
      </div>

      {note && <p className="text-xs text-muted-foreground">{note}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <div className="lg:sticky lg:top-[150px]">
          <InteractiveFigure
            key={characters[activeIndex].id}
            char={characters[activeIndex]}
            onChange={(c) => updateCharacter(activeIndex, c)}
            showName={showName}
          />
        </div>
        <div>
          <CharacterEditor
            key={characters[activeIndex].id}
            index={activeIndex}
            character={characters[activeIndex]}
            onChange={(c) => updateCharacter(activeIndex, c)}
            onRemove={characters.length > minCharacters ? () => removeCharacter(activeIndex) : undefined}
            showName={showName}
            showAccessories={showAccessories}
          />
        </div>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Character, makeCharacter } from "@/lib/types";
import { isFixedAccessory } from "@/lib/accessoryDisplay";
import { useTranslation } from "react-i18next";
import CharacterEditor from "./CharacterEditor";
import CharacterBody from "./FrameBuilder/CharacterBody";

interface CharacterBuilderProps {
  characters: Character[];
  onChange: (characters: Character[]) => void;
  maxCharacters?: number;
  minCharacters?: number;
  extraCharacterPrice?: number;
  note?: string;
  limitMessage?: string;
  overLimitMessage?: string;
  recommendedMessage?: string;
  addButtonLabel?: string;
  showAccessories?: boolean;
  showName?: boolean;
  invalidFaceIds?: readonly string[];
  focusInvalidCharacterId?: string | null;
  faceValidationRequestId?: number;
}

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
  const { t } = useTranslation();
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
          {t("characterEditor.dragAccessoryHint")}
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
  limitMessage,
  overLimitMessage,
  recommendedMessage,
  addButtonLabel,
  showAccessories = true,
  showName = true,
  invalidFaceIds = [],
  focusInvalidCharacterId = null,
  faceValidationRequestId = 0,
}: CharacterBuilderProps) {
  const { t } = useTranslation();
  const resolvedAddButtonLabel =
    addButtonLabel ?? t("characterEditor.addCharacter");
  const [active, setActive] = useState(0);
  const characterTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeIndex = Math.min(active, characters.length - 1);
  const hasReachedLimit = characters.length >= maxCharacters;
  const isOverLimit = characters.length > maxCharacters;
  const characterIdsSignature = characters.map((character) => character.id).join("|");

  useEffect(() => {
    setActive((current) => Math.max(0, Math.min(current, characters.length - 1)));
  }, [characters.length]);

  useEffect(() => {
    if (!focusInvalidCharacterId || faceValidationRequestId <= 0) return;

    const invalidIndex = characters.findIndex(
      (character) => character.id === focusInvalidCharacterId,
    );
    if (invalidIndex < 0) return;

    setActive(invalidIndex);

    const animationFrame = window.requestAnimationFrame(() => {
      const target = characterTabRefs.current[focusInvalidCharacterId];
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [characterIdsSignature, faceValidationRequestId, focusInvalidCharacterId]);

  const addCharacter = () => {
    if (characters.length >= maxCharacters) return;
    onChange([...characters, makeCharacter()]);
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
        {characters.map((char, i) => {
          const faceInvalid = invalidFaceIds.includes(char.id);

          return (
            <button
              key={char.id}
              ref={(node) => {
                characterTabRefs.current[char.id] = node;
              }}
              type="button"
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                faceInvalid
                  ? "border-destructive bg-destructive/10 text-destructive shadow-[0_0_0_2px_rgba(239,68,68,0.22)]"
                  : i === activeIndex
                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_0_2px_rgba(255,106,0,0.8)]"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
              aria-invalid={faceInvalid || undefined}
              data-testid={`character-tab-${i}`}
            >
              {t("characterEditor.characterNumber", { number: i + 1 })}
              {i > 0 && extraCharacterPrice !== undefined && (
                <span className="ml-1.5 text-xs opacity-80">
                  {t("common.addedPrice", { price: extraCharacterPrice })}
                </span>
              )}
            </button>
          );
        })}
        <button
          type="button"
          onClick={addCharacter}
          disabled={hasReachedLimit}
          className="flex min-h-10 items-center gap-1.5 rounded-full border border-dashed border-primary/50 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/10 disabled:cursor-not-allowed disabled:border-white/20 disabled:text-muted-foreground disabled:hover:bg-transparent"
          data-testid="btn-add-character"
        >
          <Plus className="h-4 w-4" />
          {resolvedAddButtonLabel}
        </button>
      </div>

      {recommendedMessage && (
        <p className="text-sm font-medium text-foreground">
          {recommendedMessage}
        </p>
      )}

      {note && <p className="text-xs text-muted-foreground">{note}</p>}

      {hasReachedLimit && limitMessage && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            isOverLimit
              ? "border-destructive/60 bg-destructive/10 text-destructive"
              : "border-primary/35 bg-primary/10 text-foreground"
          }`}
          role={isOverLimit ? "alert" : "status"}
          data-testid="character-limit-message"
        >
          <p>{limitMessage}</p>
          {isOverLimit && overLimitMessage && (
            <p className="mt-1 font-semibold">{overLimitMessage}</p>
          )}
        </div>
      )}

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
            faceInvalid={invalidFaceIds.includes(characters[activeIndex].id)}
          />
        </div>
      </div>
    </div>
  );
}

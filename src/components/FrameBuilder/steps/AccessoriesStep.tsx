import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Check, Layers3, Minus, Plus } from "lucide-react";
import {
  type FrameOrderState,
  ITEMS,
  addCatalogInstance,
  countCatalogInstances,
  getAccessoryLabel,
  getCatalogItemId,
  removeCatalogInstance,
} from "@/lib/types";
import { getAccessoryPrice } from "@/lib/accessoryPricing";
import CollapsibleOptionGrid from "@/components/CollapsibleOptionGrid";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
}

const HIDDEN_BACKGROUND_ACCESSORY_IDS = new Set([
  "accessory1",
  "accessory5",
  "accessory30",
  "accessory31",
  "accessory32",
  "accessory41",
]);

const ACCESSORY_CARD_SCALE: Record<string, number> = {
  accessory2: 1.08,
  accessory3: 1.08,
  accessory4: 1.14,
  accessory6: 1.16,
  accessory9: 0.92,
  accessory10: 0.92,
  accessory26: 1.12,
  accessory38: 1.1,
  accessory39: 1.1,
};

function getCardScale(id: string) {
  return ACCESSORY_CARD_SCALE[id] ?? 1;
}

export default function AccessoriesStep({
  state,
  onChange,
}: StepProps) {
  const { t } = useTranslation();
  const visibleAccessories = useMemo(
    () =>
      ITEMS.accessories.filter(
        (accessory) =>
          accessory.img &&
          !HIDDEN_BACKGROUND_ACCESSORY_IDS.has(accessory.id),
      ),
    [],
  );

  const selectedAccessories = useMemo(
    () =>
      state.accessories.filter(
        (id) =>
          !HIDDEN_BACKGROUND_ACCESSORY_IDS.has(getCatalogItemId(id)),
      ),
    [state.accessories],
  );

  const hasSelectedHiddenAccessory =
    visibleAccessories
      .slice(3)
      .some(
        (accessory) =>
          countCatalogInstances(selectedAccessories, accessory.id) > 0,
      );

  const withoutPositions = (removedIds: readonly string[]) => {
    if (!state.previewPositions || removedIds.length === 0) {
      return state.previewPositions;
    }

    const next = { ...state.previewPositions };
    removedIds.forEach((id) => {
      delete next[id];
    });
    return next;
  };

  useEffect(() => {
    if (selectedAccessories.length !== state.accessories.length) {
      const selectedSet = new Set(selectedAccessories);
      const removedIds = state.accessories.filter((id) => !selectedSet.has(id));

      onChange({
        ...state,
        accessories: selectedAccessories,
        previewPositions: withoutPositions(removedIds),
      });
    }
  }, [onChange, selectedAccessories, state]);

  const addAccessory = (id: string) => {
    onChange({
      ...state,
      accessories: addCatalogInstance(selectedAccessories, id),
    });
  };

  const removeAccessory = (id: string) => {
    const { next, removedId } = removeCatalogInstance(
      selectedAccessories,
      id,
    );
    if (!removedId) return;

    onChange({
      ...state,
      accessories: next,
      previewPositions: withoutPositions([removedId]),
    });
  };

  const clearAccessories = () => {
    onChange({
      ...state,
      accessories: [],
      previewPositions: withoutPositions(selectedAccessories),
    });
  };

  const noDetailsSelected = selectedAccessories.length === 0;

  return (
    <CollapsibleOptionGrid
      className="grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      initialVisible={3}
      desktopInitialVisible={3}
      expandedByDefault={hasSelectedHiddenAccessory}
      buttonLabel={t("frameBuilder.accessories.showAll")}
      testId="background-accessories-show-all"
      alwaysVisible={
        <button
          type="button"
          onClick={clearAccessories}
          aria-pressed={noDetailsSelected}
          data-testid="accessories-none"
          className={`
            group relative flex min-h-[280px] w-full
            flex-col overflow-hidden rounded-[22px]
            border bg-[#171717] text-left
            transition-all duration-300
            active:scale-[0.99]

            ${
              noDetailsSelected
                ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.42),0_18px_45px_rgba(0,0,0,0.28)]"
                : "border-white/[0.10] hover:-translate-y-1 hover:border-primary/40"
            }
          `}
        >
          <div className="relative flex h-[170px] items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#141414]">
            <div className="absolute h-28 w-28 rounded-full border border-white/[0.04]" />
            <div className="absolute h-20 w-20 rounded-full border border-white/[0.06]" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/[0.10] bg-white/[0.025] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              <Layers3
                className="h-9 w-9 text-white/30"
                strokeWidth={1.5}
              />
              <span className="absolute h-[2px] w-12 -rotate-45 rounded-full bg-primary/75" />
            </div>

            {noDetailsSelected && (
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(255,106,0,0.28)]">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3
              className={`font-sans text-base font-semibold tracking-[-0.02em] ${
                noDetailsSelected ? "text-primary" : "text-white"
              }`}
            >
              {t("frameBuilder.accessories.none")}
            </h3>
            <p className="mt-1.5 font-sans text-xs leading-relaxed text-white/40">
              {t("frameBuilder.accessories.noneDescription")}
            </p>
            <span
              className={`mt-auto pt-4 font-sans text-sm font-semibold ${
                noDetailsSelected ? "text-primary" : "text-white/55"
              }`}
            >
              {t("common.freePrice")}
            </span>
          </div>
        </button>
      }
    >
      {visibleAccessories.map((accessory) => {
        const accessoryLabel = getAccessoryLabel(accessory.id);
        const quantity = countCatalogInstances(
          selectedAccessories,
          accessory.id,
        );
        const isSelected = quantity > 0;
        const scale = getCardScale(accessory.id);
        const price = getAccessoryPrice(accessory.id);

        return (
          <article
            key={accessory.id}
            data-testid={`accessory-${accessory.id}`}
            className={`
              group relative flex min-h-[280px] w-full
              flex-col overflow-hidden rounded-[22px]
              border bg-[#171717] text-left
              transition-all duration-300

              ${
                isSelected
                  ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.42),0_18px_45px_rgba(0,0,0,0.28)]"
                  : "border-white/[0.10] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
              }
            `}
          >
            <div className="relative flex h-[170px] items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#141414]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_68%)]" />
              <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.05]">
                <img
                  src={accessory.img!}
                  alt={accessoryLabel}
                  width={420}
                  height={420}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-contain p-6"
                  style={{ transform: `scale(${scale})` }}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3
                className={`font-sans text-base font-semibold leading-snug tracking-[-0.02em] ${
                  isSelected ? "text-primary" : "text-white"
                }`}
              >
                {accessoryLabel}
              </h3>
              <p className="mt-1.5 font-sans text-xs text-white/40">
                {t("frameBuilder.accessories.itemDescription")}
              </p>

              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                <span className="font-sans text-xs font-semibold text-white/55">
                  {t("common.addedPrice", { price })}
                </span>

                <div
                  className="flex items-center gap-1 rounded-full border border-white/[0.12] bg-black/25 p-1"
                  role="group"
                  aria-label={t("frameBuilder.accessories.quantityAria", {
                    accessory: accessoryLabel,
                  })}
                >
                  <button
                    type="button"
                    onClick={() => removeAccessory(accessory.id)}
                    disabled={quantity === 0}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-primary/15 hover:text-primary disabled:cursor-not-allowed disabled:opacity-25"
                    aria-label={t("frameBuilder.accessories.removeAria", {
                      accessory: accessoryLabel,
                    })}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <output
                    className="min-w-5 text-center font-sans text-sm font-bold tabular-nums text-white"
                    aria-live="polite"
                  >
                    {quantity}
                  </output>
                  <button
                    type="button"
                    onClick={() => addAccessory(accessory.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                    aria-label={t("frameBuilder.accessories.addAria", {
                      accessory: accessoryLabel,
                    })}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </CollapsibleOptionGrid>
  );
}

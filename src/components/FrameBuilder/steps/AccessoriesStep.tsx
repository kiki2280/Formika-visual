import { useEffect, useMemo } from "react";
import { Check, Layers3 } from "lucide-react";
import {
  type FrameOrderState,
  ITEMS,
} from "@/lib/types";
import { getAccessoryPrice } from "@/lib/accessoryPricing";
import { formatEuro } from "@/lib/pricing";
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
  const visibleAccessories = useMemo(
    () =>
      ITEMS.accessories.filter(
        (accessory) =>
          accessory.img &&
          !HIDDEN_BACKGROUND_ACCESSORY_IDS.has(
            accessory.id,
          ),
      ),
    [],
  );

  const selectedAccessories = useMemo(
    () =>
      state.accessories.filter(
        (id) =>
          !HIDDEN_BACKGROUND_ACCESSORY_IDS.has(id),
      ),
    [state.accessories],
  );

  const hasSelectedHiddenAccessory =
    visibleAccessories
      .slice(3)
      .some((accessory) =>
        selectedAccessories.includes(
          accessory.id,
        ),
      );

  useEffect(() => {
    if (
      selectedAccessories.length !==
      state.accessories.length
    ) {
      onChange({
        ...state,
        accessories: selectedAccessories,
      });
    }
  }, [
    onChange,
    selectedAccessories,
    state,
  ]);

  const toggle = (id: string) => {
    const isSelected =
      selectedAccessories.includes(id);

    const next = isSelected
      ? selectedAccessories.filter(
          (selectedId) => selectedId !== id,
        )
      : [...selectedAccessories, id];

    onChange({
      ...state,
      accessories: next,
    });
  };

  const noDetailsSelected =
    selectedAccessories.length === 0;

  return (
    <CollapsibleOptionGrid
      className="grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      initialVisible={3}
      desktopInitialVisible={3}
      expandedByDefault={
        hasSelectedHiddenAccessory
      }
      buttonLabel="Показать все детали"
      testId="background-accessories-show-all"
      alwaysVisible={
        <button
          type="button"
          onClick={() =>
            onChange({
              ...state,
              accessories: [],
            })
          }
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
                <Check
                  className="h-4 w-4"
                  strokeWidth={2.5}
                />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3
              className={`
                font-sans text-base font-semibold
                tracking-[-0.02em]

                ${
                  noDetailsSelected
                    ? "text-primary"
                    : "text-white"
                }
              `}
            >
              Без деталей
            </h3>

            <p className="mt-1.5 font-sans text-xs leading-relaxed text-white/40">
              Чистый фон без дополнительных
              элементов
            </p>

            <span
              className={`
                mt-auto pt-4 font-sans
                text-sm font-semibold

                ${
                  noDetailsSelected
                    ? "text-primary"
                    : "text-white/55"
                }
              `}
            >
              0 €
            </span>
          </div>
        </button>
      }
    >
      {visibleAccessories.map((accessory, index) => {
      const accessoryLabel = `Аксессуар ${index + 1}`;
        const isSelected =
          selectedAccessories.includes(
            accessory.id,
          );

        const scale = getCardScale(accessory.id);
        const price = getAccessoryPrice(
          accessory.id,
        );

        return (
          <button
            key={accessory.id}
            type="button"
            onClick={() => toggle(accessory.id)}
            aria-pressed={isSelected}
            data-testid={`accessory-${accessory.id}`}
            className={`
              group relative flex min-h-[280px] w-full
              flex-col overflow-hidden rounded-[22px]
              border bg-[#171717] text-left
              transition-all duration-300
              active:scale-[0.99]

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
                  style={{
                    transform: `scale(${scale})`,
                  }}
                />
              </div>

              <div
                className={`
                  absolute right-4 top-4
                  flex h-9 w-9 items-center
                  justify-center rounded-full
                  border transition-all duration-300

                  ${
                    isSelected
                      ? "scale-100 border-primary bg-primary text-white opacity-100 shadow-[0_0_20px_rgba(255,106,0,0.28)]"
                      : "scale-90 border-white/[0.12] bg-black/30 text-transparent opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  }
                `}
              >
                <Check
                  className="h-4 w-4"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3
                className={`
                  font-sans text-base font-semibold
                  leading-snug tracking-[-0.02em]

                  ${
                    isSelected
                      ? "text-primary"
                      : "text-white"
                  }
                `}
              >
                {accessoryLabel}
              </h3>

              <p className="mt-1.5 font-sans text-xs text-white/40">
                Дополнительная деталь фона
              </p>

              <div className="mt-auto pt-4">
                <span
                  className={`
                    inline-flex rounded-full border
                    px-2.5 py-1
                    font-sans text-xs font-semibold

                    ${
                      isSelected
                        ? "border-primary/30 bg-primary/[0.08] text-primary"
                        : "border-white/[0.09] bg-white/[0.025] text-white/65"
                    }
                  `}
                >
                  +{formatEuro(price)}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </CollapsibleOptionGrid>
  );
}
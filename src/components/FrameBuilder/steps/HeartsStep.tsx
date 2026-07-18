import { Minus, Plus, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  type FrameOrderState,
  HEARTS,
  PRICING,
  formatEuro,
  getHeartLabel,
} from "@/lib/types";
import CollapsibleOptionGrid from "@/components/CollapsibleOptionGrid";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
}

export default function HeartsStep({
  state,
  onChange,
}: StepProps) {
  const { t } = useTranslation();
  const setHeartQty = (
    id: string,
    quantity: number,
  ) => {
    const next = {
      ...state.hearts,
    };

    if (quantity <= 0) {
      delete next[id];
    } else {
      next[id] = quantity;
    }

    onChange({
      ...state,
      hearts: next,
    });
  };

  const clearHearts = () => {
    onChange({
      ...state,
      hearts: {},
    });
  };

  const selectedTotal = Object.values(
    state.hearts,
  ).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  const totalPrice =
    selectedTotal * PRICING.heart;

  const hasSelectedHiddenHeart = HEARTS
    .slice(4)
    .some(
      (heart) =>
        (state.hearts[heart.id] ?? 0) > 0,
    );

  return (
    <div className="space-y-5">
      {/* Информация и итог */}
      <div className="flex flex-col gap-4 rounded-[22px] border border-white/[0.09] bg-white/[0.025] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-sans text-sm font-medium text-white">
            {t("frameBuilder.hearts.instruction")}
          </p>

          <p className="mt-1 font-sans text-xs leading-relaxed text-white/[0.42]">
            {t("frameBuilder.hearts.pricingDescription", {
              price: formatEuro(PRICING.heart),
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedTotal > 0 && (
            <button
              type="button"
              onClick={clearHearts}
              className="
                inline-flex h-10 items-center gap-2
                rounded-xl border border-white/[0.10]
                bg-black/15 px-3
                font-sans text-xs font-medium
                text-white/55
                transition-all duration-200
                hover:border-primary/45
                hover:text-primary
              "
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t("frameBuilder.hearts.clear")}
            </button>
          )}

          <div className="rounded-xl border border-primary/20 bg-primary/[0.06] px-4 py-2.5 text-right">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white/35">
              {t("common.selected")}
            </p>

            <p className="mt-0.5 font-sans text-sm font-semibold text-primary">
              {t("frameBuilder.hearts.selectionSummary", {
                count: selectedTotal,
                price: formatEuro(totalPrice),
              })}
            </p>
          </div>
        </div>
      </div>

      <CollapsibleOptionGrid
        className="grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initialVisible={4}
        desktopInitialVisible={4}
        expandedByDefault={
          hasSelectedHiddenHeart
        }
        buttonLabel={t("frameBuilder.hearts.showAll")}
        testId="hearts-show-all"
      >
        {HEARTS.map((heart) => {
          const quantity =
            state.hearts[heart.id] ?? 0;

          const isSelected = quantity > 0;
          const heartLabel = getHeartLabel(heart.id);

          return (
            <article
              key={heart.id}
              className={`
                group relative flex min-h-[280px]
                flex-col overflow-hidden rounded-[22px]
                border bg-[#171717]
                transition-all duration-300

                ${
                  isSelected
                    ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.35),0_18px_45px_rgba(0,0,0,0.28)]"
                    : "border-white/[0.10] hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
                }
              `}
              data-testid={`heart-card-${heart.id}`}
            >
              {/* Количество */}
              {isSelected && (
                <div className="absolute right-3 top-3 z-10 flex h-8 min-w-8 items-center justify-center rounded-full bg-primary px-2 font-sans text-xs font-bold text-white shadow-[0_0_18px_rgba(255,106,0,0.28)]">
                  {quantity}
                </div>
              )}

              {/* Изображение */}
              <button
                type="button"
                onClick={() =>
                  setHeartQty(
                    heart.id,
                    quantity + 1,
                  )
                }
                className="relative flex h-[178px] w-full items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#141414]"
                aria-label={t("frameBuilder.hearts.addAria", {
                  heart: heartLabel,
                })}
                data-testid={`heart-add-${heart.id}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_66%)]" />

                <img
                  src={heart.img}
                  alt={heartLabel}
                  width={260}
                  height={260}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="
                    relative h-[100px] w-[100px]
                    object-contain
                    transition-transform duration-500
                    group-hover:scale-[1.08]
                  "
                />
              </button>

              {/* Текст и управление */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className={`
                        font-sans text-sm font-semibold
                        tracking-[-0.015em]

                        ${
                          isSelected
                            ? "text-primary"
                            : "text-white"
                        }
                      `}
                    >
                      {heartLabel}
                    </h3>

                    <p className="mt-1 font-sans text-xs text-white/[0.38]">
                      {t("frameBuilder.hearts.backgroundLabel")}
                    </p>
                  </div>

                  <span
                    className={`
                      shrink-0 rounded-full border
                      px-2.5 py-1
                      font-sans text-xs font-semibold

                      ${
                        isSelected
                          ? "border-primary/30 bg-primary/[0.08] text-primary"
                          : "border-white/[0.09] bg-white/[0.025] text-white/60"
                      }
                    `}
                  >
                    {formatEuro(PRICING.heart)}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setHeartQty(
                        heart.id,
                        quantity - 1,
                      )
                    }
                    disabled={quantity === 0}
                    className="
                      flex h-10 w-10 items-center
                      justify-center rounded-full
                      border border-white/[0.11]
                      bg-black/20 text-white/50
                      transition-all duration-200
                      hover:border-primary/55
                      hover:text-primary
                      disabled:cursor-not-allowed
                      disabled:opacity-25
                    "
                    aria-label={t("frameBuilder.hearts.removeAria", {
                      heart: heartLabel,
                    })}
                    data-testid={`heart-minus-${heart.id}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span
                    className={`
                      w-10 text-center
                      font-sans text-base font-semibold
                      tabular-nums

                      ${
                        isSelected
                          ? "text-primary"
                          : "text-white/65"
                      }
                    `}
                    data-testid={`heart-qty-${heart.id}`}
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setHeartQty(
                        heart.id,
                        quantity + 1,
                      )
                    }
                    className="
                      flex h-10 w-10 items-center
                      justify-center rounded-full
                      border border-primary/55
                      bg-primary/[0.05]
                      text-primary
                      transition-all duration-200
                      hover:bg-primary
                      hover:text-white
                    "
                    aria-label={t("frameBuilder.hearts.addAria", {
                      heart: heartLabel,
                    })}
                    data-testid={`heart-plus-${heart.id}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </CollapsibleOptionGrid>
    </div>
  );
}

import {
  Check,
  Cloud,
  LightbulbOff,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  type FrameOrderState,
  PRICING,
} from "@/lib/types";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
}

const base = import.meta.env.BASE_URL;

type LightingOption = {
  id: FrameOrderState["lighting"];
  subtitle: string;
  image?: string;
  imagePosition?: string;
  icon: LucideIcon;
};

const LIGHTING: LightingOption[] = [
  {
    id: "Без подсветки",
    subtitle: "Классическая композиция без дополнительного света",
    icon: LightbulbOff,
  },
  {
    id: "LED-гирлянда",
    subtitle: "Тёплый мягкий свет по периметру рамки",
    image: `${base}images/optimized/light-garland-card-2.webp`,
    imagePosition: "object-[center_52%]",
    icon: Sparkles,
  },
  {
    id: "LED RGB",
    subtitle: "Многоцветная подсветка с пультом и режимами",
    image: `${base}images/optimized/light-rgb-card1.webp`,
    imagePosition: "object-[center_48%]",
    icon: Palette,
  },
  {
    id: "LED с облаками",
    subtitle: "Объёмный эффект неба и мягкий цветной свет",
    image: `${base}images/optimized/light-clouds-card1.webp`,
    imagePosition: "object-[center_50%]",
    icon: Cloud,
  },
];

export default function LightingStep({
  state,
  onChange,
}: StepProps) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
      {LIGHTING.map((option) => {
        const isSelected = state.lighting === option.id;
        const price = PRICING.lighting[option.id];
        const Icon = option.icon;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() =>
              onChange({
                ...state,
                lighting: option.id,
              })
            }
            aria-pressed={isSelected}
            data-testid={`frame-lighting-${option.id}`}
            className={`
              group relative overflow-hidden rounded-[24px]
              border bg-[#171717] text-left
              transition-all duration-300
              active:scale-[0.99]

              ${
                isSelected
                  ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.42),0_20px_55px_rgba(0,0,0,0.32)]"
                  : "border-white/[0.10] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
              }
            `}
          >
            {/* Визуальная часть */}
            <div className="relative h-[235px] overflow-hidden border-b border-white/[0.07] bg-[#141414] sm:h-[250px]">
              {option.image ? (
                <>
                  <img
                    src={option.image}
                    alt={option.id}
                    width={900}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={`
                      absolute inset-0 h-full w-full object-cover
                      ${option.imagePosition ?? "object-center"}
                      transition-transform duration-700 ease-out
                      group-hover:scale-[1.04]
                    `}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute h-44 w-44 rounded-full border border-white/[0.035]" />
                  <div className="absolute h-32 w-32 rounded-full border border-white/[0.05]" />

                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/[0.10] bg-white/[0.025] shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
                    <LightbulbOff
                      className="h-10 w-10 text-white/35"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              )}

              {/* Значок типа подсветки */}
              <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-white/75 backdrop-blur-md">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </div>

              {/* Галочка */}
              <div
                className={`
                  absolute right-4 top-4
                  flex h-9 w-9 items-center justify-center
                  rounded-full border
                  transition-all duration-300

                  ${
                    isSelected
                      ? "scale-100 border-primary bg-primary text-white opacity-100 shadow-[0_0_20px_rgba(255,106,0,0.28)]"
                      : "scale-90 border-white/[0.14] bg-black/35 text-transparent opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  }
                `}
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </div>
            </div>

            {/* Информация */}
            <div className="flex min-h-[150px] flex-col p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3
                    className={`
                      font-sans text-lg font-semibold
                      leading-tight tracking-[-0.02em]

                      ${
                        isSelected
                          ? "text-primary"
                          : "text-white"
                      }
                    `}
                  >
                    {option.id}
                  </h3>

                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.43]">
                    {option.subtitle}
                  </p>
                </div>

                <span
                  className={`
                    shrink-0 rounded-full border
                    px-3 py-1.5
                    font-sans text-xs font-semibold

                    ${
                      isSelected
                        ? "border-primary/30 bg-primary/[0.08] text-primary"
                        : "border-white/[0.09] bg-white/[0.025] text-white/60"
                    }
                  `}
                >
                  {price > 0 ? `+${price} €` : "0 €"}
                </span>
              </div>

              <div className="mt-auto pt-4">
                <span
                  className={`
                    font-sans text-[10px] font-bold
                    uppercase tracking-[0.1em]

                    ${
                      isSelected
                        ? "text-primary"
                        : "text-white/30"
                    }
                  `}
                >
                  {isSelected ? "Выбрано" : "Выбрать вариант"}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
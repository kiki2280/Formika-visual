import {
  Check,
  ImagePlus,
  Info,
  Sparkles,
} from "lucide-react";
import {
  type FrameOrderState,
  PRICING,
} from "@/lib/types";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
}

export default function BackgroundStep({
  state,
  onChange,
}: StepProps) {
  const options = [
    {
      id: "white",
      title: "Белый фон",
      subtitle:
        "Чистый светлый фон для аккуратной классической композиции.",
      price: "Входит в стоимость",
      selected: !state.customBg,
      onSelect: () =>
        onChange({
          ...state,
          customBg: false,
        }),
    },
    {
      id: "custom",
      title: "Индивидуальный фон",
      subtitle:
        "Ваш рисунок, фотография или персональное оформление.",
      price: `От +${PRICING.customBg} €`,
      selected: state.customBg,
      onSelect: () =>
        onChange({
          ...state,
          customBg: true,
        }),
    },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {options.map((option) => {
          const isCustom = option.id === "custom";

          return (
            <button
              key={option.id}
              type="button"
              onClick={option.onSelect}
              aria-pressed={option.selected}
              data-testid={
                isCustom ? "bg-custom" : "bg-white"
              }
              className={`
                group relative flex min-h-[390px] w-full
                flex-col overflow-hidden rounded-[24px]
                border bg-[#171717] text-left
                transition-all duration-300
                active:scale-[0.99]

                ${
                  option.selected
                    ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.42),0_20px_55px_rgba(0,0,0,0.32)]"
                    : "border-white/[0.10] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
                }
              `}
            >
              {/* Визуальное превью */}
              <div className="relative flex h-[235px] items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#141414]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_68%)]" />

                {!isCustom ? (
                  /* Белый фон */
                  <div className="relative flex h-[174px] w-[132px] items-center justify-center rounded-[5px] bg-[#1c1c1c] shadow-[0_20px_48px_rgba(0,0,0,0.48),inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-transform duration-500 group-hover:scale-[1.035]">
                    <div className="relative h-[146px] w-[104px] overflow-hidden rounded-[2px] border border-black/10 bg-[#f5f1ea] shadow-[inset_0_0_14px_rgba(0,0,0,0.08)]">
                      
                    </div>

                    <div className="absolute inset-[7px] rounded-[3px] border border-black/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.35)]" />
                  </div>
                ) : (
                  /* Индивидуальный фон */
                  <div className="relative flex h-[174px] w-[132px] items-center justify-center rounded-[5px] bg-[#1c1c1c] shadow-[0_20px_48px_rgba(0,0,0,0.48),inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-transform duration-500 group-hover:scale-[1.035]">
                    <div className="relative h-[146px] w-[104px] overflow-hidden rounded-[2px] border border-white/[0.08] bg-[#222222]">
                      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,106,0,0.88)_0%,rgba(124,53,18,0.58)_34%,rgba(24,24,24,0.96)_72%)]" />

                      <div className="absolute -right-4 -top-3 h-16 w-16 rounded-full bg-primary/25 blur-xl" />

                      <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/[0.12] bg-black/35 p-2 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <ImagePlus
                            className="h-4 w-4 text-primary"
                            strokeWidth={1.8}
                          />

                          <div className="space-y-1">
                            <div className="h-1.5 w-10 rounded-full bg-white/45" />
                            <div className="h-1 w-7 rounded-full bg-white/20" />
                          </div>
                        </div>
                      </div>

                      <Sparkles
                        className="absolute right-3 top-3 h-5 w-5 text-white/65"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="absolute inset-[7px] rounded-[3px] border border-black/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.35)]" />
                  </div>
                )}

                {/* Галочка */}
                <div
                  className={`
                    absolute right-4 top-4
                    flex h-9 w-9 items-center justify-center
                    rounded-full border
                    transition-all duration-300

                    ${
                      option.selected
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

              {/* Текстовая часть */}
              <div className="flex flex-1 flex-col p-5">
                <h3
                  className={`
                    font-sans text-lg font-semibold
                    tracking-[-0.02em]

                    ${
                      option.selected
                        ? "text-primary"
                        : "text-white"
                    }
                  `}
                >
                  {option.title}
                </h3>

                <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.43]">
                  {option.subtitle}
                </p>

                <div className="mt-auto pt-5">
                  <span
                    className={`
                      inline-flex rounded-full border
                      px-3 py-1.5
                      font-sans text-[10px] font-bold
                      uppercase tracking-[0.08em]

                      ${
                        option.selected
                          ? "border-primary/30 bg-primary/[0.08] text-primary"
                          : "border-white/[0.09] bg-white/[0.025] text-white/55"
                      }
                    `}
                  >
                    {option.price}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {state.customBg && (
        <div className="flex items-start gap-3 rounded-[20px] border border-primary/20 bg-primary/[0.045] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.08] text-primary">
            <Info
              className="h-4 w-4"
              strokeWidth={1.8}
            />
          </div>

          <div>
            <p className="font-sans text-sm font-medium text-white">
              Стоимость индивидуального фона
            </p>

            <p className="mt-1 font-sans text-xs leading-relaxed text-white/42">
              Финальная цена зависит от сложности
              изображения и согласовывается перед
              изготовлением.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
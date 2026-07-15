import { Check } from "lucide-react";
import type { FrameOrderState } from "@/lib/types";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
}

const COLORS: {
  id: FrameOrderState["color"];
  subtitle: string;
}[] = [
  {
    id: "Чёрная",
    subtitle: "Глубокий матовый профиль",
  },
  {
    id: "Белая",
    subtitle: "Чистый светлый профиль",
  },
];

export default function ColorStep({
  state,
  onChange,
}: StepProps) {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
      {COLORS.map((color) => {
        const isSelected = state.color === color.id;
        const isBlack = color.id === "Чёрная";

        return (
          <button
            key={color.id}
            type="button"
            onClick={() =>
              onChange({
                ...state,
                color: color.id,
              })
            }
            aria-pressed={isSelected}
            data-testid={`frame-color-${color.id}`}
            className={`
              group relative overflow-hidden rounded-[24px]
              border bg-[#171717] text-left
              transition-all duration-300
              active:scale-[0.99]

              ${
                isSelected
                  ? "border-primary shadow-[0_0_0_1px_rgba(255,106,0,0.45),0_20px_55px_rgba(0,0,0,0.32)]"
                  : "border-white/[0.10] hover:-translate-y-1 hover:border-primary/40"
              }
            `}
          >
            {/* Одинаковый фон за обеими рамками */}
            <div className="relative flex h-[210px] items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#151515]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_67%)]" />

              {/* Внешний профиль рамки */}
              <div
                className={`
                  relative flex h-[156px] w-[122px]
                  items-center justify-center
                  rounded-[4px]
                  transition-transform duration-500
                  group-hover:scale-[1.035]

                  ${
                    isBlack
                      ? "bg-[#181818] shadow-[0_18px_40px_rgba(0,0,0,0.58),inset_0_0_0_1px_rgba(255,255,255,0.13)]"
                      : "bg-[#f1f1f1] shadow-[0_18px_40px_rgba(0,0,0,0.48),inset_0_0_0_1px_rgba(255,255,255,0.85)]"
                  }
                `}
              >
                {/* Одинаковая светло-серая внутренность */}
                <div className="h-[126px] w-[92px] rounded-[2px] border border-black/[0.12] bg-[#e8e8e4] shadow-[inset_0_0_14px_rgba(0,0,0,0.12)]" />

                {/* Внутренняя линия профиля */}
                <div
                  className={`
                    absolute inset-[7px] rounded-[2px] border

                    ${
                      isBlack
                        ? "border-black/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.35)]"
                        : "border-white/80 shadow-[inset_0_0_8px_rgba(255,255,255,0.45)]"
                    }
                  `}
                />
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
                      : "scale-90 border-white/[0.12] bg-black/30 text-transparent opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  }
                `}
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </div>
            </div>

            {/* Текстовая часть */}
            <div className="p-5">
              <h3
                className={`
                  font-serif text-xl font-medium
                  tracking-[0.01em]

                  ${
                    isSelected
                      ? "text-primary"
                      : "text-white"
                  }
                `}
              >
                {color.id}
              </h3>

              <p className="mt-1.5 font-sans text-sm leading-relaxed text-white/[0.43]">
                {color.subtitle}
              </p>

              <span
                className={`
                  mt-4 inline-flex rounded-full border
                  px-3 py-1.5
                  font-sans text-[10px] font-bold
                  uppercase tracking-[0.08em]

                  ${
                    isSelected
                      ? "border-primary/30 bg-primary/[0.07] text-primary"
                      : "border-white/[0.09] bg-white/[0.025] text-white/[0.48]"
                  }
                `}
              >
                Входит в стоимость
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
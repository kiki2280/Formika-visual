import { Check } from "lucide-react";
import type { FrameOrderState } from "@/lib/types";
import { PRICING } from "@/lib/types";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
}

const SIZES: {
  id: FrameOrderState["size"];
  subtitle: string;
  badge?: string;
}[] = [
  {
    id: "10x15",
    subtitle: "Компактная вертикальная рамка",
  },
  {
    id: "17x22",
    subtitle: "Классический вертикальный формат",
    badge: "Популярный",
  },
  {
    id: "22x17",
    subtitle: "Горизонтальный формат",
  },
];

export default function SizeStep({
  state,
  onChange,
}: StepProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {SIZES.map((size) => {
        const isSelected = state.size === size.id;

        return (
          <button
            key={size.id}
            type="button"
            onClick={() =>
              onChange({
                ...state,
                size: size.id,
              })
            }
            aria-pressed={isSelected}
            data-testid={`frame-size-${size.id}`}
            className={`
              group relative flex min-h-[168px] w-full flex-col
              overflow-hidden rounded-[22px] border p-5 text-left
              transition-all duration-300
              active:scale-[0.99]

              ${
                isSelected
                  ? "border-primary bg-primary/[0.055] shadow-[0_0_0_1px_rgba(255,106,0,0.45),0_18px_45px_rgba(0,0,0,0.28)]"
                  : "border-white/[0.10] bg-white/[0.025] hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.04]"
              }
            `}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {size.badge && (
                  <span className="mb-3 inline-flex rounded-full border border-primary/25 bg-primary/[0.08] px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
                    {size.badge}
                  </span>
                )}

                <h3 className="font-sans text-xl font-semibold tracking-[-0.025em] text-white">
                  {size.id.replace("x", " × ")}
                </h3>
              </div>

              <div
                className={`
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-full border transition-all duration-300

                  ${
                    isSelected
                      ? "border-primary bg-primary text-white shadow-[0_0_20px_rgba(255,106,0,0.28)]"
                      : "border-white/[0.12] bg-black/20 text-transparent group-hover:border-primary/40"
                  }
                `}
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </div>
            </div>

            <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.44]">
              {size.subtitle}
            </p>

            <div className="mt-auto pt-5">
              <span className="font-sans text-lg font-semibold text-primary">
                {PRICING.frame[size.id]} €
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
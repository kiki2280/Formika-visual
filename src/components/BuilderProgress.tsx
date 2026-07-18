import { formatEuro } from "@/lib/pricing";
import { useTranslation } from "react-i18next";

interface BuilderProgressProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  total: number;
  totalLabel?: string;
}

export default function BuilderProgress({
  stepNumber,
  totalSteps,
  title,
  total,
  totalLabel,
}: BuilderProgressProps) {
  const { t } = useTranslation();
  const progress =
    (stepNumber / totalSteps) * 100;

  return (
    <div className="sticky top-[72px] z-30 mb-7 w-full">
      <div className="overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#171717]/90 px-5 py-4 shadow-[0_16px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-6">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white/[0.38]">
              {t("builderProgress.stepOfTotal", {
                step: stepNumber,
                total: totalSteps,
              })}
            </p>

            <p className="mt-1 truncate font-sans text-base font-medium tracking-normal text-white">
              {title}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white/[0.38]">
              {totalLabel ?? t("builderProgress.currentPrice")}
            </p>

            <p
              className="mt-1 font-sans text-2xl font-semibold leading-none text-primary"
              data-testid="text-running-total"
            >
              {formatEuro(total)}
            </p>
          </div>
        </div>

        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

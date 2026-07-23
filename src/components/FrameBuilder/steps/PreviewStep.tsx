import type { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FrameOrderState } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Preview from "../Preview";
import SectionHeading from "@/components/SectionHeading";

interface StepProps {
  state: FrameOrderState;
  onChange: Dispatch<SetStateAction<FrameOrderState>>;
  onBack: () => void;
  onNext: () => void;
}

export default function PreviewStep({ state, onChange, onBack, onNext }: StepProps) {
  const { t } = useTranslation();
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] xl:grid-cols-[minmax(0,1.15fr)_380px] lg:items-start">
      <div className="min-w-0">
        <Preview state={state} onChange={onChange} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-28">
        <SectionHeading
          eyebrow={t("frameBuilder.eyebrow")}
          title={t("frameBuilder.preview.title")}
          subtitle={t("frameBuilder.preview.subtitle")}
          align="left"
          size="compact"
          animated={false}
          className="mb-0"
        />

        <div className="rounded-2xl border border-primary/45 bg-primary/10 px-4 py-3 text-sm leading-relaxed text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.22)] sm:px-5">
          <span className="font-semibold text-primary">
            {t("frameBuilder.preview.tipLabel")}
          </span>
          {t("frameBuilder.preview.screenshotTip")}
        </div>

        <div className="rounded-2xl border border-primary/50 bg-primary/10 px-4 py-3 text-xs font-medium leading-relaxed text-white shadow-[0_10px_28px_rgba(255,106,0,0.10)]">
          <span className="font-bold text-primary">
            {t("frameBuilder.preview.movementTipLabel")}
          </span>
          {t("frameBuilder.preview.movementTip")} {t("frameBuilder.preview.rotationTip")}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button
            variant="outline"
            className="h-12 px-6 border-border hover:border-primary/60 hover:text-primary sm:flex-1"
            onClick={onBack}
            data-testid="btn-wizard-back"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            {t("common.back")}
          </Button>
          <Button
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground border border-[#111111] sm:flex-1"
            onClick={onNext}
            data-testid="btn-wizard-next"
          >
            {t("common.next")}
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </aside>
    </div>
  );
}

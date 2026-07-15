import type { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FrameOrderState } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Preview from "../Preview";

interface StepProps {
  state: FrameOrderState;
  onChange: Dispatch<SetStateAction<FrameOrderState>>;
  onBack: () => void;
  onNext: () => void;
}

export default function PreviewStep({ state, onChange, onBack, onNext }: StepProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] xl:grid-cols-[minmax(0,1.15fr)_380px] lg:items-start">
      <div className="min-w-0">
        <Preview state={state} onChange={onChange} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-28">
        <div className="space-y-2 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">Соберите примерный макет</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Перетащите человечков, сердечки и детали фона внутри рамки.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/45 bg-primary/10 px-4 py-3 text-sm leading-relaxed text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.22)] sm:px-5">
          <span className="font-semibold text-primary">Подсказка: </span>
          Сделайте скриншот готового макета и отправьте его в Telegram вместе с заказом — так мы поймём,
          как примерно собрать вашу рамочку.
        </div>

        <div className="rounded-2xl border border-border bg-card/70 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          Двигать можно каждого человечка отдельно, а также сердечки, питомцев и детали фона.
          Сердечки можно поворачивать маленьким маркером после выбора.
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button
            variant="outline"
            className="h-12 px-6 border-border hover:border-primary/60 hover:text-primary sm:flex-1"
            onClick={onBack}
            data-testid="btn-wizard-back"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Назад
          </Button>
          <Button
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground border border-[#111111] sm:flex-1"
            onClick={onNext}
            data-testid="btn-wizard-next"
          >
            Далее
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </aside>
    </div>
  );
}

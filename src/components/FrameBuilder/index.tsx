import { useState } from "react";
import { AnimatePresence, motion } from "@/lib/motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type FrameOrderState,
  makeCharacter,
} from "@/lib/types";
import { computeFramePricing } from "@/lib/frameOrder";
import { Button } from "@/components/ui/button";
import BuilderProgress from "@/components/BuilderProgress";
import SectionHeading from "@/components/SectionHeading";
import SizeStep from "./steps/SizeStep";
import ColorStep from "./steps/ColorStep";
import LightingStep from "./steps/LightingStep";
import CharactersStep from "./steps/CharactersStep";
import PetsStep from "./steps/PetsStep";
import AccessoriesStep from "./steps/AccessoriesStep";
import HeartsStep from "./steps/HeartsStep";
import BackgroundStep from "./steps/BackgroundStep";
import PreviewStep from "./steps/PreviewStep";
import ReviewStep from "./steps/ReviewStep";

interface FrameBuilderProps {
  onExit: () => void;
}

const STEPS = [
  {
    key: "size",
    title: "Размер рамки",
    subtitle: "Выберите подходящий формат композиции",
  },
  {
    key: "color",
    title: "Цвет рамки",
    subtitle: "Выберите чёрную или белую рамку",
  },
  {
    key: "lighting",
    title: "Подсветка",
    subtitle: "Добавьте подсветку к вашей композиции",
  },
  {
    key: "characters",
    title: "Человечки",
    subtitle: "Соберите персональные фигурки",
  },
  {
    key: "pets",
    title: "Питомцы",
    subtitle: "Добавьте питомцев в композицию",
  },
  {
    key: "accessories",
    title: "Детали фона",
    subtitle: "Выберите дополнительные элементы",
  },
  {
    key: "hearts",
    title: "Сердечки на фон",
    subtitle: "Дополните композицию сердечками",
  },
  {
    key: "background",
    title: "Фон",
    subtitle: "Выберите белый или индивидуальный фон",
  },
  {
    key: "preview",
    title: "Соберите примерный макет",
    subtitle:
      "Расположите фигурки и детали внутри рамки",
  },
  {
    key: "review",
    title: "Ваш заказ",
    subtitle: "Проверьте состав перед оформлением",
  },
] as const;

const TOTAL_WIZARD_STEPS = STEPS.length + 1;

export default function FrameBuilder({
  onExit,
}: FrameBuilderProps) {
  const [state, setState] = useState<FrameOrderState>({
    size: "17x22",
    color: "Чёрная",
    lighting: "Без подсветки",
    characters: [
      makeCharacter("1", {
        top: "TOP-13",
        bottom: "BOTTOM-13",
      }),
    ],
    pets: [],
    petNames: {},
    accessories: [],
    hearts: {},
    customBg: false,
    deliveryMethod: null,
    deliveryPrice: 0,
  });

  const [step, setStep] = useState(0);

  const { total } = computeFramePricing(state);
  const current = STEPS[step];

  const isLast = step === STEPS.length - 1;
  const isPreviewStep = current.key === "preview";

  const goNext = () => {
    if (isLast) return;

    setStep((currentStep) => currentStep + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    if (step === 0) {
      onExit();
      return;
    }

    setStep((currentStep) => currentStep - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderStep = () => {
    switch (current.key) {
      case "size":
        return (
          <SizeStep
            state={state}
            onChange={setState}
          />
        );

      case "color":
        return (
          <ColorStep
            state={state}
            onChange={setState}
          />
        );

      case "lighting":
        return (
          <LightingStep
            state={state}
            onChange={setState}
          />
        );

      case "characters":
        return (
          <CharactersStep
            state={state}
            onChange={setState}
          />
        );

      case "pets":
        return (
          <PetsStep
            state={state}
            onChange={setState}
          />
        );

      case "accessories":
        return (
          <AccessoriesStep
            state={state}
            onChange={setState}
          />
        );

      case "hearts":
        return (
          <HeartsStep
            state={state}
            onChange={setState}
          />
        );

      case "background":
        return (
          <BackgroundStep
            state={state}
            onChange={setState}
          />
        );

      case "preview":
        return (
          <PreviewStep
            state={state}
            onChange={setState}
            onBack={goBack}
            onNext={goNext}
          />
        );

      case "review":
        return (
          <ReviewStep
            state={state}
            onChange={setState}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <BuilderProgress
        stepNumber={step + 2}
        totalSteps={TOTAL_WIZARD_STEPS}
        title={current.title}
        total={total}
      />

      {!isPreviewStep && (
        <SectionHeading
          eyebrow="Конструктор рамки"
          title={current.title}
          subtitle={current.subtitle}
          size="compact"
          animated={false}
          className="mb-8 mt-7"
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {!isPreviewStep && (
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="
              h-12 rounded-full
              border-white/[0.12]
              bg-white/[0.02]
              px-6
              font-sans text-sm font-semibold
              text-white/[0.72]
              transition-all duration-300
              hover:border-primary/55
              hover:bg-primary/[0.06]
              hover:text-primary
            "
            data-testid="btn-wizard-back"
          >
            <ChevronLeft className="mr-1 h-5 w-5" />
            Назад
          </Button>

          {!isLast && (
            <Button
              type="button"
              onClick={goNext}
              className="
                h-12 rounded-full
                border border-primary
                bg-primary px-8
                font-sans text-sm font-semibold
                text-primary-foreground
                shadow-[0_12px_30px_rgba(255,106,0,0.18)]
                transition-all duration-300
                hover:bg-primary/90
                hover:shadow-[0_16px_38px_rgba(255,106,0,0.24)]
              "
              data-testid="btn-wizard-next"
            >
              Далее
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

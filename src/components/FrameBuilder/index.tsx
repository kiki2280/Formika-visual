import { useState } from "react";
import { AnimatePresence, motion } from "@/lib/motion";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type FrameOrderState,
  makeCharacter,
} from "@/lib/types";
import { computeFramePricing } from "@/lib/frameOrder";
import {
  validateCharactersFaces,
} from "@/lib/characterValidation";
import {
  FRAME_BUILDER_STORAGE_KEY,
  isFrameOrderState,
} from "@/lib/builderPersistence";
import { usePersistentBuilderState } from "@/hooks/use-persistent-builder-state";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import BuilderProgress from "@/components/BuilderProgress";
import SectionHeading from "@/components/SectionHeading";
import ReturnToProductSelectionButton from "@/components/ReturnToProductSelectionButton";
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
import { useTranslation } from "react-i18next";

interface FrameBuilderProps {
  onReturnToProductSelection: () => void;
}

const STEPS = [
  {
    key: "size",
    titleKey: "frameBuilder.steps.sizeTitle",
    subtitleKey: "frameBuilder.steps.sizeSubtitle",
  },
  {
    key: "color",
    titleKey: "frameBuilder.steps.colorTitle",
    subtitleKey: "frameBuilder.steps.colorSubtitle",
  },
  {
    key: "lighting",
    titleKey: "frameBuilder.steps.lightingTitle",
    subtitleKey: "frameBuilder.steps.lightingSubtitle",
  },
  {
    key: "characters",
    titleKey: "frameBuilder.steps.charactersTitle",
    subtitleKey: "frameBuilder.steps.charactersSubtitle",
  },
  {
    key: "pets",
    titleKey: "frameBuilder.steps.petsTitle",
    subtitleKey: "frameBuilder.steps.petsSubtitle",
  },
  {
    key: "accessories",
    titleKey: "frameBuilder.steps.accessoriesTitle",
    subtitleKey: "frameBuilder.steps.accessoriesSubtitle",
  },
  {
    key: "hearts",
    titleKey: "frameBuilder.steps.heartsTitle",
    subtitleKey: "frameBuilder.steps.heartsSubtitle",
  },
  {
    key: "background",
    titleKey: "frameBuilder.steps.backgroundTitle",
    subtitleKey: "frameBuilder.steps.backgroundSubtitle",
  },
  {
    key: "preview",
    titleKey: "frameBuilder.steps.previewTitle",
    subtitleKey: "frameBuilder.steps.previewSubtitle",
  },
  {
    key: "review",
    titleKey: "frameBuilder.steps.reviewTitle",
    subtitleKey: "frameBuilder.steps.reviewSubtitle",
  },
] as const;

const TOTAL_WIZARD_STEPS = STEPS.length + 1;
const CHARACTERS_STEP_INDEX = STEPS.findIndex(
  (wizardStep) => wizardStep.key === "characters",
);

interface PersistedFrameBuilderState {
  state: FrameOrderState;
  step: number;
}

function createInitialFrameBuilderState(): PersistedFrameBuilderState {
  return {
    state: {
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
    },
    step: 0,
  };
}

function isPersistedFrameBuilderState(
  value: unknown,
): value is PersistedFrameBuilderState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    Number.isInteger(candidate.step) &&
    (candidate.step as number) >= 0 &&
    (candidate.step as number) < STEPS.length &&
    isFrameOrderState(candidate.state)
  );
}

export default function FrameBuilder({
  onReturnToProductSelection,
}: FrameBuilderProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [persisted, setPersisted] = usePersistentBuilderState(
    FRAME_BUILDER_STORAGE_KEY,
    createInitialFrameBuilderState,
    isPersistedFrameBuilderState,
  );
  const [faceValidationUi, setFaceValidationUi] = useState({
    attempted: false,
    focusCharacterId: null as string | null,
    requestId: 0,
  });

  const state = persisted.state;
  const step = persisted.step;

  const setState: Dispatch<SetStateAction<FrameOrderState>> = useCallback(
    (update) => {
      setPersisted((current) => ({
        ...current,
        state:
          typeof update === "function"
            ? update(current.state)
            : update,
      }));
    },
    [setPersisted],
  );

  const setStep: Dispatch<SetStateAction<number>> = useCallback(
    (update) => {
      setPersisted((current) => ({
        ...current,
        step:
          typeof update === "function"
            ? update(current.step)
            : update,
      }));
    },
    [setPersisted],
  );

  const { total } = computeFramePricing(state);
  const current = STEPS[step];

  const isLast = step === STEPS.length - 1;
  const isPreviewStep = current.key === "preview";

  const faceValidation = validateCharactersFaces(state.characters);
  const invalidFaceIds = faceValidationUi.attempted
    ? faceValidation.invalidCharacterIds
    : [];

  const showFaceValidationError = (firstInvalidCharacterId: string) => {
    setFaceValidationUi((currentValidation) => ({
      attempted: true,
      focusCharacterId: firstInvalidCharacterId,
      requestId: currentValidation.requestId + 1,
    }));

    toast({
      title: t("characterEditor.validationError"),
      variant: "destructive",
    });
  };

  const requireSelectedFaces = () => {
    const validation = validateCharactersFaces(state.characters);
    if (validation.isValid) return true;

    showFaceValidationError(validation.firstInvalidCharacterId!);
    return false;
  };

  const goNext = () => {
    if (isLast) return;

    if (
      (current.key === "characters" || current.key === "preview") &&
      !requireSelectedFaces()
    ) {
      if (current.key !== "characters") {
        setStep(CHARACTERS_STEP_INDEX);
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    setStep((currentStep) => currentStep + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    if (step === 0) return;

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
            invalidFaceIds={invalidFaceIds}
            focusInvalidCharacterId={faceValidationUi.focusCharacterId}
            faceValidationRequestId={faceValidationUi.requestId}
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
            onInvalidCharacters={(firstInvalidCharacterId) => {
              showFaceValidationError(firstInvalidCharacterId);
              setStep(CHARACTERS_STEP_INDEX);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 flex justify-start">
        <ReturnToProductSelectionButton
          onClick={onReturnToProductSelection}
        />
      </div>

      <BuilderProgress
        stepNumber={step + 2}
        totalSteps={TOTAL_WIZARD_STEPS}
        title={t(current.titleKey)}
        total={total}
      />

      {!isPreviewStep && (
        <SectionHeading
          eyebrow={t("frameBuilder.eyebrow")}
          title={t(current.titleKey)}
          subtitle={t(current.subtitleKey)}
          size="compact"
          animated={false}
          className={`mb-8 mt-7 ${
            current.key === "lighting"
              ? "[&_h2]:text-2xl min-[360px]:[&_h2]:text-[1.625rem] md:[&_h2]:text-4xl"
              : ""
          }`}
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
            disabled={step === 0}
            aria-label={
              step === 0
                ? t("frameBuilder.previousStepUnavailableAria")
                : t("frameBuilder.previousStepAria")
            }
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
              disabled:cursor-not-allowed
              disabled:opacity-35
            "
            data-testid="btn-wizard-back"
          >
            <ChevronLeft className="mr-1 h-5 w-5" />
            {t("common.back")}
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
              {t("common.next")}
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

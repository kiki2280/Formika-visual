import {
  getFrameCharacterLimit,
  FrameOrderState,
  PRICING,
} from "@/lib/types";
import CharacterBuilder from "../../CharacterBuilder";
import { useTranslation } from "react-i18next";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
  invalidFaceIds?: readonly string[];
  focusInvalidCharacterId?: string | null;
  faceValidationRequestId?: number;
}

export default function CharactersStep({
  state,
  onChange,
  invalidFaceIds,
  focusInvalidCharacterId,
  faceValidationRequestId,
}: StepProps) {
  const { t } = useTranslation();
  const maxCharacters = getFrameCharacterLimit(state.size);

  return (
    <div className="space-y-6">
      <section className="space-y-3" aria-labelledby="frame-character-mounting-title">
        <h3 id="frame-character-mounting-title" className="font-sans text-lg font-semibold text-white">
          {t("frameBuilder.characters.mountingTitle")}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(["background", "bricks"] as const).map((mounting) => {
            const isSelected = state.characterMounting === mounting;
            return (
              <button
                key={mounting}
                type="button"
                onClick={() => onChange({ ...state, characterMounting: mounting })}
                aria-pressed={isSelected}
                data-testid={`frame-character-mounting-${mounting}`}
                className={`group rounded-[20px] border p-5 text-left transition-all duration-300 active:scale-[0.99] ${
                  isSelected
                    ? "border-primary bg-primary/[0.055] shadow-[0_0_0_1px_rgba(255,106,0,0.35)]"
                    : "border-white/[0.10] bg-white/[0.025] hover:border-primary/40 hover:bg-white/[0.04]"
                }`}
              >
                <span className={`font-sans text-base font-semibold ${isSelected ? "text-primary" : "text-white"}`}>
                  {t(`frameBuilder.characters.mounting.${mounting}.title`)}
                </span>
                <span className="mt-2 block font-sans text-sm leading-relaxed text-muted-foreground">
                  {t(`frameBuilder.characters.mounting.${mounting}.description`)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <CharacterBuilder
        characters={state.characters}
        onChange={(characters) => onChange({ ...state, characters })}
        maxCharacters={maxCharacters}
        extraCharacterPrice={PRICING.extraCharacter}
        note={t("frameBuilder.characters.pricingNote", {
          price: PRICING.extraCharacter,
        })}
        addButtonLabel={t("characterEditor.addCharacter")}
        limitMessage={t("frameBuilder.characters.limitMessage", {
          count: maxCharacters,
        })}
        overLimitMessage={t("frameBuilder.characters.reduceWarning", {
          count: maxCharacters,
        })}
        recommendedMessage={t(
          "frameBuilder.characters.recommendedQuantity",
        )}
        showName
        showAccessories
        invalidFaceIds={invalidFaceIds}
        focusInvalidCharacterId={focusInvalidCharacterId}
        faceValidationRequestId={faceValidationRequestId}
      />
    </div>
  );
}

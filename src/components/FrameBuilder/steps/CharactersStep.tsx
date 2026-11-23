import {
  getFrameCharacterLimit,
  FrameOrderState,
  PRICING,
} from "@/lib/types";
import { Info } from "lucide-react";
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
      <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/[0.06] px-4 py-3 text-sm leading-relaxed text-white/80">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p>{t("frameBuilder.characters.mountingNotice")}</p>
      </div>

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

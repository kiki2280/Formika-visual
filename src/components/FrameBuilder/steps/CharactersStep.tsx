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
  );
}

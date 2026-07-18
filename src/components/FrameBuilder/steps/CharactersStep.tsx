import { FrameOrderState, PRICING } from "@/lib/types";
import CharacterBuilder from "../../CharacterBuilder";
import { useTranslation } from "react-i18next";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
  invalidFaceIds?: readonly string[];
  focusInvalidCharacterId?: string | null;
  faceValidationRequestId?: number;
}

const MAX_CHARACTERS = 4;

export default function CharactersStep({
  state,
  onChange,
  invalidFaceIds,
  focusInvalidCharacterId,
  faceValidationRequestId,
}: StepProps) {
  const { t } = useTranslation();

  return (
    <CharacterBuilder
      characters={state.characters}
      onChange={(characters) => onChange({ ...state, characters })}
      maxCharacters={MAX_CHARACTERS}
      extraCharacterPrice={PRICING.extraCharacter}
      note={t("frameBuilder.characters.pricingNote", {
        price: PRICING.extraCharacter,
      })}
      addButtonLabel={t("characterEditor.addCharacter")}
      showName
      showAccessories
      invalidFaceIds={invalidFaceIds}
      focusInvalidCharacterId={focusInvalidCharacterId}
      faceValidationRequestId={faceValidationRequestId}
    />
  );
}

import { FrameOrderState, PRICING } from "@/lib/types";
import CharacterBuilder from "../../CharacterBuilder";

interface StepProps {
  state: FrameOrderState;
  onChange: (state: FrameOrderState) => void;
}

const MAX_CHARACTERS = 4;

export default function CharactersStep({ state, onChange }: StepProps) {
  return (
    <CharacterBuilder
      characters={state.characters}
      onChange={(characters) => onChange({ ...state, characters })}
      maxCharacters={MAX_CHARACTERS}
      extraCharacterPrice={PRICING.extraCharacter}
      note={`Первый человечек включён в стоимость · каждый дополнительный +${PRICING.extraCharacter} €`}
      addButtonLabel="Добавить человечка"
      showName
      showAccessories
    />
  );
}

import { DEFAULT_FACE_ID, ITEMS, type Character } from "@/lib/types";

export interface CharactersFaceValidation {
  isValid: boolean;
  invalidCharacterIds: string[];
  firstInvalidCharacterId: string | null;
}

export function hasSelectedFace(character: Character): boolean {
  const face = character.face?.trim();

  if (!face || face === DEFAULT_FACE_ID) return false;

  return ITEMS.face.some((item) => item.id === face);
}

export function validateCharactersFaces(
  characters: readonly Character[],
): CharactersFaceValidation {
  const invalidCharacterIds = characters
    .filter((character) => !hasSelectedFace(character))
    .map((character) => character.id);

  return {
    isValid: invalidCharacterIds.length === 0,
    invalidCharacterIds,
    firstInvalidCharacterId: invalidCharacterIds[0] ?? null,
  };
}

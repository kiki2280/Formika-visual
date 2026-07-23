import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { loadBuilderState, saveBuilderState } from "@/lib/builderPersistence";

export function usePersistentBuilderState<T>(
  storageKey: string,
  createInitialState: () => T,
  validate: (value: unknown) => value is T,
  normalize?: (value: T) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const initialState =
      loadBuilderState(storageKey, validate) ?? createInitialState();

    return normalize ? normalize(initialState) : initialState;
  });

  useEffect(() => {
    saveBuilderState(storageKey, state);
  }, [state, storageKey]);

  return [state, setState];
}

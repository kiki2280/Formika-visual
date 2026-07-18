import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { loadBuilderState, saveBuilderState } from "@/lib/builderPersistence";

export function usePersistentBuilderState<T>(
  storageKey: string,
  createInitialState: () => T,
  validate: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(
    () => loadBuilderState(storageKey, validate) ?? createInitialState(),
  );

  useEffect(() => {
    saveBuilderState(storageKey, state);
  }, [state, storageKey]);

  return [state, setState];
}

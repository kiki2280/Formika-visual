import type {
  Character,
  FrameOrderState,
  KeychainOrderState,
  PreviewPositions,
} from "@/lib/types";

export const FRAME_BUILDER_STORAGE_KEY = "formika-frame-builder-state";
export const KEYCHAIN_BUILDER_STORAGE_KEY = "formika-keychain-builder-state";
export const ORDER_PRODUCT_TYPE_STORAGE_KEY = "formika-order-product-type";
export const BUILDER_STORAGE_VERSION = 1;

interface StoredBuilderState {
  version: number;
  data: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value) && Object.values(value).every((item) => typeof item === "string");
}

function isNumberRecord(
  value: unknown,
  options: { integer?: boolean; nonNegative?: boolean } = {},
): value is Record<string, number> {
  if (!isRecord(value)) return false;

  return Object.values(value).every((item) => {
    if (!isFiniteNumber(item)) return false;
    if (options.integer && !Number.isInteger(item)) return false;
    if (options.nonNegative && item < 0) return false;
    return true;
  });
}

function isPreviewPositions(value: unknown): value is PreviewPositions {
  if (!isRecord(value)) return false;

  return Object.values(value).every(
    (position) =>
      isRecord(position) &&
      isFiniteNumber(position.x) &&
      isFiniteNumber(position.y),
  );
}

function isCharacter(value: unknown): value is Character {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    isNullableString(value.face) &&
    isNullableString(value.hair) &&
    isNullableString(value.top) &&
    isNullableString(value.bottom) &&
    isStringArray(value.accessories) &&
    (value.accessoryPositions === undefined || isPreviewPositions(value.accessoryPositions))
  );
}

function isDeliveryMethod(value: unknown): value is "delivery" | "pickup" | null {
  return value === null || value === "delivery" || value === "pickup";
}

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadBuilderState<T>(
  key: string,
  validate: (value: unknown) => value is T,
): T | null {
  const storage = getLocalStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(key);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;

    const stored = parsed as unknown as StoredBuilderState;
    if (stored.version !== BUILDER_STORAGE_VERSION || !validate(stored.data)) {
      return null;
    }

    return stored.data;
  } catch {
    return null;
  }
}

export function saveBuilderState<T>(key: string, data: T): void {
  const storage = getLocalStorage();
  if (!storage) return;

  try {
    storage.setItem(
      key,
      JSON.stringify({
        version: BUILDER_STORAGE_VERSION,
        data,
      }),
    );
  } catch {
    // The builder remains fully usable when storage is unavailable or full.
  }
}

export function clearBuilderState(key: string): void {
  const storage = getLocalStorage();
  if (!storage) return;

  try {
    storage.removeItem(key);
  } catch {
    // Ignore unavailable storage; there is no UI state to recover here.
  }
}

export function isFrameOrderState(value: unknown): value is FrameOrderState {
  if (!isRecord(value)) return false;

  return (
    (value.size === "10x15" || value.size === "17x22" || value.size === "22x17") &&
    (value.color === "Чёрная" || value.color === "Белая") &&
    (value.lighting === "Без подсветки" ||
      value.lighting === "LED-гирлянда" ||
      value.lighting === "LED RGB" ||
      value.lighting === "LED с облаками") &&
    Array.isArray(value.characters) &&
    value.characters.length > 0 &&
    value.characters.every(isCharacter) &&
    isStringArray(value.pets) &&
    isStringRecord(value.petNames) &&
    isStringArray(value.accessories) &&
    isNumberRecord(value.hearts, { integer: true, nonNegative: true }) &&
    typeof value.customBg === "boolean" &&
    isDeliveryMethod(value.deliveryMethod) &&
    isFiniteNumber(value.deliveryPrice) &&
    value.deliveryPrice >= 0 &&
    (value.previewPositions === undefined || isPreviewPositions(value.previewPositions)) &&
    (value.previewRotations === undefined || isNumberRecord(value.previewRotations))
  );
}

export function isKeychainOrderState(value: unknown): value is KeychainOrderState {
  if (!isRecord(value)) return false;

  return (
    (value.mode === "choice" || value.mode === "ready" || value.mode === "custom") &&
    isNumberRecord(value.readyQuantities, { integer: true, nonNegative: true }) &&
    Array.isArray(value.characters) &&
    value.characters.length > 0 &&
    value.characters.every(isCharacter) &&
    isStringArray(value.pets) &&
    isDeliveryMethod(value.deliveryMethod) &&
    isFiniteNumber(value.deliveryPrice) &&
    value.deliveryPrice >= 0
  );
}

export function isStoredProductType(value: unknown): value is "frame" | "keychain" {
  return value === "frame" || value === "keychain";
}

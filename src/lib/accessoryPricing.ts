import { PRICING } from "./pricing";

export const ACCESSORY_PRICES: Record<string, number> = {
  accessory41: 5,
};

export function getAccessoryPrice(id: string): number {
  return ACCESSORY_PRICES[id] ?? PRICING.accessory;
}

export function getAccessoryTotal(ids: readonly string[]): number {
  return ids.reduce((sum, id) => sum + getAccessoryPrice(id), 0);
}

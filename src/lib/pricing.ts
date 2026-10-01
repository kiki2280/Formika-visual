export type DeliveryMethod = "delivery" | "pickup";

export const PRICING = {
  frame: { "10x15": 15, "17x22": 20, "22x17": 20, "20x25": 25, "25x20": 25 },
  extraCharacter: 5,
  lighting: {
    "Без подсветки": 0,
    "LED-гирлянда": 5,
    "LED RGB": 7,
    "LED с облаками": 12,
  },
  pet: 3,
  accessory: 2,
  heart: 0.5,
  customBg: 5,
  readyKeychain: 7,
  customKeychainChar: 7,
  delivery: 4.5,
};

export function getDeliveryPrice(method: DeliveryMethod | null): number {
  return method === "delivery" ? PRICING.delivery : 0;
}

export function formatEuro(n: number): string {
  return Number.isInteger(n) ? `${n}€` : `${n.toFixed(2).replace(".", ",")}€`;
}

export const READY_KEYCHAINS = [
  { id: "kb-black-batman", price: 7, img: "optimized/ready-keychain-3.webp" },
  { id: "kb-pink-batman", price: 7, img: "optimized/ready-keychain-4.webp" },
  { id: "kb-blue-shark", price: 7, img: "optimized/ready-keychain-1.webp" },
  { id: "kb-pink-shark", price: 7, img: "optimized/ready-keychain-2.webp" },
];

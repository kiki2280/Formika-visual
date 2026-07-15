export const DOG_DISPLAY_SCALE = 1.16;

export function getPetDisplayScale(id: string): number {
  return /^dog\d+$/i.test(id) ? DOG_DISPLAY_SCALE : 1;
}

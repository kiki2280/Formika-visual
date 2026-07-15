export interface HairDisplayConfig {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scale?: number;
  zIndex?: number;
  backZIndex?: number;
  offsetX?: number;
  offsetY?: number;
  frontClipBottom?: number;
}

const DEFAULT_HAIR_DISPLAY = {
  x: -23,
  y: -44,
  width: 46,
  height: 40.4,
  scale: 1,
  zIndex: 5,
  backZIndex: 3,
  offsetX: 0,
  offsetY: 0,
  frontClipBottom: -34.5,
};

const UPLOADED_HAIR_COUNT = 61;

export const hairDisplayConfig: Record<string, HairDisplayConfig> = Object.fromEntries(
  Array.from({ length: UPLOADED_HAIR_COUNT }, (_, index) => [
    `hair${index + 1}`,
    { ...DEFAULT_HAIR_DISPLAY },
  ])
);

export function getHairDisplay(id: string) {
  const config = hairDisplayConfig[id] ?? {};
  const scale = config.scale ?? DEFAULT_HAIR_DISPLAY.scale;
  const width = config.width ?? DEFAULT_HAIR_DISPLAY.width;
  const height = config.height ?? DEFAULT_HAIR_DISPLAY.height;
  const x = config.x ?? DEFAULT_HAIR_DISPLAY.x;
  const y = config.y ?? DEFAULT_HAIR_DISPLAY.y;
  const offsetX = config.offsetX ?? DEFAULT_HAIR_DISPLAY.offsetX;
  const offsetY = config.offsetY ?? DEFAULT_HAIR_DISPLAY.offsetY;
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  return {
    x: x + offsetX + (width - scaledWidth) / 2,
    y: y + offsetY + (height - scaledHeight) / 2,
    width: scaledWidth,
    height: scaledHeight,
    scale,
    backZIndex: config.backZIndex ?? DEFAULT_HAIR_DISPLAY.backZIndex,
    zIndex: config.zIndex ?? DEFAULT_HAIR_DISPLAY.zIndex,
    frontClipBottom: config.frontClipBottom ?? DEFAULT_HAIR_DISPLAY.frontClipBottom,
  };
}

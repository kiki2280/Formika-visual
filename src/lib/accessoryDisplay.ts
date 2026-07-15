import accessory30Preview from "@/assets/accessories/accessory30-preview.png";
import accessory31Preview from "@/assets/accessories/accessory31-preview.png";
import accessory32Preview from "@/assets/accessories/accessory32-preview.png";

export type AccessoryDisplayContext = "character" | "frame";
type AccessoryDisplayMode = "draggable" | "fixed";

interface AccessoryDisplayConfig {
  mode?: AccessoryDisplayMode;
  previewSrc?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  preserveAspectRatio?: string;
  scale?: number;
  characterWidth?: number;
  characterHeight?: number;
  frameWidth?: number;
  frameHeight?: number;
  offsetX?: number;
  offsetY?: number;
  defaultPosition?: { x: number; y: number };
  zIndex?: number;
}

const CHARACTER_BASE_SIZE = 24;
const FRAME_BASE_SIZE = 34;

export const accessoryDisplayConfig: Record<string, AccessoryDisplayConfig> = {
  accessory1: { scale: 1.45 },
  accessory5: { scale: 1.35 },
  accessory9: { scale: 0.85 },
  accessory10: { scale: 0.85 },
  accessory26: { scale: 1.45 },
  accessory28: {
    characterWidth: 48,
    characterHeight: 34,
    frameWidth: 58,
    frameHeight: 42,
  },
  accessory30: {
    mode: "fixed",
    previewSrc: accessory30Preview,
    x: -22,
    y: 3,
    width: 45,
    height: 20.7,
    preserveAspectRatio: "xMidYMid meet",
    zIndex: 2,
  },
  accessory31: {
    mode: "fixed",
    previewSrc: accessory31Preview,
    x: -22,
    y: 3,
    width: 45,
    height: 20.7,
    preserveAspectRatio: "xMidYMid meet",
    zIndex: 2,
  },
  accessory32: {
    mode: "fixed",
    previewSrc: accessory32Preview,
    x: -22,
    y: 3,
    width: 45,
    height: 20.7,
    preserveAspectRatio: "xMidYMid meet",
    zIndex: 2,
  },
  accessory38: { scale: 1.35 },
  accessory39: { scale: 1.35 },
  accessory41: {
    characterWidth: 26,
    characterHeight: 46,
    frameWidth: 36,
    frameHeight: 64,
    defaultPosition: { x: 34, y: 12 },
  },
};

export function getAccessoryDisplay(id: string, context: AccessoryDisplayContext = "character") {
  const config = accessoryDisplayConfig[id] ?? {};
  const baseSize = context === "frame" ? FRAME_BASE_SIZE : CHARACTER_BASE_SIZE;
  const scale = config.scale ?? 1;

  const width =
    context === "frame"
      ? config.frameWidth ?? config.width ?? baseSize * scale
      : config.width ?? config.characterWidth ?? baseSize * scale;
  const height =
    context === "frame"
      ? config.frameHeight ?? config.height ?? baseSize * scale
      : config.height ?? config.characterHeight ?? baseSize * scale;

  return {
    mode: config.mode ?? "draggable",
    previewSrc: config.previewSrc,
    x: config.x,
    y: config.y,
    width,
    height,
    offsetX: config.offsetX ?? 0,
    offsetY: config.offsetY ?? 0,
    preserveAspectRatio: config.preserveAspectRatio ?? "xMidYMid meet",
    zIndex: config.zIndex ?? 0,
  };
}

export function getAccessoryDefaultPosition(id: string) {
  return accessoryDisplayConfig[id]?.defaultPosition;
}

export function isFixedAccessory(id: string) {
  return accessoryDisplayConfig[id]?.mode === "fixed";
}

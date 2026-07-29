import { useId } from "react";
import {
  DEFAULT_BOTTOM_ID,
  DEFAULT_FACE_ID,
  DEFAULT_FACE_ITEM,
  DEFAULT_TOP_ID,
  ITEMS,
  type Character,
} from "@/lib/types";
import { getAccessoryDefaultPosition, getAccessoryDisplay, isFixedAccessory } from "@/lib/accessoryDisplay";
import { getHairDisplay } from "@/lib/hairDisplay";
import AccessoryGlyph from "../AccessoryGlyph";

interface CharacterBodyProps {
  char: Character;
  showName?: boolean;
  /** Name label colour. Defaults to dark, since the frame inner background is light. */
  nameColor?: string;
  /** When provided, hand accessories become draggable in character-builder mode. */
  onAccessoryDown?: (accId: string, e: React.MouseEvent | React.TouchEvent) => void;
  /** Currently selected hand accessory in builder mode only. */
  selectedAccessory?: string | null;
}

/** Default local position for a hand accessory: alternate right/left, stack down. */
export function defaultAccessoryPos(index: number, id?: string): { x: number; y: number } {
  const configured = id ? getAccessoryDefaultPosition(id) : undefined;
  if (configured) return configured;

  const side = index % 2 === 0 ? 1 : -1;
  const tier = Math.floor(index / 2);
  return { x: side * 19, y: 4 + tier * 12 };
}

const TORSO_Y = -20;
const TORSO_WIDTH = 46;
const TORSO_HEIGHT = 28.5;
const ARM_OVERLAY_WIDTH = 13.5;
const WAIST_Y = TORSO_Y + TORSO_HEIGHT;
const WAIST_OVERLAP = 5.5;
const LEGS_Y = WAIST_Y - WAIST_OVERLAP;
const LEGS_WIDTH = 28;
const LEGS_HEIGHT = 31;
const BOTTOM_Y_OFFSET: Record<string, number> = {
  "BOTTOM-17": -5,
  "BOTTOM-18": -5,
};

const CLOTHING_IMAGE_STYLE = {
  pointerEvents: "none",
  imageRendering: "auto",
  shapeRendering: "geometricPrecision",
} as const;
const FACE_IMAGE_STYLE = {
  pointerEvents: "none",
  imageRendering: "auto",
  shapeRendering: "geometricPrecision",
} as const;
const FACE_IMAGE_X = -8;
const FACE_IMAGE_Y = -40;
const FACE_IMAGE_WIDTH = 17;
const FACE_IMAGE_HEIGHT = 20.6;

/**
 * Inner SVG shapes for a single LEGO-style minifigure.
 * Shared by frame preview, custom product preview and the character builder step.
 */
export default function CharacterBody({
  char,
  showName = false,
  nameColor = "#111111",
  onAccessoryDown,
  selectedAccessory = null,
}: CharacterBodyProps) {
  const armsClipId = useId().replace(/:/g, "");
  const selectedTopId = char.top ?? DEFAULT_TOP_ID;
  const selectedBottomId = char.bottom ?? DEFAULT_BOTTOM_ID;
  const bodyColor = "#FF6A00";
  const topSrc = ITEMS.top.find((item) => item.id === selectedTopId)?.img;
  const bottomSrc = ITEMS.bottom.find((item) => item.id === selectedBottomId)?.img;
  const bottomYOffset = BOTTOM_Y_OFFSET[selectedBottomId] ?? 0;
  const selectedFaceId = char.face ?? DEFAULT_FACE_ID;
  const selectedFaceItem =
    selectedFaceId === DEFAULT_FACE_ID
      ? DEFAULT_FACE_ITEM
      : ITEMS.face.find((f) => f.id === selectedFaceId);
  const faceSrc = selectedFaceItem?.img ?? DEFAULT_FACE_ITEM.img;
  const hairItem = char.hair ? ITEMS.hair.find((h) => h.id === char.hair) : undefined;
  const hairBackSrc = hairItem?.backImg ?? hairItem?.back;
  const hairFrontSrc = hairItem?.frontImg ?? hairItem?.front;
  const hairDisplay =
    hairItem && (hairBackSrc || hairFrontSrc)
      ? getHairDisplay(hairItem.id)
      : null;
  const legsColor = "#cc5500";
  const interactive = !!onAccessoryDown;
  const accessoryEntries = char.accessories.map((accId, index) => ({
    accId,
    index,
    display: getAccessoryDisplay(accId, "character"),
    fixed: isFixedAccessory(accId),
  }));
  const fixedAccessoryEntries = accessoryEntries.filter((entry) => entry.fixed);
  const regularAccessoryEntries = accessoryEntries.filter((entry) => !entry.fixed);

  return (
    <>
      {topSrc && (
        <defs>
          <clipPath id={armsClipId} clipPathUnits="userSpaceOnUse">
            <rect
              x={-TORSO_WIDTH / 2}
              y={TORSO_Y}
              width={ARM_OVERLAY_WIDTH}
              height={TORSO_HEIGHT}
            />
            <rect
              x={TORSO_WIDTH / 2 - ARM_OVERLAY_WIDTH}
              y={TORSO_Y}
              width={ARM_OVERLAY_WIDTH}
              height={TORSO_HEIGHT}
            />
          </clipPath>
        </defs>
      )}

      {hairBackSrc && hairDisplay && (
        <g key="hair-back">
          <image
            href={hairBackSrc}
            x={hairDisplay.x - 0.7}
            y={hairDisplay.y}
            width={hairDisplay.width}
            height={hairDisplay.height}
            preserveAspectRatio="xMidYMid meet"
            style={FACE_IMAGE_STYLE}
          />
        </g>
      )}

      {bottomSrc ? (
        <image
          href={bottomSrc}
          x={-LEGS_WIDTH / 2}
          y={LEGS_Y + bottomYOffset}
          width={LEGS_WIDTH}
          height={LEGS_HEIGHT}
          preserveAspectRatio="xMidYMid meet"
          style={CLOTHING_IMAGE_STYLE}
        />
      ) : (
        <>
          <rect x="-14" y={LEGS_Y + bottomYOffset} width="12" height={LEGS_HEIGHT} rx="2" fill={legsColor} />
          <rect x="2" y={LEGS_Y + bottomYOffset} width="12" height={LEGS_HEIGHT} rx="2" fill={legsColor} />
        </>
      )}

      {fixedAccessoryEntries.map(({ accId, display }) => {
        const hasDirectPosition = display.x !== undefined || display.y !== undefined;
        const pos = hasDirectPosition ? { x: 0, y: 0 } : getAccessoryDefaultPosition(accId) ?? { x: 0, y: 0 };
        const halfWidth = display.width / 2;
        const halfHeight = display.height / 2;
        const x = display.x ?? display.offsetX - halfWidth;
        const y = display.y ?? display.offsetY - halfHeight;

        return (
          <g
            key={`${accId}-fixed-preview`}
            transform={`translate(${pos.x}, ${pos.y})`}
            style={{ pointerEvents: "none" }}
          >
            {display.previewSrc ? (
              <image
                href={display.previewSrc}
                x={x}
                y={y}
                width={display.width}
                height={display.height}
                preserveAspectRatio={display.preserveAspectRatio}
                style={CLOTHING_IMAGE_STYLE}
              />
            ) : (
              <AccessoryGlyph
                id={accId}
                width={display.width}
                height={display.height}
                offsetX={display.offsetX}
                offsetY={display.offsetY}
              />
            )}
          </g>
        );
      })}

      {topSrc ? (
        <image
          href={topSrc}
          x={-TORSO_WIDTH / 2}
          y={TORSO_Y}
          width={TORSO_WIDTH}
          height={TORSO_HEIGHT}
          preserveAspectRatio="xMidYMid meet"
          style={CLOTHING_IMAGE_STYLE}
        />
      ) : (
        <rect x="-14" y={TORSO_Y} width="28" height={TORSO_HEIGHT} rx="3" fill={bodyColor} />
      )}

      {topSrc && (
        <image
          href={topSrc}
          x={-TORSO_WIDTH / 2}
          y={TORSO_Y}
          width={TORSO_WIDTH}
          height={TORSO_HEIGHT}
          preserveAspectRatio="xMidYMid meet"
          clipPath={`url(#${armsClipId})`}
          style={CLOTHING_IMAGE_STYLE}
        />
      )}

      {faceSrc && (
        <g key="face">
          <image
            href={faceSrc}
            x={FACE_IMAGE_X}
            y={FACE_IMAGE_Y}
            width={FACE_IMAGE_WIDTH}
            height={FACE_IMAGE_HEIGHT}
            preserveAspectRatio="xMidYMid meet"
            style={FACE_IMAGE_STYLE}
          />
        </g>
      )}

      {hairFrontSrc && hairDisplay && (
        <g key="hair-front">
          <image
            href={hairFrontSrc}
            x={hairDisplay.x - 0.7}
            y={hairDisplay.y}
            width={hairDisplay.width}
            height={hairDisplay.height}
            preserveAspectRatio="xMidYMid meet"
            style={FACE_IMAGE_STYLE}
          />
        </g>
      )}

      {regularAccessoryEntries.map(({ accId, index, display }) => {
        const pos = char.accessoryPositions?.[accId] ?? defaultAccessoryPos(index, accId);
        const hitWidth = Math.max(24, display.width);
        const hitHeight = Math.max(24, display.height);
        return (
          <g
            key={accId}
            transform={`translate(${pos.x}, ${pos.y})`}
            style={interactive ? { cursor: "grab" } : { pointerEvents: "none" }}
            onMouseDown={interactive ? (e) => onAccessoryDown!(accId, e) : undefined}
            onTouchStart={interactive ? (e) => onAccessoryDown!(accId, e) : undefined}
          >
            {selectedAccessory === accId && (
              <rect
                x={display.offsetX - hitWidth / 2 - 0.5}
                y={display.offsetY - hitHeight / 2 - 0.5}
                width={hitWidth + 1}
                height={hitHeight + 1}
                rx="4"
                fill="none"
                stroke="#FF6A00"
                strokeWidth="1.3"
              />
            )}
            <rect
              x={display.offsetX - hitWidth / 2}
              y={display.offsetY - hitHeight / 2}
              width={hitWidth}
              height={hitHeight}
              fill="transparent"
              style={{ pointerEvents: interactive ? "all" : "none" }}
            />
            <AccessoryGlyph
              id={accId}
              width={display.width}
              height={display.height}
              offsetX={display.offsetX}
              offsetY={display.offsetY}
            />
          </g>
        );
      })}

      {showName && char.name.trim() && (
        <text
          x="0"
          y="52"
          textAnchor="middle"
          fontSize="7"
          fill={nameColor}
          fontWeight="bold"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {char.name.trim()}
        </text>
      )}
    </>
  );
}

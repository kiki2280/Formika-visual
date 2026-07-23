import { ITEMS, getAccessoryLabel, getCatalogItemId } from "@/lib/types";

interface AccessoryGlyphProps {
  id: string;
  size?: number;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
  showLabel?: boolean;
  labelFill?: string;
}

export default function AccessoryGlyph({
  id,
  size = 28,
  width,
  height,
  offsetX = 0,
  offsetY = 0,
  showLabel = false,
  labelFill = "#111111",
}: AccessoryGlyphProps) {
  const catalogId = getCatalogItemId(id);
  const accessory = ITEMS.accessories.find((item) => item.id === catalogId);
  const label = getAccessoryLabel(id);
  const displayWidth = width ?? size;
  const displayHeight = height ?? size;
  const halfWidth = displayWidth / 2;
  const halfHeight = displayHeight / 2;

  if (accessory?.img) {
    return (
      <g>
        <image
          href={accessory.img}
          x={offsetX - halfWidth}
          y={offsetY - halfHeight}
          width={displayWidth}
          height={displayHeight}
          preserveAspectRatio="xMidYMid meet"
          style={{ imageRendering: "auto", pointerEvents: "none" }}
        />
        {showLabel && (
          <text
            x="0"
            y={offsetY + halfHeight + 8}
            textAnchor="middle"
            fontSize="6"
            fill={labelFill}
            fontWeight="bold"
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {label}
          </text>
        )}
      </g>
    );
  }

  return (
    <g>
      <rect
        x={offsetX - halfWidth}
        y={offsetY - halfHeight}
        width={displayWidth}
        height={displayHeight}
        rx="4"
        fill="#FF6A00"
        opacity="0.9"
      />
      <text
        x={offsetX}
        y={offsetY + 2.4}
        textAnchor="middle"
        fontSize="4.6"
        fill="#fff"
        fontWeight="bold"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {label}
      </text>
    </g>
  );
}

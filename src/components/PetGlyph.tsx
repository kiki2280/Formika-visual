import { ITEMS } from "@/lib/types";

interface PetGlyphProps {
  id: string;
  showLabel?: boolean;
  labelFill?: string;
}

export default function PetGlyph({ id, showLabel = true, labelFill = "#111111" }: PetGlyphProps) {
  const pet = ITEMS.pets.find((item) => item.id === id);

  if (pet?.img) {
    const label = pet.label ?? id;

    return (
      <g>
        <image
          href={pet.img}
          x="-18"
          y="-27"
          width="36"
          height="50"
          preserveAspectRatio="xMidYMid meet"
          style={{ imageRendering: "auto", pointerEvents: "none" }}
        />
        {showLabel && (
          <text
            x="0"
            y="35"
            textAnchor="middle"
            fontSize="6.5"
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
      <ellipse cx="0" cy="5" rx="16" ry="10" fill="#8F7663" />
      <circle cx="-9" cy="-5" r="9" fill="#A98A72" />
      <path d="M-15,-12 L-20,-22 L-10,-16 Z" fill="#A98A72" />
      <path d="M-4,-12 L2,-21 L1,-10 Z" fill="#A98A72" />
      <circle cx="-12" cy="-6" r="1.4" fill="#111111" />
      <circle cx="-6" cy="-6" r="1.4" fill="#111111" />
      <path d="M-10,-2 Q-8,1 -6,-2" fill="none" stroke="#111111" strokeWidth="1" strokeLinecap="round" />
      <path d="M14,4 Q25,-6 28,4" fill="none" stroke="#8F7663" strokeWidth="4" strokeLinecap="round" />
      <rect x="-10" y="13" width="5" height="8" rx="2" fill="#6F5A4B" />
      <rect x="6" y="13" width="5" height="8" rx="2" fill="#6F5A4B" />
      {showLabel && (
        <text
          x="0"
          y="33"
          textAnchor="middle"
          fontSize="6.5"
          fill={labelFill}
          fontWeight="bold"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {id}
        </text>
      )}
    </g>
  );
}

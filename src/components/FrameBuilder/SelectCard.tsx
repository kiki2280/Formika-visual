import { motion } from "@/lib/motion";
import { Check } from "lucide-react";

interface SelectCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  price?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  /** Optional solid swatch shown instead of an image (e.g. frame colour). */
  swatch?: string;
  /** Optional CSS box-shadow to suggest a lighting glow on the media area. */
  glow?: string;
  /** Compact variant: smaller media, padding and title — for dense option grids. */
  compact?: boolean;
  testid: string;
}

export default function SelectCard({
  selected,
  onClick,
  title,
  subtitle,
  price,
  image,
  imageFit = "cover",
  swatch,
  glow,
  compact = false,
  testid,
}: SelectCardProps) {
  const hasMedia = !!image || !!swatch;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      data-testid={testid}
      className={`relative text-left rounded-2xl border-2 bg-card transition-all duration-300 overflow-hidden flex flex-col ${
        selected
          ? "border-primary shadow-[0_0_0_2px_rgba(255,106,0,0.9),0_18px_40px_rgba(0,0,0,0.45)]"
          : "border-border hover:border-primary/50"
      }`}
    >
      {selected && (
        <span className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
          <Check className="w-4 h-4" />
        </span>
      )}

      {hasMedia && (
        <div
          className={`relative w-full bg-background/50 flex items-center justify-center overflow-hidden ${
            compact ? "aspect-[3/2]" : "aspect-[4/3]"
          }`}
          style={glow ? { boxShadow: glow } : undefined}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
              className={
                imageFit === "contain"
                  ? compact
                    ? "h-auto max-h-20 w-auto max-w-20 object-contain"
                    : "h-auto max-h-24 w-auto max-w-24 object-contain"
                  : "h-full w-full object-cover"
              }
              draggable={false}
            />
          ) : (
            <span
              className={`rounded-xl border border-border ${compact ? "w-12 h-12" : "w-20 h-20"}`}
              style={{ background: swatch }}
            />
          )}
        </div>
      )}

      <div className={`flex-1 flex flex-col ${compact ? "p-3" : "p-4"}`}>
        <h4
          className={`font-serif font-bold leading-tight ${compact ? "text-base" : "text-lg"} ${
            selected ? "text-primary" : "text-foreground"
          }`}
        >
          {title}
        </h4>
        {subtitle && (
          <p className={`text-muted-foreground leading-snug ${compact ? "text-[11px] mt-0.5" : "text-xs mt-1"}`}>
            {subtitle}
          </p>
        )}
        {price && (
          <p
            className={`mt-auto font-bold ${compact ? "pt-2 text-xs" : "pt-3 text-sm"} ${
              selected ? "text-primary" : "text-foreground"
            }`}
          >
            {price}
          </p>
        )}
      </div>
    </motion.button>
  );
}

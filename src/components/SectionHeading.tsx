import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accentTitle?: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  size?: "display" | "section" | "wide" | "compact" | "legal";
  animated?: boolean;
  uppercase?: boolean;
  className?: string;
}

const TITLE_SIZES = {
  display:
    "text-[1.75rem] min-[390px]:text-[2.125rem] sm:text-5xl lg:text-[3.625rem]",
  section:
    "text-base min-[360px]:text-lg min-[430px]:text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem]",
  wide:
    "text-lg min-[375px]:text-[1.35rem] min-[390px]:text-[1.4rem] min-[430px]:text-[1.6rem] sm:text-4xl md:text-[2.875rem] lg:text-[3.25rem] xl:text-[3.65rem]",
  compact:
    "text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl",
  legal:
    "text-[15px] min-[360px]:text-lg sm:text-2xl md:text-4xl lg:text-5xl",
} as const;

export default function SectionHeading({
  eyebrow,
  title,
  accentTitle,
  subtitle,
  align = "center",
  as = "h2",
  size = "section",
  animated = true,
  uppercase = true,
  className,
}: SectionHeadingProps) {
  const Heading = as;
  const isCentered = align === "center";

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 24 } : false}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={animated ? { once: true, margin: "-80px" } : undefined}
      transition={animated ? { duration: 0.6 } : undefined}
      className={cn(
        "mb-12 md:mb-14",
        isCentered ? "text-center" : "text-left",
        className,
      )}
    >
      <div
        className={cn(
          "flex max-w-3xl items-center gap-2.5 sm:gap-5",
          isCentered ? "mx-auto justify-center" : "mr-auto",
        )}
      >
        <span className="h-px w-5 shrink-0 bg-primary/45 sm:w-12 md:w-20" />
        <p className="min-w-0 font-sans text-[9px] font-bold uppercase leading-relaxed tracking-[0.12em] text-primary sm:text-xs">
          {eyebrow}
        </p>
        <span className="h-px w-5 shrink-0 bg-primary/45 sm:w-12 md:w-20" />
      </div>

      <Heading
        className={cn(
          "mt-4 font-serif font-medium leading-[1.08] tracking-normal text-white",
          uppercase && "uppercase",
          TITLE_SIZES[size],
          isCentered ? "mx-auto max-w-6xl" : "max-w-3xl",
        )}
      >
        <span className="whitespace-pre-line">{title}</span>
        {accentTitle && (
          <span className="mt-1 block text-primary">{accentTitle}</span>
        )}
      </Heading>

      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/55 sm:text-base",
            isCentered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

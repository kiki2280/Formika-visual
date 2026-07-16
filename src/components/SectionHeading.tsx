import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  accentTitle?: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  size?: "display" | "section" | "wide" | "compact" | "legal";
  animated?: boolean;
  uppercase?: boolean;
  className?: string;
  titleClassName?: string;
  accentTitleClassName?: string;
}

const TITLE_SIZES = {
  display:
    "text-[1.875rem] min-[390px]:text-[2.125rem] sm:text-5xl lg:text-[3.625rem]",
  section:
    "text-[1.875rem] min-[390px]:text-[2.125rem] sm:text-[2.75rem] md:text-5xl lg:text-[3.5rem]",
  wide:
    "text-[1.75rem] min-[375px]:text-[1.875rem] min-[430px]:text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.625rem] xl:text-[3.75rem]",
  compact:
    "text-[1.75rem] min-[390px]:text-[1.875rem] sm:text-4xl md:text-[2.75rem]",
  legal:
    "text-[1.75rem] min-[390px]:text-[1.875rem] sm:text-4xl md:text-[2.75rem] lg:text-5xl",
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
  titleClassName,
  accentTitleClassName,
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
          "mt-4 max-w-full break-words font-serif font-medium leading-[1.06] tracking-normal text-white [overflow-wrap:anywhere]",
          uppercase && "uppercase",
          TITLE_SIZES[size],
          isCentered ? "mx-auto max-w-6xl" : "max-w-3xl",
          titleClassName,
        )}
      >
        <span className="whitespace-pre-line">{title}</span>
        {accentTitle && (
          <span
            className={cn(
              "mt-1 block text-primary",
              accentTitleClassName,
            )}
          >
            {accentTitle}
          </span>
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

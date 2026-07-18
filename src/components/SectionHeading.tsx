import { cn } from "@/lib/utils";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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
    "text-[1.875rem] min-[390px]:text-[2.125rem] md:text-5xl lg:text-[3.625rem]",
  section:
    "text-[1.875rem] min-[390px]:text-[2.125rem] md:text-4xl lg:text-[2.75rem]",
  wide:
    "text-[1.75rem] min-[375px]:text-[1.875rem] min-[430px]:text-[2rem] md:text-[2.875rem] lg:text-[3.25rem] xl:text-[3.65rem]",
  compact:
    "text-[1.75rem] min-[390px]:text-[1.875rem] md:text-4xl",
  legal:
    "text-[1.75rem] min-[390px]:text-[1.875rem] md:text-4xl lg:text-5xl",
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (!animated) {
      setIsVisible(true);
      return;
    }

    const element = wrapperRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "mb-12 md:mb-14",
        isCentered ? "text-center" : "text-left",
        animated &&
          "transition-[opacity,transform] duration-[600ms] ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        animated &&
          (isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"),
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
          "mt-4 max-w-full break-words font-serif font-medium leading-[1.06] tracking-normal text-white [overflow-wrap:anywhere] md:break-normal md:leading-[1.08] md:[overflow-wrap:normal]",
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
    </div>
  );
}

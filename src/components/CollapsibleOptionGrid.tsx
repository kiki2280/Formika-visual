import { Children, type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleOptionGridProps {
  alwaysVisible?: ReactNode;
  children: ReactNode;
  initialVisible?: number;
  desktopInitialVisible?: number;
  expandedByDefault?: boolean;
  className?: string;
  buttonLabel?: string;
  testId?: string;
}

export default function CollapsibleOptionGrid({
  alwaysVisible,
  children,
  initialVisible = 3,
  desktopInitialVisible,
  expandedByDefault = false,
  className,
  buttonLabel = "Посмотреть всё",
  testId,
}: CollapsibleOptionGridProps) {
  const [manuallyExpanded, setManuallyExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false
  );

  useEffect(() => {
    if (desktopInitialVisible === undefined || typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, [desktopInitialVisible]);

  const optionNodes = Children.toArray(children);
  const visibleLimit = desktopInitialVisible !== undefined && isDesktop ? desktopInitialVisible : initialVisible;
  const hasMore = optionNodes.length > visibleLimit;
  const expanded = manuallyExpanded || expandedByDefault;
  const visibleNodes = expanded ? optionNodes : optionNodes.slice(0, visibleLimit);

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {alwaysVisible}
      {visibleNodes}
      {hasMore && !expanded && (
        <button
          type="button"
          onClick={() => setManuallyExpanded(true)}
          className="col-span-full rounded-xl border border-primary/60 bg-primary/10 px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid={testId}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

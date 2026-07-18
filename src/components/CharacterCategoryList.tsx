import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CharacterCategoryItem<T extends string = string> {
  id: T;
  title: string;
  value: string;
  invalid?: boolean;
  preview?: {
    src?: string;
    alt: string;
    label?: string;
  };
  testId?: string;
}

interface CharacterCategoryListProps<T extends string = string> {
  items: CharacterCategoryItem<T>[];
  onOpen: (id: T) => void;
}

export default function CharacterCategoryList<T extends string = string>({
  items,
  onOpen,
}: CharacterCategoryListProps<T>) {
  return (
    <div className="space-y-2" data-testid="character-category-list">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onOpen(item.id)}
          className={cn(
            "w-full rounded-xl border border-border bg-background/45 p-3 text-left transition-all",
            "hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
            item.invalid &&
              "border-destructive/80 bg-destructive/10 shadow-[0_0_0_1px_rgba(239,68,68,0.22)] hover:border-destructive",
          )}
          aria-invalid={item.invalid || undefined}
          data-testid={item.testId}
        >
          <span className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-card">
              {item.preview?.src ? (
                <img
                  src={item.preview.src}
                  alt={item.preview.alt}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-1"
                  draggable={false}
                />
              ) : (
                <span className="px-1 text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  {item.preview?.label ?? item.title.slice(0, 2)}
                </span>
              )}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold uppercase tracking-widest text-primary">
                {item.title}
              </span>
              <span className="mt-1 block truncate text-xs text-muted-foreground">
                {item.value}
              </span>
            </span>

            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </span>
        </button>
      ))}
    </div>
  );
}

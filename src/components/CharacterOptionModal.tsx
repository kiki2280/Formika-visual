import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface CharacterChoiceOption {
  id: string;
  label: string;
  img?: string;
  selected?: boolean;
  disabled?: boolean;
  testId?: string;
}

interface CharacterOptionModalProps {
  title: string;
  options?: CharacterChoiceOption[];
  onSelect?: (id: string) => void;
  onClose: () => void;
  closeOnSelect?: boolean;
  description?: string;
  showDoneButton?: boolean;
  children?: ReactNode;
}

export default function CharacterOptionModal({
  title,
  options,
  onSelect,
  onClose,
  closeOnSelect = false,
  description,
  showDoneButton = false,
  children,
}: CharacterOptionModalProps) {
  const { t } = useTranslation();
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const hasImages = options?.some((option) => option.img) ?? false;
  const optionGridClassName = cn(
    "grid gap-2.5 sm:gap-3",
    hasImages
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5"
  );

  const renderOptionButton = (option: CharacterChoiceOption) => (
    <button
      key={option.id}
      type="button"
      disabled={option.disabled}
      onClick={() => {
        onSelect?.(option.id);
        if (closeOnSelect) onClose();
      }}
      className={cn(
        "flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-xl border p-2 text-center text-xs font-bold transition-all",
        option.selected
          ? "border-primary bg-primary/10 text-primary shadow-[0_0_0_2px_rgba(255,106,0,0.8)]"
          : "border-border bg-background/35 text-muted-foreground hover:border-primary/50 hover:text-foreground",
        option.disabled &&
          "cursor-not-allowed border-border/60 opacity-35 hover:border-border hover:text-muted-foreground",
      )}
      aria-pressed={option.selected}
      data-testid={option.testId}
    >
      {option.img ? (
        <span className="flex h-16 w-full items-center justify-center overflow-hidden rounded-lg bg-white/10">
          <img
            src={option.img}
            alt={option.label}
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-1"
            draggable={false}
          />
        </span>
      ) : (
        <span className="flex min-h-12 items-center justify-center px-1 leading-tight">
          {option.label}
        </span>
      )}
      {option.img && <span className="leading-tight">{option.label}</span>}
    </button>
  );

  const renderOptions = () => {
    if (!options) return null;

    return (
      <div className={optionGridClassName}>
        {options.map(renderOptionButton)}
      </div>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-label={t("characterEditor.closeSelectionAria")}
        data-testid="character-option-modal-backdrop"
      />

      <div
        className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_60px_rgba(255,106,0,0.16)]"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-testid="character-option-modal"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4 sm:px-6">
          <div>
            <h3 className="font-sans text-xl font-bold sm:text-2xl">{title}</h3>
            {(description || options) && (
              <p
                className={cn(
                  "mt-1 text-xs",
                  description ? "font-medium text-primary" : "text-muted-foreground",
                )}
                role={description ? "status" : undefined}
              >
                {description ?? t("characterEditor.chooseFromList")}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            aria-label={t("common.close")}
            data-testid="btn-close-character-option-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {children}

          {renderOptions()}
        </div>

        {showDoneButton && (
          <div className="shrink-0 border-t border-border bg-card/95 px-4 py-3 backdrop-blur sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="ml-auto flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              data-testid="btn-done-character-option-modal"
            >
              {t("characterEditor.done")}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

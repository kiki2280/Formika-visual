import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ReturnToProductSelectionButtonProps {
  onClick: () => void;
}

export default function ReturnToProductSelectionButton({
  onClick,
}: ReturnToProductSelectionButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t("orderSelection.returnButtonAria")}
      className="
        inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-1.5
        whitespace-nowrap rounded-full border border-white/[0.12] bg-white/[0.025] px-5
        font-sans text-sm font-semibold text-white/70
        transition-all duration-200
        hover:border-primary/45 hover:bg-primary/[0.06] hover:text-primary
        active:scale-[0.98] active:border-primary/55 active:bg-primary/[0.1]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70
        focus-visible:ring-offset-2 focus-visible:ring-offset-background
        sm:w-auto sm:justify-start
      "
      data-testid="btn-return-to-product-selection"
    >
      <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{t("orderSelection.returnButton")}</span>
    </button>
  );
}

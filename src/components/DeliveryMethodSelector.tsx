import { PRICING, type DeliveryMethod } from "@/lib/pricing";
import { useTranslation } from "react-i18next";

interface DeliveryMethodSelectorProps {
  value: DeliveryMethod | null;
  onChange: (method: DeliveryMethod) => void;
  showRequiredHint?: boolean;
}

const OPTIONS: { method: DeliveryMethod; titleKey: string; price: number; descriptionKey: string }[] = [
  {
    method: "delivery",
    titleKey: "common.delivery",
    price: PRICING.delivery,
    descriptionKey: "deliverySelector.deliveryDescription",
  },
  {
    method: "pickup",
    titleKey: "deliverySelector.pickupTitle",
    price: 0,
    descriptionKey: "deliverySelector.pickupDescription",
  },
];

export default function DeliveryMethodSelector({
  value,
  onChange,
  showRequiredHint = true,
}: DeliveryMethodSelectorProps) {
  const { t } = useTranslation();

  return (
    <section className="rounded-2xl border border-border bg-background/40 p-4 space-y-3" data-testid="delivery-method-selector">
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-primary">{t("deliverySelector.title")}</h4>
        <p className="text-xs text-muted-foreground mt-1">{t("deliverySelector.instruction")}</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {OPTIONS.map((option) => {
          const selected = value === option.method;
          return (
            <button
              key={option.method}
              type="button"
              onClick={() => onChange(option.method)}
              className={`flex min-h-[158px] w-full flex-col items-stretch justify-start overflow-hidden rounded-xl border-2 p-4 text-left transition-all ${
                selected
                  ? "border-primary bg-primary/10 shadow-[0_0_0_2px_rgba(255,106,0,0.75)]"
                  : "border-border bg-card/70 hover:border-primary/60"
              }`}
              data-testid={`delivery-method-${option.method}`}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-semibold leading-snug text-foreground">{t(option.titleKey)}</span>
                <span
                  className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-xs font-bold leading-none ${
                    selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {t("deliverySelector.price", {
                    price: option.price.toFixed(2),
                  })}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t(option.descriptionKey)}</p>
            </button>
          );
        })}
      </div>

      {showRequiredHint && !value && (
        <p className="text-xs text-primary font-semibold" data-testid="delivery-required-hint">
          {t("deliverySelector.requiredHint")}
        </p>
      )}
    </section>
  );
}

import { type Dispatch, type SetStateAction } from "react";
import { Link } from "wouter";
import { Copy, Send } from "lucide-react";
import {
  DELIVERY_LABELS,
  PRICING,
  formatEuro,
  getDeliveryPrice,
  type DeliveryMethod,
} from "@/lib/pricing";
import { getAccessoryPrice, getAccessoryTotal } from "@/lib/accessoryPricing";
import type { FrameOrderState } from "@/lib/types";
import { computeFramePricing, getFrameOrderText } from "@/lib/frameOrder";
import { Button } from "@/components/ui/button";
import DeliveryMethodSelector from "@/components/DeliveryMethodSelector";
import { useToast } from "@/hooks/use-toast";
import { CONTACTS } from "@/lib/contacts";

interface StepProps {
  state: FrameOrderState;
  onChange: Dispatch<SetStateAction<FrameOrderState>>;
}

function Row({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="flex justify-between items-start bg-background/50 p-3 rounded-lg border border-border/50 gap-2">
      <div>
        <p className="text-sm">{label}</p>
        {detail && <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>}
      </div>
      <span className="font-semibold shrink-0 text-primary">{value}</span>
    </div>
  );
}

export default function ReviewStep({ state, onChange }: StepProps) {
  const { toast } = useToast();
  const pricing = computeFramePricing(state);

  const setDeliveryMethod = (method: DeliveryMethod) => {
    onChange((current) => ({
      ...current,
      deliveryMethod: method,
      deliveryPrice: getDeliveryPrice(method),
    }));
  };

  const requireDelivery = () => {
    if (state.deliveryMethod) return true;
    toast({
      title: "Выберите способ получения",
      description: "Перед отправкой заказа выберите доставку или самовывоз.",
      variant: "destructive",
    });
    return false;
  };

  const handleCopy = async () => {
    if (!requireDelivery()) return;
    try {
      await navigator.clipboard.writeText(getFrameOrderText(state));
      toast({ title: "Скопировано!", description: "Детали заказа скопированы в буфер обмена." });
    } catch {
      toast({
        title: "Не удалось скопировать",
        description: "Скопируйте текст заказа вручную или напишите нам в Telegram.",
        variant: "destructive",
      });
    }
  };

  const handleOpenTelegram = () => {
    if (!requireDelivery()) return;
    window.open(CONTACTS.orderTelegram.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-xl">
        <div className="space-y-2 text-sm">
          <Row
            label={`Рамка ${state.size} (${state.color})`}
            value={formatEuro(pricing.framePrice)}
            detail="включает 1 человечка"
          />
          <Row
            label={`Подсветка: ${state.lighting}`}
            value={pricing.lightingPrice > 0 ? `+${formatEuro(pricing.lightingPrice)}` : formatEuro(0)}
          />

          {state.characters.map((char, index) => (
            <div key={char.id} className="bg-background/50 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Человечек {index + 1}</span>
                <span className={`font-semibold ${index === 0 ? "text-muted-foreground" : "text-primary"}`}>
                  {index === 0 ? "включён" : `+${formatEuro(PRICING.extraCharacter)}`}
                </span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                {char.name.trim() && <div className="text-foreground">Имя: {char.name.trim()}</div>}
                <div>Лицо: {char.face || "-"} · Волосы: {char.hair || "-"}</div>
                <div>Верх: {char.top || "-"} · Низ: {char.bottom || "-"}</div>
                {char.accessories.length > 0 && (
                  <div>
                    Аксессуары в руки: {char.accessories.join(", ")}
                    <span className="text-foreground"> · +{formatEuro(getAccessoryTotal(char.accessories))}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {state.pets.length > 0 && (
            <div className="bg-background/50 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Питомцы</span>
                <span className="font-semibold text-primary">+{formatEuro(pricing.petsPrice)}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                {state.pets.map((id) => (
                  <div key={id}>
                    {id}
                    {state.petNames?.[id]?.trim() && (
                      <span className="text-foreground"> · Имя: {state.petNames[id].trim()}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {state.accessories.length > 0 && (
            <Row
              label={`Детали фона: ${state.accessories.join(", ")}`}
              value={`+${formatEuro(pricing.accPrice)}`}
              detail={state.accessories
                .map((id) => `${id}: ${formatEuro(getAccessoryPrice(id))}`)
                .join(", ")}
            />
          )}

          {pricing.heartEntries.length > 0 && (
            <div className="bg-background/50 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Сердечки на фон</span>
                <span className="font-semibold text-primary">+{formatEuro(pricing.heartsPrice)}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                {pricing.heartEntries.map(([code, qty]) => (
                  <div key={code}>{code} x {qty}</div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-background/50 p-3 rounded-lg border border-border/50 flex justify-between items-start gap-2">
            <div>
              <p className="text-sm">Фон: {state.customBg ? "Индивидуальный фон" : "Белый фон"}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {state.customBg ? "от +5 €, цена может меняться от сложности" : "входит в стоимость"}
              </p>
            </div>
            <span className={`font-semibold shrink-0 ${pricing.bgPrice > 0 ? "text-primary" : "text-muted-foreground"}`}>
              {pricing.bgPrice > 0 ? `+${formatEuro(pricing.bgPrice)}` : formatEuro(0)}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6 space-y-5">
          <DeliveryMethodSelector value={state.deliveryMethod} onChange={setDeliveryMethod} />

          <div className="rounded-2xl border border-border bg-background/40 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Товар:</span>
              <span className="font-semibold">{formatEuro(pricing.productTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {state.deliveryMethod === "pickup" ? DELIVERY_LABELS.pickup : DELIVERY_LABELS.delivery}:
              </span>
              <span className="font-semibold">{formatEuro(pricing.deliveryPrice)}</span>
            </div>
            <div className="flex justify-between items-end border-t border-border pt-3">
              <span className="text-lg">Итого:</span>
              <span className="text-4xl font-bold text-primary" data-testid="text-frame-total">
                {formatEuro(pricing.total)}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic">
            Финальная цена подтверждается после согласования деталей в Telegram.
          </p>


          <div className="space-y-3">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 border border-[#111111]"
              onClick={handleOpenTelegram}
              data-testid="btn-open-telegram"
            >
              <Send className="w-5 h-5 mr-2" />
              Отправить заявку в Telegram
            </Button>
            <Button
              className="w-full h-12 bg-[#1a1a1a] hover:bg-primary/10 text-foreground border border-primary/70"
              onClick={handleCopy}
              data-testid="btn-copy-order"
            >
              <Copy className="w-4 h-4 mr-2" />
              Скопировать заказ
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            После копирования заказа откройте Telegram и отправьте заявку нам.
          </p>
        </div>
      </div>
    </div>
  );
}

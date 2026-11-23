import { type Dispatch, type SetStateAction } from "react";
import { Copy, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  PRICING,
  formatEuro,
  getDeliveryPrice,
  type DeliveryMethod,
} from "@/lib/pricing";
import { getAccessoryPrice, getAccessoryTotal } from "@/lib/accessoryPricing";
import {
  getAccessoryLabel,
  getCatalogOptionLabel,
  getDeliveryMethodLabel,
  getFaceLabel,
  getFrameColorLabel,
  getHairLabel,
  getHeartLabel,
  getFrameCharacterLimit,
  getLightingLabel,
  getPetLabel,
  type FrameOrderState,
} from "@/lib/types";
import { computeFramePricing, getFrameOrderText } from "@/lib/frameOrder";
import { validateCharactersFaces } from "@/lib/characterValidation";
import { Button } from "@/components/ui/button";
import DeliveryMethodSelector from "@/components/DeliveryMethodSelector";
import { useToast } from "@/hooks/use-toast";
import { CONTACTS } from "@/lib/contacts";

interface StepProps {
  state: FrameOrderState;
  onChange: Dispatch<SetStateAction<FrameOrderState>>;
  onInvalidCharacters: (firstInvalidCharacterId: string) => void;
  onInvalidCharacterCount: () => void;
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

export default function ReviewStep({
  state,
  onChange,
  onInvalidCharacters,
  onInvalidCharacterCount,
}: StepProps) {
  const { t } = useTranslation();
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
      title: t("frameBuilder.review.deliveryRequiredTitle"),
      description: t("frameBuilder.review.deliveryRequiredDescription"),
      variant: "destructive",
    });
    return false;
  };

  const requireSelectedFaces = () => {
    const validation = validateCharactersFaces(state.characters);
    if (validation.isValid) return true;

    onInvalidCharacters(validation.firstInvalidCharacterId!);
    return false;
  };

  const requireAllowedCharacterCount = () => {
    if (
      state.characters.length <= getFrameCharacterLimit(state.size)
    ) {
      return true;
    }

    onInvalidCharacterCount();
    return false;
  };

  const handleCopy = async () => {
    if (!requireAllowedCharacterCount()) return;
    if (!requireSelectedFaces()) return;
    if (!requireDelivery()) return;
    try {
      await navigator.clipboard.writeText(getFrameOrderText(state));
      toast({
        title: t("frameBuilder.review.copySuccessTitle"),
        description: t("frameBuilder.review.copySuccessDescription"),
      });
    } catch {
      toast({
        title: t("frameBuilder.review.copyErrorTitle"),
        description: t("frameBuilder.review.copyErrorDescription"),
        variant: "destructive",
      });
    }
  };

  const handleOpenTelegram = () => {
    if (!requireAllowedCharacterCount()) return;
    if (!requireSelectedFaces()) return;
    if (!requireDelivery()) return;
    window.open(CONTACTS.orderTelegram.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-xl">
        <div className="space-y-2 text-sm">
          <Row
            label={t("frameBuilder.review.frameSummary", {
              size: state.size,
              color: getFrameColorLabel(state.color),
            })}
            value={formatEuro(pricing.framePrice)}
            detail={t("frameBuilder.review.includesCharacter")}
          />
          <Row
            label={t("frameBuilder.review.lightingSummary", {
              lighting: getLightingLabel(state.lighting),
            })}
            value={pricing.lightingPrice > 0 ? `+${formatEuro(pricing.lightingPrice)}` : formatEuro(0)}
          />

          {state.characters.map((char, index) => (
            <div key={char.id} className="bg-background/50 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">
                  {t("frameBuilder.review.characterSummary", {
                    number: index + 1,
                  })}
                </span>
                <span className={`font-semibold ${index === 0 ? "text-muted-foreground" : "text-primary"}`}>
                  {index === 0
                    ? t("frameBuilder.review.included")
                    : `+${formatEuro(PRICING.extraCharacter)}`}
                </span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                {char.name.trim() && (
                  <div className="text-foreground">
                    {t("frameBuilder.review.nameSummary", {
                      name: char.name.trim(),
                    })}
                  </div>
                )}
                <div>
                  {t("frameBuilder.review.faceHairSummary", {
                    face: char.face
                      ? getFaceLabel(char.face)
                      : t("frameBuilder.review.emptyValue"),
                    hair: char.hair
                      ? getHairLabel(char.hair)
                      : t("frameBuilder.review.emptyValue"),
                  })}
                </div>
                <div>
                  {t("frameBuilder.review.clothesSummary", {
                    top: char.top
                      ? getCatalogOptionLabel(char.top)
                      : t("frameBuilder.review.emptyValue"),
                    bottom: char.bottom
                      ? getCatalogOptionLabel(char.bottom)
                      : t("frameBuilder.review.emptyValue"),
                  })}
                </div>
                {char.accessories.length > 0 && (
                  <div>
                    {t("frameBuilder.review.handAccessoriesSummary", {
                      accessories: char.accessories.map(getAccessoryLabel).join(", "),
                    })}
                    <span className="text-foreground"> · +{formatEuro(getAccessoryTotal(char.accessories))}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {state.pets.length > 0 && (
            <div className="bg-background/50 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">
                  {t("frameBuilder.review.petsHeading")}
                </span>
                <span className="font-semibold text-primary">+{formatEuro(pricing.petsPrice)}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                {state.pets.map((id) => (
                  <div key={id}>
                    {getPetLabel(id)}
                    {state.petNames?.[id]?.trim() && (
                      <span className="text-foreground">
                        {t("frameBuilder.review.petNameSummary", {
                          name: state.petNames[id].trim(),
                        })}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {state.accessories.length > 0 && (
            <Row
              label={t("frameBuilder.review.backgroundAccessoriesSummary", {
                accessories: state.accessories.map(getAccessoryLabel).join(", "),
              })}
              value={`+${formatEuro(pricing.accPrice)}`}
              detail={state.accessories
                .map((id) => `${getAccessoryLabel(id)}: ${formatEuro(getAccessoryPrice(id))}`)
                .join(", ")}
            />
          )}

          {pricing.heartEntries.length > 0 && (
            <div className="bg-background/50 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">
                  {t("frameBuilder.review.heartsHeading")}
                </span>
                <span className="font-semibold text-primary">+{formatEuro(pricing.heartsPrice)}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                {pricing.heartEntries.map(([code, qty]) => (
                  <div key={code}>
                    {t("orderMessage.heartQuantityLine", {
                      heart: getHeartLabel(code),
                      quantity: qty,
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-background/50 p-3 rounded-lg border border-border/50 flex justify-between items-start gap-2">
            <div>
              <p className="text-sm">
                {t("frameBuilder.review.backgroundSummary", {
                  background: t(
                    state.customBg
                      ? "frameBuilder.background.customTitle"
                      : "frameBuilder.background.whiteTitle",
                  ),
                })}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {state.customBg
                  ? t("frameBuilder.review.customBackgroundPrice")
                  : t("frameBuilder.review.includedPrice")}
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
              <span className="text-muted-foreground">
                {t("frameBuilder.review.productLabel")}
              </span>
              <span className="font-semibold">{formatEuro(pricing.productTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {getDeliveryMethodLabel(state.deliveryMethod)}:
              </span>
              <span className="font-semibold">{formatEuro(pricing.deliveryPrice)}</span>
            </div>
            <div className="flex justify-between items-end border-t border-border pt-3">
              <span className="text-lg">
                {t("frameBuilder.review.totalLabel")}
              </span>
              <span className="text-4xl font-bold text-primary" data-testid="text-frame-total">
                {formatEuro(pricing.total)}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic">
            {t("frameBuilder.review.finalPriceNotice")}
          </p>


          <div className="space-y-3">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 border border-[#111111]"
              onClick={handleOpenTelegram}
              data-testid="btn-open-telegram"
            >
              <Send className="w-5 h-5 mr-2" />
              {t("frameBuilder.review.submitTelegram")}
            </Button>
            <Button
              className="w-full h-12 bg-[#1a1a1a] hover:bg-primary/10 text-foreground border border-primary/70"
              onClick={handleCopy}
              data-testid="btn-copy-order"
            >
              <Copy className="w-4 h-4 mr-2" />
              {t("frameBuilder.review.copyOrder")}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            {t("frameBuilder.review.afterCopyHint")}
          </p>
        </div>
      </div>
    </div>
  );
}

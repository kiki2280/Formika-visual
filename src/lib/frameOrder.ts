import i18n from "@/i18n";
import { PRICING, formatEuro } from "./pricing";
import { getAccessoryTotal } from "./accessoryPricing";
import {
  getAccessoryLabel,
  getCatalogOptionLabel,
  getDeliveryMethodLabel,
  getFaceLabel,
  getFrameColorLabel,
  getHairLabel,
  getHeartLabel,
  getLightingLabel,
  getPetLabel,
  type FrameOrderState,
} from "./types";

export interface FramePricing {
  framePrice: number;
  lightingPrice: number;
  extraCharsCount: number;
  extraCharsPrice: number;
  charAccCount: number;
  charAccPrice: number;
  petsPrice: number;
  accPrice: number;
  heartsCount: number;
  heartsPrice: number;
  bgPrice: number;
  productTotal: number;
  deliveryPrice: number;
  total: number;
  heartEntries: [string, number][];
}

export function computeFramePricing(state: FrameOrderState): FramePricing {
  const framePrice = PRICING.frame[state.size];
  const lightingPrice = PRICING.lighting[state.lighting];
  const extraCharsCount = Math.max(0, state.characters.length - 1);
  const extraCharsPrice = extraCharsCount * PRICING.extraCharacter;
  const charAccCount = state.characters.reduce((sum, c) => sum + c.accessories.length, 0);
  const charAccPrice = state.characters.reduce((sum, c) => sum + getAccessoryTotal(c.accessories), 0);
  const petsPrice = state.pets.length * PRICING.pet;
  const accPrice = getAccessoryTotal(state.accessories);
  const heartEntries = Object.entries(state.hearts).filter(([, qty]) => qty > 0);
  const heartsCount = heartEntries.reduce((sum, [, qty]) => sum + qty, 0);
  const heartsPrice = heartsCount * PRICING.heart;
  const bgPrice = state.customBg ? PRICING.customBg : 0;
  const productTotal =
    framePrice + lightingPrice + extraCharsPrice + charAccPrice + petsPrice + accPrice + heartsPrice + bgPrice;
  const deliveryPrice = state.deliveryPrice;
  const total = productTotal + deliveryPrice;

  return {
    framePrice,
    lightingPrice,
    extraCharsCount,
    extraCharsPrice,
    charAccCount,
    charAccPrice,
    petsPrice,
    accPrice,
    heartsCount,
    heartsPrice,
    bgPrice,
    productTotal,
    deliveryPrice,
    total,
    heartEntries,
  };
}

export function getFrameOrderText(state: FrameOrderState): string {
  const { heartsPrice, heartEntries, productTotal, deliveryPrice, total } = computeFramePricing(state);
  const t = i18n.t.bind(i18n);
  const deliveryLabel = getDeliveryMethodLabel(state.deliveryMethod);

  const lines: string[] = [
    t("orderMessage.greeting"),
    "",
    t("orderMessage.productTypeHeading"),
    t("orderMessage.frameProduct"),
    "",
    t("orderMessage.sizeHeading"),
    state.size,
    "",
    t("orderMessage.colorHeading"),
    getFrameColorLabel(state.color),
    "",
    t("orderMessage.lightingHeading"),
    getLightingLabel(state.lighting),
    "",
  ];

  state.characters.forEach((char, i) => {
    lines.push(t("orderMessage.characterHeading", { number: i + 1 }));
    if (char.name.trim()) {
      lines.push(t("orderMessage.nameLine", { name: char.name.trim() }));
    }
    const notSelected = t("common.notSelectedNeuter");
    lines.push(t("orderMessage.faceLine", {
      face: char.face ? getFaceLabel(char.face) : notSelected,
    }));
    lines.push(t("orderMessage.hairLine", {
      hair: char.hair ? getHairLabel(char.hair) : notSelected,
    }));
    lines.push(t("orderMessage.topLine", {
      top: char.top ? getCatalogOptionLabel(char.top) : notSelected,
    }));
    lines.push(t("orderMessage.bottomLine", {
      bottom: char.bottom ? getCatalogOptionLabel(char.bottom) : notSelected,
    }));
    if (char.accessories.length > 0) {
      lines.push(t("orderMessage.handAccessoriesLine", {
        accessories: char.accessories.map(getAccessoryLabel).join(", "),
      }));
    }
    lines.push("");
  });

  if (state.pets.length > 0) {
    lines.push(t("orderMessage.petsHeading"));
    state.pets.forEach((id) => {
      lines.push(getPetLabel(id));
      const name = state.petNames?.[id]?.trim();
      if (name) lines.push(t("orderMessage.nameLine", { name }));
    });
    lines.push("");
  }

  if (state.accessories.length > 0) {
    lines.push(t("orderMessage.backgroundAccessoriesHeading"));
    lines.push(state.accessories.map(getAccessoryLabel).join(", "));
    lines.push("");
  }

  if (heartEntries.length > 0) {
    lines.push(t("orderMessage.heartsHeading"));
    heartEntries.forEach(([code, qty]) => lines.push(t("orderMessage.heartQuantityLine", {
      heart: getHeartLabel(code),
      quantity: qty,
    })));
    lines.push("");
    lines.push(t("orderMessage.heartsPriceHeading"));
    lines.push(formatEuro(heartsPrice));
    lines.push("");
  }

  lines.push(t("orderMessage.backgroundHeading"));
  if (state.customBg) {
    lines.push(t("orderMessage.customBackgroundLine", {
      price: formatEuro(PRICING.customBg),
    }));
    lines.push(t("orderMessage.customBackgroundDisclaimer"));
  } else {
    lines.push(t("orderMessage.whiteBackgroundLine"));
  }
  lines.push("");

  lines.push(t("orderMessage.deliveryMethodHeading"));
  lines.push(deliveryLabel);
  if (state.deliveryMethod === "pickup") {
    lines.push(t("orderMessage.pickupNote"));
  }
  lines.push("");

  lines.push(t("orderMessage.productPriceHeading"));
  lines.push(formatEuro(productTotal));
  lines.push(state.deliveryMethod === "pickup"
    ? t("orderMessage.pickupPriceHeading")
    : t("orderMessage.deliveryPriceHeading"));
  lines.push(formatEuro(deliveryPrice));
  lines.push(t("orderMessage.totalHeading"));
  lines.push(formatEuro(total));
  lines.push("");
  lines.push(t("orderMessage.commentHeading"));

  return lines.join("\n");
}

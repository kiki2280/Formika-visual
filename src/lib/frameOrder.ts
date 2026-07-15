import { DELIVERY_LABELS, PICKUP_NOTE, PRICING, formatEuro } from "./pricing";
import { getAccessoryTotal } from "./accessoryPricing";
import type { FrameOrderState } from "./types";

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
  const deliveryLabel = state.deliveryMethod ? DELIVERY_LABELS[state.deliveryMethod] : "не выбран";

  const lines: string[] = [
    "Здравствуйте! Хочу заказать FORMIKA.",
    "",
    "Тип товара:",
    "Рамка",
    "",
    "Размер:",
    state.size,
    "",
    "Цвет:",
    state.color,
    "",
    "Подсветка:",
    state.lighting,
    "",
  ];

  state.characters.forEach((char, i) => {
    lines.push(`Человечек ${i + 1}:`);
    if (char.name.trim()) lines.push(`Имя: ${char.name.trim()}`);
    lines.push(`Лицо: ${char.face || "не выбрано"}`);
    lines.push(`Волосы: ${char.hair || "не выбрано"}`);
    lines.push(`Верх: ${char.top || "не выбрано"}`);
    lines.push(`Низ: ${char.bottom || "не выбрано"}`);
    if (char.accessories.length > 0) {
      lines.push(`Аксессуары в руки: ${char.accessories.join(", ")}`);
    }
    lines.push("");
  });

  if (state.pets.length > 0) {
    lines.push("Питомцы:");
    state.pets.forEach((id) => {
      lines.push(id);
      const name = state.petNames?.[id]?.trim();
      if (name) lines.push(`Имя: ${name}`);
    });
    lines.push("");
  }

  if (state.accessories.length > 0) {
    lines.push("Детали фона:");
    lines.push(state.accessories.join(", "));
    lines.push("");
  }

  if (heartEntries.length > 0) {
    lines.push("Сердечки на фон:");
    heartEntries.forEach(([code, qty]) => lines.push(`${code} x ${qty}`));
    lines.push("");
    lines.push("Стоимость сердечек:");
    lines.push(formatEuro(heartsPrice));
    lines.push("");
  }

  lines.push("Фон:");
  if (state.customBg) {
    lines.push(`Индивидуальный фон - от +${formatEuro(PRICING.customBg)}`);
    lines.push("Цена может меняться в зависимости от сложности.");
  } else {
    lines.push("Белый фон - входит в стоимость");
  }
  lines.push("");

  lines.push("Способ получения:");
  lines.push(deliveryLabel);
  if (state.deliveryMethod === "pickup") lines.push(PICKUP_NOTE);
  lines.push(`deliveryMethod: ${state.deliveryMethod ?? "not_selected"}`);
  lines.push(`deliveryPrice: ${deliveryPrice}`);
  lines.push("");

  lines.push("Стоимость товара:");
  lines.push(formatEuro(productTotal));
  lines.push(state.deliveryMethod === "pickup" ? "Самовывоз:" : "Доставка:");
  lines.push(formatEuro(deliveryPrice));
  lines.push("Итого:");
  lines.push(formatEuro(total));
  lines.push("");
  lines.push("Комментарий:");

  return lines.join("\n");
}

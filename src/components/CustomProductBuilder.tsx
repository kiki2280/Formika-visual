import { useMemo, useState } from "react";
import { ChevronLeft, Copy, Send } from "lucide-react";
import {
  DELIVERY_LABELS,
  PICKUP_NOTE,
  PRICING,
  READY_KEYCHAINS,
  formatEuro,
  getDeliveryPrice,
  type DeliveryMethod,
} from "@/lib/pricing";
import {
  makeCharacter,
  type Character,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import DeliveryMethodSelector from "@/components/DeliveryMethodSelector";
import { useToast } from "@/hooks/use-toast";
import { CONTACTS } from "@/lib/contacts";
import CharacterBuilder from "./CharacterBuilder";
import PetSelectionGrid from "./PetSelectionGrid";

type CustomProductType = "keychain";
type Mode = "choice" | "ready" | "custom";

type ReadyItem = {
  id: string;
  name: string;
  price: number;
  img: string;
};

interface CustomProductBuilderProps {
  productType: CustomProductType;
}

interface CustomProductState {
  mode: Mode;
  readyQuantities: Record<string, number>;
  characters: Character[];
  pets: string[];
  deliveryMethod: DeliveryMethod | null;
  deliveryPrice: number;
}

const DEFAULT_CLOTHING = {
  top: "TOP-13",
  bottom: "BOTTOM-13",
};

/**
 * Единый стиль всех заголовков внутри конструктора.
 * Размер текста задаётся отдельно у каждого заголовка.
 */
const HEADING_CLASS =
  "font-serif font-medium tracking-[0.01em]";

const COPY = {
  keychain: {
    customTitle: "Создать свой брелок",
    customSubtitle: "Соберите человечка в общем редакторе",
    customOrderName: "Кастомный брелок",
    readyTitle: "Готовые брелки",
    readySubtitle: "Выберите готовый брелок из каталога",
    readyOrderName: "Готовые брелки",
    unitPrice: PRICING.customKeychainChar,
    readyItems: READY_KEYCHAINS as ReadyItem[],
    maxCharacters: 4,
    customImage: "optimized/product-keychain-card1.webp",
    readyImage: "optimized/ready-keychain-3.webp",
  },
} satisfies Record<
  CustomProductType,
  {
    customTitle: string;
    customSubtitle: string;
    customOrderName: string;
    readyTitle: string;
    readySubtitle: string;
    readyOrderName: string;
    unitPrice: number;
    readyItems: ReadyItem[];
    maxCharacters: number;
    customImage: string;
    readyImage: string;
  }
>;

export default function CustomProductBuilder({
  productType,
}: CustomProductBuilderProps) {
  const { toast } = useToast();
  const config = COPY[productType];

  const [state, setState] = useState<CustomProductState>({
    mode: "choice",
    readyQuantities: {},
    characters: [makeCharacter("1", DEFAULT_CLOTHING)],
    pets: [],
    deliveryMethod: null,
    deliveryPrice: 0,
  });

  const readyTotal = useMemo(
    () =>
      config.readyItems.reduce(
        (sum, item) =>
          sum +
          (state.readyQuantities[item.id] ?? 0) * item.price,
        0,
      ),
    [config.readyItems, state.readyQuantities],
  );

  const readySelected = config.readyItems.some(
    (item) => (state.readyQuantities[item.id] ?? 0) > 0,
  );

  const petsPrice = state.pets.length * PRICING.pet;
  const customSelected = state.characters.length > 0;

  const customBaseTotal =
    state.characters.length * config.unitPrice;

  const customTotal = customSelected
    ? customBaseTotal + petsPrice
    : 0;

  const setMode = (mode: Mode) => {
    setState((current) => ({
      ...current,
      mode,
    }));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const setDeliveryMethod = (method: DeliveryMethod) => {
    setState((current) => ({
      ...current,
      deliveryMethod: method,
      deliveryPrice: getDeliveryPrice(method),
    }));
  };

  const setCustomPets = (
    pets: string[],
    _removedPets: string[],
  ) => {
    setState((current) => ({
      ...current,
      pets,
    }));
  };

  const incReady = (id: string) => {
    setState((current) => ({
      ...current,
      readyQuantities: {
        ...current.readyQuantities,
        [id]:
          (current.readyQuantities[id] ?? 0) + 1,
      },
    }));
  };

  const decReady = (id: string) => {
    setState((current) => ({
      ...current,
      readyQuantities: {
        ...current.readyQuantities,
        [id]: Math.max(
          0,
          (current.readyQuantities[id] ?? 0) - 1,
        ),
      },
    }));
  };

  const requireDelivery = () => {
    if (state.deliveryMethod) return true;

    toast({
      title: "Выберите способ получения",
      description:
        "Перед отправкой заказа выберите доставку или самовывоз.",
      variant: "destructive",
    });

    return false;
  };

  const activeProductTotal =
    state.mode === "ready"
      ? readyTotal
      : customTotal;

  const activeGrandTotal =
    activeProductTotal + state.deliveryPrice;

  const getOrderText = () => {
    const lines = [
      "Здравствуйте! Хочу заказать FORMIKA.",
      "",
      "Тип товара:",
      state.mode === "ready"
        ? config.readyOrderName
        : config.customOrderName,
      "",
    ];

    if (state.mode === "ready") {
      config.readyItems.forEach((item) => {
        const quantity =
          state.readyQuantities[item.id] ?? 0;

        if (quantity > 0) {
          lines.push(
            `${item.name}: ${quantity} шт x ${formatEuro(
              item.price,
            )} = ${formatEuro(
              quantity * item.price,
            )}`,
          );
        }
      });

      lines.push("");
    } else {
      state.characters.forEach(
        (character, index) => {
          lines.push(`Человечек ${index + 1}:`);
          lines.push(
            `Лицо: ${
              character.face || "не выбрано"
            }`,
          );
          lines.push(
            `Волосы: ${
              character.hair || "не выбрано"
            }`,
          );
          lines.push(
            `Верх: ${
              character.top || "не выбрано"
            }`,
          );
          lines.push(
            `Низ: ${
              character.bottom || "не выбрано"
            }`,
          );

          if (character.accessories?.length) {
            lines.push(
              `Аксессуары: ${character.accessories.join(
                ", ",
              )}`,
            );
          }

          lines.push("");
        },
      );

      if (state.pets.length > 0) {
        lines.push("Питомцы:");

        state.pets.forEach((id) => {
          lines.push(
            `${id} (+${formatEuro(PRICING.pet)})`,
          );
        });

        lines.push("");
      }
    }

    lines.push("Способ получения:");

    lines.push(
      state.deliveryMethod
        ? DELIVERY_LABELS[state.deliveryMethod]
        : "не выбран",
    );

    if (state.deliveryMethod === "pickup") {
      lines.push(PICKUP_NOTE);
    }

    lines.push(
      `deliveryMethod: ${
        state.deliveryMethod ?? "not_selected"
      }`,
    );

    lines.push(
      `deliveryPrice: ${state.deliveryPrice}`,
    );

    lines.push("");

    lines.push(
      `Стоимость товара: ${formatEuro(
        activeProductTotal,
      )}`,
    );

    lines.push(
      `${
        state.deliveryMethod === "pickup"
          ? "Самовывоз"
          : "Доставка"
      }: ${formatEuro(state.deliveryPrice)}`,
    );

    lines.push(
      `Итого: ${formatEuro(activeGrandTotal)}`,
    );

    return lines.join("\n");
  };

  const copyOrder = async () => {
    if (!requireDelivery()) return;

    try {
      await navigator.clipboard.writeText(
        getOrderText(),
      );

      toast({
        title: "Скопировано",
        description:
          "Заказ скопирован в буфер",
      });
    } catch {
      toast({
        title: "Не удалось скопировать",
        description:
          "Попробуйте скопировать заказ ещё раз.",
        variant: "destructive",
      });
    }
  };

  const openTelegram = () => {
    if (!requireDelivery()) return;

    window.open(
      CONTACTS.orderTelegram.href,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const renderDeliverySummary = (
    productTotal: number,
  ) => (
    <div className="space-y-4">
      <DeliveryMethodSelector
        value={state.deliveryMethod}
        onChange={setDeliveryMethod}
      />

      <div className="rounded-2xl border border-white/[0.09] bg-black/20 p-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between font-sans text-sm">
            <span className="text-white/45">Товар</span>
            <span className="font-medium text-white">
              {formatEuro(productTotal)}
            </span>
          </div>

          <div className="flex items-center justify-between font-sans text-sm">
            <span className="text-white/45">
              {state.deliveryMethod === "pickup"
                ? "Самовывоз"
                : "Доставка"}
            </span>
            <span className="font-medium text-white">
              {formatEuro(state.deliveryPrice)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-white/[0.09] pt-4">
          <span className="font-sans text-base font-semibold text-white">
            Итого
          </span>
          <span className="font-sans text-2xl font-semibold text-primary">
            {formatEuro(productTotal + state.deliveryPrice)}
          </span>
        </div>
      </div>
    </div>
  );

  const renderActions = (
    disabled: boolean,
    hint: string,
  ) => (
    <div className="mt-6 border-t border-white/[0.09] pt-5">
      <div className="space-y-3">
        <Button
          type="button"
          disabled={disabled}
          onClick={openTelegram}
          className="h-12 w-full rounded-xl border-0 bg-primary font-sans text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_rgba(255,106,0,0.18)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_15px_35px_rgba(255,106,0,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
          data-testid={`btn-open-telegram-${productType}`}
        >
          <Send className="mr-2 h-4 w-4" />
          Открыть Telegram
        </Button>

        <Button
          type="button"
          disabled={disabled}
          onClick={copyOrder}
          className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.025] font-sans text-sm font-medium text-white/65 transition-all duration-300 hover:border-primary/45 hover:bg-primary/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          data-testid={`btn-copy-${productType}-order`}
        >
          <Copy className="mr-2 h-4 w-4" />
          Скопировать заказ
        </Button>
      </div>

      {(disabled || !state.deliveryMethod) && (
        <p className="mt-3 text-center font-sans text-xs leading-relaxed text-primary">
          {disabled ? hint : "Выберите способ получения."}
        </p>
      )}
    </div>
  );

  const renderModeBack = () => (
    <button
      type="button"
      onClick={() => setMode("choice")}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
      data-testid={`btn-back-to-${productType}-choice`}
    >
      <ChevronLeft className="h-4 w-4" />
      Назад к вариантам
    </button>
  );

  const choiceCard = ({
      mode,
      title,
      subtitle,
      image,
      imagePosition,
      testId,
    }: {
      mode: Mode;
      title: string;
      subtitle: string;
      image: string;
      imagePosition: string;
      testId: string;
    }) => (
    <button
      type="button"
      onClick={() => setMode(mode)}
      data-testid={testId}
      aria-label={title}
      className="group relative block min-h-[360px] w-full cursor-pointer overflow-hidden rounded-3xl border-2 border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <img
        src={`${import.meta.env.BASE_URL}images/${image}`}
        alt=""
        width={640}
        height={640}
        loading="eager"
        decoding="async"
        className={`
        absolute inset-0 h-full w-full object-cover
        ${imagePosition}
        transition-transform duration-500
        group-hover:scale-105
      `}
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-7">
        <h3
          className={`mb-2 text-2xl ${HEADING_CLASS}`}
        >
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </button>
  );

  const renderChoice = () => (
    <div className="space-y-4">
      <div>
        <h2
          className={`text-2xl sm:text-3xl ${HEADING_CLASS}`}
        >
          Брелки
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Выберите готовые брелки или кастомную
          сборку.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {choiceCard({
          mode: "ready",
          title: config.readyTitle,
          subtitle: config.readySubtitle,
          image: config.readyImage,
          imagePosition: "object-[center_85%]",
          testId: "section-ready-keychain",
        })}

        {choiceCard({
          mode: "custom",
          title: config.customTitle,
          subtitle: config.customSubtitle,
          image: config.customImage,
          imagePosition: "object-[center_75%]",
          testId: "section-custom-keychain",
        })}
      </div>
    </div>
  );

  const renderReady = () => (
    <div className="space-y-6">
      {renderModeBack()}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <section className="rounded-[28px] border border-white/[0.09] bg-white/[0.025] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-6">
          <div className="mb-5">
            <h3 className={`text-xl ${HEADING_CLASS}`}>
              {config.readyTitle}
            </h3>
            <p className="mt-1 font-sans text-sm text-white/45">
              Выберите модель и укажите количество.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
  {config.readyItems.map((item) => {
    const quantity =
      state.readyQuantities[item.id] ?? 0;

    const isSelected = quantity > 0;

    return (
      <div
        key={item.id}
        className={`
          flex h-full flex-col
          rounded-[24px] border p-3
          transition-all duration-300

          ${
            isSelected
              ? "border-primary/80 bg-primary/[0.055] shadow-[0_0_0_1px_rgba(255,106,0,0.25),0_16px_40px_rgba(0,0,0,0.28)]"
              : "border-white/[0.09] bg-black/15 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
          }
        `}
        data-testid={`ready-${productType}-${item.id}`}
      >
        <div className="relative h-[280px] w-full overflow-hidden rounded-[18px] bg-black/25 sm:h-[310px]">
          <img
            src={`${import.meta.env.BASE_URL}images/${item.img}`}
            alt={item.name}
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="
              absolute inset-0
              h-full w-full
              scale-[1.14]
              object-cover
              transition-transform duration-500
              hover:scale-[1.19]
            "
          />
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <p className="font-sans text-base font-semibold leading-snug text-white">
            {item.name}
          </p>

          <p className="mt-2 font-sans text-base font-semibold text-primary">
            {formatEuro(item.price)}
          </p>

          <div className="mt-auto flex items-center justify-between pt-5">
            <button
              type="button"
              onClick={() => decReady(item.id)}
              disabled={quantity <= 0}
              aria-label={`Уменьшить количество ${item.name}`}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full border border-white/[0.12]
                bg-black/20
                font-sans text-lg text-white/55
                transition-all duration-200
                hover:border-primary/60
                hover:text-primary
                disabled:cursor-not-allowed
                disabled:opacity-25
              "
              data-testid={`btn-decrease-${item.id}`}
            >
              −
            </button>

            <span
              className="
                w-10 text-center
                font-sans text-base font-semibold
                tabular-nums text-white
              "
              data-testid={`qty-${item.id}`}
            >
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => incReady(item.id)}
              aria-label={`Увеличить количество ${item.name}`}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full border border-primary/60
                bg-primary/[0.05]
                font-sans text-lg text-primary
                transition-all duration-200
                hover:bg-primary
                hover:text-white
              "
              data-testid={`btn-increase-${item.id}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>
        </section>

        <aside className="rounded-[28px] border border-white/[0.09] bg-[#171717]/95 p-5 shadow-[0_22px_65px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6 xl:sticky xl:top-24">
          <div className="border-b border-white/[0.09] pb-4">
            <h3 className={`text-xl ${HEADING_CLASS}`}>
              Ваш заказ
            </h3>
            <p className="mt-1 font-sans text-xs text-white/40">
              Проверьте выбранные товары перед отправкой.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-4">
              <p className="font-sans text-xs text-white/38">
                Тип товара
              </p>
              <p className="mt-1 font-sans text-sm font-semibold text-white">
                {config.readyOrderName}
              </p>
            </div>

            {readySelected ? (
              <div className="space-y-2">
                {config.readyItems.map((item) => {
                  const quantity =
                    state.readyQuantities[item.id] ?? 0;

                  if (quantity <= 0) return null;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-black/15 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-sans text-sm font-medium text-white">
                          {item.name}
                        </p>
                        <p className="mt-0.5 font-sans text-xs text-white/38">
                          {quantity} × {formatEuro(item.price)}
                        </p>
                      </div>

                      <span className="shrink-0 font-sans text-sm font-semibold text-primary">
                        {formatEuro(quantity * item.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/[0.1] px-4 py-5 text-center">
                <p className="font-sans text-sm text-white/38">
                  Пока ничего не выбрано
                </p>
              </div>
            )}

            {renderDeliverySummary(readyTotal)}
          </div>

          {renderActions(
            !readySelected,
            "Выберите хотя бы один брелок.",
          )}
        </aside>
      </div>
    </div>
  );

  const renderCustom = () => (
    <div className="space-y-5">
      {renderModeBack()}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-xl sm:p-6">
          <div className="mb-5">
            <h3
              className={`text-2xl ${HEADING_CLASS}`}
            >
              {config.customTitle}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Общий редактор персонажа ·{" "}
              {formatEuro(config.unitPrice)} за
              человечка
            </p>
          </div>

          <CharacterBuilder
            characters={state.characters}
            onChange={(characters) =>
              setState((current) => ({
                ...current,
                characters,
              }))
            }
            maxCharacters={config.maxCharacters}
            extraCharacterPrice={config.unitPrice}
            note="Один редактор персонажа используется для рамок и брелков."
            addButtonLabel="Добавить человечка"
            showName
            showAccessories
          />

          <div className="mt-6 rounded-2xl border border-border bg-background/35 p-4 sm:p-5">
            <div className="mb-4">
              <h4
                className={`text-xl ${HEADING_CLASS}`}
              >
                Питомцы
              </h4>

              <p className="mt-1 text-sm text-muted-foreground">
                Выберите питомца для общей
                композиции товара.
              </p>
            </div>

            <PetSelectionGrid
              selectedPets={state.pets}
              onSelectionChange={setCustomPets}
              testIdPrefix={`${productType}-pet`}
            />
          </div>
        </div>

        <div className="xl:sticky xl:top-6">
          <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur">
            <h3
              className={`mb-4 border-b border-border pb-3 text-xl ${HEADING_CLASS}`}
            >
              Ваш заказ
            </h3>

            <div className="space-y-3">
              <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                <p className="text-sm text-muted-foreground">
                  Тип товара
                </p>

                <p className="font-semibold">
                  {config.customOrderName}
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                <p className="text-sm text-muted-foreground">
                  Человечки
                </p>

                <p className="font-semibold">
                  {state.characters.length} x{" "}
                  {formatEuro(config.unitPrice)}
                </p>
              </div>

              {state.pets.length > 0 && (
                <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Питомцы
                    </span>

                    <span className="font-semibold text-primary">
                      +{formatEuro(petsPrice)}
                    </span>
                  </div>
                </div>
              )}

              {renderDeliverySummary(customTotal)}
            </div>

            {renderActions(
              !customSelected,
              "Соберите хотя бы одного человечка.",
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {state.mode === "choice" &&
        renderChoice()}

      {state.mode === "ready" &&
        renderReady()}

      {state.mode === "custom" &&
        renderCustom()}
    </div>
  );
}
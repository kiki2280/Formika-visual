import {
  CalendarClock,
  Check,
  CreditCard,
  MessageCircle,
  PackageCheck,
  Send,
  Truck,
} from "lucide-react";
import LegalPage from "@/components/LegalPage";
import { CONTACTS } from "@/lib/contacts";

export default function Delivery() {
  return (
    <LegalPage
      title="Доставка и оплата"
      intro="Все детали заказа согласовываются лично в Telegram. Перед изготовлением мы подтверждаем комплектацию, стоимость и сроки."
      sections={[
        {
          title: "Как проходит оформление",
          content: (
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Заявка",
                  text: "Вы собираете композицию на сайте и отправляете заказ.",
                  icon: PackageCheck,
                },
                {
                  number: "02",
                  title: "Согласование",
                  text: "Мы уточняем детали, наличие элементов и финальную стоимость.",
                  icon: MessageCircle,
                },
                {
                  number: "03",
                  title: "Изготовление",
                  text: "После подтверждения начинаем создавать ваш заказ.",
                  icon: Check,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="
                      relative overflow-hidden rounded-2xl
                      border border-white/[0.08]
                      bg-white/[0.025] p-4
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-primary/35
                      hover:bg-primary/[0.035]
                    "
                  >
                    <span className="absolute right-4 top-3 font-sans text-xs font-semibold tracking-[0.12em] text-white/[0.16]">
                      {item.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-4 font-sans text-sm font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.45]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          ),
        },
        {
          title: "Доставка",
          content: (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <Truck className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-sans text-base font-semibold text-white">
                      Доставка по Латвии
                    </h3>

                    <p className="mt-1 max-w-lg font-sans text-sm leading-relaxed text-white/[0.45]">
                      Способ получения и данные доставки подтверждаются
                      при согласовании заказа в Telegram.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 rounded-2xl border border-primary/25 bg-primary/[0.06] px-5 py-3 text-center">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-white/[0.35]">
                    Стоимость
                  </p>

                  <p className="mt-1 font-sans text-2xl font-semibold text-primary">
                    4,50 €
                  </p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Оплата",
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <CreditCard className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="font-sans text-xl font-semibold text-primary">
                      50%
                    </p>

                    <p className="font-sans text-sm font-semibold text-white">
                      Перед началом работы
                    </p>
                  </div>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-white/[0.43]">
                  Первая часть оплаты вносится после подтверждения
                  деталей и стоимости заказа.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <Check className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="font-sans text-xl font-semibold text-primary">
                      50%
                    </p>

                    <p className="font-sans text-sm font-semibold text-white">
                      После готовности
                    </p>
                  </div>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-white/[0.43]">
                  Оставшаяся часть оплачивается после завершения
                  изготовления заказа.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Срок изготовления",
          content: (
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <CalendarClock className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-sans text-base font-semibold text-white">
                      Обычно от 1 до 7 дней
                    </h3>

                    <p className="mt-1 max-w-lg font-sans text-sm leading-relaxed text-white/[0.45]">
                      Точный срок зависит от сложности композиции,
                      количества фигурок и наличия выбранных деталей.
                    </p>
                  </div>
                </div>

                <a
                  href={CONTACTS.orderTelegram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex h-11 shrink-0 items-center justify-center
                    rounded-xl bg-primary px-5
                    font-sans text-sm font-semibold text-primary-foreground
                    transition-all duration-300
                    hover:bg-primary/90
                    hover:shadow-[0_12px_30px_rgba(255,106,0,0.2)]
                  "
                >
                  <Send className="mr-2 h-4 w-4" />
                  Оформить заказ
                </a>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
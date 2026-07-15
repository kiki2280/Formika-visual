import {
  BadgeCheck,
  Camera,
  ClipboardList,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import LegalPage from "@/components/LegalPage";
import { CONTACTS } from "@/lib/contacts";

export default function Terms() {
  return (
    <LegalPage
      title="Условия заказа"
      intro="FORMIKA создаёт персонализированные изделия по индивидуальному запросу. Оформление проходит без регистрации — все детали подтверждаются лично в Telegram."
      sections={[
        {
          title: "Как оформляется заказ",
          content: (
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Выбор",
                  text: "Вы выбираете формат, фигурки, детали и оформление композиции.",
                  icon: ClipboardList,
                },
                {
                  number: "02",
                  title: "Заявка",
                  text: "Готовая заявка отправляется нам через Telegram.",
                  icon: Send,
                },
                {
                  number: "03",
                  title: "Согласование",
                  text: "Мы проверяем детали, наличие элементов, стоимость и сроки.",
                  icon: MessageCircle,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="
                      group relative overflow-hidden rounded-2xl
                      border border-white/[0.08]
                      bg-white/[0.025] p-5
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-primary/40
                      hover:bg-primary/[0.035]
                      hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]
                    "
                  >
                    <span className="absolute right-4 top-4 font-sans text-xs font-semibold tracking-[0.14em] text-white/[0.14]">
                      {item.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] text-primary transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-5 font-sans text-base font-semibold text-white">
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
          title: "Когда заказ считается подтверждённым",
          content: (
            <div className="overflow-hidden rounded-[22px] border border-primary/25 bg-primary/[0.045]">
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/[0.09] text-primary">
                  <BadgeCheck className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-base font-semibold text-white">
                    После согласования всех деталей
                  </h3>

                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.48]">
                    Отправленная заявка ещё не является окончательно
                    подтверждённым заказом. Сначала мы проверяем возможность
                    изготовления, наличие выбранных деталей, сроки и итоговую
                    стоимость.
                  </p>
                </div>
              </div>

              <div className="grid border-t border-primary/15 sm:grid-cols-2">
                <div className="flex items-start gap-3 border-b border-primary/15 p-4 sm:border-b-0 sm:border-r">
                  <MessageCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="font-sans text-sm font-semibold text-white">
                      До подтверждения
                    </p>

                    <p className="mt-1 font-sans text-xs leading-relaxed text-white/[0.4]">
                      Мы уточняем комплектацию, стоимость и срок изготовления.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4">
                  <PackageCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="font-sans text-sm font-semibold text-white">
                      После подтверждения
                    </p>

                    <p className="mt-1 font-sans text-xs leading-relaxed text-white/[0.4]">
                      Заказ передаётся в работу после согласования с клиентом.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Индивидуальное изготовление",
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <Sparkles className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-sans text-sm font-semibold text-white">
                    Персональная композиция
                  </h3>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-white/[0.45]">
                  Каждое изделие создаётся по выбранным вами параметрам:
                  формату, количеству фигурок, надписям, деталям и оформлению.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <Palette className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-sans text-sm font-semibold text-white">
                    Возможны небольшие отличия
                  </h3>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-white/[0.45]">
                  Цвета, фигурки, аксессуары и подсветка могут немного
                  отличаться от примеров на сайте из-за наличия деталей.
                  Возможные замены согласовываются с клиентом.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Материалы клиента и публикации",
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <LockKeyhole className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white">
                      Фото и личные материалы
                    </h3>

                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.45]">
                      Отправленные фотографии, имена и другие материалы
                      используются только для подготовки персонализированного
                      заказа.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <Camera className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white">
                      Публикация готовой работы
                    </h3>

                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.45]">
                      Фотографии готового изделия могут быть опубликованы
                      на сайте или в социальных сетях только с согласия
                      клиента.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Готовы оформить заказ?",
          content: (
            <div className="relative overflow-hidden rounded-[22px] border border-primary/25 bg-primary/[0.05] p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.08] text-primary">
                    <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-sans text-base font-semibold text-white">
                      Все детали подтверждаются заранее
                    </h3>

                    <p className="mt-1 max-w-lg font-sans text-sm leading-relaxed text-white/[0.45]">
                      Перед началом работы мы согласуем состав композиции,
                      возможные замены, стоимость и срок изготовления.
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
                    hover:shadow-[0_14px_34px_rgba(255,106,0,0.22)]
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
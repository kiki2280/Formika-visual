import { motion } from "@/lib/motion";
import {
  Users,
  Scissors,
  Shirt,
  Sparkles,
  PawPrint,
  Image,
  Type,
  Lightbulb,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const OPTIONS = [
  {
    title: "Количество персонажей",
    description: "Один человек, пара, семья или компания друзей.",
    icon: Users,
  },
  {
    title: "Лица и причёски",
    description: "Подберём внешность, подходящую под ваши фотографии.",
    icon: Scissors,
  },
  {
    title: "Одежда",
    description: "Выберите стиль, цвета и образ каждого персонажа.",
    icon: Shirt,
  },
  {
    title: "Аксессуары",
    description: "Добавьте хобби, профессию и важные детали истории.",
    icon: Sparkles,
  },
  {
    title: "Питомцы",
    description: "Разместите рядом любимого домашнего питомца.",
    icon: PawPrint,
  },
  {
    title: "Фон",
    description: "Подберите оформление под событие и настроение.",
    icon: Image,
  },
  {
    title: "Надпись",
    description: "Добавьте имена, дату или личное пожелание.",
    icon: Type,
  },
  {
    title: "Подсветка",
    description: "Выберите тёплый свет, RGB или эффект облаков.",
    icon: Lightbulb,
  },
];

export default function Personalization() {
  return (
    <section
      id="personalization"
      className="relative overflow-hidden py-20 md:py-24"
    >
      {/* Мягкое фоновое свечение */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Общий заголовок, такой же, как в других секциях */}
        <SectionHeading
          title="Что можно персонализировать"
          subtitle="Каждую композицию можно настроить под вашу историю — от внешности персонажей до фона, надписи и подсветки."
        />

        {/* Карточки */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map((option, index) => {
            const Icon = option.icon;

            return (
              <motion.article
  key={option.title}
  initial={{ opacity: 0, y: 22 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{
    duration: 0.45,
    delay: index * 0.05,
  }}
  className="
    group relative min-h-[180px] overflow-hidden rounded-[24px]
    border border-white/10
    bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent
    p-5
    shadow-[0_14px_35px_rgba(0,0,0,0.28)]
    transition-all duration-300
    hover:-translate-y-1
    hover:border-primary/45
    hover:shadow-[0_20px_48px_rgba(0,0,0,0.42),0_0_26px_rgba(255,106,0,0.07)]
  "
  data-testid={`card-personalization-${index}`}
>
  {/* Мягкое оранжевое свечение */}
  <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/[0.06] blur-3xl transition-all duration-300 group-hover:bg-primary/[0.12]" />

  <div className="relative flex h-full flex-col">
    <span
      className="
        flex h-10 w-10 items-center justify-center rounded-xl
        border border-primary/35 bg-primary/10 text-primary
        transition-all duration-300
        group-hover:border-primary/55
        group-hover:bg-primary/15
      "
    >
      <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
    </span>

    <div className="mt-auto pt-7">
      <h3 className="font-sans text-lg font-semibold leading-snug tracking-[-0.02em] text-white">
        {option.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-white/55">
        {option.description}
      </p>

      
    </div>
  </div>
</motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

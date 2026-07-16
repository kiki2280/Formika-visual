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

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-14"
        >
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-6">
            <span className="hidden h-px flex-1 bg-primary/40 sm:block" />
            <p className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-primary sm:text-xs">
              Кастомизация без границ
            </p>
            <span className="hidden h-px flex-1 bg-primary/40 sm:block" />
          </div>

          <h2 className="mx-auto mt-4 max-w-6xl font-serif text-lg font-medium uppercase leading-[1.12] tracking-normal text-white min-[375px]:text-[1.35rem] min-[390px]:text-[1.4rem] min-[430px]:text-[1.6rem] sm:text-4xl md:text-[2.875rem] lg:text-[3.25rem] xl:text-[3.65rem]">
            <span className="block">Что можно</span>
            <span className="mt-1 block text-primary">Персонализировать</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/55 sm:text-base">
            Каждую композицию можно настроить под вашу историю — от внешности персонажей до фона, надписи и подсветки.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                className="group relative flex h-[230px] overflow-hidden rounded-[28px] border border-white/10 bg-black/55 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.34)] transition-[transform,border-color,background-color,box-shadow] duration-300 lg:h-[270px] lg:p-7 lg:hover:-translate-y-1 lg:hover:border-primary/45 lg:hover:bg-black/65 lg:hover:shadow-[0_24px_58px_rgba(0,0,0,0.48),0_0_28px_rgba(255,106,0,0.08)]"
                data-testid={`card-personalization-${index}`}
              >
                <div className="pointer-events-none absolute left-7 right-20 top-0 h-px bg-primary/45" />
                <div className="pointer-events-none absolute right-0 top-7 h-20 w-px bg-primary/45" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/[0.06] blur-3xl transition-colors duration-300 group-hover:bg-primary/[0.1]" />

                <div className="relative flex h-full w-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>

                    <span className="font-sans text-xs font-semibold tracking-[0.12em] text-white/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-auto pt-8">
                    <h3 className="font-sans text-lg font-semibold leading-snug tracking-normal text-white">
                      {option.title}
                    </h3>

                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/55">
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

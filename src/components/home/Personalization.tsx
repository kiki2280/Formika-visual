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
import SectionHeading from "@/components/SectionHeading";

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
        <SectionHeading
          eyebrow="Кастомизация без границ"
          title="Что можно"
          accentTitle="Персонализировать"
          accentTitleClassName="whitespace-nowrap text-[clamp(1.125rem,5.6vw,1.5rem)] sm:text-[2.5rem] md:text-[2.875rem] lg:text-[3.625rem] xl:text-[3.75rem]"
          subtitle="Каждую композицию можно настроить под вашу историю — от внешности персонажей до фона, надписи и подсветки."
          size="wide"
        />

        <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                className="group relative flex h-[190px] overflow-hidden rounded-[28px] border border-white/[0.11] bg-[linear-gradient(145deg,rgba(34,34,36,0.93),rgba(20,20,22,0.94))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),inset_-1px_0_0_rgba(255,106,0,0.045),0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-[2px] transition-[transform,border-color,box-shadow] duration-300 sm:h-[230px] sm:p-6 lg:h-[250px] lg:p-7 lg:hover:-translate-y-1 lg:hover:border-primary/35 lg:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.045),inset_-1px_0_0_rgba(255,106,0,0.07),0_24px_58px_rgba(0,0,0,0.42),0_0_26px_rgba(255,106,0,0.06)]"
                data-testid={`card-personalization-${index}`}
              >
                <div className="pointer-events-none absolute left-5 right-16 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-primary/10 sm:left-6" />
                <div className="pointer-events-none absolute right-0 top-5 h-24 w-px bg-gradient-to-b from-primary/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(255,106,0,0.075),transparent_34%)]" />

                <div className="relative flex h-full w-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.055] text-primary transition-[border-color,background-color] duration-300 group-hover:border-primary/20 group-hover:bg-primary/10 sm:h-11 sm:w-11">
                      <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.8} />
                    </span>

                    <span className="font-sans text-xs font-semibold tracking-[0.12em] text-white/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-5 sm:mt-8">
                    <h3 className="font-sans text-base font-semibold leading-snug tracking-normal text-white sm:text-lg">
                      {option.title}
                    </h3>

                    <p className="mt-2 font-sans text-[13px] font-normal leading-relaxed text-white/65 sm:mt-2.5 sm:text-sm">
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

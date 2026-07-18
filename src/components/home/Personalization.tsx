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
import { useReducedMotion } from "framer-motion";
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

const DESKTOP_OFFSETS = [
  "md:pt-6",
  "md:pt-1",
  "md:pt-8",
  "md:pt-2",
  "md:pt-8",
  "md:pt-2",
  "md:pt-6",
  "md:pt-1",
];

const MOBILE_PATH =
  "M30 50 C30 83 42 117 42 150 C42 183 30 217 30 250 C30 283 42 317 42 350 C42 383 30 417 30 450 C30 483 42 517 42 550 C42 583 30 617 30 650 C30 683 42 717 42 750";

const DESKTOP_PATH =
  "M50 60 C85 60 115 40 150 40 C185 40 215 68 250 68 C285 68 315 44 350 44 C385 44 415 68 450 68 C485 68 515 44 550 44 C585 44 615 60 650 60 C685 60 715 40 750 40";

const LINE_VARIANTS = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.72, delay: 0.06, ease: "easeOut" },
  },
};

const DOT_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.64 },
  },
};

const NODE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.84 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.42,
      delay: 0.8 + index * 0.065,
      ease: "easeOut",
    },
  }),
};

const TEXT_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      delay: 0.9 + index * 0.065,
      ease: "easeOut",
    },
  }),
};

interface TimelineLineProps {
  path: string;
  viewBox: string;
  className: string;
  dots: Array<[number, number]>;
}

function TimelineLine({ path, viewBox, className, dots }: TimelineLineProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute z-0 select-none ${className}`}
    >
      <motion.path
        d={path}
        variants={LINE_VARIANTS}
        className="personalization-line-glow"
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        d={path}
        variants={LINE_VARIANTS}
        className="personalization-line-core"
        vectorEffect="non-scaling-stroke"
      />
      <motion.g variants={DOT_VARIANTS}>
        {dots.map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}-${index}`}
            cx={cx}
            cy={cy}
            r="1.8"
            className="personalization-line-dot"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </motion.g>
    </svg>
  );
}

export default function Personalization() {
  const shouldReduceMotion = useReducedMotion();

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
          accentTitleClassName="whitespace-nowrap text-[clamp(1.125rem,5.6vw,1.5rem)] md:text-[inherit]"
          subtitle="Каждую композицию можно настроить под вашу историю — от внешности персонажей до фона, надписи и подсветки."
          size="wide"
        />

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={shouldReduceMotion ? undefined : { once: true, margin: "-70px" }}
          className="personalization-timeline relative mx-auto max-w-[1376px] md:pb-10"
          data-testid="personalization-timeline"
        >
          <TimelineLine
            path={MOBILE_PATH}
            viewBox="0 0 72 800"
            className="inset-y-0 left-0 h-full w-[72px] md:hidden"
            dots={[
              [36, 100],
              [36, 200],
              [36, 300],
              [36, 400],
              [36, 500],
              [36, 600],
              [36, 700],
            ]}
          />

          <TimelineLine
            path={DESKTOP_PATH}
            viewBox="0 0 800 100"
            className="left-0 top-0 hidden h-[100px] w-full md:block"
            dots={[
              [100, 50],
              [200, 54],
              [300, 56],
              [400, 56],
              [500, 56],
              [600, 52],
              [700, 50],
            ]}
          />

          <ol className="relative z-10 grid grid-cols-1 grid-rows-[repeat(8,minmax(112px,1fr))] md:grid-cols-8 md:grid-rows-none md:gap-0">
            {OPTIONS.map((option, index) => {
              const Icon = option.icon;

              return (
                <li
                  key={option.title}
                  className={`personalization-timeline-item group grid min-w-0 grid-cols-[72px_minmax(0,1fr)] items-center gap-x-3 md:block md:px-1 md:text-center ${DESKTOP_OFFSETS[index]}`}
                  data-testid={`card-personalization-${index}`}
                >
                  <div
                    className={`personalization-node-anchor relative h-[60px] w-[60px] md:mx-auto md:h-[72px] md:w-[72px] ${
                      index % 2 === 0
                        ? "translate-x-0"
                        : "translate-x-3 md:translate-x-0"
                    }`}
                  >
                    <motion.div
                      custom={index}
                      variants={NODE_VARIANTS}
                      className="h-full w-full"
                    >
                      <div className="personalization-node-circle relative flex h-full w-full items-center justify-center rounded-full border border-primary/55 bg-[#17120f]/95 text-primary shadow-[inset_0_0_18px_rgba(255,106,0,0.10),inset_0_1px_0_rgba(255,220,190,0.08),0_0_0_5px_rgba(255,106,0,0.025),0_0_26px_rgba(255,106,0,0.13)]">
                        <span className="pointer-events-none absolute inset-[5px] rounded-full border border-primary/15" />
                        <span className="pointer-events-none absolute -right-0.5 top-2.5 h-2 w-2 rounded-full border border-[#2a1710] bg-primary shadow-[0_0_9px_rgba(255,106,0,0.72)] md:top-3" />
                        <Icon
                          className="relative h-[22px] w-[22px] md:h-[26px] md:w-[26px]"
                          strokeWidth={1.7}
                        />
                      </div>
                    </motion.div>

                    <motion.span
                      custom={index}
                      variants={TEXT_VARIANTS}
                      className="absolute left-1/2 top-[67px] z-10 -translate-x-1/2 rounded-full bg-[#111111]/95 px-1 font-sans text-[10px] font-semibold tracking-[0.16em] text-primary/80 shadow-[0_0_7px_4px_rgba(17,17,17,0.92)] md:top-[80px] md:bg-transparent md:px-0 md:shadow-none"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                  </div>

                  <motion.div
                    custom={index}
                    variants={TEXT_VARIANTS}
                    className="min-w-0 pr-1 text-left md:mx-auto md:mt-7 md:max-w-[156px] md:px-0 md:pr-0 md:text-center"
                  >
                    <h3 className="font-sans text-sm font-semibold leading-tight tracking-normal text-white md:text-xs lg:text-[13px] xl:text-sm">
                      {option.title}
                    </h3>

                    <p className="mt-1.5 font-sans text-[12px] font-normal leading-[1.5] text-white/58 md:mt-2 md:text-[11px] md:leading-[1.45] xl:text-xs">
                      {option.description}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

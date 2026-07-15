import { motion } from "@/lib/motion";
import {
  Gift,
  Send,
  MessageCircle,
  Hammer,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Выбираете формат подарка",
    description:
      "Подбираете композицию, персонажей и дополнительные детали.",
    icon: Gift,
  },
  {
    number: "02",
    title: "Отправляете заявку",
    description:
      "Готовая заявка отправляется нам через Telegram.",
    icon: Send,
  },
  {
    number: "03",
    title: "Согласовываем детали",
    description:
      "Уточняем пожелания, стоимость, сроки и способ получения заказа.",
    icon: MessageCircle,
  },
  {
    number: "04",
    title: "Создаём композицию",
    description:
      "После согласования и предоплаты аккуратно собираем ваш подарок.",
    icon: Hammer,
  },
  {
    number: "05",
    title: "Передаём готовый заказ",
    description:
      "Самовывоз или доставка по Латвии и другим странам Европы.",
    icon: PackageCheck,
  },
];

interface StepCardProps {
  step: Step;
  side: "left" | "right" | "mobile";
  index: number;
}

function StepCard({ step, side, index }: StepCardProps) {
  const Icon = step.icon;

  const startX =
    side === "left" ? -20 : side === "right" ? 20 : 0;

  return (
    <motion.article
      initial={{
        opacity: 0,
        x: startX,
        y: 10,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className="
        group relative overflow-hidden rounded-[26px]
        border border-white/10
        bg-gradient-to-br
        from-white/[0.04]
        via-white/[0.02]
        to-transparent
        p-5
        shadow-[0_18px_50px_rgba(0,0,0,0.28)]
        transition-[border-color,background-color,box-shadow] duration-300
        hover:border-primary/40
        hover:bg-primary/[0.025]
        hover:shadow-[0_24px_60px_rgba(0,0,0,0.42),0_0_28px_rgba(255,106,0,0.06)]
        md:p-6
      "
      data-testid={`card-order-process-${step.number}`}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-primary/[0.035] blur-3xl transition-colors duration-300 group-hover:bg-primary/[0.09]" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-2xl border border-primary/30
              bg-primary/10 text-primary
              transition-all duration-300
              group-hover:border-primary/50
              group-hover:bg-primary/15
              group-hover:shadow-[0_0_24px_rgba(255,106,0,0.15)]
            "
          >
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>

          <p className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-primary">
            Шаг {step.number}
          </p>
        </div>

        <h3 className="mt-5 font-sans text-lg font-semibold leading-snug text-white">
          {step.title}
        </h3>

        <p className="mt-3 font-sans text-sm leading-relaxed text-white/50">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function OrderProcess() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Как мы создаём ваш подарок"
          subtitle="От идеи до готовой композиции — просто и понятно."
        />

        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* Вертикальная линия на компьютере */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute bottom-10 left-1/2 top-10 hidden w-px
              -translate-x-1/2 origin-top
              bg-gradient-to-b
              from-transparent via-primary/65 to-transparent
              md:block
            "
          />

          {/* Вертикальная линия на телефоне */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute bottom-7 left-[21px] top-7 w-px
              origin-top
              bg-gradient-to-b
              from-transparent via-primary/65 to-transparent
              md:hidden
            "
          />

          <div className="space-y-10 md:space-y-6">
            {STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className="
                    relative
                    md:grid
                    md:grid-cols-[1fr_76px_1fr]
                    md:items-center
                  "
                >
                  {/* Карточка слева на компьютере */}
                  <div className="hidden md:block">
                    {isLeft && (
                      <div className="mr-5">
                        <StepCard step={step} side="left" index={index} />
                      </div>
                    )}
                  </div>

                  {/* Номер шага на центральной линии */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.88,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.45,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      absolute left-0 top-5 z-10
                      flex h-11 w-11 items-center justify-center
                      rounded-full border border-primary/60
                      bg-[#17120f] text-primary
                      shadow-[0_0_24px_rgba(255,106,0,0.16)]
                      md:static md:mx-auto md:h-14 md:w-14
                    "
                  >
                    <span className="font-sans text-[11px] font-extrabold tracking-[0.06em] md:text-xs">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Карточка справа на компьютере */}
                  <div className="hidden md:block">
                    {!isLeft && (
                      <div className="ml-5">
                        <StepCard step={step} side="right" index={index} />
                      </div>
                    )}
                  </div>

                  {/* Карточка на телефоне */}
                  <div className="ml-14 md:hidden">
                    <StepCard step={step} side="mobile" index={index} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

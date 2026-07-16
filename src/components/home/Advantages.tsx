import { motion } from "@/lib/motion";
import {
  Camera,
  MessagesSquare,
  Clock3,
  Truck,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const ITEMS = [
  {
    icon: Camera,
    number: "01",
    title: "По вашей фотографии",
    description:
      "Подбираем внешность, одежду и детали персонажей под вашу историю.",
  },
  {
    icon: MessagesSquare,
    number: "02",
    title: "Согласование до сборки",
    description:
      "Заранее уточняем пожелания, стоимость, сроки и все важные детали.",
  },
  {
    icon: Clock3,
    number: "03",
    title: "Изготовление 1–7 дней",
    description:
      "Срок зависит от сложности композиции и выбранного оформления.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Доставка по Европе",
    description:
      "Доставляем по Латвии и отправляем заказы в другие страны Европы.",
  },
];

export default function Advantages() {
  return (
    <section
      id="advantages"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Почему выбирают FORMIKA"
          title="Наши преимущества"
          subtitle="Простой и понятный процесс — от вашей идеи до готового подарка."
        />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.55 }}
          className="
            mt-10 overflow-hidden rounded-[30px]
            border border-white/10
            bg-gradient-to-r from-[#211d1a]/90 via-[#171513]/95 to-[#11100f]
            shadow-[0_24px_70px_rgba(0,0,0,0.35)]
          "
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={`
                    group relative min-h-0 p-4 sm:min-h-[230px] sm:p-7
                    transition-colors duration-300
                    hover:bg-primary/[0.025]

                    ${index !== 0 ? "border-t border-white/10 sm:border-t-0" : ""}
                    ${index % 2 !== 0 ? "sm:border-l sm:border-white/10" : ""}
                    ${index > 1 ? "sm:border-t sm:border-white/10 lg:border-t-0" : ""}
                    ${index !== 0 ? "lg:border-l lg:border-white/10" : ""}
                  `}
                  data-testid={`card-advantage-${index}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="
                        flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl
                        border border-primary/30 bg-primary/10 text-primary
                        transition-all duration-300
                        group-hover:border-primary/50
                        group-hover:bg-primary/15
                        group-hover:shadow-[0_0_26px_rgba(255,106,0,0.15)]
                      "
                    >
                      <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.8} />
                    </span>

                    <span className="text-xs font-bold tracking-[0.12em] text-white/15">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-sans text-base font-semibold leading-snug text-white sm:mt-8 sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/50 sm:mt-3 sm:text-sm">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "@/lib/motion";
import {
  Camera,
  MessagesSquare,
  Clock3,
  Truck,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useTranslation } from "react-i18next";

const ITEMS = [
  {
    icon: Camera,
    number: "01",
    titleKey: "home.advantages.photoTitle",
    descriptionKey: "home.advantages.photoDescription",
  },
  {
    icon: MessagesSquare,
    number: "02",
    titleKey: "home.advantages.approvalTitle",
    descriptionKey: "home.advantages.approvalDescription",
  },
  {
    icon: Clock3,
    number: "03",
    titleKey: "home.advantages.productionTitle",
    descriptionKey: "home.advantages.productionDescription",
  },
  {
    icon: Truck,
    number: "04",
    titleKey: "home.advantages.deliveryTitle",
    descriptionKey: "home.advantages.deliveryDescription",
  },
];

export default function Advantages() {
  const { t } = useTranslation();

  return (
    <section
      id="advantages"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("home.advantages.eyebrow")}
          title={
            <>
              <span>{t("home.advantages.titleStart")}</span>{" "}
              <span className="block whitespace-nowrap text-[clamp(1.3rem,6.4vw,1.7rem)] md:inline md:text-[44px]">
                {t("home.advantages.titleEnd")}
              </span>
            </>
          }
          subtitle={t("home.advantages.subtitle")}
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
                  key={item.titleKey}
                  className={`
                    group relative min-h-0 p-4 md:min-h-[230px] md:p-7
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
                        flex h-10 w-10 items-center justify-center rounded-xl md:h-12 md:w-12 md:rounded-2xl
                        border border-primary/30 bg-primary/10 text-primary
                        transition-all duration-300
                        group-hover:border-primary/50
                        group-hover:bg-primary/15
                        group-hover:shadow-[0_0_26px_rgba(255,106,0,0.15)]
                      "
                    >
                      <Icon
                        className="h-[18px] w-[18px] md:h-5 md:w-5"
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="text-xs font-bold tracking-[0.12em] text-white/15">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-sans text-base font-semibold leading-snug text-white md:mt-8 md:text-lg">
                    {t(item.titleKey)}
                  </h3>

                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/50 md:mt-3 md:text-sm">
                    {t(item.descriptionKey)}
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
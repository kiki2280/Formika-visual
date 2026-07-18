import type { CSSProperties } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Camera,
  Clock3,
  MessagesSquare,
  Sparkles,
  Truck,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useTranslation } from "react-i18next";

const base = import.meta.env.BASE_URL;

const COLLAGE = [
  {
    src: `${base}images/optimized/hero1.webp`,
    top: "9%",
    left: "2%",
    width: 174,
    sourceWidth: 1045,
    sourceHeight: 1400,
    rotate: -7,
    delay: "-1.4s",
    z: 10,
  },
  {
    src: `${base}images/optimized/hero4.webp`,
    top: "57%",
    left: "67%",
    width: 168,
    sourceWidth: 1045,
    sourceHeight: 1400,
    rotate: 7,
    delay: "-2.6s",
    z: 10,
  },
];

const TRUST_FEATURES = [
  {
    icon: Sparkles,
    labelKey: "home.hero.handmadeBadge",
  },
  {
    icon: Camera,
    labelKey: "home.hero.photoPersonalizationBadge",
  },
  {
    icon: Truck,
    labelKey: "home.hero.deliveryBadge",
  },
  {
    icon: MessagesSquare,
    labelKey: "home.hero.approvalBadge",
  },
];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24"
    >
      <div className="grid items-center gap-8 md:gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        {/* Левая часть */}
        <div className="relative z-20">
          <SectionHeading
            eyebrow={t("home.hero.eyebrow")}
            title={t("home.hero.title")}
            accentTitle={t("home.hero.accent")}
            subtitle={t("home.hero.subtitle")}
            align="left"
            as="h1"
            size="display"
            animated={false}
            className="mb-0"
          />

          {/* Кнопки */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Link
              href="/order"
              className="
                group inline-flex h-12 w-fit items-center justify-center gap-2
                whitespace-nowrap rounded-full bg-primary px-6
                text-xs font-bold uppercase tracking-[0.06em]
                text-primary-foreground
                shadow-[0_10px_26px_rgba(255,106,0,0.28)]
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-primary/90
                hover:shadow-[0_14px_32px_rgba(255,106,0,0.36)]
              "
              data-testid="button-hero-order"
            >
              {t("common.createGift")}

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="#works"
              onClick={(event) => {
                event.preventDefault();
                document
                  .getElementById("works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="
                inline-flex h-12 w-fit items-center justify-center
                whitespace-nowrap rounded-full border border-white/15 px-6
                text-xs font-bold uppercase tracking-[0.06em]
                text-white/75
                transition-all duration-300
                hover:-translate-y-0.5 hover:border-primary/55
                hover:text-white
              "
              data-testid="button-hero-works"
            >
              {t("common.ourWorks")}
            </a>
          </div>

          {/* Короткая информация */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/40">
            <span>{t("common.withoutRegistration")}</span>
            <span className="h-1 w-1 rounded-full bg-primary/70" />
            <span>{t("common.orderViaTelegram")}</span>
            <span className="h-1 w-1 rounded-full bg-primary/70" />

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-primary" />
              {t("common.productionTime")}
            </span>
          </div>

          {/* Преимущества */}
          <ul className="mt-9 grid max-w-xl gap-x-8 gap-y-4 sm:grid-cols-2">
            {TRUST_FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <li
                  key={feature.labelKey}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>

                  <span>{t(feature.labelKey)}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Фотография для телефона */}
        <div className="relative mx-auto block w-full max-w-[240px] md:hidden">
          <div className="absolute inset-8 rounded-full bg-primary/15 blur-[70px]" />

          <img
            src={`${base}images/optimized/hero5.webp`}
            alt={t("home.hero.mobileImageAlt")}
            width={1045}
            height={1400}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="relative w-full rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Коллаж на компьютере */}
        <div className="relative hidden h-[500px] md:block lg:h-[590px]">
          <div className="hero-photo-glow" />

          {/* Дополнительное мягкое свечение */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[90px]" />

          {/* Центральная фотография */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div
              className="hero-photo-float"
              style={
                {
                  "--hero-float-rise": "-10px",
                  "--hero-float-duration": "6.4s",
                  "--hero-float-delay": "-0.8s",
                  filter:
                    "drop-shadow(0 26px 38px rgba(0,0,0,0.58)) drop-shadow(0 0 48px rgba(255,106,0,0.16))",
                } as CSSProperties
              }
            >
              <img
                src={`${base}images/optimized/hero5.webp`}
                alt={t("home.hero.lightingImageAlt")}
                width={1045}
                height={1400}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="
                  w-[225px] rounded-3xl border border-white/10
                  shadow-[0_32px_80px_rgba(0,0,0,0.58)]
                  lg:w-[270px]
                "
              />
            </div>
          </div>

          {/* Две дополнительные фотографии */}
          {COLLAGE.map((card, index) => (
            <img
              key={card.src}
              src={card.src}
              alt={t("home.hero.exampleImageAlt")}
              width={card.sourceWidth}
              height={card.sourceHeight}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="
                hero-photo-float absolute rounded-2xl
                border border-white/10 opacity-80
                shadow-[0_24px_60px_rgba(0,0,0,0.55)]
                transition-opacity duration-300 hover:opacity-100
              "
              style={
                {
                  top: card.top,
                  left: card.left,
                  width: card.width,
                  zIndex: card.z,
                  "--hero-rotate": `${card.rotate}deg`,
                  "--hero-float-rise": `-${7 + index * 2}px`,
                  "--hero-float-duration": `${5.3 + index * 0.7}s`,
                  "--hero-float-delay": card.delay,
                } as CSSProperties
              }
            />
          ))}

          {/* Тонкие декоративные окружности */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.04]" />
        </div>
      </div>
    </section>
  );
}

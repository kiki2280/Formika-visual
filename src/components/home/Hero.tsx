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
    label: "Ручная сборка",
  },
  {
    icon: Camera,
    label: "Персонализация по фото",
  },
  {
    icon: Truck,
    label: "Доставка по Латвии и Европе",
  },
  {
    icon: MessagesSquare,
    label: "Согласование перед изготовлением",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        {/* Левая часть */}
        <div className="relative z-20">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.24em] text-primary sm:text-sm">
            Персонализированные LEGO-композиции
          </p>

          <h1 className="max-w-2xl font-serif text-3xl font-semibold leading-[1.08] tracking-normal text-white min-[390px]:text-4xl sm:text-5xl lg:text-[58px]">
            Подарок, который
            <br />
            рассказывает
            <br />
            <span className="font-semibold text-primary">вашу историю</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Создаём персональные рамки и брелоки по вашим фотографиям —
            с фигурками, аксессуарами, надписями и подсветкой.
          </p>

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
              Создать подарок

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
              Наши работы
            </a>
          </div>

          {/* Короткая информация */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/40">
            <span>Без регистрации</span>
            <span className="h-1 w-1 rounded-full bg-primary/70" />
            <span>Заказ через Telegram</span>
            <span className="h-1 w-1 rounded-full bg-primary/70" />

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-primary" />
              Изготовление 1–7 дней
            </span>
          </div>

          {/* Преимущества */}
          <ul className="mt-9 grid max-w-xl gap-x-8 gap-y-4 sm:grid-cols-2">
            {TRUST_FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <li
                  key={feature.label}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>

                  <span>{feature.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Фотография для телефона */}
        <div className="relative mx-auto mt-2 block w-full max-w-[330px] md:hidden">
          <div className="absolute inset-8 rounded-full bg-primary/15 blur-[70px]" />

          <img
            src={`${base}images/optimized/hero5.webp`}
            alt="Персональная LEGO-композиция FORMIKA"
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
                alt="FORMIKA LEGO-композиция с подсветкой"
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
              alt="Пример персональной работы FORMIKA"
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

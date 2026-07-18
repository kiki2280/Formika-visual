import { useEffect, useRef, type CSSProperties } from "react";
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
}

function StepCard({ step }: StepCardProps) {
  const Icon = step.icon;

  return (
    <article
      className="
        order-process-card group relative overflow-hidden rounded-[26px]
        border border-white/10
        bg-gradient-to-br
        from-white/[0.04]
        via-white/[0.02]
        to-transparent
        p-4 md:p-5
        shadow-[0_18px_50px_rgba(0,0,0,0.28)]
        hover:border-primary/40
        hover:bg-primary/[0.025]
        hover:shadow-[0_24px_60px_rgba(0,0,0,0.42),0_0_28px_rgba(255,106,0,0.06)]
        md:p-6
      "
      data-testid={`card-order-process-${step.number}`}
    >
      <div className="order-process-card-wash pointer-events-none absolute inset-0" />
      <div className="order-process-card-glow pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-primary/[0.035] blur-3xl transition-colors duration-300 group-hover:bg-primary/[0.09]" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span
            className="
              order-process-icon
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl border border-primary/30 md:h-11 md:w-11 md:rounded-2xl
              bg-primary/10 text-primary
              transition-all duration-300
              group-hover:border-primary/50
              group-hover:bg-primary/15
              group-hover:shadow-[0_0_24px_rgba(255,106,0,0.15)]
            "
          >
            <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.8} />
          </span>

          <p className="order-process-step-label font-sans text-xs font-bold uppercase tracking-[0.15em] text-primary">
            Шаг {step.number}
          </p>
        </div>

        <h3 className="mt-4 font-sans text-base font-semibold leading-snug text-white md:mt-5 md:text-lg">
          {step.title}
        </h3>

        <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/50 md:mt-3 md:text-sm">
          {step.description}
        </p>
      </div>
    </article>
  );
}

export default function OrderProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRowsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section || !timeline || !line) return;

    let animationFrame = 0;
    let needsMeasure = true;
    let lineTop = 0;
    let lineHeight = 1;
    let stepThresholds: number[] = [];
    let activeStepIndex = -2;

    /*
     * targetProgress — точная позиция, которую задаёт прокрутка.
     * currentProgress — плавная позиция, которую видит пользователь.
     */
    let targetProgress = 0;
    let currentProgress = 0;
    let currentVelocity = 0;
    let lastFrameTime = 0;
    let isInitialized = false;

    /*
     * На мобильных браузерах высота окна меняется при скрытии адресной
     * строки. Сохраняем рабочую высоту, чтобы линия не дёргалась во время
     * обычного вертикального скролла.
     */
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const measure = () => {
      lineTop = line.offsetTop;
      lineHeight = Math.max(line.offsetHeight, 1);

      stepThresholds = stepRowsRef.current.map((row) => {
        if (!row) return 1;

        const rowCenter = row.offsetTop + row.offsetHeight / 2;
        return clamp((rowCenter - lineTop) / lineHeight, 0, 1);
      });

      needsMeasure = false;
    };

    const updateStepStates = (nextActiveStepIndex: number) => {
      if (nextActiveStepIndex === activeStepIndex) return;

      activeStepIndex = nextActiveStepIndex;

      stepRowsRef.current.forEach((row, index) => {
        if (!row) return;

        row.dataset.orderState =
          index < activeStepIndex
            ? "completed"
            : index === activeStepIndex
              ? "active"
              : "inactive";
      });
    };

    const renderProgress = (progress: number) => {
      const progressY = progress * lineHeight;

      timeline.style.setProperty(
        "--order-scroll-progress",
        progress.toFixed(5),
      );
      timeline.style.setProperty(
        "--order-scroll-y",
        `${progressY.toFixed(2)}px`,
      );
      timeline.style.setProperty(
        "--order-scroll-visible",
        progress > 0.002 ? "1" : "0",
      );

      let nextActiveStepIndex = -1;

      stepThresholds.forEach((threshold, index) => {
        if (progress >= threshold) {
          nextActiveStepIndex = index;
        }
      });

      updateStepStates(nextActiveStepIndex);
    };

    const calculateTargetProgress = () => {
      if (needsMeasure) measure();

      const timelineRect = timeline.getBoundingClientRect();

      /*
       * Линия ориентируется немного ниже центра экрана.
       * На телефоне это делает прохождение карточек спокойнее.
       */
      const isMobile = viewportWidth < 768;
      const viewportFocus = viewportHeight * (isMobile ? 0.58 : 0.55);

      const progressY = clamp(
        viewportFocus - (timelineRect.top + lineTop),
        0,
        lineHeight,
      );

      targetProgress = progressY / lineHeight;
    };

    const animateProgress = (timestamp: number) => {
      animationFrame = 0;

      if (needsMeasure) {
        measure();
        calculateTargetProgress();
      }

      if (!lastFrameTime) {
        lastFrameTime = timestamp;
      }

      const deltaTime = Math.min(timestamp - lastFrameTime, 50);
      lastFrameTime = timestamp;

      const isMobile = viewportWidth < 768;
      const progressDifference = targetProgress - currentProgress;

      if (isMobile) {
        /*
         * Максимально плавная мобильная анимация.
         *
         * Вместо мгновенного следования за скроллом используется движение
         * с инерцией: линия сначала мягко разгоняется, затем плавно тормозит.
         * Ограничение скорости не даёт ей резко перескакивать вперёд после
         * быстрого свайпа.
         */
        const deltaSeconds = Math.min(deltaTime, 32) / 1000;
        const springStrength = 16;
        const springDamping = 8.2;
        const maxProgressSpeed = 0.46;

        const acceleration =
          progressDifference * springStrength -
          currentVelocity * springDamping;

        currentVelocity += acceleration * deltaSeconds;
        currentVelocity = clamp(
          currentVelocity,
          -maxProgressSpeed,
          maxProgressSpeed,
        );

        const previousProgress = currentProgress;
        currentProgress += currentVelocity * deltaSeconds;

        /*
         * Не разрешаем пружине перелетать через конечную точку.
         * Это убирает лёгкое подрагивание при остановке пальца.
         */
        const crossedTarget =
          (targetProgress - previousProgress) *
            (targetProgress - currentProgress) <=
          0;

        if (crossedTarget) {
          currentProgress = targetProgress;
          currentVelocity = 0;
        }
      } else {
        /*
         * Компьютерная версия остаётся такой же, как в удачном варианте.
         */
        const smoothingTime = 230;
        const easing = 1 - Math.exp(-deltaTime / smoothingTime);

        currentProgress += progressDifference * easing;
      }

      currentProgress = clamp(currentProgress, 0, 1);

      const distance = Math.abs(targetProgress - currentProgress);
      const velocityIsLow = Math.abs(currentVelocity) < 0.0008;

      if (distance < 0.00035 && (!isMobile || velocityIsLow)) {
        currentProgress = targetProgress;
        currentVelocity = 0;
      }

      renderProgress(currentProgress);

      if (
        distance >= 0.00035 ||
        (isMobile && Math.abs(currentVelocity) >= 0.0008)
      ) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      } else {
        lastFrameTime = 0;
      }
    };

    const scheduleAnimation = () => {
      calculateTargetProgress();

      /*
       * При первой загрузке сразу выставляем правильное положение,
       * чтобы линия не ехала через весь блок сама по себе.
       */
      if (!isInitialized) {
        currentProgress = targetProgress;
        currentVelocity = 0;
        renderProgress(currentProgress);
        isInitialized = true;
        return;
      }

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      }
    };

    const handleResize = () => {
      const nextViewportWidth = window.innerWidth;
      const nextViewportHeight = window.innerHeight;
      const isMobile = viewportWidth < 768;
      const widthChanged = Math.abs(nextViewportWidth - viewportWidth) >= 2;

      /*
       * На телефоне игнорируем изменение только высоты окна:
       * обычно это открытие или закрытие панели браузера во время скролла.
       */
      if (isMobile && !widthChanged) return;

      viewportWidth = nextViewportWidth;
      viewportHeight = nextViewportHeight;
      needsMeasure = true;
      scheduleAnimation();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(section);
    resizeObserver.observe(timeline);
    resizeObserver.observe(line);

    stepRowsRef.current.forEach((row) => {
      if (row) resizeObserver.observe(row);
    });

    window.addEventListener("scroll", scheduleAnimation, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    scheduleAnimation();

    return () => {
      window.removeEventListener("scroll", scheduleAnimation);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      data-testid="section-order-process"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Этапы создания"
          title="Как мы создаём ваш подарок"
          subtitle="От идеи до готовой композиции — просто и понятно."
        />

        <div
          ref={timelineRef}
          className="relative mx-auto mt-10 max-w-5xl md:mt-14"
          data-testid="order-process-timeline"
          style={
            {
              "--order-scroll-progress": "0",
              "--order-scroll-y": "0px",
              "--order-scroll-visible": "0",
            } as CSSProperties
          }
        >
          {/* Спокойная базовая линия и scroll-синхронизированный прогресс */}
          <div
            ref={lineRef}
            aria-hidden="true"
            className="
              absolute bottom-6 left-[18px] top-6 w-px
              md:bottom-10 md:left-1/2 md:top-10 md:-translate-x-1/2
            "
            data-testid="order-process-line"
          >
            <span className="order-process-track absolute inset-0" />
            <span
              className="order-process-progress-line absolute inset-0"
              data-testid="order-process-progress"
            />
            <span className="order-process-progress-tip absolute" />
            <span
              className="order-process-progress-dot absolute"
              data-testid="order-process-progress-dot"
            />
          </div>

          <div className="space-y-3 md:space-y-6">
            {STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  ref={(element) => {
                    stepRowsRef.current[index] = element;
                  }}
                  data-order-state="inactive"
                  data-testid={`order-process-step-${step.number}`}
                  className="
                    order-process-row relative
                    md:grid
                    md:grid-cols-[1fr_76px_1fr]
                    md:items-center
                  "
                >
                  {/* Карточка слева на компьютере */}
                  <div className="hidden md:block">
                    {isLeft && (
                      <div className="mr-5">
                        <StepCard step={step} />
                      </div>
                    )}
                  </div>

                  {/* Номер шага на центральной линии */}
                  <div
                    className="
                      order-process-marker absolute left-0 top-4 z-10
                      flex h-9 w-9 items-center justify-center
                      rounded-full border border-primary/60
                      bg-[#17120f] text-primary
                      shadow-[0_0_24px_rgba(255,106,0,0.16)]
                      md:static md:mx-auto md:h-14 md:w-14
                    "
                  >
                    <span className="font-sans text-[11px] font-extrabold tracking-[0.06em] md:text-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* Карточка справа на компьютере */}
                  <div className="hidden md:block">
                    {!isLeft && (
                      <div className="ml-5">
                        <StepCard step={step} />
                      </div>
                    )}
                  </div>

                  {/* Карточка на телефоне */}
                  <div className="ml-12 md:hidden">
                    <StepCard step={step} />
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
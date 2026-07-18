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
import {
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useId, useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { useTranslation } from "react-i18next";

const OPTIONS = [
  {
    titleKey: "home.personalization.charactersTitle",
    descriptionKey: "home.personalization.charactersDescription",
    icon: Users,
  },
  {
    titleKey: "home.personalization.facesHairTitle",
    descriptionKey: "home.personalization.facesHairDescription",
    icon: Scissors,
  },
  {
    titleKey: "home.personalization.clothesTitle",
    descriptionKey: "home.personalization.clothesDescription",
    icon: Shirt,
  },
  {
    titleKey: "home.personalization.accessoriesTitle",
    descriptionKey: "home.personalization.accessoriesDescription",
    icon: Sparkles,
  },
  {
    titleKey: "home.personalization.petsTitle",
    descriptionKey: "home.personalization.petsDescription",
    icon: PawPrint,
  },
  {
    titleKey: "home.personalization.backgroundTitle",
    descriptionKey: "home.personalization.backgroundDescription",
    icon: Image,
  },
  {
    titleKey: "home.personalization.inscriptionTitle",
    descriptionKey: "home.personalization.inscriptionDescription",
    icon: Type,
  },
  {
    titleKey: "home.personalization.lightingTitle",
    descriptionKey: "home.personalization.lightingDescription",
    icon: Lightbulb,
  },
];

const DESKTOP_OFFSETS = [
  "md:pt-8",
  "md:pt-0",
  "md:pt-8",
  "md:pt-0",
  "md:pt-8",
  "md:pt-0",
  "md:pt-8",
  "md:pt-0",
];

const MOBILE_PATH =
  "M30 50 " +
  "C30 83 42 117 42 150 " +
  "C42 183 30 217 30 250 " +
  "C30 283 42 317 42 350 " +
  "C42 383 30 417 30 450 " +
  "C30 483 42 517 42 550 " +
  "C42 583 30 617 30 650 " +
  "C30 683 42 717 42 750 " +
  // Линия проходит через пункт 08 и немного продолжается ниже него.
  "C42 772 42 802 42 830";

/*
 * Координаты совпадают с центрами восьми кругов на desktop:
 * 01 — x=50, y=68; 02 — x=150, y=36; ... 08 — x=750, y=36.
 * Последний короткий участок выходит из-под круга 08, чтобы визуально
 * было хорошо видно, что линия действительно дошла до последнего пункта.
 */
const DESKTOP_PATH =
  "M50 68 " +
  "C85 68 115 36 150 36 " +
  "C185 36 215 68 250 68 " +
  "C285 68 315 36 350 36 " +
  "C385 36 415 68 450 68 " +
  "C485 68 515 36 550 36 " +
  "C585 36 615 68 650 68 " +
  "C685 68 715 36 750 36 " +
  "C762 36 772 36 782 36";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const LINE_EASE = [0.42, 0, 0.22, 1] as const;

const DESKTOP_LINE_DELAY = 0.14;
const DESKTOP_LINE_DURATION = 3.8;
const DESKTOP_REVEAL_START_X = 50;
const DESKTOP_REVEAL_END_X = 782;
const DESKTOP_REVEAL_WIDTH =
  DESKTOP_REVEAL_END_X - DESKTOP_REVEAL_START_X;

function getDesktopItemDelay(index: number) {
  const progress = index / (OPTIONS.length - 1);

  return (
    DESKTOP_LINE_DELAY +
    DESKTOP_LINE_DURATION * progress -
    (index === 0 ? 0 : 0.1)
  );
}

const DESKTOP_CLIP_VARIANTS = {
  hidden: {
    width: 0,
  },
  visible: {
    width: DESKTOP_REVEAL_WIDTH,
    transition: {
      duration: DESKTOP_LINE_DURATION,
      delay: DESKTOP_LINE_DELAY,
      ease: LINE_EASE,
    },
  },
};

const DESKTOP_HEAD_VARIANTS = {
  hidden: {
    cx: 50,
    cy: 68,
    opacity: 0,
  },
  visible: {
    cx: [50, 150, 250, 350, 450, 550, 650, 750, 782],
    cy: [68, 36, 68, 36, 68, 36, 68, 36, 36],
    opacity: [0, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.3, 0],
    transition: {
      cx: {
        duration: DESKTOP_LINE_DURATION,
        delay: DESKTOP_LINE_DELAY,
        ease: LINE_EASE,
        times: [0, 0.135, 0.27, 0.405, 0.54, 0.675, 0.81, 0.945, 1],
      },
      cy: {
        duration: DESKTOP_LINE_DURATION,
        delay: DESKTOP_LINE_DELAY,
        ease: LINE_EASE,
        times: [0, 0.135, 0.27, 0.405, 0.54, 0.675, 0.81, 0.945, 1],
      },
      opacity: {
        duration: DESKTOP_LINE_DURATION,
        delay: DESKTOP_LINE_DELAY,
        ease: "linear",
        times: [0, 0.04, 0.15, 0.3, 0.45, 0.6, 0.78, 0.94, 1],
      },
    },
  },
};

const NODE_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.86,
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: getDesktopItemDelay(index),
      ease: PREMIUM_EASE,
    },
  }),
};

const TEXT_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      delay: getDesktopItemDelay(index) + 0.08,
      ease: PREMIUM_EASE,
    },
  }),
};

interface MobileTimelineLineProps {
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
  headProgress: MotionValue<number>;
  headOpacity: MotionValue<number>;
}

function MobileTimelineLine({
  progress,
  opacity,
  headProgress,
  headOpacity,
}: MobileTimelineLineProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 72 800"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-y-0 left-0 z-0 h-full w-[72px] select-none overflow-visible md:hidden"
    >
      <motion.path
        d={MOBILE_PATH}
        pathLength={1}
        style={{
          pathLength: progress,
          opacity,
          fill: "none",
          stroke: "rgba(255, 106, 0, 0.055)",
          strokeWidth: 4.5,
          filter: "drop-shadow(0 0 3px rgba(255, 106, 0, 0.08))",
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      <motion.path
        d={MOBILE_PATH}
        pathLength={1}
        style={{
          pathLength: progress,
          opacity,
          fill: "none",
          stroke: "rgba(255, 118, 30, 0.48)",
          strokeWidth: 1.15,
          filter: "drop-shadow(0 0 2px rgba(255, 106, 0, 0.2))",
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      <motion.path
        d={MOBILE_PATH}
        pathLength={1}
        style={{
          pathLength: headProgress,
          opacity: headOpacity,
          fill: "none",
          stroke: "rgba(255, 160, 96, 0.18)",
          strokeWidth: 3,
          filter: "blur(1px)",
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function DesktopTimelineLine() {
  const rawId = useId();
  const clipId = `personalization-desktop-clip-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[100px] w-full select-none overflow-visible md:block"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <motion.rect
            x={DESKTOP_REVEAL_START_X}
            y={0}
            height={100}
            variants={DESKTOP_CLIP_VARIANTS}
          />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <path
          d={DESKTOP_PATH}
          fill="none"
          stroke="rgba(255, 106, 0, 0.06)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{
            filter: "drop-shadow(0 0 3px rgba(255, 106, 0, 0.09))",
          }}
        />

        <path
          d={DESKTOP_PATH}
          fill="none"
          stroke="rgba(255, 118, 30, 0.5)"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{
            filter: "drop-shadow(0 0 2px rgba(255, 106, 0, 0.2))",
          }}
        />
      </g>

      <motion.circle
        r={5.5}
        variants={DESKTOP_HEAD_VARIANTS}
        fill="rgba(255, 148, 76, 0.16)"
        style={{
          filter: "blur(2px) drop-shadow(0 0 3px rgba(255, 106, 0, 0.16))",
        }}
      />

      <motion.circle
        r={1.8}
        variants={DESKTOP_HEAD_VARIANTS}
        fill="rgba(255, 190, 140, 0.48)"
        style={{
          filter: "drop-shadow(0 0 2px rgba(255, 106, 0, 0.2))",
        }}
      />
    </svg>
  );
}

export default function Personalization() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    // Завершаем мобильную линию раньше, чтобы она гарантированно
    // успевала пройти пункт 08 даже на невысоком экране.
    offset: ["start 88%", "end 94%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 74,
    damping: 25,
    mass: 0.7,
    restDelta: 0.0005,
  });

  const mobileProgress = useTransform(
    smoothProgress,
    [0, 0.86, 1],
    shouldReduceMotion ? [1, 1, 1] : [0, 1, 1],
  );

  const mobileOpacity = useTransform(
    smoothProgress,
    [0, 0.025, 1],
    shouldReduceMotion ? [1, 1, 1] : [0, 1, 1],
  );

  const mobileHeadProgress = useTransform(
    smoothProgress,
    [0, 0.8, 0.86, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [0, 0.93, 1, 1],
  );

  const mobileHeadOpacity = useTransform(
    smoothProgress,
    [0, 0.035, 0.8, 0.9, 1],
    shouldReduceMotion ? [0, 0, 0, 0, 0] : [0, 0.28, 0.28, 0.08, 0],
  );

  return (
    <section
      id="personalization"
      className="relative overflow-hidden pb-14 pt-20 md:pb-16 md:pt-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("home.personalization.eyebrow")}
          title={t("home.personalization.title")}
          titleClassName="
            text-[clamp(2rem,10vw,2.5rem)]
            md:text-[44px]
            lg:text-[44px]
            xl:text-[44px]
          "
          accentTitle={t("home.personalization.accent")}
          accentTitleClassName="
            -mt-1
            block
            whitespace-nowrap
            text-[clamp(1.25rem,5.8vw,1.55rem)]
            leading-[1]
            md:-mt-2
            md:text-[2rem]
            lg:text-[2.25rem]
            xl:text-[2.5rem]
          "
          subtitle={t("home.personalization.subtitle")}
          size="wide"
          className="mb-9 md:mb-8"
        />

        <motion.div
          ref={timelineRef}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={
            shouldReduceMotion
              ? undefined
              : {
                  once: true,
                  margin: "-60px",
                }
          }
          className="personalization-timeline relative mx-auto max-w-[1376px]"
          data-testid="personalization-timeline"
        >
          <MobileTimelineLine
            progress={mobileProgress}
            opacity={mobileOpacity}
            headProgress={mobileHeadProgress}
            headOpacity={mobileHeadOpacity}
          />

          <DesktopTimelineLine />

          <ol className="relative z-10 grid grid-cols-1 grid-rows-[repeat(8,minmax(112px,1fr))] md:grid-cols-8 md:grid-rows-none md:gap-0">
            {OPTIONS.map((option, index) => {
              const Icon = option.icon;

              return (
                <li
                  key={option.titleKey}
                  className={`
                    personalization-timeline-item
                    group
                    grid
                    min-w-0
                    grid-cols-[72px_minmax(0,1fr)]
                    items-center
                    gap-x-3
                    md:block
                    md:px-1
                    md:text-center
                    ${DESKTOP_OFFSETS[index]}
                  `}
                  data-testid={`card-personalization-${index}`}
                >
                  <div
                    className={`
                      personalization-node-anchor
                      relative
                      h-[60px]
                      w-[60px]
                      md:mx-auto
                      md:h-[72px]
                      md:w-[72px]
                      ${
                        index % 2 === 0
                          ? "translate-x-0"
                          : "translate-x-3 md:translate-x-0"
                      }
                    `}
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
                      className="
                        absolute
                        left-1/2
                        top-[67px]
                        z-10
                        -translate-x-1/2
                        rounded-full
                        bg-[#111111]/95
                        px-1
                        font-sans
                        text-[10px]
                        font-semibold
                        tracking-[0.16em]
                        text-primary/80
                        shadow-[0_0_7px_4px_rgba(17,17,17,0.92)]
                        md:top-[80px]
                        md:bg-transparent
                        md:px-0
                        md:shadow-none
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                  </div>

                  <motion.div
                    custom={index}
                    variants={TEXT_VARIANTS}
                    className="
                      min-w-0
                      pr-1
                      text-left
                      md:mx-auto
                      md:mt-5
                      md:w-full
                      md:max-w-[142px]
                      md:px-0
                      md:pr-0
                      md:text-center
                    "
                  >
                    <h3
                      className="
                        font-sans
                        text-sm
                        font-semibold
                        leading-tight
                        tracking-normal
                        text-white
                        md:flex
                        md:min-h-[30px]
                        md:items-end
                        md:justify-center
                        md:text-xs
                        lg:text-[13px]
                        xl:text-sm
                      "
                    >
                      {t(option.titleKey)}
                    </h3>

                    <p
                      className="
                        mt-1.5
                        font-sans
                        text-[12px]
                        font-normal
                        leading-[1.5]
                        text-white/58
                        md:mx-auto
                        md:mt-1.5
                        md:max-w-[140px]
                        md:text-[11px]
                        md:leading-[1.45]
                        xl:text-xs
                      "
                    >
                      {t(option.descriptionKey)}
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

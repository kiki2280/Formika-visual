import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import GalleryModal, {
  type GalleryModalData,
} from "@/components/GalleryModal";
import SectionHeading from "./SectionHeading";

const base = import.meta.env.BASE_URL;

const IMG = {
  clouds1: `${base}images/optimized/light-clouds-card1.webp`,
  clouds2: `${base}images/optimized/light-clouds-card2.webp`,
  clouds3: `${base}images/optimized/light-clouds-card3.webp`,

  garland1: `${base}images/optimized/light-garland-card-1.webp`,
  garland2: `${base}images/optimized/light-garland-card-2.webp`,
  garland3: `${base}images/optimized/light-garland-card-3.webp`,

  rgb1: `${base}images/optimized/light-rgb-card1.webp`,
  rgb2: `${base}images/optimized/light-rgb-card2.webp`,
  rgb3: `${base}images/optimized/light-rgb-card3.webp`,
};

const OPTIONS: {
  title: string;
  desc: string;
  img: string;
  modal: GalleryModalData;
}[] = [
  {
    title: "LED-гирлянда",
    desc: "Тёплый уютный свет от гирлянды",
    img: IMG.garland1,
    modal: {
      title: "LED-гирлянда",
      description:
        "Тёплый уютный свет с одним режимом свечения. Подходит для мягкой домашней атмосферы.",
      images: [
        { src: IMG.garland1 },
        { src: IMG.garland2 },
        { src: IMG.garland3 },
      ],
    },
  },
  {
    title: "LED RGB",
    desc: "Подсветка с разными цветами и режимами",
    img: IMG.rgb1,
    modal: {
      title: "LED RGB",
      description:
        "Яркая цветная подсветка. Подходит, если хочется более заметный эффект и возможность разных оттенков.",
      images: [
        { src: IMG.rgb1 },
        { src: IMG.rgb2 },
        { src: IMG.rgb3 },
      ],
    },
  },
  {
    title: "LED с облаками",
    desc: "Объёмный эффект облаков и мягкое рассеянное свечение",
    img: IMG.clouds1,
    modal: {
      title: "LED с облаками",
      description:
        "Объёмный декоративный эффект с мягким рассеиванием света. Выглядит более необычно и ярко.",
      images: [
        { src: IMG.clouds1 },
        { src: IMG.clouds2 },
        { src: IMG.clouds3 },
      ],
    },
  },
];

export default function LightingOptions() {
  const [active, setActive] = useState<GalleryModalData | null>(null);
  const activeTriggerRef = useRef<HTMLElement>(null);
  const closeGallery = useCallback(() => setActive(null), []);

  const openGallery = (
    data: GalleryModalData,
    trigger: HTMLElement,
  ) => {
    activeTriggerRef.current = trigger;
    setActive(data);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeading
        eyebrow="Атмосфера в деталях"
        title="Варианты подсветки"
        subtitle="Выберите атмосферу вашей композиции"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OPTIONS.map((o, i) => (
          <motion.div
            key={o.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={(event: ReactMouseEvent<HTMLDivElement>) =>
              openGallery(o.modal, event.currentTarget)
            }
            onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGallery(o.modal, event.currentTarget);
              }
            }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            data-testid={`card-lighting-${i}`}
            role="button"
            tabIndex={0}
            aria-label={`Открыть галерею ${o.title}`}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={o.img}
                alt={o.title}
                width={560}
                height={800}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-sans text-lg font-semibold uppercase tracking-normal text-white md:text-xl">{o.title}</h3>
              <p className="mt-1 text-sm text-gray-300">{o.desc}</p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openGallery(o.modal, event.currentTarget);
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary hover:gap-2.5 transition-all"
                data-testid={`btn-lighting-details-${i}`}
              >
                Подробнее <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <GalleryModal
        data={active}
        onClose={closeGallery}
        returnFocusRef={activeTriggerRef}
        cta={{
          label: "Заказать",
          href: "/order",
          testId: "btn-modal-order",
        }}
      />
    </section>
  );
}

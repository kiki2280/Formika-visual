import { useState } from "react";
import { motion } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import DetailModal, { DetailModalData } from "./DetailModal";

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

const OPTIONS: { title: string; desc: string; img: string; modal: DetailModalData }[] = [
  {
    title: "LED-гирлянда",
    desc: "Тёплый уютный свет от гирлянды",
    img: IMG.garland1,
    modal: {
      title: "LED-гирлянда",
      description:
        "Тёплый уютный свет с одним режимом свечения. Подходит для мягкой домашней атмосферы.",
      examples: [{ img: IMG.garland1 }, { img: IMG.garland2 }, { img: IMG.garland3 }],
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
      examples: [{ img: IMG.rgb1 }, { img: IMG.rgb2 }, { img: IMG.rgb3 }],
    },
  },
  {
    title: "LED с облаками",
    desc: "Объёмный эффект облаков и мягкое рассеянное свечение",
    img: IMG.clouds1 ,
    modal: {
      title: "LED с облаками",
      description:
        "Объёмный декоративный эффект с мягким рассеиванием света. Выглядит более необычно и ярко.",
      examples: [{ img: IMG.clouds1 }, { img: IMG.clouds2 }, { img: IMG.clouds3 }],
    },
  },
];

export default function LightingOptions() {
  const [active, setActive] = useState<DetailModalData | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeading title="Варианты подсветки" subtitle="Выберите атмосферу вашей композиции" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OPTIONS.map((o, i) => (
          <motion.div
            key={o.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-border hover:border-primary/60 transition-colors"
            data-testid={`card-lighting-${i}`}
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
              <h3 className="font-serif uppercase tracking-wide text-lg md:text-xl text-white">{o.title}</h3>
              <p className="mt-1 text-sm text-gray-300">{o.desc}</p>
              <button
                type="button"
                onClick={() => setActive(o.modal)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary hover:gap-2.5 transition-all"
                data-testid={`btn-lighting-details-${i}`}
              >
                Подробнее <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <DetailModal data={active} onClose={() => setActive(null)} />
    </section>
  );
}

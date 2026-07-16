import { useState } from "react";
import { motion } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import DetailModal, { DetailModalData } from "./DetailModal";

const base = import.meta.env.BASE_URL;

const IMG = {
  keychain: `${base}images/optimized/product-keychain-card.jpg`,
  readyKeychain1: `${base}images/optimized/ready-keychain-1.webp`,
  readyKeychain2: `${base}images/optimized/ready-keychain-2.webp`,
  readyKeychain3: `${base}images/optimized/ready-keychain-3.webp`,
  readyKeychain4: `${base}images/optimized/ready-keychain-4.webp`,
  productKeychain1: `${base}images/optimized/product-keychain-card1.webp`,
  productKeychain2: `${base}images/optimized/product-keychain-card2.webp`,
  productKeychain3: `${base}images/optimized/product-keychain-card3.webp`,
};

const PRODUCTS: {
  title: string;
  desc: string;
  img: string;
  imagePosition?: string;
  modal: DetailModalData;
}[] = [
  {
    title: "Готовые брелочки",
    desc: "Готовые модели, которые можно заказать сразу.",
    img: IMG.readyKeychain3,
    imagePosition: "object-[center_70%]",
    modal: {
      title: "Готовые брелочки",
      description:
        "Готовые модели FORMIKA, которые можно заказать сразу. Отличный небольшой подарок или дополнение к рамке.",
      examples: [
        { img: IMG.readyKeychain3 },
        { img: IMG.readyKeychain4 },
        { img: IMG.readyKeychain1 },
        { img: IMG.readyKeychain2 },
      ],
    },
  },
  {
    title: "Кастомные брелочки",
    desc: "Брелок с человечком, которого можно собрать под себя.",
    img: IMG.productKeychain1,
    imagePosition: "object-[center_60%]",
    modal: {
      title: "Кастомные брелочки",
      description:
        "Брелок с человечком, которого можно собрать под себя — лицо, причёска, одежда и аксессуары на ваш вкус.",
      examples: [
        { img: IMG.productKeychain1 }, { img: IMG.productKeychain2 }, { img: IMG.productKeychain3 },
      ],
    },
  },
];

export default function OtherProducts() {
  const [active, setActive] = useState<DetailModalData | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Больше идей для подарка"
        title="Другие товары FORMIKA"
      />

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -4,
              transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-[26px] border border-white/10 bg-black shadow-[0_16px_45px_rgba(0,0,0,0.25)] transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[0_24px_65px_rgba(0,0,0,0.48),0_0_32px_rgba(255,106,0,0.07)] sm:aspect-[3/2]"
            data-testid={`card-product-${i}`}
          >
            <img
              src={p.img}
              alt={p.title}
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover ${p.imagePosition ?? "object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/20" />

            <button
              type="button"
              onClick={() => setActive(p.modal)}
              className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center justify-center gap-2 whitespace-normal rounded-full border border-primary/35 bg-black/55 px-3 py-2 text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-primary backdrop-blur-md transition-colors hover:border-primary/60 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-[10px] sm:tracking-[0.08em]"
              data-testid={`btn-product-details-${i}`}
            >
              Подробнее <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <div className="absolute inset-x-4 bottom-4">
              <h3 className="font-sans text-lg font-semibold leading-snug text-white sm:text-xl">
                {p.title}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm">
                {p.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <DetailModal data={active} onClose={() => setActive(null)} />
    </section>
  );
}

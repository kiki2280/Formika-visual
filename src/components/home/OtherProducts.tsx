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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeading title="Другие товары FORMIKA" />

      <div className="grid sm:grid-cols-2 gap-6">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col overflow-hidden rounded-2xl border border-border hover:border-primary/60 transition-colors"
            data-testid={`card-product-${i}`}
          >
            <div className="relative h-56 overflow-hidden group">
              <img
                src={p.img}
                alt={p.title}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover ${p.imagePosition ?? "object-center"} transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <h3 className="absolute inset-x-0 bottom-[-30px] p-6 font-serif uppercase tracking-wide text-2xl text-white">
                {p.title}
              </h3>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <button
                type="button"
                onClick={() => setActive(p.modal)}
                className="mt-5 inline-flex items-center justify-center gap-2 self-start rounded-full border border-border bg-background/60 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground hover:border-primary/60 hover:text-primary transition-colors"
                data-testid={`btn-product-details-${i}`}
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

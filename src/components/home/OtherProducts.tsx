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
  modal: GalleryModalData;
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
      images: [
        { src: IMG.readyKeychain3 },
        { src: IMG.readyKeychain4 },
        { src: IMG.readyKeychain1 },
        { src: IMG.readyKeychain2 },
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
      images: [
        { src: IMG.productKeychain1 },
        { src: IMG.productKeychain2 },
        { src: IMG.productKeychain3 },
      ],
    },
  },
];

export default function OtherProducts() {
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
            onClick={(event: ReactMouseEvent<HTMLDivElement>) =>
              openGallery(p.modal, event.currentTarget)
            }
            onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGallery(p.modal, event.currentTarget);
              }
            }}
            className="group relative aspect-[3/2] cursor-pointer overflow-hidden rounded-[26px] border border-white/10 bg-black shadow-[0_16px_45px_rgba(0,0,0,0.25)] transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[0_24px_65px_rgba(0,0,0,0.48),0_0_32px_rgba(255,106,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            data-testid={`card-product-${i}`}
            role="button"
            tabIndex={0}
            aria-label={`Открыть галерею ${p.title}`}
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

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 sm:from-black/95 sm:via-black/20 sm:to-black/20" />

            <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
              <h3 className="font-sans text-base font-semibold leading-snug text-white sm:text-xl">
                {p.title}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm">
                {p.desc}
              </p>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openGallery(p.modal, event.currentTarget);
                }}
                className="mt-2 inline-flex max-w-full items-center justify-center gap-2 whitespace-normal rounded-full border border-primary/35 bg-black/55 px-3 py-1.5 text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-primary backdrop-blur-md transition-colors hover:border-primary/60 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:mt-3 sm:py-2 sm:text-[10px] sm:tracking-[0.08em]"
                data-testid={`btn-product-details-${i}`}
              >
                Подробнее <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
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

import {
  lazy,
  Suspense,
  useCallback,
  useRef,
  useState,
} from "react";
import { motion } from "@/lib/motion";
import { ArrowRight, ZoomIn } from "lucide-react";
import type { GalleryModalData } from "@/components/GalleryModal";
import type { ImageLightboxData } from "@/components/ImageLightbox";
import SectionHeading from "./SectionHeading";
import { useTranslation } from "react-i18next";

const base = import.meta.env.BASE_URL;
const GalleryModal = lazy(() => import("@/components/GalleryModal"));
const ImageLightbox = lazy(() => import("@/components/ImageLightbox"));

const IMG = {
  keychain: `${base}images/optimized/product-keychain-card.jpg`,
  readyKeychain1: `${base}images/optimized/ready-keychain-1.webp`,
  readyKeychain2: `${base}images/optimized/ready-keychain-2.webp`,
  readyKeychain3: `${base}images/optimized/ready-keychain-3.webp`,
  readyKeychain3Card: `${base}images/optimized/ready-keychain-3-card.webp`,
  readyKeychain4: `${base}images/optimized/ready-keychain-4.webp`,
  productKeychain1: `${base}images/optimized/product-keychain-card1.webp`,
  productKeychain1Card: `${base}images/optimized/product-keychain-card1-card.webp`,
  productKeychain2: `${base}images/optimized/product-keychain-card2.webp`,
  productKeychain3: `${base}images/optimized/product-keychain-card3.webp`,
};

const PRODUCTS: {
  titleKey: string;
  descriptionKey: string;
  modalDescriptionKey: string;
  img: string;
  imagePosition?: string;
  images: GalleryModalData["images"];
}[] = [
  {
    titleKey: "home.otherProducts.readyTitle",
    descriptionKey: "home.otherProducts.readyDescription",
    modalDescriptionKey: "home.otherProducts.readyModalDescription",
    img: IMG.readyKeychain3Card,
    imagePosition: "object-[center_70%]",
    images: [
        { src: IMG.readyKeychain3 },
        { src: IMG.readyKeychain4 },
        { src: IMG.readyKeychain1 },
        { src: IMG.readyKeychain2 },
    ],
  },
  {
    titleKey: "home.otherProducts.customTitle",
    descriptionKey: "home.otherProducts.customDescription",
    modalDescriptionKey: "home.otherProducts.customModalDescription",
    img: IMG.productKeychain1Card,
    imagePosition: "object-[center_60%]",
    images: [
        { src: IMG.productKeychain1 },
        { src: IMG.productKeychain2 },
        { src: IMG.productKeychain3 },
    ],
  },
];

export default function OtherProducts() {
  const { t } = useTranslation();
  const [active, setActive] = useState<GalleryModalData | null>(null);
  const [lightbox, setLightbox] = useState<ImageLightboxData | null>(null);
  const activeTriggerRef = useRef<HTMLElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement>(null);
  const closeGallery = useCallback(() => setActive(null), []);
  const products = PRODUCTS.map((product) => ({
    ...product,
    title: t(product.titleKey),
    description: t(product.descriptionKey),
    modal: {
      title: t(product.titleKey),
      description: t(product.modalDescriptionKey),
      images: product.images,
    },
  }));

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
        eyebrow={t("home.otherProducts.eyebrow")}
        title={t("home.otherProducts.title")}
      />

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
        {products.map((p, i) => (
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
            className="group relative aspect-[3/2] cursor-pointer overflow-hidden rounded-[26px] border border-white/10 bg-black shadow-[0_16px_45px_rgba(0,0,0,0.25)] transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[0_24px_65px_rgba(0,0,0,0.48),0_0_32px_rgba(255,106,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <button
              type="button"
              onClick={(event) =>
                openGallery(p.modal, event.currentTarget)
              }
              className="absolute inset-0 z-10 rounded-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              data-testid={`card-product-${i}`}
              aria-label={t("home.otherProducts.openGalleryAria", {
                title: p.title,
              })}
            >
              <span className="sr-only">{p.title}</span>
            </button>

            <img
              src={p.img}
              alt={p.title}
              width={640}
              height={855}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover ${p.imagePosition ?? "object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 md:from-black/95 md:via-black/20 md:to-black/20" />

            <button
              type="button"
              onClick={(event) => {
                lightboxTriggerRef.current = event.currentTarget;
                setLightbox({
                  images: p.images,
                  initialIndex: 0,
                  caption: p.title,
                });
              }}
              className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 cursor-zoom-in items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={t("imageViewer.enlarge")}
              data-testid={`enlarge-product-${i}`}
            >
              <ZoomIn className="h-5 w-5" />
            </button>

            <div className="pointer-events-none absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4">
              <h3 className="font-sans text-base font-semibold leading-snug text-white md:text-xl">
                {p.title}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm">
                {p.description}
              </p>

              <span
                className="mt-2 inline-flex max-w-full items-center justify-center gap-2 whitespace-normal rounded-full border border-primary/35 bg-black/55 px-3 py-1.5 text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-primary backdrop-blur-md transition-colors hover:border-primary/60 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:mt-3 md:py-2 md:text-[10px] md:tracking-[0.08em]"
                data-testid={`btn-product-details-${i}`}
              >
                {t("common.details")} <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {active && (
        <Suspense fallback={null}>
          <GalleryModal
            data={active}
            onClose={closeGallery}
            returnFocusRef={activeTriggerRef}
            cta={{
              label: t("common.order"),
              href: "/order",
              testId: "btn-modal-order",
            }}
          />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <ImageLightbox
          data={lightbox}
          onClose={() => setLightbox(null)}
          returnFocusRef={lightboxTriggerRef}
        />
      </Suspense>
    </section>
  );
}

import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Instagram, ZoomIn } from "lucide-react";

import type {
  GalleryModalData,
  GalleryModalType,
} from "@/components/GalleryModal";
import type { ImageLightboxData } from "@/components/ImageLightbox";
import { motion } from "@/lib/motion";
import SectionHeading from "./SectionHeading";

const base = import.meta.env.BASE_URL;
const GalleryModal = lazy(() => import("@/components/GalleryModal"));
const ImageLightbox = lazy(() => import("@/components/ImageLightbox"));

const IMG = {
  personal1: `${base}images/optimized/works-personal-1.webp`,
  personal1Card: `${base}images/optimized/works-personal-1-card.webp`,
  personal2: `${base}images/optimized/works-personal-2.webp`,
  personal3: `${base}images/optimized/works-personal-3.webp`,

  couple1: `${base}images/optimized/works-couples-1.webp`,
  couple1Card: `${base}images/optimized/works-couples-1-card.webp`,
  couple2: `${base}images/optimized/works-couples-2.webp`,
  couple3: `${base}images/optimized/works-couples-3.webp`,

  family1: `${base}images/optimized/work-family-1.webp`,
  family1Card: `${base}images/optimized/work-family-1-card.webp`,
  family2: `${base}images/optimized/work-family-2.webp`,
  family3: `${base}images/optimized/work-family-3.webp`,

  // These are the real filenames currently shipped by the project.
  wedding1: `${base}images/optimized/work-wrdding-1.webp`,
  wedding1Card: `${base}images/optimized/work-wrdding-1-card.webp`,
  wedding2: `${base}images/optimized/work-wrdding-2.webp`,
  wedding3: `${base}images/optimized/work-wrdding-3.webp`,
};

interface WorkItem {
  galleryType: GalleryModalType;
  titleKey: string;
  descriptionKey: string;
  modalDescriptionKey: string;
  img: string;
  imagePosition?: string;
  images: GalleryModalData["images"];
}

const WORKS: WorkItem[] = [
  {
    galleryType: "personal",
    titleKey: "home.works.personalTitle",
    descriptionKey: "home.works.personalDescription",
    modalDescriptionKey: "home.works.personalModalDescription",
    img: IMG.personal1Card,
    imagePosition: "object-[center_70%]",
    images: [
      { src: IMG.personal1 },
      { src: IMG.personal2 },
      { src: IMG.personal3 },
    ],
  },
  {
    galleryType: "couple",
    titleKey: "home.works.coupleTitle",
    descriptionKey: "home.works.coupleDescription",
    modalDescriptionKey: "home.works.coupleModalDescription",
    img: IMG.couple1Card,
    imagePosition: "object-[center_70%]",
    images: [
      { src: IMG.couple1 },
      { src: IMG.couple2 },
      { src: IMG.couple3 },
    ],
  },
  {
    galleryType: "family",
    titleKey: "home.works.familyTitle",
    descriptionKey: "home.works.familyDescription",
    modalDescriptionKey: "home.works.familyModalDescription",
    img: IMG.family1Card,
    imagePosition: "object-[center_70%]",
    images: [
      { src: IMG.family1 },
      { src: IMG.family2 },
      { src: IMG.family3 },
    ],
  },
  {
    galleryType: "wedding",
    titleKey: "home.works.weddingTitle",
    descriptionKey: "home.works.weddingDescription",
    modalDescriptionKey: "home.works.weddingModalDescription",
    img: IMG.wedding1Card,
    imagePosition: "object-[center_70%]",
    images: [
      { src: IMG.wedding1 },
      { src: IMG.wedding2 },
      { src: IMG.wedding3 },
    ],
  },
];

export default function WorksGallery() {
  const { t } = useTranslation();
  const [active, setActive] = useState<GalleryModalData | null>(null);
  const [lightbox, setLightbox] = useState<ImageLightboxData | null>(null);
  const activeTriggerRef = useRef<HTMLElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement>(null);

  const closeGallery = useCallback(() => {
    setActive(null);
  }, []);

  const works = WORKS.map((work) => {
    const title = t(work.titleKey);
    const description = t(work.descriptionKey);

    const modal: GalleryModalData = {
      title,
      description: t(work.modalDescriptionKey),
      images: work.images,
      galleryType: work.galleryType,
    };

    return {
      ...work,
      title,
      description,
      modal,
    };
  });

  return (
    <section
      id="works"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-24 lg:px-8"
    >
      <SectionHeading
        eyebrow={t("home.works.eyebrow")}
        title={t("home.works.title")}
        subtitle={t("home.works.subtitle")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {works.map((work, index) => (
          <motion.div
            key={work.galleryType}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="h-full"
          >
            <div className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[26px] border border-white/10 bg-black text-left shadow-[0_16px_45px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_65px_rgba(0,0,0,0.48),0_0_32px_rgba(255,106,0,0.07)] md:aspect-[4/5]">
              <button
                type="button"
                onClick={(event) => {
                  activeTriggerRef.current = event.currentTarget;
                  setActive(work.modal);
                }}
                className="absolute inset-0 z-10 rounded-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                aria-label={t("home.works.openCategoryAria", {
                  category: work.title,
                })}
                data-testid={`card-work-${index}`}
              >
                <span className="sr-only">{work.title}</span>
              </button>

              <img
                src={work.img}
                alt={work.title}
                width={work.galleryType === "personal" ? 720 : 640}
                height={work.galleryType === "personal" ? 580 : 855}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 block h-full w-full object-cover ${
                  work.imagePosition ?? "object-center"
                } transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/20" />

              <button
                type="button"
                onClick={(event) => {
                  lightboxTriggerRef.current = event.currentTarget;
                  setLightbox({
                    images: work.images,
                    initialIndex: 0,
                    caption: work.title,
                  });
                }}
                className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 cursor-zoom-in items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t("imageViewer.enlarge")}
                data-testid={`enlarge-work-${index}`}
              >
                <ZoomIn className="h-5 w-5" />
              </button>

              <div className="pointer-events-none absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4">
                <h3 className="font-sans text-base font-semibold leading-snug text-white md:text-lg">
                  {work.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm md:mt-1.5">
                  {work.description}
                </p>

                <span className="mt-2 inline-flex max-w-full items-center gap-2 whitespace-normal rounded-full border border-primary/35 bg-black/55 px-3 py-1.5 text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-primary backdrop-blur-md md:mt-3 md:py-2 md:text-[10px] md:tracking-[0.08em]">
                  {t("common.details")}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-white/[0.035] to-white/[0.015] p-6 sm:p-7"
        data-testid="works-instagram-cta"
      >
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-[0_0_24px_rgba(255,106,0,0.1)]">
              <Instagram className="h-5 w-5" strokeWidth={1.8} />
            </span>

            <div>
              <p className="font-sans text-lg font-semibold text-white sm:text-xl">
                {t("home.works.instagramTitle")}
              </p>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t("home.works.instagramDescription")}
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/f0rmika.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_28px_rgba(255,106,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_34px_rgba(255,106,0,0.35)]"
          >
            {t("home.works.instagramButton")}
          </a>
        </div>
      </motion.div>

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

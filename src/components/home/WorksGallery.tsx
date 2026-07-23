import {
  lazy,
  Suspense,
  useCallback,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Maximize2,
} from "lucide-react";

import type {
  GalleryModalData,
  GalleryModalType,
} from "@/components/GalleryModal";
import { AnimatePresence, motion } from "@/lib/motion";
import SectionHeading from "./SectionHeading";

const base = import.meta.env.BASE_URL;
const GalleryModal = lazy(() => import("@/components/GalleryModal"));

const IMG = {
  personal1: `${base}images/optimized/works-personal-1.webp`,
  personal2: `${base}images/optimized/works-personal-2.webp`,
  personal3: `${base}images/optimized/works-personal-3.webp`,
  couple1: `${base}images/optimized/works-couples-1.webp`,
  couple2: `${base}images/optimized/works-couples-2.webp`,
  couple3: `${base}images/optimized/works-couples-3.webp`,
  family1: `${base}images/optimized/work-family-1.webp`,
  family2: `${base}images/optimized/work-family-2.webp`,
  family3: `${base}images/optimized/work-family-3.webp`,
  // These are the real filenames currently shipped by the project.
  wedding1: `${base}images/optimized/work-wrdding-1.webp`,
  wedding2: `${base}images/optimized/work-wrdding-2.webp`,
  wedding3: `${base}images/optimized/work-wrdding-3.webp`,
};

interface WorkItem {
  galleryType: GalleryModalType;
  titleKey: string;
  descriptionKey: string;
  modalDescriptionKey: string;
  imagePosition?: string;
  images: GalleryModalData["images"];
}

const WORKS: WorkItem[] = [
  {
    galleryType: "personal",
    titleKey: "home.works.personalTitle",
    descriptionKey: "home.works.personalDescription",
    modalDescriptionKey: "home.works.personalModalDescription",
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
    imagePosition: "object-[center_70%]",
    images: [
      { src: IMG.wedding1 },
      { src: IMG.wedding2 },
      { src: IMG.wedding3 },
    ],
  },
];

interface ActiveLightbox {
  data: GalleryModalData;
  imageIndex: number;
}

export default function WorksGallery() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeLightbox, setActiveLightbox] =
    useState<ActiveLightbox | null>(null);
  const activeTriggerRef = useRef<HTMLElement>(null);

  const closeGallery = useCallback(() => {
    setActiveLightbox(null);
  }, []);

  const works = WORKS.map((work) => {
    const title = t(work.titleKey);
    const description = t(work.descriptionKey);

    return {
      ...work,
      title,
      description,
      modal: {
        title,
        description: t(work.modalDescriptionKey),
        images: work.images,
        galleryType: work.galleryType,
        displayMode: "lightbox" as const,
      },
    };
  });

  const selectedWork = works[activeCategory];

  const moveCategory = (direction: -1 | 1) => {
    setActiveCategory(
      (current) => (current + direction + works.length) % works.length,
    );
  };

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

      <div className="mb-6 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => moveCategory(-1)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] text-white transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={t("home.works.previousCategoryAria")}
          data-testid="works-category-previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="formika-gallery-scroll min-w-0 flex-1 overflow-x-auto">
          <div
            className="flex min-w-max gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] p-1.5"
            role="tablist"
            aria-label={t("home.works.categorySelectorAria")}
          >
            {works.map((work, index) => (
              <button
                key={work.galleryType}
                type="button"
                role="tab"
                aria-selected={activeCategory === index}
                onClick={() => setActiveCategory(index)}
                className={`h-10 rounded-full px-4 text-xs font-bold uppercase tracking-[0.05em] transition-colors sm:px-5 ${
                  activeCategory === index
                    ? "bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(255,106,0,0.22)]"
                    : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                }`}
                data-testid={`works-category-${work.galleryType}`}
              >
                {work.title}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => moveCategory(1)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] text-white transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={t("home.works.nextCategoryAria")}
          data-testid="works-category-next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedWork.galleryType}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          role="tabpanel"
          className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-4 sm:p-5"
        >
          <div className="mb-4 sm:flex sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h3 className="font-sans text-xl font-semibold text-white sm:text-2xl">
                {selectedWork.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {selectedWork.description}
              </p>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-primary sm:mt-0">
              {t("home.works.openPhotoHint")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {selectedWork.images.map((image, imageIndex) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => {
                  activeTriggerRef.current = event.currentTarget;
                  setActiveLightbox({
                    data: selectedWork.modal,
                    imageIndex,
                  });
                }}
                className="group relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/10 bg-black text-left shadow-[0_14px_38px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:aspect-[3/4]"
                data-testid={`work-photo-${selectedWork.galleryType}-${imageIndex}`}
                aria-label={t("home.works.openPhotoAria", {
                  category: selectedWork.title,
                  number: imageIndex + 1,
                })}
              >
                <img
                  src={image.src}
                  alt={t("galleryModal.imageAlt", {
                    title: selectedWork.title,
                    number: imageIndex + 1,
                  })}
                  width={720}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover ${
                    selectedWork.imagePosition ?? "object-center"
                  } transition-transform duration-700 ease-out group-hover:scale-[1.035]`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur transition-colors group-hover:border-primary/60 group-hover:text-primary">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

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

      {activeLightbox && (
        <Suspense fallback={null}>
          <GalleryModal
            data={activeLightbox.data}
            initialImageIndex={activeLightbox.imageIndex}
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
    </section>
  );
}

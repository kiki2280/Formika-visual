import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { AnimatePresence, motion } from "@/lib/motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export interface GalleryModalImage {
  src: string;
  alt?: string;
}

export interface GalleryModalData {
  title: string;
  description: string;
  images: GalleryModalImage[];
  price?: string;
}

export interface GalleryModalCta {
  label: string;
  href?: string;
  onClick?: () => void;
  testId?: string;
}

interface GalleryModalProps {
  data: GalleryModalData | null;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  cta?: GalleryModalCta;
  initialImageIndex?: number;
}

export default function GalleryModal({
  data,
  onClose,
  returnFocusRef,
  cta,
  initialImageIndex = 0,
}: GalleryModalProps) {
  const { t } = useTranslation();
  const [activeImage, setActiveImage] = useState(initialImageIndex);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef(0);
  const leaveForRouteRef = useRef(false);

  useEffect(() => {
    if (!data) return;

    const startIndex = Math.min(
      Math.max(initialImageIndex, 0),
      Math.max(data.images.length - 1, 0),
    );

    setActiveImage(startIndex);
    leaveForRouteRef.current = false;

    window.requestAnimationFrame(() => {
      const gallery = galleryRef.current;
      const slide = gallery?.children.item(startIndex) as HTMLElement | null;

      if (gallery && slide) {
        gallery.scrollTo({
          left:
            slide.offsetLeft -
            (gallery.clientWidth - slide.clientWidth) / 2,
          behavior: "auto",
        });
      }

      closeButtonRef.current?.focus();
    });

    const body = document.body;
    const root = document.documentElement;
    const bodyStyle = body.getAttribute("style");
    const rootStyle = root.getAttribute("style");
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(scrollFrameRef.current);

      if (bodyStyle === null) {
        body.removeAttribute("style");
      } else {
        body.setAttribute("style", bodyStyle);
      }

      if (rootStyle === null) {
        root.removeAttribute("style");
      } else {
        root.setAttribute("style", rootStyle);
      }

      if (!leaveForRouteRef.current) {
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
        window.requestAnimationFrame(() => returnFocusRef.current?.focus());
      }
    };
  }, [data, initialImageIndex, onClose, returnFocusRef]);

  const scrollToImage = (index: number) => {
    if (!data) return;

    const nextIndex = Math.min(
      Math.max(index, 0),
      data.images.length - 1,
    );
    const gallery = galleryRef.current;
    const slide = gallery?.children.item(nextIndex) as HTMLElement | null;

    if (gallery && slide) {
      gallery.scrollTo({
        left:
          slide.offsetLeft -
          (gallery.clientWidth - slide.clientWidth) / 2,
        behavior: "smooth",
      });
    }

    setActiveImage(nextIndex);
  };

  const updateActiveImage = () => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const galleryCenter = gallery.scrollLeft + gallery.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(gallery.children).forEach((slide, index) => {
      const element = slide as HTMLElement;
      const slideCenter = element.offsetLeft + element.clientWidth / 2;
      const distance = Math.abs(slideCenter - galleryCenter);

      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });

    setActiveImage(closestIndex);
  };

  const handleGalleryScroll = () => {
    window.cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = window.requestAnimationFrame(updateActiveImage);
  };

  const handleCtaClick = () => {
    if (cta?.href) {
      leaveForRouteRef.current = true;
    }

    cta?.onClick?.();
    onClose();
  };

  const hasFourImages = data?.images.length === 4;
  const ctaClassName =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-sans text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_rgba(255,106,0,0.30)] transition-colors hover:bg-primary/90 md:h-auto md:px-8 md:py-3 md:tracking-wide md:shadow-[0_8px_30px_rgba(255,106,0,0.35)]";

  return createPortal(
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm md:bg-black/70 md:backdrop-blur-md"
            onClick={onClose}
            aria-label={t("galleryModal.closeGalleryAria")}
            data-testid="modal-backdrop"
          />

          <motion.div
            className={`relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#151515] shadow-[0_28px_90px_rgba(0,0,0,0.72),0_0_45px_rgba(255,106,0,0.10)] md:block md:max-h-[calc(100dvh-2rem)] md:overflow-y-auto md:overscroll-contain md:rounded-3xl md:border-border md:bg-card md:shadow-[0_0_60px_rgba(255,106,0,0.15)] md:scrollbar-hide ${
              hasFourImages
                ? "md:max-w-[1360px] lg:w-[92%]"
                : "md:max-w-[1120px] lg:w-[84%]"
            }`}
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            aria-describedby="gallery-modal-description"
            data-testid="detail-modal"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/70 text-white/70 shadow-lg backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:right-5 md:top-5 md:h-10 md:w-10 md:border-border md:bg-background/60 md:text-muted-foreground md:shadow-none md:backdrop-blur-none"
              aria-label={t("common.close")}
              data-testid="btn-close-modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto overscroll-contain p-4 md:overflow-visible md:p-7 lg:p-8">
              <div className="pr-12 md:pr-14">
                <h2
                  id="gallery-modal-title"
                  className="font-serif text-2xl font-medium leading-tight tracking-normal text-white md:font-sans md:text-4xl md:font-bold"
                >
                  {data.title}
                </h2>

                <p
                  id="gallery-modal-description"
                  className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-white/60 md:mt-4 md:max-w-2xl md:text-base md:text-muted-foreground"
                >
                  {data.description}
                </p>

                {data.price && (
                  <p className="mt-3 font-sans text-base font-semibold text-primary">
                    {data.price}
                  </p>
                )}
              </div>

              <div className="relative mt-5">
                <div
                  ref={galleryRef}
                  onScroll={handleGalleryScroll}
                  className={`flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:snap-none md:overflow-visible md:overscroll-auto md:gap-[14px] ${
                    hasFourImages
                      ? "md:grid-cols-2 lg:grid-cols-4 lg:gap-3"
                      : "md:grid-cols-3"
                  }`}
                >
                  {data.images.map((image, index) => (
                    <figure
                      key={`${image.src}-${index}`}
                      className="h-[min(52dvh,520px)] w-[88%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] md:h-auto md:w-auto md:aspect-[3/4] md:snap-none md:rounded-[24px] md:border-border md:bg-[#111]"
                      data-testid={`modal-example-${index}`}
                    >
                      <img
                        src={image.src}
                        alt={
                          image.alt ||
                          t("galleryModal.imageAlt", {
                            title: data.title,
                            number: index + 1,
                          })
                        }
                        loading={index === activeImage ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-contain md:scale-[1.03] md:object-cover md:transition-transform md:duration-[450ms] md:ease-out md:hover:scale-[1.08]"
                      />
                    </figure>
                  ))}
                </div>

                {data.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => scrollToImage(activeImage - 1)}
                      disabled={activeImage === 0}
                      className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary disabled:pointer-events-none disabled:opacity-25 sm:flex md:hidden"
                      aria-label={t("galleryModal.previousPhotoAria")}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToImage(activeImage + 1)}
                      disabled={activeImage === data.images.length - 1}
                      className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary disabled:pointer-events-none disabled:opacity-25 sm:flex md:hidden"
                      aria-label={t("galleryModal.nextPhotoAria")}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 flex min-h-9 items-center justify-between gap-4 md:hidden">
                <p className="font-sans text-xs font-semibold tabular-nums text-white/55">
                  {t("galleryModal.counter", {
                    current: activeImage + 1,
                    total: data.images.length,
                  })}
                </p>

                {data.images.length > 1 && (
                  <div className="flex items-center gap-2" aria-label={t("galleryModal.photoSelectorAria")}>
                    {data.images.map((image, index) => (
                      <button
                        key={`${image.src}-${index}`}
                        type="button"
                        onClick={() => scrollToImage(index)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          activeImage === index
                            ? "w-6 bg-primary"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={t("galleryModal.openPhotoAria", {
                          number: index + 1,
                        })}
                        aria-current={activeImage === index ? "true" : undefined}
                      />
                    ))}
                  </div>
                )}
              </div>

              {cta && (
                <div className="mt-5 flex justify-end md:mt-9">
                  {cta.href ? (
                    <Link
                      href={cta.href}
                      onClick={handleCtaClick}
                      className={ctaClassName}
                      data-testid={cta.testId}
                    >
                      {cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCtaClick}
                      className={ctaClassName}
                      data-testid={cta.testId}
                    >
                      {cta.label} <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

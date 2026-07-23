import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { AnimatePresence, motion } from "@/lib/motion";

export interface ImageLightboxImage {
  src: string;
  alt?: string;
}

export interface ImageLightboxData {
  images: ImageLightboxImage[];
  initialIndex?: number;
  caption?: string;
}

interface ImageLightboxProps {
  data: ImageLightboxData | null;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}

const SWIPE_THRESHOLD = 48;

export default function ImageLightbox({
  data,
  onClose,
  returnFocusRef,
}: ImageLightboxProps) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const imageCount = data?.images.length ?? 0;

  const showImage = useCallback(
    (index: number) => {
      if (imageCount < 2) return;
      setActiveIndex((index + imageCount) % imageCount);
    },
    [imageCount],
  );

  const showPrevious = useCallback(() => {
    showImage(activeIndex - 1);
  }, [activeIndex, showImage]);

  const showNext = useCallback(() => {
    showImage(activeIndex + 1);
  }, [activeIndex, showImage]);

  useEffect(() => {
    if (!data || imageCount === 0) return;

    const startIndex = Math.min(
      Math.max(data.initialIndex ?? 0, 0),
      imageCount - 1,
    );
    setActiveIndex(startIndex);

    const body = document.body;
    const root = document.documentElement;
    const bodyStyle = body.getAttribute("style");
    const rootStyle = root.getAttribute("style");
    const pageWasAlreadyLocked = body.style.position === "fixed";
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    if (!pageWasAlreadyLocked) {
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    body.style.overflow = "hidden";
    root.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);

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

      if (!pageWasAlreadyLocked) {
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
      }

      window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    };
  }, [data, imageCount, returnFocusRef]);

  useEffect(() => {
    if (!data || imageCount === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && imageCount > 1) {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight" && imageCount > 1) {
        event.preventDefault();
        showNext();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable?.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [data, imageCount, onClose, showNext, showPrevious]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;

    if (startX === null || endX === undefined || imageCount < 2) return;

    const distance = endX - startX;

    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

  const activeImage = data?.images[activeIndex];

  return createPortal(
    <AnimatePresence>
      {data && activeImage && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-[max(0.75rem,env(safe-area-inset-left))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          data-testid="image-lightbox"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out bg-black/90 backdrop-blur-sm"
            onClick={onClose}
            aria-label={t("imageViewer.close")}
            data-testid="image-lightbox-backdrop"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={data.caption || activeImage.alt}
            className="relative z-10 flex h-[min(92dvh,960px)] w-[94vw] max-w-[1680px] touch-pan-y flex-col items-center justify-center outline-none"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            tabIndex={-1}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-0 top-0 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/75 text-white shadow-xl backdrop-blur-md transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-2 sm:top-2"
              aria-label={t("imageViewer.close")}
              data-testid="image-lightbox-close"
            >
              <X className="h-6 w-6" />
            </button>

            <AnimatePresence>
              <motion.img
                key={`${activeImage.src}-${activeIndex}`}
                src={activeImage.src}
                alt={
                  activeImage.alt ||
                  t("galleryModal.imageAlt", {
                    title: data.caption,
                    number: activeIndex + 1,
                  })
                }
                className="max-h-[calc(92dvh-3.5rem)] max-w-[94vw] select-none object-contain"
                loading="eager"
                decoding="async"
                draggable={false}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                data-testid="image-lightbox-image"
              />
            </AnimatePresence>

            {imageCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-0 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white shadow-xl backdrop-blur-md transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:left-2"
                  aria-label={t("imageViewer.previous")}
                  data-testid="image-lightbox-previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-0 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white shadow-xl backdrop-blur-md transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-2"
                  aria-label={t("imageViewer.next")}
                  data-testid="image-lightbox-next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="absolute inset-x-14 bottom-0 flex min-h-10 items-center justify-center gap-4 text-center">
              {data.caption && (
                <p className="truncate text-sm font-medium text-white/80">
                  {data.caption}
                </p>
              )}

              {imageCount > 1 && (
                <p className="shrink-0 text-xs font-semibold tabular-nums text-white/70">
                  {t("galleryModal.counter", {
                    current: activeIndex + 1,
                    total: imageCount,
                  })}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

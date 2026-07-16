import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { motion, AnimatePresence } from "@/lib/motion";
import { X, ArrowRight } from "lucide-react";

export interface DetailModalData {
  title: string;
  description: string;
  examples: { img: string; label?: string }[];
}

interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

export default function DetailModal({ data, onClose }: DetailModalProps) {
  const hasFourExamples = data?.examples.length === 4;

  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [data, onClose]);

  return createPortal(
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            data-testid="modal-backdrop"
          />

          {/* Panel */}
          <motion.div
            className={`relative w-full ${hasFourExamples ? "max-w-[1360px] lg:w-[92%]" : "max-w-[1120px] lg:w-[84%]"} max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain scrollbar-hide bg-card border border-border rounded-3xl shadow-[0_0_60px_rgba(255,106,0,0.15)] p-5 sm:p-7 lg:p-8`}
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            data-testid="detail-modal"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background/60 text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
              aria-label="Закрыть"
              data-testid="btn-close-modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="pr-12 font-sans text-3xl font-bold tracking-normal md:text-4xl">
              {data.title}
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
              {data.description}
            </p>

            <div className="shared-modal-gallery" data-count={data.examples.length}>
              {data.examples.map((ex, i) => (
                <div
                  key={i}
                  className="shared-modal-photo"
                  data-testid={`modal-example-${i}`}
                >
                  <img
                    src={ex.img}
                    alt={ex.label || `${data.title} ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                  {ex.label && (
                    <span className="absolute bottom-3 left-4 text-sm font-semibold text-white drop-shadow">
                      {ex.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-9 flex justify-center sm:justify-end">
              <Link
                href="/order"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors shadow-[0_8px_30px_rgba(255,106,0,0.35)]"
                data-testid="btn-modal-order"
              >
                Заказать <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

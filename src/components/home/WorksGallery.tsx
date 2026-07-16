import SectionHeading from "./SectionHeading";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { AnimatePresence, motion } from "@/lib/motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  X,
} from "lucide-react";
import type { DetailModalData } from "./DetailModal";

const base = import.meta.env.BASE_URL;

const IMG = {
  personal: `${base}images/optimized/works-personal-1.webp`,
  personal2: `${base}images/optimized/works-personal-2.webp`,
  personal3: `${base}images/optimized/works-personal-3.webp`,

  couple: `${base}images/optimized/works-couples-1.webp`,
  couple2: `${base}images/optimized/works-couples-2.webp`,
  couple3: `${base}images/optimized/works-couples-3.webp`,

  family1: `${base}images/optimized/work-family-1.webp`,
  family2: `${base}images/optimized/work-family-2.webp`,
  family3: `${base}images/optimized/work-family-3.webp`,

  wedding1: `${base}images/optimized/work-wrdding-1.webp`,
  wedding2: `${base}images/optimized/work-wrdding-2.webp`,
  wedding3: `${base}images/optimized/work-wrdding-3.webp`,
};

interface WorkItem {
  title: string;
  desc: string;
  img: string;
  imagePosition?: string;
  modal: DetailModalData;
}

const WORKS: WorkItem[] = [
  {
    title: "Персональные",
    desc: "Уникальная композиция, созданная по вашей фотографии.",
    img: IMG.personal,
    imagePosition: "object-[center_70%]",
    modal: {
      title: "Персональные",
      description:
        "Композиции для одного человека, хобби, профессии или особенного образа. Можно добавить имя, дату, питомца, аксессуары и подсветку.",
      examples: [
        { img: IMG.personal },
        { img: IMG.personal2 },
        { img: IMG.personal3 },
      ],
    },
  },
  {
    title: "Для пары",
    desc: "Ваша общая история, воплощённая в маленьких деталях.",
    img: IMG.couple,
    imagePosition: "object-[center_70%]",
    modal: {
      title: "Для пары",
      description:
        "Подарок для годовщины, свадьбы, предложения или важного момента вдвоём. Можно добавить имена, дату, питомца и детали вашей истории.",
      examples: [
        { img: IMG.couple },
        { img: IMG.couple2 },
        { img: IMG.couple3 },
      ],
    },
  },
  {
    title: "Семейные",
    desc: "Тёплый подарок для семьи, детей и самых близких.",
    img: IMG.family1,
    imagePosition: "object-[center_70%]",
    modal: {
      title: "Семейные",
      description:
        "Тёплая композиция для семьи, детей, родителей и домашних питомцев. Хорошо подходит для семейных праздников и памятных подарков.",
      examples: [
        { img: IMG.family1 },
        { img: IMG.family2 },
        { img: IMG.family3 },
      ],
    },
  },
  {
    title: "Свадебные композиции",
    desc: "Памятная рамочка с вашей парой, датой и именами.",
    img: IMG.wedding1,
    imagePosition: "object-[center_70%]",
    modal: {
      title: "Свадебные композиции",
      description:
        "Создаём нежные рамочки со свадебными фигурками — с вашей парой, датой, именами и важными деталями истории. Если хотите именно свадебные фигурки, напишите нам в Telegram: мы подскажем, какие варианты есть в наличии.",
      examples: [
        { img: IMG.wedding1 },
        { img: IMG.wedding2 },
        { img: IMG.wedding3 },
      ],
    },
  },
];

interface WorkGalleryModalProps {
  data: DetailModalData | null;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

function WorkGalleryModal({
  data,
  onClose,
  returnFocusRef,
}: WorkGalleryModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef(0);
  const leaveForRouteRef = useRef(false);

  useEffect(() => {
    if (!data) return;

    setActiveImage(0);
    leaveForRouteRef.current = false;
    galleryRef.current?.scrollTo({ left: 0, behavior: "auto" });

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
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

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
  }, [data, onClose, returnFocusRef]);

  const scrollToImage = (index: number) => {
    if (!data) return;

    const nextIndex = Math.min(
      Math.max(index, 0),
      data.examples.length - 1,
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

  return createPortal(
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Закрыть галерею"
            data-testid="modal-backdrop"
          />

          <motion.div
            className="relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#151515] shadow-[0_28px_90px_rgba(0,0,0,0.72),0_0_45px_rgba(255,106,0,0.10)]"
            initial={{ scale: 0.97, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-gallery-title"
            aria-describedby="work-gallery-description"
            data-testid="detail-modal"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/70 text-white/70 shadow-lg backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-5 sm:top-5"
              aria-label="Закрыть"
              data-testid="btn-close-modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto overscroll-contain p-4 sm:p-7 lg:p-8">
              <div className="pr-12 sm:pr-14">
                <h2
                  id="work-gallery-title"
                  className="font-serif text-2xl font-medium leading-tight tracking-normal text-white sm:text-3xl lg:text-4xl"
                >
                  {data.title}
                </h2>

                <p
                  id="work-gallery-description"
                  className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-white/60 sm:text-base"
                >
                  {data.description}
                </p>
              </div>

              <div className="relative mt-5 sm:mt-6">
                <div
                  ref={galleryRef}
                  onScroll={handleGalleryScroll}
                  className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
                >
                  {data.examples.map((example, index) => (
                    <figure
                      key={example.img}
                      className="h-[min(52dvh,520px)] w-[88%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] sm:h-[min(58dvh,640px)] sm:w-full"
                      data-testid={`modal-example-${index}`}
                    >
                      <img
                        src={example.img}
                        alt={example.label || `${data.title} ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-contain"
                      />
                    </figure>
                  ))}
                </div>

                {data.examples.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => scrollToImage(activeImage - 1)}
                      disabled={activeImage === 0}
                      className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary disabled:pointer-events-none disabled:opacity-25 sm:flex"
                      aria-label="Предыдущее фото"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToImage(activeImage + 1)}
                      disabled={activeImage === data.examples.length - 1}
                      className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md transition-colors hover:border-primary/60 hover:text-primary disabled:pointer-events-none disabled:opacity-25 sm:flex"
                      aria-label="Следующее фото"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 flex min-h-9 items-center justify-between gap-4">
                <p className="text-xs font-semibold tabular-nums text-white/55">
                  {activeImage + 1} / {data.examples.length}
                </p>

                {data.examples.length > 1 && (
                  <div className="flex items-center gap-2" aria-label="Выбор фотографии">
                    {data.examples.map((example, index) => (
                      <button
                        key={example.img}
                        type="button"
                        onClick={() => scrollToImage(index)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          activeImage === index
                            ? "w-6 bg-primary"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Открыть фото ${index + 1}`}
                        aria-current={activeImage === index ? "true" : undefined}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex justify-end">
                <Link
                  href="/order"
                  onClick={() => {
                    leaveForRouteRef.current = true;
                    onClose();
                  }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_rgba(255,106,0,0.30)] transition-colors hover:bg-primary/90"
                  data-testid="btn-modal-order"
                >
                  Заказать <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function WorksGallery() {
  const [active, setActive] = useState<DetailModalData | null>(null);
  const activeTriggerRef = useRef<HTMLButtonElement>(null);
  const closeGallery = useCallback(() => setActive(null), []);

  return (
    <section
      id="works"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-24 lg:px-8"
    >
      {/* Заголовок блока */}
      <SectionHeading
        eyebrow="Примеры наших работ"
        title="Наши работы"
        subtitle="Персональные композиции, созданные по фотографиям и историям наших клиентов."
      />

      {/* Карточки работ */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WORKS.map((work, index) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="h-full"
          >
            <button
              type="button"
              onClick={(event) => {
                activeTriggerRef.current = event.currentTarget;
                setActive(work.modal);
              }}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[26px] border border-white/10 bg-black text-left shadow-[0_16px_45px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_65px_rgba(0,0,0,0.48),0_0_32px_rgba(255,106,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:aspect-[4/5]"
              data-testid={`card-work-${index}`}
            >
              <img
                src={work.img}
                alt={work.title}
                width={800}
                height={560}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 block h-full w-full object-cover ${
                  work.imagePosition ?? "object-center"
                } transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
              />

              {/* Мягкое затемнение изображения */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/20" />

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                <h3 className="font-sans text-base font-semibold leading-snug text-white sm:text-lg">
                  {work.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75 sm:mt-1.5 sm:text-sm">
                  {work.desc}
                </p>

                <span className="mt-2 inline-flex max-w-full items-center gap-2 whitespace-normal rounded-full border border-primary/35 bg-black/55 px-3 py-1.5 text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-primary backdrop-blur-md sm:mt-3 sm:py-2 sm:text-[10px] sm:tracking-[0.08em]">
                  Подробнее

                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Instagram */}
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
                Больше работ — в нашем Instagram
              </p>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Новые композиции, детали создания и идеи для подарков.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/f0rmika.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_28px_rgba(255,106,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_34px_rgba(255,106,0,0.35)]"
          >
            Смотреть Instagram
          </a>
        </div>
      </motion.div>

      <WorkGalleryModal
        data={active}
        onClose={closeGallery}
        returnFocusRef={activeTriggerRef}
      />
    </section>
  );
}

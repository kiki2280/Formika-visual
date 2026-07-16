import SectionHeading from "./SectionHeading";
import { useState } from "react";
import { motion } from "@/lib/motion";
import { ArrowRight, Instagram } from "lucide-react";
import DetailModal, { type DetailModalData } from "./DetailModal";

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

export default function WorksGallery() {
  const [active, setActive] = useState<DetailModalData | null>(null);

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
              onClick={() => setActive(work.modal)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[26px] border border-white/10 bg-black text-left shadow-[0_16px_45px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_65px_rgba(0,0,0,0.48),0_0_32px_rgba(255,106,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

              <div className="absolute inset-x-4 bottom-4">
                <h3 className="font-sans text-lg font-semibold leading-snug text-white">
                  {work.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm">
                  {work.desc}
                </p>

                <span className="mt-3 inline-flex max-w-full items-center gap-2 whitespace-normal rounded-full border border-primary/35 bg-black/55 px-3 py-2 text-[9px] font-bold uppercase leading-tight tracking-[0.06em] text-primary backdrop-blur-md sm:text-[10px] sm:tracking-[0.08em]">
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

      <DetailModal data={active} onClose={() => setActive(null)} />
    </section>
  );
}

import { motion } from "@/lib/motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Review {
  name: string;
  order: string;
  text: string;
}

const REVIEWS: Review[] = [
  {
    name: "Аня",
    order: "Рамочка для пары",
    text: "Заказывала подарок на годовщину. Получилось очень лично и красиво, все детали подобрали именно под нас.",
  },
  {
    name: "Мария",
    order: "Рамочка с LED-гирляндой",
    text: "Очень аккуратная работа. Тёплая подсветка вечером выглядит невероятно уютно.",
  },
  {
    name: "София",
    order: "Семейная рамочка",
    text: "Понравилось, что можно было добавить всех членов семьи, питомца и важную для нас дату.",
  },
  {
    name: "Кристина",
    order: "Рамочка с LED RGB",
    text: "Подсветка имеет разные цвета и режимы. Подарок получился ярким и необычным.",
  },
  {
    name: "Елена",
    order: "Персональная рамочка",
    text: "Быстро обсудили детали и сделали композицию именно по нашей фотографии.",
  },
  {
    name: "Лиза",
    order: "Кастомный брелок",
    text: "Брелочек получился очень милым и похожим на человека, для которого я его заказывала.",
  },
  {
    name: "Диана",
    order: "Рамочка с облаками",
    text: "Эффект облаков и цветная подсветка выглядят очень атмосферно. Вживую ещё красивее.",
  },
  {
    name: "Ольга",
    order: "Подарочная рамочка",
    text: "Заказ пришёл аккуратно упакованным. Всё выглядело красиво и было готово вовремя.",
  },
  {
    name: "Виктория",
    order: "Рамочка для пары",
    text: "Очень понравилась детализация фигурок и то, как внимательно отнеслись к нашим пожеланиям.",
  },
];

interface ReviewCardProps {
  review: Review;
  index: number;
}

function ReviewCard({ review, index }: ReviewCardProps) {
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.06,
      }}
      className="
        group relative flex min-h-[270px] flex-col overflow-hidden
        rounded-[28px] border border-white/10
        bg-gradient-to-br from-[#211d1a]/90 via-[#171513]/95 to-[#11100f]
        p-6
        shadow-[0_16px_42px_rgba(0,0,0,0.28)]
        transition-all duration-300
        hover:-translate-y-1 hover:border-primary/40
        hover:shadow-[0_24px_58px_rgba(0,0,0,0.45),0_0_28px_rgba(255,106,0,0.06)]
      "
      data-testid={`card-review-${index}`}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-primary/[0.04] blur-3xl transition-colors duration-300 group-hover:bg-primary/[0.1]" />

      <Quote
        className="pointer-events-none absolute right-5 top-5 h-10 w-10 text-primary/[0.09]"
        strokeWidth={1.4}
      />

      <div className="relative flex items-center gap-3">
        <div
          className="flex items-center gap-1"
          aria-label="Оценка: пять из пяти"
        >
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star
              key={starIndex}
              className="h-4 w-4 fill-primary text-primary"
              strokeWidth={1.5}
            />
          ))}
        </div>

        <span className="text-xs font-semibold text-white/30">5.0</span>
      </div>

      <blockquote className="relative mt-7 flex-1">
        <p className="font-sans text-[15px] leading-relaxed text-white/75">
          «{review.text}»
        </p>
      </blockquote>

      <div className="relative mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
        <span
          className="
            flex h-11 w-11 shrink-0 items-center justify-center
            rounded-full border border-primary/30 bg-primary/10
            font-sans text-base font-bold text-primary
            shadow-[0_0_22px_rgba(255,106,0,0.08)]
          "
        >
          {initial}
        </span>

        <div className="min-w-0">
          <p className="font-sans text-sm font-semibold text-white">
            {review.name}
          </p>

          <p className="mt-1 truncate font-sans text-xs text-primary/75">
            {review.order}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Отзывы клиентов"
          subtitle="Тёплые слова о персональных подарках, созданных в FORMIKA."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <ReviewCard
              key={`${review.name}-${index}`}
              review={review}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

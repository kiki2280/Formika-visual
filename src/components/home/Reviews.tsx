import { useState } from "react";
import { AnimatePresence, motion } from "@/lib/motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useTranslation } from "react-i18next";

interface Review {
  name: string;
  order: string;
  text: string;
}

const REVIEW_IDS = [
  "anya",
  "maria",
  "sofia",
  "kristina",
  "elena",
  "liza",
  "diana",
  "olga",
  "victoria",
] as const;

interface ReviewCardProps {
  review: Review;
  index: number;
  mobileHidden?: boolean;
}

function ReviewCard({ review, index, mobileHidden = false }: ReviewCardProps) {
  const { t } = useTranslation();
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.06,
      }}
      className={`
        group relative flex min-h-[220px] flex-col overflow-hidden md:min-h-[270px]
        rounded-[28px] border border-white/10
        bg-gradient-to-br from-[#211d1a]/90 via-[#171513]/95 to-[#11100f]
        p-4 md:p-6
        shadow-[0_16px_42px_rgba(0,0,0,0.28)]
        transition-all duration-300
        hover:-translate-y-1 hover:border-primary/40
        hover:shadow-[0_24px_58px_rgba(0,0,0,0.45),0_0_28px_rgba(255,106,0,0.06)]
        ${mobileHidden ? "hidden md:flex" : ""}
      `}
      data-testid={`card-review-${index}`}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-primary/[0.04] blur-3xl transition-colors duration-300 group-hover:bg-primary/[0.1]" />

      <Quote
        className="pointer-events-none absolute right-4 top-4 h-8 w-8 text-primary/[0.09] md:right-5 md:top-5 md:h-10 md:w-10"
        strokeWidth={1.4}
      />

      <div className="relative flex items-center gap-3">
        <div
          className="flex items-center gap-1"
          role="img"
          aria-label={t("home.reviews.ratingAria")}
        >
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star
              key={starIndex}
              className="h-4 w-4 fill-primary text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ))}
        </div>

        <span className="text-xs font-semibold text-white/60">{t("home.reviews.ratingValue")}</span>
      </div>

      <blockquote className="relative mt-4 flex-1 md:mt-7">
        <p className="font-sans text-sm leading-relaxed text-white/75 md:text-[15px]">
          {t("home.reviews.quote", { text: review.text })}
        </p>
      </blockquote>

      <div className="relative mt-4 flex items-center gap-3 border-t border-white/10 pt-4 md:mt-7 md:pt-5">
        <span
          className="
            flex h-10 w-10 shrink-0 items-center justify-center md:h-11 md:w-11
            rounded-full border border-primary/30 bg-primary/10
            font-sans text-base font-bold text-primary
            shadow-[0_0_22px_rgba(255,106,0,0.08)]
          "
        >
          {t("home.reviews.customerInitial", { initial })}
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
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const reviews: Review[] = REVIEW_IDS.map((id) => ({
    name: t(`home.reviews.${id}Name`),
    order: t(`home.reviews.${id}Order`),
    text: t(`home.reviews.${id}Text`),
  }));

  return (
    <section
      id="reviews"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("home.reviews.eyebrow")}
          title={t("home.reviews.title")}
          subtitle={t("home.reviews.subtitle")}
        />

        <div className="mt-10 grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {reviews.map((review, index) => (
              <ReviewCard
                key={`${review.name}-${index}`}
                review={review}
                index={index}
                mobileHidden={index >= 3 && !showAll}
              />
            ))}
          </AnimatePresence>
        </div>

        {reviews.length > 3 && (
          <div className="mt-6 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-primary/40 bg-primary/[0.06] px-5 font-sans text-xs font-bold uppercase tracking-[0.07em] text-primary transition-all duration-300 hover:border-primary/65 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              data-testid="button-toggle-reviews"
            >
              {showAll ? t("home.reviews.hide") : t("home.reviews.showMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

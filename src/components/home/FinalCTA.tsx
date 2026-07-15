import { Link } from "wouter";
import { motion } from "@/lib/motion";
import { ArrowRight, Clock3, Send } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Мягкое фоновое свечение */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(255,106,0,0.08), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="
            relative mx-auto max-w-5xl overflow-hidden
            rounded-[32px] border border-white/10
            bg-gradient-to-br from-[#241d19]/90 via-[#171412]/95 to-[#101010]
            px-6 py-12 text-center
            shadow-[0_28px_80px_rgba(0,0,0,0.38)]
            backdrop-blur-sm
            sm:px-10 md:py-16
          "
        >
          {/* Свечение внутри панели */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.1] blur-[105px]" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Ваша история — в деталях
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl uppercase leading-[1.15] tracking-[0.09em] text-white sm:text-4xl lg:text-5xl">
              Создайте подарок,
              <br />
              который расскажет
              <br />
              <span className="text-primary">вашу историю</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
              Выберите детали композиции, а мы аккуратно создадим ваш
              персональный подарок.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/order"
                className="
                  group inline-flex min-h-12 items-center justify-center gap-2
                  rounded-full bg-primary px-7
                  font-sans text-xs font-bold uppercase tracking-[0.07em]
                  text-primary-foreground
                  shadow-[0_12px_32px_rgba(255,106,0,0.3)]
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-primary/90
                  hover:shadow-[0_18px_42px_rgba(255,106,0,0.42)]
                "
                data-testid="button-final-order"
              >
                Создать свой подарок

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-xs text-white/40">
              <span className="inline-flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5 text-primary" />
                Заказ через Telegram
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-primary/60 sm:block" />

              <span>Без регистрации</span>

              <span className="hidden h-1 w-1 rounded-full bg-primary/60 sm:block" />

              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-primary" />
                Изготовление 1–7 дней
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

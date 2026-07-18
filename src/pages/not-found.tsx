import { Link } from "wouter";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { motion } from "@/lib/motion";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-16 sm:px-6 md:py-24">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/10 bg-black/55 px-5 py-10 text-center shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-10 sm:py-14 md:rounded-[38px] md:px-14 md:py-16"
        >
          {/* Декоративное оранжевое свечение */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-44 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[90px]"
          />

          {/* Декоративные LEGO-блоки */}
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -8, 0], rotate: [8, 12, 8] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-5 top-20 hidden h-16 w-16 rotate-12 rounded-2xl border border-primary/25 bg-primary/10 shadow-[0_0_30px_rgba(255,106,0,0.12)] sm:block"
          >
            <span className="absolute left-2 top-2 h-4 w-4 rounded-full border border-primary/30 bg-primary/15" />
            <span className="absolute right-2 top-2 h-4 w-4 rounded-full border border-primary/30 bg-primary/15" />
            <span className="absolute bottom-2 left-2 h-4 w-4 rounded-full border border-primary/30 bg-primary/15" />
            <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border border-primary/30 bg-primary/15" />
          </motion.div>

          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 9, 0], rotate: [-10, -15, -10] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-6 bottom-20 hidden h-20 w-20 -rotate-12 rounded-[22px] border border-white/10 bg-white/[0.035] shadow-[0_18px_45px_rgba(0,0,0,0.3)] sm:block"
          >
            <span className="absolute left-3 top-3 h-5 w-5 rounded-full border border-white/10 bg-white/[0.045]" />
            <span className="absolute right-3 top-3 h-5 w-5 rounded-full border border-white/10 bg-white/[0.045]" />
            <span className="absolute bottom-3 left-3 h-5 w-5 rounded-full border border-white/10 bg-white/[0.045]" />
            <span className="absolute bottom-3 right-3 h-5 w-5 rounded-full border border-white/10 bg-white/[0.045]" />
          </motion.div>

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              Ошибка 404
            </div>

            <div className="relative mt-6">
              <p
                aria-hidden="true"
                className="select-none bg-gradient-to-b from-primary via-primary to-primary/30 bg-clip-text font-sans text-[92px] font-black leading-none tracking-[-0.08em] text-transparent sm:text-[130px] md:text-[170px]"
              >
                404
              </p>

              <div
                aria-hidden="true"
                className="absolute inset-x-8 bottom-1 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
              />
            </div>

            <h1 className="mt-6 max-w-xl font-sans text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
              {t("notFound.title", {
                defaultValue: "Страница не найдена",
              })}
            </h1>

            <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/60 sm:text-base">
              {t("notFound.description", {
                defaultValue:
                  "Похоже, эта страница потерялась среди деталей. Вернитесь на главную и продолжите создавать особенный подарок.",
              })}
            </p>

            <Link
              href="/"
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-sans text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-[0_12px_35px_rgba(255,106,0,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:h-13 md:px-8"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              />

              {t("legal.backHome", {
                defaultValue: "На главную",
              })}

              <Home aria-hidden="true" className="h-4 w-4" />
            </Link>

            <div className="mt-10 flex items-center gap-3 text-white/25">
              <span className="h-px w-8 bg-white/10" />

              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em]">
                Formika
              </span>

              <span className="h-px w-8 bg-white/10" />
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
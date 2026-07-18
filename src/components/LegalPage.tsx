import { Link } from "wouter";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { useTranslation } from "react-i18next";

interface LegalPageProps {
  title: string;
  intro: string;
  titleClassName?: string;
  sections: {
    title: string;
    content: ReactNode;
  }[];
}

export default function LegalPage({
  title,
  intro,
  titleClassName = "",
  sections,
}: LegalPageProps) {
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-18 lg:px-8">
          <Link
            href="/"
            className="inline-flex text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            {t("legal.backHome")}
          </Link>

          <div className="mt-8 rounded-3xl border border-border bg-card/75 p-6 shadow-xl backdrop-blur-xl sm:p-8 md:p-10">
            <SectionHeading
              eyebrow={t("brand.name")}
              title={title}
              subtitle={intro}
              align="left"
              as="h1"
              size="legal"
              animated={false}
              uppercase={false}
              className={`mb-8 ${titleClassName}`}
            />

            <div className="mt-8 space-y-7">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="border-t border-border pt-6"
                >
                  <h2 className="font-sans text-lg font-semibold sm:text-xl md:text-2xl">
                    {section.title}
                  </h2>

                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
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
  sections: {
    title: string;
    content: ReactNode;
  }[];
}

export default function LegalPage({ title, intro, sections }: LegalPageProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-clip">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-18">
          <Link
            href="/"
            className="inline-flex text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            {t("legal.backHome")}
          </Link>

          <div className="mt-8 rounded-3xl border border-border bg-card/75 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-xl">
            <SectionHeading
              eyebrow={t("brand.name")}
              title={title}
              subtitle={intro}
              align="left"
              as="h1"
              size="legal"
              animated={false}
              uppercase={false}
              className="mb-8"
            />

            <div className="mt-8 space-y-7">
              {sections.map((section) => (
                <section key={section.title} className="border-t border-border pt-6">
                  <h2 className="font-sans text-lg font-semibold sm:text-xl md:text-2xl">{section.title}</h2>
                  <div className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
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

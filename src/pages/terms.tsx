import {
  BadgeCheck,
  Camera,
  ClipboardList,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LegalPage from "@/components/LegalPage";
import { CONTACTS } from "@/lib/contacts";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <LegalPage
      title={t("legal.terms.title")}
      intro={t("legal.terms.intro")}
      sections={[
        {
          title: t("legal.terms.processTitle"),
          content: (
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: t("legal.terms.choiceTitle"),
                  text: t("legal.terms.choiceText"),
                  icon: ClipboardList,
                },
                {
                  number: "02",
                  title: t("legal.terms.applicationTitle"),
                  text: t("legal.terms.applicationText"),
                  icon: Send,
                },
                {
                  number: "03",
                  title: t("legal.terms.approvalTitle"),
                  text: t("legal.terms.approvalText"),
                  icon: MessageCircle,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="
                      group relative overflow-hidden rounded-2xl
                      border border-white/[0.08]
                      bg-white/[0.025] p-5
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-primary/40
                      hover:bg-primary/[0.035]
                      hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]
                    "
                  >
                    <span className="absolute right-4 top-4 font-sans text-xs font-semibold tracking-[0.14em] text-white/[0.14]">
                      {item.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] text-primary transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-5 font-sans text-base font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.45]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          ),
        },
        {
          title: t("legal.terms.confirmationTitle"),
          content: (
            <div className="overflow-hidden rounded-[22px] border border-primary/25 bg-primary/[0.045]">
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/[0.09] text-primary">
                  <BadgeCheck className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-base font-semibold text-white">
                    {t("legal.terms.afterApprovalTitle")}
                  </h3>

                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.48]">
                    {t("legal.terms.afterApprovalText")}
                  </p>
                </div>
              </div>

              <div className="grid border-t border-primary/15 sm:grid-cols-2">
                <div className="flex items-start gap-3 border-b border-primary/15 p-4 sm:border-b-0 sm:border-r">
                  <MessageCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="font-sans text-sm font-semibold text-white">
                      {t("legal.terms.beforeConfirmationTitle")}
                    </p>

                    <p className="mt-1 font-sans text-xs leading-relaxed text-white/[0.4]">
                      {t("legal.terms.beforeConfirmationText")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4">
                  <PackageCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="font-sans text-sm font-semibold text-white">
                      {t("legal.terms.afterConfirmationTitle")}
                    </p>

                    <p className="mt-1 font-sans text-xs leading-relaxed text-white/[0.4]">
                      {t("legal.terms.afterConfirmationText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: t("legal.terms.customProductionTitle"),
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <Sparkles className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-sans text-sm font-semibold text-white">
                    {t("legal.terms.personalCompositionTitle")}
                  </h3>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-white/[0.45]">
                  {t("legal.terms.personalCompositionText")}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <Palette className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-sans text-sm font-semibold text-white">
                    {t("legal.terms.differencesTitle")}
                  </h3>
                </div>

                <p className="mt-3 font-sans text-sm leading-relaxed text-white/[0.45]">
                  {t("legal.terms.differencesText")}
                </p>
              </div>
            </div>
          ),
        },
        {
          title: t("legal.terms.materialsTitle"),
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <LockKeyhole className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white">
                      {t("legal.terms.personalMaterialsTitle")}
                    </h3>

                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.45]">
                      {t("legal.terms.personalMaterialsText")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.07] text-primary">
                    <Camera className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white">
                      {t("legal.terms.publicationTitle")}
                    </h3>

                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/[0.45]">
                      {t("legal.terms.publicationText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: t("legal.terms.ctaTitle"),
          content: (
            <div className="relative overflow-hidden rounded-[22px] border border-primary/25 bg-primary/[0.05] p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/[0.08] text-primary">
                    <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-sans text-base font-semibold text-white">
                      {t("legal.terms.ctaSubtitle")}
                    </h3>

                    <p className="mt-1 max-w-lg font-sans text-sm leading-relaxed text-white/[0.45]">
                      {t("legal.terms.ctaText")}
                    </p>
                  </div>
                </div>

                <a
                  href={CONTACTS.orderTelegram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex h-11 shrink-0 items-center justify-center
                    rounded-xl bg-primary px-5
                    font-sans text-sm font-semibold text-primary-foreground
                    transition-all duration-300
                    hover:bg-primary/90
                    hover:shadow-[0_14px_34px_rgba(255,106,0,0.22)]
                  "
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t("legal.terms.orderButton")}
                </a>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}

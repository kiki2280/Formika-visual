import {
  Database,
  Image,
  Instagram,
  Send,
  Share2,
  Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LegalPage from "@/components/LegalPage";
import { CONTACTS } from "@/lib/contacts";

const CONTACT_LINKS = [
  {
    labelKey: "contacts.telegram",
    href: CONTACTS.telegram.href,
    value: CONTACTS.telegram.handle,
    icon: Send,
  },
  {
    labelKey: "contacts.instagram",
    href: CONTACTS.instagram.href,
    value: CONTACTS.instagram.handle,
    icon: Instagram,
  },
];

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();

  const isRussian = i18n.resolvedLanguage?.startsWith("ru");

  return (
    <LegalPage
      title={t("legal.privacy.title")}
      intro={t("legal.privacy.intro")}
      titleClassName={
        isRussian ? "max-md:[&_h1]:!text-[20px]" : undefined
      }
      sections={[
        {
          title: t("legal.privacy.dataTitle"),
          content: (
            <div className="space-y-4">
              <p>{t("legal.privacy.dataText")}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2.5">
                    <Database className="h-4 w-4 text-primary" />

                    <p className="font-sans text-sm font-semibold text-foreground">
                      {t("legal.privacy.orderDataTitle")}
                    </p>
                  </div>

                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                    {t("legal.privacy.orderDataText")}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2.5">
                    <Image className="h-4 w-4 text-primary" />

                    <p className="font-sans text-sm font-semibold text-foreground">
                      {t("legal.privacy.photosTitle")}
                    </p>
                  </div>

                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                    {t("legal.privacy.photosText")}
                  </p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: t("legal.privacy.sharingTitle"),
          content: (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <Share2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <p>{t("legal.privacy.sharingText")}</p>
              </div>
            </div>
          ),
        },
        {
          title: t("legal.privacy.finishedPhotosTitle"),
          content: (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <Image className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <p>{t("legal.privacy.finishedPhotosText")}</p>
              </div>
            </div>
          ),
        },
        {
          title: t("legal.privacy.changeDeleteTitle"),
          content: (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <p>{t("legal.privacy.changeDeleteText")}</p>
              </div>
            </div>
          ),
        },
        {
          title: t("legal.privacy.contactTitle"),
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              {CONTACT_LINKS.map((contact) => {
                const Icon = contact.icon;

                return (
                  <a
                    key={contact.labelKey}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group flex items-center justify-between gap-4
                      rounded-2xl border border-white/[0.09]
                      bg-white/[0.025] p-4
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-primary/45
                      hover:bg-primary/[0.05]
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.07] text-primary">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {t(contact.labelKey)}
                        </p>

                        <p className="mt-0.5 truncate font-sans text-xs text-muted-foreground">
                          {contact.value}
                        </p>
                      </div>
                    </div>

                    <span className="font-sans text-lg text-primary transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          ),
        },
      ]}
    />
  );
}
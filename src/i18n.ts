import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "@/locales/ru.json";
import lv from "@/locales/lv.json";
import en from "@/locales/en.json";

export const FORMIKA_LANGUAGE_STORAGE_KEY = "formika-language";
export const SUPPORTED_LANGUAGES = ["ru", "lv", "en"] as const;

export type FormikaLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isFormikaLanguage(value: unknown): value is FormikaLanguage {
  return (
    typeof value === "string" &&
    SUPPORTED_LANGUAGES.includes(value as FormikaLanguage)
  );
}

function getInitialLanguage(): FormikaLanguage {
  if (typeof window === "undefined") return "ru";

  try {
    const storedLanguage = window.localStorage.getItem(
      FORMIKA_LANGUAGE_STORAGE_KEY,
    );

    return isFormikaLanguage(storedLanguage) ? storedLanguage : "ru";
  } catch {
    return "ru";
  }
}

function syncDocumentLanguage(language: string) {
  if (typeof document === "undefined") return;

  const normalizedLanguage: FormikaLanguage = isFormikaLanguage(language)
    ? language
    : "ru";

  document.documentElement.lang = normalizedLanguage;
  document.title = i18n.t("seo.title", { lng: normalizedLanguage });

  const description = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );

  if (description) {
    description.content = i18n.t("seo.description", {
      lng: normalizedLanguage,
    });
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    lv: { translation: lv },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "ru",
  supportedLngs: SUPPORTED_LANGUAGES,
  load: "currentOnly",
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);

i18n.on("languageChanged", (language) => {
  const normalizedLanguage: FormikaLanguage = isFormikaLanguage(language)
    ? language
    : "ru";

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        FORMIKA_LANGUAGE_STORAGE_KEY,
        normalizedLanguage,
      );
    } catch {
      // The language still changes for this session when storage is unavailable.
    }
  }

  syncDocumentLanguage(normalizedLanguage);
});

export default i18n;

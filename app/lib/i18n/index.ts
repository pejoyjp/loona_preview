import type { I18nBase } from "@shopify/hydrogen";
import DE from "./de";
import EN from "./en";
import FR from "./fr";
import JA from "./ja";
import KO from "./ko";

const supportedLocales: Record<string, I18nBase> = {
  "en-us": { language: "EN", country: "US" },
  "de-de": { language: "DE", country: "DE" },
  "ja-jp": { language: "JA", country: "JP" },
  "ko-kr": { language: "KO", country: "KR" },
  "en-ca": { language: "EN", country: "CA" },
  "fr-ca": { language: "FR", country: "CA" },
}

export type Translation = typeof EN;

const translations: Record<string, Translation> = {
  EN,
  DE,
  FR,
  JA,
  KO,
};

export function getLocaleFromRequest(request: Request): I18nBase {
  const defaultLocale: I18nBase = { language: "EN", country: "US" };

  const url = new URL(request.url);
  const firstSubdomain = url.hostname.split(".")[0]?.toLowerCase();

  // Map subdomain to locale key
  const subdomainToLocale: Record<string, string> = {
    "de": "de-de",
    "jp": "ja-jp",
    "kr": "ko-kr",
    "ca": "en-ca", // Default to English for Canada
  };

  const localeKey = subdomainToLocale[firstSubdomain];

  return supportedLocales[localeKey]
    ? supportedLocales[localeKey]
    : defaultLocale;
}

export function getLocale(language: string, country: string): I18nBase {
  const localeKey = `${language.toLowerCase()}-${country.toLowerCase()}`;
  return supportedLocales[localeKey] || { language: "EN", country: "US" };
}

export function useTranslation(locale: I18nBase) {
  const lang = locale.language;
  const dict = translations[lang] ?? translations.EN;
  return { locale: lang, t: dict };
}

import type { I18nBase } from "@shopify/hydrogen";
import DE from "./de";
import EN from "./en";
import JA from "./ja";
import KR from "./kr";

const supportedLocales = {
  DE: "DE",
  JP: "JA",
  KR: "KO",
  US: "EN",

} as Record<I18nBase["country"], I18nBase["language"]>;

export type Translation = typeof EN;

const translations: Record<string, Translation> = {
  EN,
  DE,
  JA,
  KR,
};

export function getLocaleFromRequest(request: Request): I18nBase {
  const defaultLocale: I18nBase = { language: "EN", country: "US" };

  const url = new URL(request.url);
  const firstSubdomain = url.hostname.split(".")[0]?.toUpperCase() as keyof typeof supportedLocales;

  return supportedLocales[firstSubdomain]
    ? { language: supportedLocales[firstSubdomain], country: firstSubdomain }
    : defaultLocale;
}

export function useTranslation(locale: I18nBase) {
  const lang = locale.language;
  const dict = translations[lang] ?? translations.EN;
  return { locale: lang, t: dict };
}

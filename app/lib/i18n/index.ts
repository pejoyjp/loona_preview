import type { I18nBase } from "@shopify/hydrogen";
import DE from "./de";
import EN from "./en";
import FR from "./fr";
import JA from "./ja";
import KO from "./ko";

export type Translation = typeof EN;

const translations: Record<string, Translation> = {
  EN,
  DE,
  FR,
  JA,
  KO,
};

export function useTranslation(locale: I18nBase) {
  const lang = locale.language;
  const dict = translations[lang] ?? translations.EN;
  return { locale: lang, t: dict };
}

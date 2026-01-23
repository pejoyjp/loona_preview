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

export type TranslateFn = (
  key: keyof Translation,
  params?: Record<string, string | number>,
) => string;

function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;

  return template.replace(/{{(\w+)}}/g, (_, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : "";
  });
}

export function useTranslation(locale: I18nBase) {
  const lang = locale.language;
  const dict = translations[lang] ?? translations.EN;
  const t: TranslateFn = (key, params) => {
    const template = dict[key] ?? translations.EN[key];

    if (!template) {
      return "";
    }

    return interpolate(template, params);
  };

  return { locale: lang, t };
}

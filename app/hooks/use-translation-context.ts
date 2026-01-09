import { useContext } from "react";
import { TranslationContext } from "~/lib/i18n/translation-context";

export function useTranslationContext() {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error("useTranslationContext must be used within TranslationProvider");
  }
  return ctx;
}

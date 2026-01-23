import type { I18nBase } from "@shopify/hydrogen";
import { createContext, useMemo } from "react";
import { useTranslation } from "~/lib/i18n";
import type { TranslateFn } from "~/lib/i18n";

type TranslationContextValue = {
  t: TranslateFn;
};

export const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({
  locale,
  children,
}: {
  locale: I18nBase;
  children: React.ReactNode;
}) {
  const { t } = useTranslation(locale);

  const value = useMemo(() => ({ t }), [t]);

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

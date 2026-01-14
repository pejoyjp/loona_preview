import { CartForm } from "@shopify/hydrogen";
import { DynamicFlag } from "@sankyu/react-circle-flags";
import { Form, useLocation, useRouteLoaderData } from "react-router";
import { useRef, useState } from "react";
import { addLocaleToPath, type Locale } from "~/data/countries";
import type { RootLoader } from "~/root";
import { LanguageDropdown } from "./language-dropdown";
import { Down } from "@icon-park/react";



export function CountrySelector() {
  const root = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = root?.selectedLocale as Locale;
  const countries = root?.countries || {};
  const { pathname, search } = useLocation();
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const actionInputRef = useRef<HTMLInputElement>(null);
  const redirectInputRef = useRef<HTMLInputElement>(null);

  if (!selectedLocale || Object.keys(countries).length === 0) {
    return null;
  }

  const allLocales = Object.values(countries);

  const localesByCountry = allLocales.reduce<Record<string, Locale[]>>((acc, locale) => {
    acc[locale.country] ||= [];
    acc[locale.country].push(locale);
    return acc;
  }, {});

  const handleSubmit = (countryCode: string, redirectTo: string) => {
    if (!formRef.current || !actionInputRef.current || !redirectInputRef.current) return;

    actionInputRef.current.value = JSON.stringify({
      action: CartForm.ACTIONS.BuyerIdentityUpdate,
      inputs: {
        buyerIdentity: {
          countryCode,
        },
      },
    });

    redirectInputRef.current.value = redirectTo;
    formRef.current.requestSubmit();
  };

  return (
    <Form
      ref={formRef}
      method="post"
      action="/cart"
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5"
    >
      <input ref={actionInputRef} type="hidden" name={CartForm.INPUT_NAME} />
      <input ref={redirectInputRef} type="hidden" name="redirectTo" />

      {Object.entries(localesByCountry).map(([country, locales]) => {
        const representative = locales[0];
        const isSelected = country === selectedLocale.country;
        const isMultipleLanguages = locales.length > 1;
        const isExpanded = expandedCountry === country;

        const redirectPath = addLocaleToPath(pathname, representative, allLocales);
        const redirectTo = `https://${representative.host}${redirectPath}${search}`;

        return (
          <div key={country} className="flex flex-col bg-muted hover:bg-muted/80">
            <button
              type="button"
              className="h-12 px-4 flex focus-visible:outline-none items-center group cursor-pointer overflow-x-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => {
                if (isMultipleLanguages) {
                  setExpandedCountry(isExpanded ? null : country);
                  return;
                }

                if (!isSelected) {
                  handleSubmit(country, redirectTo);
                }
              }}
              disabled={!isMultipleLanguages && isSelected}
            >
              <div className="w-6 overflow-hidden h-6 rounded-full flex justify-center items-center mr-2">
                <DynamicFlag code={country} />
              </div>

              <span className="flex-1 text-left">{representative.label}</span>

              <span
                className={`flex items-center gap-4 transition-transform duration-300 ${
                  isMultipleLanguages && "translate-x-10  group-hover:translate-x-0"
                }`}
              >
                <p>{representative.language}</p>
                {isMultipleLanguages && (
                  <Down
                    theme="outline"
                    size="24"
                    className={`
                      transition-transform duration-300 ease-out
                      ${isExpanded ? "rotate-180" : "rotate-0"}
                    `}
                  />
                )}
              </span>
            </button>

            {isMultipleLanguages && (
              <div className="bg-background rounded-md relative">
                <LanguageDropdown
                  locales={locales}
                  isExpanded={isExpanded}
                  currentLanguage={
                    selectedLocale.country === country ? selectedLocale.language : undefined
                  }
                  pathname={pathname}
                  search={search}
                />
              </div>
            )}
          </div>
        );
      })}
    </Form>
  );
}

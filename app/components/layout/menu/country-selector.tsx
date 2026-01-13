import { CartForm } from "@shopify/hydrogen";
import { DynamicFlag } from "@sankyu/react-circle-flags";
import { Form, useLocation, useRouteLoaderData } from "react-router";
import { useState } from "react";
import { addLocaleToPath, type Locale } from "~/data/countries";
import type { RootLoader } from "~/root";
import { LanguageDropdown } from "./language-dropdown";
import { Down } from "@icon-park/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"


export function CountrySelector() {
  const root = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = root?.selectedLocale as Locale;
  const countries = root?.countries || {};
  const { pathname, search } = useLocation();
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  if (!selectedLocale || Object.keys(countries).length === 0) {
    return null;
  }

  const allLocales = Object.values(countries);

  const localesByCountry = allLocales.reduce<Record<string, Locale[]>>((acc, locale) => {
    acc[locale.country] ||= [];
    acc[locale.country].push(locale);
    return acc;
  }, {});

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
      {Object.entries(localesByCountry).map(([country, locales]) => {
        const representative = locales[0];
        const isSelected = country === selectedLocale.country;
        const isMultipleLanguages = locales.length > 1;
        const isExpanded = expandedCountry === country;

        const redirectPath = addLocaleToPath(pathname, representative, allLocales);
        const redirectTo = `https://${representative.host}${redirectPath}${search}`;

        return (
          <div key={country} className="flex flex-col">
            <Form
              method="post"
              action="/cart"
              className="bg-muted h-12 px-4 flex items-center hover:bg-muted/80 group cursor-pointer overflow-x-hidden"
              onSubmit={(e) => {
                if (isMultipleLanguages) {
                  e.preventDefault();
                  setExpandedCountry(isExpanded ? null : country);
                }
              }}
            >
              <input
                type="hidden"
                name={CartForm.INPUT_NAME}
                value={JSON.stringify({
                  action: CartForm.ACTIONS.BuyerIdentityUpdate,
                  inputs: {
                    buyerIdentity: {
                      countryCode: country,
                    },
                  },
                })}
              />

              <input type="hidden" name="redirectTo" value={redirectTo} />

              <div className="w-6 overflow-hidden h-6 rounded-full flex justify-center items-center mr-2">
                <DynamicFlag code={country} />
              </div>

              <button type="submit" disabled={isSelected} className="flex-1 text-left">
                {representative.label}
              </button>

              <button
                className={`flex items-center gap-4 transition-transform duration-300 ${
                  isMultipleLanguages && "translate-x-10  group-hover:translate-x-0"
                }`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedCountry(isExpanded ? null : country);
                }}
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
              </button>
            </Form>

        

            {isMultipleLanguages && isExpanded && (
              <div className="bg-background rounded-md relative">
                <LanguageDropdown
                  locales={locales}
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
    </div>
  );
}

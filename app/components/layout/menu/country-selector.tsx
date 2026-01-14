import { DynamicFlag } from "@sankyu/react-circle-flags";
import { ChevronDownIcon } from "lucide-react";
import { Form, useLocation, useRouteLoaderData } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Locale } from "~/data/countries";
import { countries as countriesData } from "~/data/countries";
import type { RootLoader } from "~/root";

export function CountrySelector() {
  const root = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = root?.selectedLocale as Locale | undefined;
  const { pathname, search } = useLocation();

  if (!selectedLocale) return null;
  const countries = countriesData;

  const localesByCountry = Object.values(countries).reduce(
    (acc, locale) => {
      if (!acc[locale.country]) acc[locale.country] = [];
      acc[locale.country].push(locale);
      return acc;
    },
    {} as Record<string, Locale[]>
  );

  const strippedPathname = pathname.replace(selectedLocale.pathPrefix || "", "");
  const pathWithSearch = `${strippedPathname}${search}`;

  return (
    <div className="flex flex-wrap justify-between gap-5 ">
      {Object.entries(localesByCountry).map(([countryCode, locales]) => {
        const isMultiLanguage = locales.length > 1;
        const activeLocale =
          locales.find(
            (locale) =>
              locale.language === selectedLocale.language &&
              locale.country === selectedLocale.country
          ) ?? locales[0];

        if (!isMultiLanguage) {
          const isActive =
            activeLocale.language === selectedLocale.language &&
            activeLocale.country === selectedLocale.country;
          return (
            <Form
              method="post"
              action="/locale"
              key={`${activeLocale.language}-${activeLocale.country}`}
              className="flex flex-col bg-muted hover:bg-muted/80 w-72"
            >
              <input type="hidden" name="language" value={activeLocale.language} />
              <input type="hidden" name="country" value={activeLocale.country} />
              <input type="hidden" name="path" value={pathWithSearch} />
              <button
                type="submit"
                disabled={isActive}
                className={isActive ? "opacity-50 cursor-not-allowed" : ""}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <DynamicFlag code={activeLocale.country} height={24} width={24} />
                    <p>{activeLocale.label}</p>
                  </div>
                  <p>{activeLocale.language}</p>
                </div>
              </button>
            </Form>
          );
        }

        return (
          <DropdownMenu key={countryCode}>
            <DropdownMenuTrigger asChild className="w-72">
              <button
                type="button"
                className="flex flex-col bg-muted hover:bg-muted/80 overflow-hidden group relative"
                aria-label={`${activeLocale.country} locale options`}
              >
                <div className="flex ">
                  <div className="flex items-center gap-3">
                    <DynamicFlag code={activeLocale.country} height={24} width={24} />
                    <p>{activeLocale.label}</p>
                  </div>
                  <div className="flex items-center gap-4 transition-transform duration-300 absolute -right-8 group-hover:-translate-x-8 group-data-[state=open]:-translate-x-8">
                    <p>{activeLocale.language}</p>
                    <ChevronDownIcon className="size-4" />
                  </div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
              {locales.map((locale) => {
                const localeKey = `${locale.language}-${locale.country}`;
                const isActive =
                  locale.language === selectedLocale.language &&
                  locale.country === selectedLocale.country;

                return (
                  <Form method="post" action="/locale" key={localeKey}>
                    <input type="hidden" name="language" value={locale.language} />
                    <input type="hidden" name="country" value={locale.country} />
                    <input type="hidden" name="path" value={pathWithSearch} />
                    <DropdownMenuItem asChild disabled={isActive}>
                      <button
                        type="submit"
                        className={`flex w-full items-center justify-between ${
                          isActive ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isActive}
                      >
                        <span className="flex items-center gap-3">
                          <DynamicFlag code={locale.country} height={20} width={20} />
                          <span className="text-left">{locale.label}</span>
                        </span>
                        <span className="text-muted-foreground">{locale.language}</span>
                      </button>
                    </DropdownMenuItem>
                  </Form>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}

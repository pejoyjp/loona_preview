import { DynamicFlag } from "@sankyu/react-circle-flags";
import { Form, useLocation, useRouteLoaderData } from "react-router";
import { TabsBtn, TabsContent, TabsProvider } from "~/components/ui/tab";
import type { Locale } from "~/data/countries";
import { countries as countriesData } from "~/data/countries";
import type { RootLoader } from "~/root";
import { LanguageDropDown } from "./language-drop-down";

export function CountrySelector() {
  const root = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = root?.selectedLocale as Locale | undefined;
  const { pathname, search } = useLocation();

  if (!selectedLocale) return null;
  const countries = countriesData;

  const strippedPathname = pathname.replace(selectedLocale.pathPrefix || "", "");
  const pathWithSearch = `${strippedPathname}${search}`;

  const localesByContinent = Object.values(countries).reduce(
    (acc, locale) => {
      const continent = locale.continent || "Other";
      if (!acc[continent]) acc[continent] = {};
      if (!acc[continent][locale.country]) acc[continent][locale.country] = [];
      acc[continent][locale.country].push(locale);
      return acc;
    },
    {} as Record<string, Record<string, Locale[]>>,
  );

  const continentOrder = [
    "North America",
    "Europe",
    "Asia",
    "Oceania",
    "South America",
    "Africa",
    "Other",
  ];

  const continentEntries = Object.entries(localesByContinent).sort(
    (a, b) => continentOrder.indexOf(a[0]) - continentOrder.indexOf(b[0]),
  );

  if (continentEntries.length === 0) return null;

  const renderCountryCard = (locales: Locale[]) => {
    const isMultiLanguage = locales.length > 1;
    const activeLocale =
      locales.find(
        (locale) =>
          locale.language === selectedLocale.language && locale.country === selectedLocale.country,
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
          className="flex flex-col bg-muted hover:bg-muted/80 w-full"
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
      <LanguageDropDown
        key={`${locales[0].country}-dropdown`}
        locales={locales}
        selectedLocale={selectedLocale}
        pathWithSearch={pathWithSearch}
        className="w-full"
      />
    );
  };

  return (
    <div className="flex max-w-full gap-8 overflow-hidden no-scrollbar h-64 max-h-64 lg:h-auto lg:max-h-full">
      <div className="hidden lg:flex flex-col gap-8  w-full">
        {continentEntries.map(([continent, countriesByCode]) => (
          <div key={continent} className="flex flex-col gap-4 w-full">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {continent}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.values(countriesByCode).map((locales) => renderCountryCard(locales))}
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden w-full ">
        <TabsProvider defaultValue={continentEntries[0]?.[0] ?? continentOrder[0]}>
          <div className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
            {continentEntries.map(([continent]) => (
              <TabsBtn key={continent} value={continent} className="">
                {continent}
              </TabsBtn>
            ))}
          </div>
          {continentEntries.map(([continent, countriesByCode]) => (
            <TabsContent key={continent} value={continent} className="pt-4 ">
              <div className="flex flex-col gap-4">
                {Object.values(countriesByCode).map((locales) => renderCountryCard(locales))}
              </div>
            </TabsContent>
          ))}
        </TabsProvider>
      </div>
    </div>
  );
}

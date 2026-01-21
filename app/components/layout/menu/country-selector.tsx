import { DynamicFlag } from "@sankyu/react-circle-flags";
import { Form, useLocation, useRouteLoaderData } from "react-router";
import { TabsBtn, TabsContent, TabsProvider } from "~/components/ui/tab";
import type { Locale } from "~/data/countries";
import type { RootLoader } from "~/root";
import { LanguageDropDown } from "./language-drop-down";

export function CountrySelector() {
  const root = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = root?.selectedCountry as Locale | undefined;
  const { pathname, search } = useLocation();

  if (!selectedLocale) return null;
  const strippedPathname = pathname.replace(selectedLocale.pathPrefix || "", "");
  const pathWithSearch = `${strippedPathname}${search}`;

  const continentEntries = root?.countriesByContinent;
  if (!continentEntries || continentEntries.length === 0) return null;

  const renderCountryCard = (locales: Locale[]) => {
    const isMultiLanguage = locales.length > 1;
    const isActiveLocale =
      locales.find(
        (locale) =>
          locale.language === selectedLocale.language && locale.country === selectedLocale.country,
      ) ?? locales[0];

    if (!isMultiLanguage) {
      const isActive =
        isActiveLocale.language === selectedLocale.language &&
        isActiveLocale.country === selectedLocale.country;
      return (
        <Form
          method="post"
          action="/locale"
          key={`${isActiveLocale.language}-${isActiveLocale.country}`}
          className="flex flex-col bg-muted hover:bg-muted/80"
        >
          <input type="hidden" name="language" value={isActiveLocale.language} />
          <input type="hidden" name="country" value={isActiveLocale.country} />
          <input type="hidden" name="path" value={pathWithSearch} />
          <button
            type="submit"
            disabled={isActive}
            className={isActive ? "opacity-50 cursor-not-allowed" : ""}
          >
            <div className="px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <DynamicFlag
                    code={isActiveLocale.country}
                    height={24}
                    width={24}
                    className="rounded-full"
                  />
                  <p>{isActiveLocale.label}</p>
                </div>
                <p>{isActiveLocale.language}</p>
              </div>
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
      />
    );
  };

  return (
    <div className="flex gap-8 justify-center h-64 lg:h-[32rem]">
      <div className="hidden lg:flex flex-col gap-8 w-full overflow-auto">
        {continentEntries.map(([continent, countriesByCode]) => (
          <div key={continent} className="flex flex-col gap-4 w-full">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {continent}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {Object.values(countriesByCode).map((locales) => renderCountryCard(locales))}
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden w-full lg:h-full">
        <TabsProvider defaultValue={continentEntries[0]?.[0]}>
          <div
            className="flex w-full whitespace-nowrap
                  overflow-x-auto overflow-y-hidden
                  scrollbar-none
                  -mx-4 px-4"
          >
            {continentEntries.map(([continent]) => (
              <TabsBtn key={continent} value={continent}>
                {continent}
              </TabsBtn>
            ))}
          </div>

          {continentEntries.map(([continent, countriesByCode]) => (
            <TabsContent key={continent} value={continent} className="w-full overflow-y-hidden">
              <div className="flex flex-col gap-4 items-center h-[11.5rem] overflow-y-auto">
                {Object.values(countriesByCode).map((locales) => renderCountryCard(locales))}
              </div>
            </TabsContent>
          ))}
        </TabsProvider>
      </div>
    </div>
  );
}

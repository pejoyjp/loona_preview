import { countries as countryList, continents, type TCountries } from "countries-list";
import type { Locale } from "~/data/countries";
import { hostFor } from "~/data/countries";
import type { LocalizationOptionsQuery } from "storefrontapi.generated";
import type { CountryCode } from "@shopify/hydrogen/storefront-api-types";

type AvailableCountry = LocalizationOptionsQuery["localization"]["availableCountries"][number];

export function getCountriesbyContinent(localization: AvailableCountry[]) {
  const countries: Record<string, Locale> = {};
  localization.forEach((item) => {
    const isoCode = item.isoCode?.toUpperCase() as keyof TCountries | undefined;
    const countryInfo = isoCode ? countryList[isoCode] : null;

    const continentName = countryInfo?.continent ? continents[countryInfo.continent] : "";

    countries[`${item.isoCode.toLowerCase()}-${item.defaultLanguage.isoCode.toLowerCase()}`] = {
      language: item.defaultLanguage.isoCode,
      country: item.isoCode,
      label: `${item.name} (${item.defaultLanguage.name}) (${item.currency.symbol})`,
      host: hostFor(item.isoCode.toLowerCase() as CountryCode),
      continent: continentName,
    };
  });

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

  const continentEntries = Object.entries(localesByContinent).sort();

  return continentEntries;
}

export function getCountries(localization: AvailableCountry[]) {
  const countries: Record<string, Locale> = {};
  localization.forEach((item) => {
    const isoCode = item.isoCode?.toUpperCase() as keyof TCountries | undefined;
    const countryInfo = isoCode ? countryList[isoCode] : null;

    const continentName = countryInfo?.continent ? continents[countryInfo.continent] : "";

    countries[`${item.isoCode.toLowerCase()}-${item.defaultLanguage.isoCode.toLowerCase()}`] = {
      language: item.defaultLanguage.isoCode,
      country: item.isoCode,
      label: `${item.name} (${item.defaultLanguage.name}) (${item.currency.symbol})`,
      host: hostFor(item.isoCode.toLowerCase() as CountryCode),
      continent: continentName,
    };
  });

  return countries;
}

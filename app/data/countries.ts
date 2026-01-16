import type { CountryCode, LanguageCode } from "@shopify/hydrogen/storefront-api-types";
import type { LocalizationOptionsQuery } from "storefrontapi.generated";
import { continents as continentsMap, countries as countriesList } from "countries-list";

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  label: string;
  host: string;
  pathPrefix?: string;
  continent: Continent;
};

type Localization =
  | Promise<LocalizationOptionsQuery | null>
  | LocalizationOptionsQuery
  | null
  | undefined;

export const hostFor = (country: CountryCode | "") => {
  const domain = "localhost:3000";
  return country === "" ? domain : `${country.toLocaleLowerCase()}.${domain}`;
};

export type Continent =
  | "North America"
  | "South America"
  | "Europe"
  | "Asia"
  | "Oceania"
  | "Africa"
  | "Other";

const CONTINENT_LABELS: Record<string, Continent> = {
  Africa: "Africa",
  Europe: "Europe",
  Asia: "Asia",
  "North America": "North America",
  "South America": "South America",
  Oceania: "Oceania",
};

const FALLBACK_CURRENCY = { isoCode: "USD", symbol: "$" };

function resolveContinent(countryCode: CountryCode): Continent {
  const continentCode = countriesList[countryCode]?.continent;
  if (!continentCode) return "Other";

  const resolved = continentsMap[continentCode];
  return CONTINENT_LABELS[resolved] ?? "Other";
}

function buildLabel(args: {
  countryName: string;
  currencyIsoCode?: string | null;
  currencySymbol?: string | null;
  languageName?: string | null;
  isDefaultLanguage: boolean;
}) {
  const currencyIso = args.currencyIsoCode ?? FALLBACK_CURRENCY.isoCode;
  const currencySymbol = args.currencySymbol ?? FALLBACK_CURRENCY.symbol;
  const languageSuffix = args.isDefaultLanguage || !args.languageName ? "" : ` (${args.languageName})`;
  return `${args.countryName}${languageSuffix} (${currencyIso} ${currencySymbol})`;
}

export async function getCountries(
  localization: Localization,
  primaryCountry?: CountryCode
): Promise<Record<string, Locale>> {
  const localizationData = await localization;
  const availableCountries = localizationData?.localization?.availableCountries ?? [];
  const defaultCountryCode = primaryCountry ?? availableCountries[0]?.isoCode;
  const locales: Record<string, Locale> = {};

  for (const country of availableCountries) {
    const countryCode = country.isoCode;
    const continent = resolveContinent(countryCode);
    const availableLanguages =
      country.availableLanguages && country.availableLanguages.length > 0
        ? country.availableLanguages
        : country.defaultLanguage
          ? [country.defaultLanguage]
          : [];

    for (const language of availableLanguages) {
      const languageCode = language.isoCode as LanguageCode;
      const isDefaultLanguage = language.isoCode === country.defaultLanguage?.isoCode;
      const pathPrefix = isDefaultLanguage ? undefined : `/${language.isoCode.toLowerCase()}`;
      const key = `${language.isoCode.toLowerCase()}-${countryCode.toLowerCase()}`;

      locales[key] = {
        language: languageCode,
        country: countryCode,
        label: buildLabel({
          countryName: country.name,
          currencyIsoCode: country.currency?.isoCode,
          currencySymbol: country.currency?.symbol,
          languageName: language.endonymName ?? language.name,
          isDefaultLanguage,
        }),
        host: countryCode === defaultCountryCode ? hostFor("") : hostFor(countryCode),
        pathPrefix,
        continent,
      };
    }
  }

  return locales;
}

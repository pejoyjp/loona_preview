import type { CountryCode, LanguageCode } from "@shopify/hydrogen/storefront-api-types";

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  label: string;
  host: string;
  pathPrefix?: string;
  continent: Continent;
};

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

export const countries: Record<string, Locale> = {
  "en-us": {
    language: "EN",
    country: "US",
    label: "United States (USD $)",
    host: hostFor(""),
    continent: "North America",
  },
  "en-ca": {
    language: "EN",
    country: "CA",
    label: "Canada (CAD $)",
    host: hostFor("CA"),
    continent: "North America",
  },
  "fr-ca": {
    language: "FR",
    country: "CA",
    label: "Canada (Français) (CAD $)",
    host: hostFor("CA"),
    pathPrefix: "/fr",
    continent: "North America",
  },
  "es-mx": {
    language: "ES",
    country: "MX",
    label: "Mexico (MXN $)",
    host: hostFor("MX"),
    continent: "North America",
  },
  "ja-jp": {
    language: "JA",
    country: "JP",
    label: "Japan (JPY ¥)",
    host: hostFor("JP"),
    continent: "Asia",
  },
  "zh-cn": {
    language: "ZH",
    country: "CN",
    label: "China (CNY ¥)",
    host: hostFor("CN"),
    continent: "Asia",
  },
  "en-gb": {
    language: "EN",
    country: "GB",
    label: "United Kingdom (GBP £)",
    host: hostFor("GB"),
    continent: "Europe",
  },
  "fr-fr": {
    language: "FR",
    country: "FR",
    label: "France (EUR €)",
    host: hostFor("FR"),
    continent: "Europe",
  },
  "de-de": {
    language: "DE",
    country: "DE",
    label: "Germany (EUR €)",
    host: hostFor("DE"),
    continent: "Europe",
  },
  "en-au": {
    language: "EN",
    country: "AU",
    label: "Australia (AUD $)",
    host: hostFor("AU"),
    continent: "Oceania",
  },
  "en-nz": {
    language: "EN",
    country: "NZ",
    label: "New Zealand (NZD $)",
    host: hostFor("NZ"),
    continent: "Oceania",
  },
  "pt-br": {
    language: "PT",
    country: "BR",
    label: "Brazil (BRL R$)",
    host: hostFor("BR"),
    continent: "South America",
  },
  "en-za": {
    language: "EN",
    country: "ZA",
    label: "South Africa (ZAR R)",
    host: hostFor("ZA"),
    continent: "Africa",
  },
};

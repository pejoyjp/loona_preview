import type { CountryCode, LanguageCode } from "@shopify/hydrogen/storefront-api-types";

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  label: string;
  host: string;
  pathPrefix?: string;
};

export const hostFor = (country: CountryCode | "") => {
  const domain = "localhost:3000";
  return country === "" ? domain : `${country.toLocaleLowerCase()}.${domain}`;
};

export const countries: Record<string, Locale> = {
  "en-us": {
    language: "EN",
    country: "US",
    label: "United States (USD $)",
    host: hostFor(""),
  },
  "en-ca": {
    language: "EN",
    country: "CA",
    label: "Canada (CAD $)",
    host: hostFor("CA"),
  },
  "fr-ca": {
    language: "FR",
    country: "CA",
    label: "Canada (Français) (CAD $)",
    host: hostFor("CA"),
    pathPrefix: "/fr",
  },
  "ja-jp": {
    language: "JA",
    country: "JP",
    label: "Japan (JPY ¥)",
    host: hostFor("JP"),
  },
};

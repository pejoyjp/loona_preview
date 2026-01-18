import type { CountryCode, LanguageCode } from "@shopify/hydrogen/storefront-api-types";

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  label: string;
  host: string;
  pathPrefix?: string;
  continent: string | undefined;
};

export const hostFor = (country: CountryCode | "") => {
  const domain = "localhost:3000";
  return country === "" ? domain : `${country.toLocaleLowerCase()}.${domain}`;
};

import type {
  CountryCode,
  LanguageCode,
} from "@shopify/hydrogen/storefront-api-types";

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  label: string;
  host: string;
  pathPrefix?: string;
};

export function getRootDomain(host: string): string {
  const parts = host.split(".");
  if (parts.length >= 2) {
    return parts.slice(-2).join(".");
  }
  return host;
}

export function getCountries(rootDomain: string): Record<string, Locale> {
  return {
    default: {
      language: "EN",
      country: "US",
      label: "United States (USD $)",
      host: "keyirobot.com",
    },
    de: {
      language: "DE",
      country: "DE",
      label: "Germany (EUR €)",
      host: "de.keyirobot.com",
    },
    jp: {
      language: "JA",
      country: "JP",
      label: "Japan (JPY ¥)",
      host: "jp.keyirobot.com",
    },
    kr: {
      language: "KO",
      country: "KR",
      label: "South Korea (KRW ₩)",
      host: "kr.keyirobot.com",
    },
  };
}

export const countries: Record<string, Locale> = {
  default: {
    language: "EN",
    country: "US",
    label: "United States (USD $)",
    host: "hydrogen.shop",
  },
  "en-ca": {
    language: "EN",
    country: "CA",
    label: "Canada (CAD $)",
    host: "ca.hydrogen.shop",
  },
  "en-au": {
    language: "EN",
    country: "AU",
    label: "Australia (AUD $)",
    host: "au.hydrogen.shop",
  },
};

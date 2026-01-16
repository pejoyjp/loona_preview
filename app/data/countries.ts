import type { CountryCode, LanguageCode } from "@shopify/hydrogen/storefront-api-types";

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  label: string;
  host: string;
  pathPrefix?: string;
};

export function getRootDomain(host: string): string {
  const [hostname, port] = host.split(":");
  const parts = hostname.split(".");
  const isLocalhost = parts[parts.length - 1] === "localhost";

  const rootDomain =
    parts.length <= 1 ? hostname : isLocalhost ? "localhost" : parts.slice(-2).join(".");

  return port ? `${rootDomain}:${port}` : rootDomain;
}

export function getCountries(rootDomain: string): Record<string, Locale> {
  const domain = rootDomain || "keyirobot.com";
  const hostFor = (subdomain?: string) => (subdomain ? `${subdomain}.${domain}` : domain);

  return {
    default: {
      language: "EN",
      country: "US",
      label: "United States (USD $)",
      host: hostFor(),
    },
    de: {
      language: "DE",
      country: "DE",
      label: "Germany (EUR €)",
      host: hostFor("de"),
    },
    jp: {
      language: "JA",
      country: "JP",
      label: "Japan (JPY ¥)",
      host: hostFor("jp"),
    },
    kr: {
      language: "KO",
      country: "KR",
      label: "South Korea (KRW ₩)",
      host: hostFor("kr"),
    },
    fr: {
      language: "FR",
      country: "FR",
      label: "France (EUR €)",
      host: hostFor("fr"),
    },
    "en-ca": {
      language: "EN",
      country: "CA",
      label: "Canada  (CAD $)",
      host: hostFor("ca"),
    },
    "fr-ca": {
      language: "FR",
      country: "CA",
      label: "Canada (CAD $)",
      host: hostFor("ca"),
      pathPrefix: "fr",
    },
  };
}

export function stripLocaleFromPath(pathname: string, locales: Locale[]): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";

  const matched = locales.find(
    (locale) => locale.pathPrefix && locale.pathPrefix.toLowerCase() === segments[0]?.toLowerCase(),
  );

  if (!matched) return pathname;

  const rest = segments.slice(1);
  return rest.length ? `/${rest.join("/")}` : "/";
}

export function addLocaleToPath(pathname: string, locale: Locale, locales: Locale[]): string {
  const cleanPath = stripLocaleFromPath(pathname, locales);
  const suffix = cleanPath === "/" ? "" : cleanPath;
  const prefix = locale.pathPrefix ? `/${locale.pathPrefix}` : "";
  const localizedPath = `${prefix}${suffix}`;

  return localizedPath || "/";
}

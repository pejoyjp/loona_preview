import type { Locale } from "~/data/countries";

export function getLocaleFromRequest(request: Request, countries: Record<string, Locale>): Locale {
  const url = new URL(request.url);
  const hostsMatching = Object.values(countries).filter((locale) => locale.host === url.host);

  if (hostsMatching.length > 0) {
    const pathMatched =
      hostsMatching.find(
        (locale) => locale.pathPrefix && url.pathname.startsWith(locale.pathPrefix),
      ) ?? hostsMatching[0];
    return pathMatched;
  }

  // Return matched country or fallback to first available country
  return (
    countries["en-us"] ||
    Object.values(countries)[0] || {
      language: "EN",
      country: "US",
      label: "United States",
      host: "localhost:3000",
    }
  );
}

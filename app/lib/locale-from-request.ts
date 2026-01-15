import type { Locale } from "~/data/countries";
import { countries } from "~/data/countries";

export function getLocaleFromRequest(request: Request): Locale {
  const url = new URL(request.url);

  const hostsMatching = Object.values(countries).filter((locale) => locale.host === url.host);

  if (hostsMatching.length > 0) {
    const pathMatched =
      hostsMatching.find(
        (locale) => locale.pathPrefix && url.pathname.startsWith(locale.pathPrefix)
      ) ?? hostsMatching[0];
    return pathMatched;
  }

  return countries["en-us"];
}

import { getCountries, getRootDomain, type Locale } from "~/data/countries";

export function getLocaleFromRequest(request: Request): Locale {
  const url = new URL(request.url);
  const rootDomain = getRootDomain(url.host);
  const countries = getCountries(rootDomain);

  const countrySubdomain = url.host.split(".")[0];

  switch (countrySubdomain) {
    case "ca":
      if (/^\/fr($|\/)/.test(url.pathname)) {
        return countries["fr-ca"];
      }
      return countries["en-ca"];
    case "au":
      return countries["en-au"];
    default:
      return countries.default;
  }
}

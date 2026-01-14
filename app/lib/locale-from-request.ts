import type { Locale } from "~/data/countries";
import { countries, hostFor } from "~/data/countries";

export function getLocaleFromRequest(request: Request): Locale {
  const url = new URL(request.url);

  switch (url.host) {
    case hostFor(""):
      return countries['en-us'];

    case hostFor("CA"):
      if (/^\/fr($|\/)/.test(url.pathname)) {
        return countries['fr-ca'];
      }
      return countries['en-ca'];

    case hostFor("JP"):
      return countries['ja-jp'];

    default:
      return countries['en-us'];
  }
}

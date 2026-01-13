import { getCountries, getRootDomain, type Locale } from "~/data/countries";

export function getLocaleFromRequest(request: Request): Locale {
  const url = new URL(request.url);
  const rootDomain = getRootDomain(url.host);
  const countries = getCountries(rootDomain);

  const locales = Object.values(countries);
  const host = url.host.toLowerCase();
  const pathPrefix = url.pathname.split("/").filter(Boolean)[0]?.toLowerCase();

  const localesForHost = locales.filter((l) => l.host.toLowerCase() === host);
  const hasPathPrefixLocales = localesForHost.some((l) => l.pathPrefix);

  // 1) host + pathPrefix（用于 ca 的 /fr）
  const byPrefix = localesForHost.find(
    (l) => l.pathPrefix && l.pathPrefix.toLowerCase() === pathPrefix
  );


  if (pathPrefix && hasPathPrefixLocales && !byPrefix) {
    // Host expects a locale path prefix but this one is unsupported.
    throw new Response(`${pathPrefix} not found`, { status: 404 });
  }
  if (byPrefix) return byPrefix;
 
  // 2) host 默认（英文 ca、或 US 默认等）
  const byHostDefault = localesForHost.find((l) => !l.pathPrefix);
  if (byHostDefault) return byHostDefault;

  return countries.default;
}

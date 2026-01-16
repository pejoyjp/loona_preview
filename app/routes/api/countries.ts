import { CacheLong, generateCacheControlHeader } from "@shopify/hydrogen";
import { data } from "react-router";
import { getCountries, getRootDomain } from "~/data/countries";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const rootDomain = getRootDomain(url.host);
  const countries = getCountries(rootDomain);

  return data(
    { ...countries },
    { headers: { "cache-control": generateCacheControlHeader(CacheLong()) } },
  );
}

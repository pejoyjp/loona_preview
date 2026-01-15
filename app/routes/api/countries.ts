import { CacheLong, generateCacheControlHeader } from "@shopify/hydrogen";
import { data } from "react-router";
import { countries } from "~/data/countries";

export async function loader() {
  return data(
    { ...countries },
    { headers: { "cache-control": generateCacheControlHeader(CacheLong()) } }
  );
}

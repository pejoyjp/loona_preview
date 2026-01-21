import { CacheLong, generateCacheControlHeader } from "@shopify/hydrogen";
import { data } from "react-router";

export async function loader() {
  return data({ headers: { "cache-control": generateCacheControlHeader(CacheLong()) } });
}

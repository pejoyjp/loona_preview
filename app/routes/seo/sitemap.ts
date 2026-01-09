import { getSitemapIndex } from "@shopify/hydrogen";
import type { Route } from "../+types/home";

export async function loader({ request, context: { storefront } }: Route.LoaderArgs) {
  const response = await getSitemapIndex({
    storefront,
    request,
  });

  response.headers.set("Cache-Control", `max-age=${60 * 60 * 24}`);
  return response;
}

import type { SeoConfig } from "@shopify/hydrogen";
import type { ProductQuery, ShopFragment } from "../../../storefrontapi.generated";
import { product } from "./product";
import { collection } from "./collection";
import { home, article, blog, page, policy, policies } from "./page";

function root({ shop, url }: { shop: ShopFragment; url: Request["url"] }): SeoConfig {
  return {
    title: shop?.name,
    titleTemplate: "Loona store",
    description: shop?.description ?? "",
    handle: "@weaverse",
    url,
    robots: {
      noIndex: false,
      noFollow: false,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: shop.name,
      logo: shop.brand?.logo?.image?.url,
      sameAs: [
        "https://twitter.com/weaverseio",
        "https://facebook.com/weaverse",
        "https://instagram.com/weaverse.io",
        "https://youtube.com/@weaverse",
      ],
      url,
      potentialAction: {
        "@type": "SearchAction",
        target: `${url}search?q={search_term}`,
        query: "required name='search_term'",
      },
    },
  };
}

export const seoPayload = {
  article,
  blog,
  collection,
  home,
  page,
  policies,
  policy,
  product,
  root,
};

import type { SeoConfig } from "@shopify/hydrogen";
import type { CollectionPage } from "schema-dts";
import { truncate } from "./utils";
import type { Product } from "@shopify/hydrogen/storefront-api-types";

type CollectionRequiredFields = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  seo: {
    title?: string;
    description?: string;
  };
  image?: {
    url: string;
    height?: number;
    width?: number;
    altText?: string;
  } | null;
  products: { nodes: Pick<Product, "handle">[] };
};

function collectionJsonLd({
  url,
  collection: collectionData,
}: {
  url: Request["url"];
  collection: CollectionRequiredFields;
}): SeoConfig["jsonLd"] {
  const siteUrl = new URL(url);
  const itemListElement: CollectionPage["mainEntity"] = collectionData.products.nodes.map(
    (prod, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        url: `/products/${prod.handle}`,
      };
    },
  );

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Collections",
          item: `${siteUrl.host}/collections`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: collectionData.title,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: collectionData?.seo?.title ?? collectionData?.title ?? "",
      description: truncate(collectionData?.seo?.description ?? collectionData?.description ?? ""),
      image: collectionData?.image?.url,
      url: `/collections/${collectionData.handle}`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement,
      },
    },
  ];
}

export function collection({
  collection: collectionData,
  url,
}: {
  collection: CollectionRequiredFields;
  url: Request["url"];
}): SeoConfig {
  return {
    title: collectionData?.seo?.title,
    description: truncate(collectionData?.seo?.description ?? collectionData?.description ?? ""),
    titleTemplate: "%s | Collection",
    url,
    media: {
      type: "image",
      url: collectionData?.image?.url,
      height: collectionData?.image?.height,
      width: collectionData?.image?.width,
      altText: collectionData?.image?.altText,
    },
    jsonLd: collectionJsonLd({ collection: collectionData, url }),
  };
}

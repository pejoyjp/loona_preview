import type { SeoConfig } from "@shopify/hydrogen";
import type { Offer } from "schema-dts";
import type { ProductQuery, ProductFragment } from "../../../storefrontapi.generated";
import { truncate } from "./utils";

type OkendoSummaryData = {
  reviewAverageValue?: number;
  reviewCount?: number;
};

export function product({
  product: productData,
  url,
}: {
  product: NonNullable<ProductQuery["product"]>;
  url: Request["url"];
}): SeoConfig {
  const description = truncate(productData.seo?.description ?? productData.description ?? "");
  const selectedVariant = productData.selectedOrFirstAvailableVariant;
  return {
    title: productData.seo?.title ?? productData.title,
    description,
    media: selectedVariant?.image,
    jsonLd: productJsonLd({ product: productData, selectedVariant, url }),
  };
}

function productJsonLd({
  product: productData,
  selectedVariant,
  url,
}: {
  product: ProductQuery["product"];
  selectedVariant: NonNullable<ProductQuery["product"]>["selectedOrFirstAvailableVariant"];
  url: Request["url"];
}): SeoConfig["jsonLd"] {
  const origin = new URL(url).origin;
  const description = truncate(productData?.seo?.description ?? productData?.description ?? "");
  const aggregateRating = getOkendoAggregateRating(productData as ProductFragment);

  // Create offers array from adjacent variants
  const offers: Offer[] = [];
  if (productData?.adjacentVariants) {
    for (const variant of productData.adjacentVariants) {
      const variantUrl = new URL(url);
      for (const option of variant.selectedOptions) {
        variantUrl.searchParams.set(option.name, option.value);
      }
      const availability = variant.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock";

      offers.push({
        "@type": "Offer",
        availability,
        price: Number.parseFloat(variant.price.amount),
        priceCurrency: variant.price.currencyCode,
        sku: variant?.sku ?? "",
        url: variantUrl.toString(),
      });
    }
  }

  if (offers.length === 0 && selectedVariant) {
    const availability = selectedVariant.availableForSale
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

    offers.push({
      "@type": "Offer",
      availability,
      price: Number.parseFloat(selectedVariant.price.amount),
      priceCurrency: selectedVariant.price.currencyCode,
      sku: selectedVariant?.sku ?? "",
      url,
    });
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Products",
          item: `${origin}/products`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: productData?.title ?? "",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      brand: {
        "@type": "Brand",
        name: productData?.vendor ?? "",
      },
      description,
      image: [selectedVariant?.image?.url ?? ""],
      name: productData?.title ?? "",
      offers,
      sku: selectedVariant?.sku ?? "",
      url,
      ...(aggregateRating ? { aggregateRating } : {}),
    },
  ];
}

function getOkendoAggregateRating(productData: ProductFragment): any {
  if (!productData) return undefined;

  let ratingCount: number | undefined;
  let ratingValue: number | undefined;

  const summaryValue = productData.okendoSummaryData?.value;
  if (summaryValue) {
    try {
      const parsed = JSON.parse(summaryValue) as OkendoSummaryData;
      ratingCount = parseFloat(String(parsed.reviewCount));
      ratingValue = parseFloat(String(parsed.reviewAverageValue));
    } catch {}
  }

  if (!ratingCount) {
    ratingCount = parseFloat(String(productData.okendoReviewCount?.value));
  }

  if (!ratingValue) {
    ratingValue = parseFloat(String(productData.okendoReviewAverageValue?.value));
  }

  if (!ratingCount || ratingCount <= 0) return undefined;

  return {
    "@type": "AggregateRating",
    ratingCount,
    ...(ratingValue ? { ratingValue } : {}),
  };
}

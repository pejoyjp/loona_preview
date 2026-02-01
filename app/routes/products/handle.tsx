import { OkendoReviews, OkendoStarRating } from "@okendo/shopify-hydrogen";

import {
  Analytics,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  getSelectedProductOptions,
  Image,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from "@shopify/hydrogen";
import { type LoaderFunctionArgs, type MetaFunction, redirect, useLoaderData } from "react-router";
import type {
  ProductFragment,
  ProductVariantFragment,
  ProductVariantForProductPageFragment,
} from "storefrontapi.generated";
import { ProductForm } from "~/components/product/product-form";
import {
  OKENDO_PRODUCT_REVIEWS_FRAGMENT,
  OKENDO_PRODUCT_STAR_RATING_FRAGMENT,
} from "~/graphql/fragments";
import { redirectIfHandleIsLocalized } from "~/lib/redirect";
import { seoPayload } from "~/.server/seo/index";
import { StoryCarousel } from "~/components/common/carousel/story-carousel";
import { ProductCarousel } from "~/components/product/product-carousel";
import { ProductAccessory } from "~/components/product/product-accessory";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `Hydrogen | ${params?.title ?? ""}` },
    {
      rel: "canonical",
      href: `/products/${params?.handle}`,
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);

  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context, params, request }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error("Expected product handle to be defined");
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
      },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
    seo: seoPayload.product({ product, url: request.url }),
  };
}

function loadDeferredData({ context, params }: LoaderFunctionArgs) {
  return {};
}

export default function Product() {
  const { product, seo } = useLoaderData<typeof loader>();
  const jsonLd = seo?.jsonLd;
  const jsonLdEntries = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const filteredProductOptions = productOptions.map((option) => ({
    ...option,
    optionValues: option.optionValues.filter((value) => {
      const variant = value.variant as ProductVariantForProductPageFragment;
      return variant?.showInProduct?.value === "true";
    }),
  }));

  const galleriesByOption = productOptions.map((option) => {
    const galleries: Record<string, any[]> = {};
    option.optionValues.forEach((value) => {
      const variant = value.variant as ProductVariantForProductPageFragment;
      if (variant?.gallery?.reference?.media?.references?.nodes) {
        galleries[value.name] = variant.gallery.reference.media.references.nodes;
      }
    });
    return galleries;
  });

  const { title, descriptionHtml } = product;

  return (
    <div className=" max-w-7xl mx-auto">
      {/* 暂时先这样写script， 后面需要改成组件或者函数 */}
      {jsonLdEntries.map((entry, index) => (
        <script
          key={`product-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <div className="flex flex-col xl:flex-row w-full gap-1.5">
        <div className="flex-1">
          <ProductCarousel
            galleriesByOption={galleriesByOption}
            selectedVariant={selectedVariant}
          />
        </div>

        <div className="pl-4 flex-1 ">
          <ProductForm
            productOptions={filteredProductOptions}
            selectedVariant={selectedVariant}
            productID={product.id}
          />
          <div className="px-4">
            <ProductAccessory productOptions={productOptions} />
          </div>

          <div>
            <StoryCarousel />
          </div>

          <div className="w-full">
            <OkendoReviews
              productId={product.id}
              okendoReviewsSnippet={(product as ProductFragment).okendoReviewsSnippet}
            />
          </div>
        </div>
      </div>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || "0",
              vendor: product.vendor,
              variantId: selectedVariant?.id || "",
              variantTitle: selectedVariant?.title || "",
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantForProductPage on ProductVariant {
    availableForSale
    showInProduct: metafield(
      namespace: "custom"
      key: "show_in_product"
    ) {
      value
      type
    }
    gallery: metafield(namespace: "custom", key: "variant_gallery") {
      reference {
        ... on Metaobject {
          media: field(key: "gallery_media") {
            references(first: 20) {
              nodes {
                __typename
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
                ... on Video {
                  previewImage { url }
                  sources { url mimeType }
                }
              }
            }
          }
        }
      }
    }

    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  ${OKENDO_PRODUCT_STAR_RATING_FRAGMENT}
  ${OKENDO_PRODUCT_REVIEWS_FRAGMENT}
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariantForProductPage
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariantForProductPage
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariantForProductPage
    }
    seo {
      description
      title
    }
    okendoSummaryData: metafield(namespace: "okendo", key: "summaryData") {
      value
    }
    okendoReviewCount: metafield(namespace: "okendo", key: "ReviewCount") {
      value
    }
    okendoReviewAverageValue: metafield(namespace: "okendo", key: "ReviewAverageValue") {
      value
    }
    ...OkendoStarRatingSnippet
    ...OkendoReviewsSnippet
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }

` as const;

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
import { AddToCartButton } from "~/components/common/add-to-cart-button";
import { ProductForm } from "~/components/product/product-form";
import { ProductImage } from "~/components/product/product-image";
import { ProductPrice } from "~/components/product/product-price";
import { MediaModal } from "~/components/ui/media-modal";
import {
  OKENDO_PRODUCT_REVIEWS_FRAGMENT,
  OKENDO_PRODUCT_STAR_RATING_FRAGMENT,
} from "~/graphql/fragments";
import { redirectIfHandleIsLocalized } from "~/lib/redirect";
import { seoPayload } from "~/.server/seo/index";
import { StoryCarousel } from "~/components/common/carousel/story-carousel";
import { ProductCarousel } from "~/components/product/product-carousel";

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
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
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
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
    seo: seoPayload.product({ product, url: request.url }),
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, params }: LoaderFunctionArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

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

  const { title, descriptionHtml } = product;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 暂时先这样写script， 后面需要改成组件或者函数 */}
      {jsonLdEntries.map((entry, index) => (
        <script
          key={`product-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <ProductForm productOptions={filteredProductOptions} selectedVariant={selectedVariant} />

      {/* TODO:这应该是一个组件 */}
      <p>Accessory</p>
      <div className="flex flex-col gap-2">
        {productOptions.map((productOption) => {
          if (productOption.optionValues.length === 1) return null;
          return productOption.optionValues.map(
            (value, index) =>
              value.available && (
                <div
                  key={value.variant.id}
                  className="border flex items-center justify-between p-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 ">
                      {value.variant?.image && (
                        <MediaModal image={value.variant.image} size="48px" />
                      )}
                    </div>

                    <div>
                      <div>{value.name}</div>
                      <p>{value.variant.price.amount}</p>
                    </div>
                  </div>

                  <div>
                    <AddToCartButton
                      variant={"outline"}
                      lines={[
                        {
                          merchandiseId: value.variant.id,
                          quantity: 1,
                        },
                      ]}
                    >
                      Add
                    </AddToCartButton>
                  </div>
                </div>
              ),
          );
        })}
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

          title: field(key: "variant_title") {
            value
          }

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

import { OkendoReviews } from "@okendo/shopify-hydrogen";

import {
  Analytics,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  getSeoMeta,
  getSelectedProductOptions,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from "@shopify/hydrogen";
import {
  Await,
  type LoaderFunctionArgs,
  type MetaFunction,
  redirect,
  useLoaderData,
} from "react-router";
import { Suspense, useState } from "react";
import type { Product } from "@shopify/hydrogen/storefront-api-types";
import type {
  ProductFragment,
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
import { COLLECTION_QUERY } from "~/graphql/query";
import { useTranslationContext } from "~/hooks/use-translation-context";
import { AddToCartButton } from "~/components/common/add-to-cart-button";
import { COLLECTION_HANDLES } from "~/data/handles";
import { PaymentIcons } from "~/components/common/payment/payment-icons";
import { PaymentWarrant } from "~/components/common/payment/payment-warrant";
import { ProductLanding } from "~/components/product/product-landing";

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  if (!loaderData?.seo) {
    return [{ title: "Product | Loona" }, { name: "description", content: "" }];
  }
  return getSeoMeta(loaderData.seo);
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

  const [{ product }, outfit] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
      },
    }),
    storefront.query(COLLECTION_QUERY, {
      variables: {
        handle: COLLECTION_HANDLES.PETBOT_OUTFIT,
        first: 20,
        sortKey: "BEST_SELLING",
      },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
    outfit: outfit.collection,
    seo: seoPayload.product({ product, url: request.url }),
  };
}

function loadDeferredData({ context }: LoaderFunctionArgs) {
  const { storefront } = context;

  const ipProduct = storefront
    .query(COLLECTION_QUERY, {
      variables: {
        handle: COLLECTION_HANDLES.IP_PRODUCT,
        first: 10,
        sortKey: "BEST_SELLING",
      },
    })
    .then((response) => response.collection);

  return {
    ipProduct,
  };
}

export default function Product() {
  const { product, outfit, ipProduct } = useLoaderData<typeof loader>();
  const { t } = useTranslationContext();
  const [selectedOutfit, setSelectedOutfit] = useState<Product | null>(null);

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

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

  const cartLines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: 1,
          selectedVariant,
        },
      ]
    : [];

  if (selectedOutfit) {
    const outfitVariant = selectedOutfit.selectedOrFirstAvailableVariant;
    if (outfitVariant) {
      cartLines.push({
        merchandiseId: outfitVariant.id,
        quantity: 1,
        selectedVariant: outfitVariant,
      });
    }
  }

  return (
    <div className="">
      <div className="flex flex-col xl:flex-row w-full gap-1.5  max-w-7xl mx-auto">
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

          <div className="px-4 ">
            <ProductAccessory
              collection={outfit}
              type="radio"
              onSelect={setSelectedOutfit}
              title={t("petbot.buy.title")}
            />

            <AddToCartButton
              disabled={!selectedVariant || !selectedVariant.availableForSale}
              className="w-full h-13 text-lg"
              lines={cartLines}
            >
              {selectedVariant?.availableForSale ? "Add to cart" : "Sold out"}
            </AddToCartButton>

            <Suspense fallback={null}>
              <Await resolve={ipProduct}>
                {(resolvedIpProduct) => (
                  <ProductAccessory
                    collection={resolvedIpProduct}
                    type="button"
                    title={t("petbot.accessory.title")}
                  />
                )}
              </Await>
            </Suspense>

            <PaymentIcons />
            <PaymentWarrant />
          </div>
        </div>
      </div>

      <div className="pt-24 md:pt-10">
        <ProductLanding />
      </div>

      {/* <div>
        <StoryCarousel />
      </div>

      <div className="w-full">
        <OkendoReviews
          productId={product.id}
          okendoReviewsSnippet={(product as ProductFragment).okendoReviewsSnippet}
        />
      </div> */}

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
    $selectedOptions: [SelectedOptionInput!]
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }

` as const;

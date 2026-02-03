export const PRODUCT_VARIANT_FRAGMENT = `#graphql
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

export const PRODUCT_OPTION_FRAGMENT = `#graphql
  fragment ProductOption on ProductOption {
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
            altText
          }
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    vendor
    tags
    images(first: 50) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      ...ProductOption
    }
    badges: metafields(identifiers: [
      { namespace: "custom", key: "best_seller" }
    ]) {
      key
      namespace
      value
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      ...ProductVariantForProductPage
    }

  }
  ${PRODUCT_OPTION_FRAGMENT}
` as const;

export const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment ProductItem on Product {
    id
    handle
    title
    vendor
    priceRange {
      minVariantPrice {
        ...Money
      }
      maxVariantPrice {
        ...Money
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
` as const;

export const OKENDO_PRODUCT_STAR_RATING_FRAGMENT = `#graphql
  fragment OkendoStarRatingSnippet on Product {
    okendoStarRatingSnippet: metafield(
      namespace: "app--1576377--reviews"
      key: "star_rating_snippet"
    ) {
      value
    }
  }
` as const;

export const OKENDO_PRODUCT_REVIEWS_FRAGMENT = `#graphql
  fragment OkendoReviewsSnippet on Product {
    okendoReviewsSnippet: metafield(
      namespace: "app--1576377--reviews"
      key: "reviews_widget_snippet"
    ) {
      value
    }
  }
` as const;

export const PRODUCT_FRAGMENT = `#graphql
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

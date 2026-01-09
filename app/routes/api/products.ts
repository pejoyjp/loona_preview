import { invariant } from "motion/react";
import type { LoaderFunctionArgs } from "react-router";
import { data } from "react-router";
import type { ApiAllProductsQuery } from "storefrontapi.generated";
import { PRODUCT_CARD_FRAGMENT } from "~/graphql/fragments";

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = searchParams.get("query") ?? "";
  const { storefront } = context;

  const { products } = await storefront.query<ApiAllProductsQuery>(API_ALL_PRODUCTS_QUERY, {
    variables: {
      count: 12,
      sortKey: "CREATED_AT",
    },
    cache: storefront.CacheLong(),
  });

  return data({ products });
}

const API_ALL_PRODUCTS_QUERY = `#graphql
  query ApiAllProducts(
    $query: String
    $count: Int
    $reverse: Boolean
    $country: CountryCode
    $language: LanguageCode
    $sortKey: ProductSortKeys
  ) @inContext(country: $country, language: $language) {
    products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

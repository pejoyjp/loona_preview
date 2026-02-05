import { PRODUCT_FRAGMENT } from "../fragments";

export const PRODUCT_QUERY = `#graphql
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

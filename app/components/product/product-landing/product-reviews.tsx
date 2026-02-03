import { OkendoReviews } from "@okendo/shopify-hydrogen";
import type { Product } from "@shopify/hydrogen/storefront-api-types";
import type { ProductFragment, ProductQuery } from "storefrontapi.generated";

export function ProductReviews({ product }: { product: ProductFragment }) {
  return (
    <div className="w-full">
      <OkendoReviews productId={product.id} okendoReviewsSnippet={product?.okendoReviewsSnippet} />
    </div>
  );
}

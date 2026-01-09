import { Image, Money } from "@shopify/hydrogen";
import { Link } from "react-router";
import type { ProductItemFragment, RecommendedProductFragment } from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";

export function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment | RecommendedProductFragment;
  loading?: "eager" | "lazy";
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link className="group block w-full" key={product.id} prefetch="intent" to={variantUrl}>
      {image && (
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
          <Image
            alt={image.altText || ""}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <h4 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
        {product.title}
      </h4>
      <small className="text-sm text-gray-600">
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}

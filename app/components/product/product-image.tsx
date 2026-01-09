import { Image } from "@shopify/hydrogen";
import type { ProductVariantFragment } from "storefrontapi.generated";

export function ProductImage({ image }: { image: ProductVariantFragment["image"] }) {
  if (!image) {
    return <div className="w-full aspect-square bg-gray-100 rounded-lg" />;
  }
  return (
    <div className="w-[400px] aspect-square overflow-hidden rounded-lg">
      <Image
        alt={image.altText || "Product Image"}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

import type { Collection, Product } from "@shopify/hydrogen/storefront-api-types";
import { ProductList } from "./product-list";

export function ProductAccessory({
  collection,
  type,
  onSelect,
  title,
}: {
  collection: Collection;
  type: "button" | "radio";
  onSelect?: (product: Product | null) => void;
  title: string;
}) {
  const filterProducts = collection.products.nodes;
  if (filterProducts.length === 0) return null;
  return (
    <div className="pt-4 pb-6">
      <h2 className="text-foreground text-md font-medium learing-6">{title}</h2>
      <ProductList
        products={filterProducts}
        title={collection.title}
        type={type}
        onSelect={onSelect}
      />
    </div>
  );
}

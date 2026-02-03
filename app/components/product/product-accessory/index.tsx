import type { CollectionQuery, ProductCardFragment } from "storefrontapi.generated";
import { ProductList } from "./product-list";

export function ProductAccessory({
  collection,
  type,
  onSelect,
  title,
}: {
  collection: CollectionQuery["collection"];
  type: "button" | "radio";
  onSelect?: (product: ProductCardFragment | null) => void;
  title: string;
}) {
  if (!collection) return null;
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

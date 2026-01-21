import type { MappedProductOptions } from "@shopify/hydrogen";
import type { Maybe, ProductOptionValueSwatch } from "@shopify/hydrogen/storefront-api-types";
import { Link, useNavigate } from "react-router";
import type { ProductCardFragment } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { AddToCartButton } from "../common/add-to-cart-button";

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductCardFragment["selectedOrFirstAvailableVariant"];
}) {
  const { setOpen } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      {productOptions.map((option) => {
        if (option.optionValues.length === 1) return null;

        return (
          <div className="flex flex-col gap-2" key={option.name}>
            <h5 className="text-sm font-medium">{option.name}</h5>
            <div className="grid grid-cols-4 gap-2">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  return (
                    <Link
                      className="flex items-center justify-center p-2 border rounded-md transition-colors hover:bg-gray-50"
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={{
                        borderColor: selected ? "black" : "transparent",
                        opacity: available ? 1 : 0.3,
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                }
                return (
                  <button
                    type="button"
                    className="flex items-center justify-center p-2 border rounded-md transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                    key={option.name + name}
                    style={{
                      borderColor: selected ? "black" : "transparent",
                      opacity: available ? 1 : 0.3,
                    }}
                    disabled={!exists}
                    onClick={() => {
                      if (!selected) {
                        void navigate(`?${variantUriQuery}`, {
                          replace: true,
                          preventScrollReset: true,
                        });
                      }
                    }}
                  >
                    <ProductOptionSwatch swatch={swatch} name={name} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => setOpen(true)}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? "Add to cart" : "Sold out"}
      </AddToCartButton>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return <span className="text-sm">{name}</span>;

  return (
    <div
      aria-label={name}
      className="w-8 h-8 rounded-full border border-gray-200"
      style={{
        backgroundColor: color || "transparent",
      }}
    >
      {!!image && (
        <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
      )}
    </div>
  );
}

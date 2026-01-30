import type { MappedProductOptions } from "@shopify/hydrogen";
import type { Maybe, ProductOptionValueSwatch } from "@shopify/hydrogen/storefront-api-types";
import { Link, useNavigate } from "react-router";
import type { ProductCardFragment, ProductOptionFragment } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { AddToCartButton } from "../common/add-to-cart-button";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";
import { OkendoStarRating } from "@okendo/shopify-hydrogen";
import { BadgeCheck, PackageCheck } from "lucide-react";
import { Image } from "@shopify/hydrogen";
import { cn } from "~/lib/utils/cn";

export function ProductForm({
  productOptions,
  selectedVariant,
  productID,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductCardFragment["selectedOrFirstAvailableVariant"];
  productID: string;
}) {
  const { setOpen } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="text-xl font-bold text-gray-900 leading-none pt-4 pb-0.5">
        {selectedVariant?.title}
      </h1>

      <div className="h-6">
        <OkendoStarRating productId={productID} />
      </div>

      <div className="pt-4 pb-6">
        <ProductPrice
          price={selectedVariant?.price}
          compareAtPrice={selectedVariant?.compareAtPrice}
        />
      </div>

      <div className="flex items-center justify-between pb-4">
        <div className="flex gap-1">
          <BadgeCheck />
          <p>1-Year Warranty</p>
        </div>
        <div className="flex gap-1">
          <PackageCheck />
          <p>Dispatch within 3 business days.</p>
        </div>
      </div>

      <p className="pb-6">
        Loona is the ideal companion for families with kids, offering nonstop games, a lively
        personality, and smart AI interactions. Kids can ask questions, play, and even see their
        words come to life with AI-generated visuals, all controlled by simple voice commands for a
        fun and engaging experience.
      </p>

      {productOptions.map((option) => {
        return (
          <div key={option.name}>
            <div className="flex gap-3">
              {option.optionValues.map((value) => {
                const {
                  name,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  firstSelectableVariant,
                  swatch,
                } = value;

                return (
                  <div key={option.name + name}>
                    <button
                      type="button"
                      className={cn(
                        "flex items-center justify-center transition-colors border-2 border-transparent disabled:opacity-30 disabled:cursor-not-allowed",
                        selected && "border-primary ",
                        available ? " opacity-100" : "opacity-30",
                      )}
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
                      <ProductOptionSwatch
                        swatch={swatch}
                        name={name}
                        firstSelectableVariant={firstSelectableVariant}
                      />
                    </button>
                    <p className="text-center text-muted-foreground text-[14px] leading-4.5 px-0.5">
                      {name}
                    </p>
                  </div>
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
  firstSelectableVariant,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
  firstSelectableVariant: ProductOptionFragment["optionValues"][0]["firstSelectableVariant"];
}) {
  const image = swatch?.image?.previewImage?.url;

  return (
    <div aria-label={name} className="w-40 h-40  border-gray-200">
      {firstSelectableVariant && firstSelectableVariant.image && (
        <Image
          data={firstSelectableVariant.image}
          sizes="(min-width: 768px) 200px, 160px"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

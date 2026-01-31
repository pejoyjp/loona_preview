import type { MappedProductOptions } from "@shopify/hydrogen";
import type { Maybe, ProductOptionValueSwatch } from "@shopify/hydrogen/storefront-api-types";
import { Link } from "react-router";
import type { ProductCardFragment, ProductOptionFragment } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { AddToCartButton } from "../common/add-to-cart-button";
import { ProductPrice } from "./product-price";
import { OkendoStarRating } from "@okendo/shopify-hydrogen";
import { BadgeCheck, PackageCheck } from "lucide-react";
import { Image } from "@shopify/hydrogen";
import { cn } from "~/lib/utils/cn";
import { useTranslationContext } from "~/hooks/use-translation-context";

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
  const { t } = useTranslationContext();

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

      <div className="flex items-center justify-between pb-4 text-foreground leading-5">
        <div className="flex gap-1 items-center">
          <BadgeCheck />
          <p>1-Year Warranty</p>
        </div>
        <div className="flex gap-1 items-center">
          <PackageCheck />
          <p>Dispatch within 3 business days.</p>
        </div>
      </div>

      <p className="pb-6 text-sm text-muted-foreground leading-4.5">{t("petbot.product.desc")}</p>

      {productOptions.map((option) => {
        return (
          <div key={option.name}>
            <div className="flex gap-3 overflow-hidden  bg-red-100">
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
                    <Link
                      to={`?${variantUriQuery}`}
                      replace
                      preventScrollReset
                      aria-current={selected ? "true" : undefined}
                      className={cn(
                        "flex items-center justify-center border-2 border-transparent transition-colors  min-w-40 aspect-square shrink-0 ",
                        selected && "border-primary",
                        available ? "opacity-100" : "opacity-30",
                        !exists && "pointer-events-none opacity-30",
                      )}
                    >
                      <ProductOptionSwatch
                        swatch={swatch}
                        name={name}
                        firstSelectableVariant={firstSelectableVariant}
                      />
                    </Link>
                    <p className="text-center text-muted-foreground text-sm leading-4.5 px-0.5">
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
  return (
    <div aria-label={name} className=" border-gray-200 w-full h-full">
      {firstSelectableVariant && firstSelectableVariant.image && (
        <Image
          data={firstSelectableVariant.image}
          sizes="(min-width: 768px) 200px, 160px"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

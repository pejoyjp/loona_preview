import { Money } from "@shopify/hydrogen";
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types";
import { Separator } from "../ui/separator";

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  return (
    <div className="flex justify-between items-center bg-linear-to-r from-white to-muted h-15.5">
      <div className="flex h-full items-center">
        {compareAtPrice ? (
          <div className="flex flex-col md:flex-row xl:flex-col">
            {price ? (
              <Money
                data={price}
                className="text-price text-xl tracking-tight leading-8 md:font-bold"
              />
            ) : null}
            <s className="text-muted-foreground">
              <Money data={compareAtPrice} />
            </s>
          </div>
        ) : price ? (
          <Money data={price} />
        ) : (
          <span>&nbsp;</span>
        )}

        <div className="h-1/2">
          <Separator orientation="vertical" className="h-8 ml-4" />
        </div>
      </div>

      <div className="px-4">分期付款在这</div>
    </div>
  );
}

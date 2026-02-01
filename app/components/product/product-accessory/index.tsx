import type { MappedProductOptions } from "@shopify/hydrogen";
import { MediaModal } from "~/components/ui/media-modal";
import { AddToCartButton } from "~/components/common/add-to-cart-button";
import { useTranslationContext } from "~/hooks/use-translation-context";

export function ProductAccessory({ productOptions }: { productOptions: MappedProductOptions[] }) {
  const { t } = useTranslationContext();
  return (
    <>
      <p className="text-md leading-6 font-medium">{t("petbot.accessory.title")}</p>
      <div className="flex flex-col gap-2">
        {productOptions.map((productOption) => {
          if (productOption.optionValues.length === 1) return null;
          return productOption.optionValues.map(
            (value, index) =>
              value.available && (
                <div
                  key={value.variant.id}
                  className="border flex items-center justify-between p-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 ">
                      {value.variant?.image && (
                        <MediaModal image={value.variant.image} size="48px" />
                      )}
                    </div>

                    <div>
                      <div>{value.name}</div>
                      <p>{value.variant.price.amount}</p>
                    </div>
                  </div>

                  <div>
                    <AddToCartButton
                      variant={"outline"}
                      lines={[
                        {
                          merchandiseId: value.variant.id,
                          quantity: 1,
                        },
                      ]}
                    >
                      Add
                    </AddToCartButton>
                  </div>
                </div>
              ),
          );
        })}
      </div>
    </>
  );
}

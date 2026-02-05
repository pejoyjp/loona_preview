import type { MappedProductOptions } from "@shopify/hydrogen";
import type {
  Maybe,
  ProductOptionValueSwatch,
  ProductVariant,
} from "@shopify/hydrogen/storefront-api-types";
import type { EmblaCarouselType } from "embla-carousel";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { ProductCardFragment } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { ProductPrice } from "./product-price";
import { OkendoStarRating } from "@okendo/shopify-hydrogen";
import { BadgeCheck, PackageCheck } from "lucide-react";
import { Image } from "@shopify/hydrogen";
import { cn } from "~/lib/cn";
import { useTranslationContext } from "~/hooks/use-translation-context";
import { Carousel, Slider, SliderContainer } from "~/components/ui/carousel";
import { useViewportStore } from "~/hooks/store/use-viewport-store";

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
  const isMobile = useViewportStore((state) => state.isMobile);
  const navigate = useNavigate();

  const handleVariantSelect = (variantUriQuery: string) => {
    if (!variantUriQuery) return;
    navigate(`?${variantUriQuery}`, { replace: true, preventScrollReset: true });
  };

  return (
    <div>
      <div className="pr-4 md:pr-10 xl:pr-0 ">
        <h1 className="text-headline font-bold pb-2 md:pb-4 xl:pb-2">{selectedVariant?.title}</h1>
        <div className="h-6">
          <OkendoStarRating productId={productID} />
        </div>

        <div className="pt-4 pb-6 md:pb-4 xl:pb-6">
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
      </div>

      <div>
        {productOptions.map((option) => {
          return (
            <ProductOptionCarousel
              key={option.name}
              option={option}
              isMobile={isMobile}
              onVariantSelect={handleVariantSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

function ProductOptionCarousel({
  option,
  isMobile,
  onVariantSelect,
}: {
  option: MappedProductOptions;
  isMobile: boolean;
  onVariantSelect: (variantUriQuery: string) => void;
}) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  return (
    <div>
      <Carousel
        options={{
          align: "start",
          dragFree: false,
          slidesToScroll: "auto",
          containScroll: "trimSnaps",
          watchDrag: isMobile ? true : false,
        }}
        onApi={setEmblaApi}
        className="pr-0 md:pr-10 xl:pr-0"
      >
        <SliderContainer className="flex gap-3 w-full ">
          {option.optionValues.map((value, index) => {
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
              <Slider key={option.name + name} className={cn("min-w-40 flex-1")}>
                <button
                  type="button"
                  onClick={() => {
                    emblaApi?.scrollTo(index);
                    onVariantSelect(variantUriQuery);
                  }}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-center border-2 border-transparent transition-colors aspect-square w-full",
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
                </button>
                <p className="text-center text-muted-foreground text-sm leading-4.5 px-0.5">
                  {name}
                </p>
              </Slider>
            );
          })}
          <div className="w-4 md:hidden" aria-hidden />
        </SliderContainer>
      </Carousel>
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
  firstSelectableVariant: Maybe<ProductVariant> | undefined;
}) {
  return (
    <div aria-label={name} className=" border w-full h-full">
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

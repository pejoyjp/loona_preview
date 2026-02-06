import { Image, Money } from "@shopify/hydrogen";
import type { ProductCardFragment } from "storefrontapi.generated";
import { AddToCartButton } from "~/components/common/add-to-cart-button";
import { Carousel, SliderContainer, Slider, SliderDotButton } from "~/components/ui/carousel";
import { Field, FieldContent, FieldLabel, FieldTitle } from "~/components/ui/field";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

interface ProductItemProps {
  product: ProductCardFragment;
  type: "radio" | "button";
}

function ProductItem({ product, type }: ProductItemProps) {
  const selectedVariant = product?.selectedOrFirstAvailableVariant;
  const image = product?.selectedOrFirstAvailableVariant?.image;
  const productTitle = product?.title ?? "";

  if (type === "radio") {
    return (
      <FieldLabel htmlFor={`product-${product.id}`} className="cursor-pointer w-full xl:px-2 ">
        <Field orientation="horizontal" className=" w-full items-center ">
          <div className="w-12 h-12">
            {image && <Image data={image} sizes="48px" className="w-full h-full object-fit" />}
          </div>
          <FieldContent className="gap-1 xl:gap-2">
            <FieldTitle>{productTitle}</FieldTitle>
            <div className="flex items-center gap-1 text-base">
              {selectedVariant?.price && (
                <Money data={selectedVariant.price} className="text-price" />
              )}

              {selectedVariant?.compareAtPrice && (
                <s>
                  <Money data={selectedVariant.compareAtPrice} className="text-muted-foreground" />
                </s>
              )}
            </div>
          </FieldContent>
          <RadioGroupItem value={product.id} id={`product-${product.id}`} className="h-6 w-6" />
        </Field>
      </FieldLabel>
    );
  }

  return (
    <div className="border flex items-center justify-between p-3 w-full">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          {image && <Image data={image} sizes="48px" className="w-full h-full object-fit" />}
        </div>
        <div>
          <div className="font-medium">{productTitle}</div>
        </div>
      </div>
      <AddToCartButton
        variant="outline"
        className="rounded-full "
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
        Add
      </AddToCartButton>
    </div>
  );
}

interface ProductListProps {
  products: ProductCardFragment[];
  title: string;
  type: "radio" | "button";
  onSelect?: (product: ProductCardFragment | null) => void;
}

export function ProductList({ products, title, type, onSelect }: ProductListProps) {
  if (products.length === 0) return null;

  if (type === "radio") {
    const handleValueChange = (value: string) => {
      const selectedProduct = products.find((p) => p.id === value) || null;
      onSelect?.(selectedProduct);
    };

    const renderRadioProductItem = (product: ProductCardFragment) => (
      <ProductItem key={product.id} product={product} type={type} />
    );

    if (products.length <= 3) {
      return (
        <RadioGroup
          name={title}
          className="flex flex-col gap-4 w-full"
          onValueChange={handleValueChange}
        >
          {products.map(renderRadioProductItem)}
        </RadioGroup>
      );
    }

    const productGroups: ProductCardFragment[][] = [];
    for (let i = 0; i < products.length; i += 3) {
      productGroups.push(products.slice(i, i + 3));
    }

    return (
      <RadioGroup name={title} className="w-full " onValueChange={handleValueChange}>
        <Carousel options={{ align: "start", loop: true }} className="w-full ">
          <SliderContainer className="gap-2 w-full ">
            {productGroups.map((group, groupIndex) => (
              <Slider key={groupIndex} className="flex-[0_0_100%] min-w-0 w-full">
                <div className="flex flex-col gap-4 w-full">
                  {group.map((product) => (
                    <ProductItem key={product.id} product={product} type={type} />
                  ))}
                </div>
              </Slider>
            ))}
          </SliderContainer>

          <div className="flex justify-center mt-4 h-2">
            <SliderDotButton variant="dot" />
          </div>
        </Carousel>
      </RadioGroup>
    );
  }

  const renderProductItem = (product: ProductCardFragment) => (
    <ProductItem key={product.id} product={product} type={type} />
  );

  if (products.length <= 3) {
    return (
      <div className="">
        <div className="flex flex-col gap-2">{products.map(renderProductItem)}</div>
      </div>
    );
  }

  const productGroups: ProductCardFragment[][] = [];
  for (let i = 0; i < products.length; i += 3) {
    productGroups.push(products.slice(i, i + 3));
  }

  return (
    <Carousel options={{ align: "start", loop: true }}>
      <SliderContainer className="gap-2">
        {productGroups.map((group, groupIndex) => (
          <Slider key={groupIndex} className="basis-full">
            <div className="flex flex-col gap-2">{group.map(renderProductItem)}</div>
          </Slider>
        ))}
      </SliderContainer>
      <div className="flex justify-center mt-2">
        <SliderDotButton />
      </div>
    </Carousel>
  );
}

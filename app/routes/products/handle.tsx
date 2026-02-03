import {
  Analytics,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  getSeoMeta,
  getSelectedProductOptions,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
  type OptimisticCartLineInput,
} from "@shopify/hydrogen";
import {
  Await,
  type LoaderFunctionArgs,
  type MetaFunction,
  redirect,
  useLoaderData,
} from "react-router";
import { Suspense, useState } from "react";
import type {
  ProductFragment,
  ProductVariantForProductPageFragment,
  ProductCardFragment,
} from "storefrontapi.generated";
import { ProductForm } from "~/components/product/product-form";
import { redirectIfHandleIsLocalized } from "~/lib/redirect";
import { seoPayload } from "~/.server/seo/index";
import { ProductCarousel } from "~/components/product/product-carousel";
import { ProductAccessory } from "~/components/product/product-accessory";
import { COLLECTION_QUERY } from "~/graphql/queries/collection";
import { useTranslationContext } from "~/hooks/use-translation-context";
import { AddToCartButton } from "~/components/common/add-to-cart-button";
import { COLLECTION_HANDLES } from "~/data/handles";
import { PaymentIcons } from "~/components/common/payment/payment-icons";
import { PaymentWarrant } from "~/components/common/payment/payment-warrant";
import { ProductLanding } from "~/components/product/product-landing";
import { PRODUCT_QUERY } from "~/graphql/queries/product";

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  if (!loaderData?.seo) {
    return [{ title: "Product | Loona" }, { name: "description", content: "" }];
  }
  return getSeoMeta(loaderData.seo);
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context, params, request }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error("Expected product handle to be defined");
  }

  const [{ product }, outfit] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
      },
    }),
    storefront.query(COLLECTION_QUERY, {
      variables: {
        handle: COLLECTION_HANDLES.PETBOT_OUTFIT,
        first: 20,
      },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
    outfit: outfit.collection,
    seo: seoPayload.product({ product, url: request.url }),
  };
}

function loadDeferredData({ context }: LoaderFunctionArgs) {
  const { storefront } = context;

  const ipProduct = storefront
    .query(COLLECTION_QUERY, {
      variables: {
        handle: COLLECTION_HANDLES.IP_PRODUCT,
        first: 10,
      },
    })
    .then((response) => response.collection);

  return {
    ipProduct,
  };
}

export default function Product() {
  const { product, outfit, ipProduct } = useLoaderData<typeof loader>();
  const { t } = useTranslationContext();
  const [selectedOutfit, setSelectedOutfit] = useState<ProductCardFragment | null>(null);

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const filteredProductOptions = productOptions.map((option) => ({
    ...option,
    optionValues: option.optionValues.filter((value) => {
      const variant = value.variant as ProductVariantForProductPageFragment;
      return variant?.showInProduct?.value === "true";
    }),
  }));

  const galleriesByOption = productOptions.map((option) => {
    const galleries: Record<string, any[]> = {};
    option.optionValues.forEach((value) => {
      const variant = value.variant as ProductVariantForProductPageFragment;
      if (variant?.gallery?.reference?.media?.references?.nodes) {
        galleries[value.name] = variant.gallery.reference.media.references.nodes;
      }
    });
    return galleries;
  });

  const cartLines: OptimisticCartLineInput[] = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: 1,
          selectedVariant,
        },
      ]
    : [];

  if (selectedOutfit) {
    const outfitVariant = selectedOutfit.selectedOrFirstAvailableVariant;
    if (outfitVariant) {
      cartLines.push({
        merchandiseId: outfitVariant.id,
        quantity: 1,
        selectedVariant: outfitVariant,
      });
    }
  }

  return (
    <div className="">
      <div className="flex flex-col xl:flex-row w-full gap-5 xl:w-300 xl: mx-auto">
        <div className="xl:flex-1 xl:basis-0 min-w-0">
          <ProductCarousel
            galleriesByOption={galleriesByOption}
            selectedVariant={selectedVariant}
          />
        </div>

        <div className="xl:flex-1 xl:basis-0 min-w-0 pl-4">
          <ProductForm
            productOptions={filteredProductOptions}
            selectedVariant={selectedVariant}
            productID={product.id}
          />

          <div className="pr-4 xl:pr-0">
            <ProductAccessory
              collection={outfit}
              type="radio"
              onSelect={setSelectedOutfit}
              title={t("petbot.buy.title")}
            />
            <AddToCartButton
              disabled={!selectedVariant || !selectedVariant.availableForSale}
              className="w-full h-13 text-lg"
              lines={cartLines}
            >
              {selectedVariant?.availableForSale ? "Add to cart" : "Sold out"}
            </AddToCartButton>

            <Suspense fallback={null}>
              <Await resolve={ipProduct}>
                {(resolvedIpProduct) => (
                  <ProductAccessory
                    collection={resolvedIpProduct}
                    type="button"
                    title={t("petbot.accessory.title")}
                  />
                )}
              </Await>
            </Suspense>

            <PaymentIcons />
            <PaymentWarrant />
          </div>
        </div>
      </div>

      <div className="pt-24 md:pt-10">
        <ProductLanding product={product as ProductFragment} />
      </div>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || "0",
              vendor: product.vendor,
              variantId: selectedVariant?.id || "",
              variantTitle: selectedVariant?.title || "",
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

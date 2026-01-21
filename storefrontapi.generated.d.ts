/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from "@shopify/hydrogen/storefront-api-types";

export type CustomerAddressUpdateMutationVariables = StorefrontAPI.Exact<{
  address: StorefrontAPI.MailingAddressInput;
  customerAccessToken: StorefrontAPI.Scalars["String"]["input"];
  id: StorefrontAPI.Scalars["ID"]["input"];
}>;

export type CustomerAddressUpdateMutation = {
  customerAddressUpdate?: StorefrontAPI.Maybe<{
    userErrors: Array<Pick<StorefrontAPI.UserError, "field" | "message">>;
  }>;
};

export type CustomerAddressDeleteMutationVariables = StorefrontAPI.Exact<{
  customerAccessToken: StorefrontAPI.Scalars["String"]["input"];
  id: StorefrontAPI.Scalars["ID"]["input"];
}>;

export type CustomerAddressDeleteMutation = {
  customerAddressDelete?: StorefrontAPI.Maybe<{
    userErrors: Array<Pick<StorefrontAPI.UserError, "field" | "message">>;
  }>;
};

export type CustomerAddressCreateMutationVariables = StorefrontAPI.Exact<{
  address: StorefrontAPI.MailingAddressInput;
  customerAccessToken: StorefrontAPI.Scalars["String"]["input"];
}>;

export type CustomerAddressCreateMutation = {
  customerAddressCreate?: StorefrontAPI.Maybe<{
    customerAddress?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MailingAddress, "id">>;
    userErrors: Array<Pick<StorefrontAPI.UserError, "field" | "message">>;
  }>;
};

export type OrderCardFragment = Pick<
  StorefrontAPI.Order,
  "id" | "name" | "processedAt" | "financialStatus" | "fulfillmentStatus"
> & {
  totalPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
  lineItems: {
    edges: Array<{
      node: Pick<StorefrontAPI.OrderLineItem, "title"> & {
        variant?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, "altText" | "height" | "url" | "width">
          >;
        }>;
      };
    }>;
  };
};

export type AddressPartialFragment = Pick<
  StorefrontAPI.MailingAddress,
  | "id"
  | "formatted"
  | "firstName"
  | "lastName"
  | "company"
  | "address1"
  | "address2"
  | "province"
  | "country"
  | "city"
  | "zip"
  | "phone"
>;

export type CustomerDetailsFragment = Pick<
  StorefrontAPI.Customer,
  "firstName" | "lastName" | "phone" | "email"
> & {
  defaultAddress?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.MailingAddress,
      | "id"
      | "formatted"
      | "firstName"
      | "lastName"
      | "company"
      | "address1"
      | "address2"
      | "province"
      | "country"
      | "city"
      | "zip"
      | "phone"
    >
  >;
  addresses: {
    edges: Array<{
      node: Pick<
        StorefrontAPI.MailingAddress,
        | "id"
        | "formatted"
        | "firstName"
        | "lastName"
        | "company"
        | "address1"
        | "address2"
        | "province"
        | "country"
        | "city"
        | "zip"
        | "phone"
      >;
    }>;
  };
  orders: {
    edges: Array<{
      node: Pick<
        StorefrontAPI.Order,
        "id" | "name" | "processedAt" | "financialStatus" | "fulfillmentStatus"
      > & {
        totalPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
        lineItems: {
          edges: Array<{
            node: Pick<StorefrontAPI.OrderLineItem, "title"> & {
              variant?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, "altText" | "height" | "url" | "width">
                >;
              }>;
            };
          }>;
        };
      };
    }>;
  };
};

export type CustomerDetailsQueryVariables = StorefrontAPI.Exact<{
  customerAccessToken: StorefrontAPI.Scalars["String"]["input"];
}>;

export type CustomerDetailsQuery = {
  customer?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Customer, "firstName" | "lastName" | "phone" | "email"> & {
      defaultAddress?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.MailingAddress,
          | "id"
          | "formatted"
          | "firstName"
          | "lastName"
          | "company"
          | "address1"
          | "address2"
          | "province"
          | "country"
          | "city"
          | "zip"
          | "phone"
        >
      >;
      addresses: {
        edges: Array<{
          node: Pick<
            StorefrontAPI.MailingAddress,
            | "id"
            | "formatted"
            | "firstName"
            | "lastName"
            | "company"
            | "address1"
            | "address2"
            | "province"
            | "country"
            | "city"
            | "zip"
            | "phone"
          >;
        }>;
      };
      orders: {
        edges: Array<{
          node: Pick<
            StorefrontAPI.Order,
            "id" | "name" | "processedAt" | "financialStatus" | "fulfillmentStatus"
          > & {
            totalPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
            lineItems: {
              edges: Array<{
                node: Pick<StorefrontAPI.OrderLineItem, "title"> & {
                  variant?: StorefrontAPI.Maybe<{
                    image?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, "altText" | "height" | "url" | "width">
                    >;
                  }>;
                };
              }>;
            };
          };
        }>;
      };
    }
  >;
};

export type OrderMoneyFragment = Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;

export type DiscountApplicationFragment = {
  value:
    | ({ __typename: "MoneyV2" } & Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">)
    | ({ __typename: "PricingPercentageValue" } & Pick<
        StorefrontAPI.PricingPercentageValue,
        "percentage"
      >);
};

export type OrderLineItemFullFragment = Pick<StorefrontAPI.OrderLineItem, "title" | "quantity"> & {
  variant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ProductVariant, "id"> & {
      price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, "altText" | "height" | "url" | "width">
      >;
    }
  >;
  discountAllocations: Array<{
    allocatedAmount: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
    discountApplication: {
      value:
        | ({ __typename: "MoneyV2" } & Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">)
        | ({ __typename: "PricingPercentageValue" } & Pick<
            StorefrontAPI.PricingPercentageValue,
            "percentage"
          >);
    };
  }>;
};

export type OrderFragment = Pick<
  StorefrontAPI.Order,
  "id" | "name" | "statusUrl" | "processedAt" | "fulfillmentStatus"
> & {
  totalTax?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
  totalPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
  shippingAddress?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MailingAddress, "name" | "formatted" | "formattedArea">
  >;
  discountApplications: {
    nodes: Array<{
      value:
        | ({ __typename: "MoneyV2" } & Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">)
        | ({ __typename: "PricingPercentageValue" } & Pick<
            StorefrontAPI.PricingPercentageValue,
            "percentage"
          >);
    }>;
  };
  lineItems: {
    nodes: Array<
      Pick<StorefrontAPI.OrderLineItem, "title" | "quantity"> & {
        variant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.ProductVariant, "id"> & {
            price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, "altText" | "height" | "url" | "width">
            >;
          }
        >;
        discountAllocations: Array<{
          allocatedAmount: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
          discountApplication: {
            value:
              | ({ __typename: "MoneyV2" } & Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">)
              | ({ __typename: "PricingPercentageValue" } & Pick<
                  StorefrontAPI.PricingPercentageValue,
                  "percentage"
                >);
          };
        }>;
      }
    >;
  };
};

export type OrderQueryVariables = StorefrontAPI.Exact<{
  orderId: StorefrontAPI.Scalars["ID"]["input"];
}>;

export type OrderQuery = {
  node?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Order, "id" | "name" | "statusUrl" | "processedAt" | "fulfillmentStatus"> & {
      totalTax?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
      totalPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
      shippingAddress?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MailingAddress, "name" | "formatted" | "formattedArea">
      >;
      discountApplications: {
        nodes: Array<{
          value:
            | ({ __typename: "MoneyV2" } & Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">)
            | ({ __typename: "PricingPercentageValue" } & Pick<
                StorefrontAPI.PricingPercentageValue,
                "percentage"
              >);
        }>;
      };
      lineItems: {
        nodes: Array<
          Pick<StorefrontAPI.OrderLineItem, "title" | "quantity"> & {
            variant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ProductVariant, "id"> & {
                price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, "altText" | "height" | "url" | "width">
                >;
              }
            >;
            discountAllocations: Array<{
              allocatedAmount: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
              discountApplication: {
                value:
                  | ({ __typename: "MoneyV2" } & Pick<
                      StorefrontAPI.MoneyV2,
                      "amount" | "currencyCode"
                    >)
                  | ({ __typename: "PricingPercentageValue" } & Pick<
                      StorefrontAPI.PricingPercentageValue,
                      "percentage"
                    >);
              };
            }>;
          }
        >;
      };
    }
  >;
};

export type CustomerUpdateMutationVariables = StorefrontAPI.Exact<{
  customer: StorefrontAPI.CustomerUpdateInput;
  customerAccessToken: StorefrontAPI.Scalars["String"]["input"];
}>;

export type CustomerUpdateMutation = {
  customerUpdate?: StorefrontAPI.Maybe<{
    userErrors: Array<Pick<StorefrontAPI.UserError, "field" | "message">>;
  }>;
};

export type ProductVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  "id" | "availableForSale" | "quantityAvailable" | "sku" | "title" | "requiresComponents"
> & {
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
  >;
  price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
  compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
  unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
  product: Pick<StorefrontAPI.Product, "title" | "handle">;
  components: {
    nodes: Array<
      Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
        productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
          product: Pick<StorefrontAPI.Product, "handle">;
        };
      }
    >;
  };
  groupedBy: {
    nodes: Array<
      Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
        product: Pick<StorefrontAPI.Product, "handle">;
      }
    >;
  };
};

export type ProductOptionFragment = Pick<StorefrontAPI.ProductOption, "name"> & {
  optionValues: Array<
    Pick<StorefrontAPI.ProductOptionValue, "name"> & {
      firstSelectableVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          "id" | "availableForSale" | "quantityAvailable" | "sku" | "title" | "requiresComponents"
        > & {
          selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
          >;
          price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
          >;
          unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
          product: Pick<StorefrontAPI.Product, "title" | "handle">;
          components: {
            nodes: Array<
              Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                  product: Pick<StorefrontAPI.Product, "handle">;
                };
              }
            >;
          };
          groupedBy: {
            nodes: Array<
              Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                product: Pick<StorefrontAPI.Product, "handle">;
              }
            >;
          };
        }
      >;
      swatch?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.ProductOptionValueSwatch, "color"> & {
          image?: StorefrontAPI.Maybe<{
            previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "url" | "altText">>;
          }>;
        }
      >;
    }
  >;
};

export type ProductCardFragment = Pick<
  StorefrontAPI.Product,
  "id" | "title" | "publishedAt" | "handle" | "vendor" | "tags"
> & {
  images: {
    nodes: Array<Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">>;
  };
  options: Array<
    Pick<StorefrontAPI.ProductOption, "name"> & {
      optionValues: Array<
        Pick<StorefrontAPI.ProductOptionValue, "name"> & {
          firstSelectableVariant?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.ProductVariant,
              | "id"
              | "availableForSale"
              | "quantityAvailable"
              | "sku"
              | "title"
              | "requiresComponents"
            > & {
              selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
              image?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
              >;
              price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
              >;
              product: Pick<StorefrontAPI.Product, "title" | "handle">;
              components: {
                nodes: Array<
                  Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                    productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                      product: Pick<StorefrontAPI.Product, "handle">;
                    };
                  }
                >;
              };
              groupedBy: {
                nodes: Array<
                  Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                    product: Pick<StorefrontAPI.Product, "handle">;
                  }
                >;
              };
            }
          >;
          swatch?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductOptionValueSwatch, "color"> & {
              image?: StorefrontAPI.Maybe<{
                previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "url" | "altText">>;
              }>;
            }
          >;
        }
      >;
    }
  >;
  badges: Array<StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "key" | "namespace" | "value">>>;
  priceRange: {
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
  };
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ProductVariant,
      "id" | "availableForSale" | "quantityAvailable" | "sku" | "title" | "requiresComponents"
    > & {
      selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
      >;
      price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
      compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
      unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
      product: Pick<StorefrontAPI.Product, "title" | "handle">;
      components: {
        nodes: Array<
          Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
            productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
              product: Pick<StorefrontAPI.Product, "handle">;
            };
          }
        >;
      };
      groupedBy: {
        nodes: Array<
          Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
            product: Pick<StorefrontAPI.Product, "handle">;
          }
        >;
      };
    }
  >;
  isBundle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ProductVariant, "requiresComponents">>;
};

type Media_ExternalVideo_Fragment = { __typename: "ExternalVideo" } & Pick<
  StorefrontAPI.ExternalVideo,
  "id" | "embedUrl" | "host" | "mediaContentType" | "alt"
> & {
    previewImage?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
    >;
  };

type Media_MediaImage_Fragment = { __typename: "MediaImage" } & Pick<
  StorefrontAPI.MediaImage,
  "id" | "mediaContentType" | "alt"
> & {
    image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "id" | "url" | "width" | "height">>;
    previewImage?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
    >;
  };

type Media_Model3d_Fragment = { __typename: "Model3d" } & Pick<
  StorefrontAPI.Model3d,
  "id" | "mediaContentType" | "alt"
> & {
    sources: Array<Pick<StorefrontAPI.Model3dSource, "mimeType" | "url">>;
    previewImage?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
    >;
  };

type Media_Video_Fragment = { __typename: "Video" } & Pick<
  StorefrontAPI.Video,
  "id" | "mediaContentType" | "alt"
> & {
    sources: Array<Pick<StorefrontAPI.VideoSource, "mimeType" | "url">>;
    previewImage?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
    >;
  };

export type MediaFragment =
  | Media_ExternalVideo_Fragment
  | Media_MediaImage_Fragment
  | Media_Model3d_Fragment
  | Media_Video_Fragment;

export type MoneyFragment = Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;

export type CartLineFragment = Pick<StorefrontAPI.CartLine, "id" | "quantity"> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, "key" | "value">>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">
    >;
  };
  sellingPlanAllocation?: StorefrontAPI.Maybe<{
    sellingPlan: Pick<StorefrontAPI.SellingPlan, "name">;
  }>;
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    "id" | "availableForSale" | "requiresShipping" | "title"
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">>;
    price: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
    >;
    product: Pick<StorefrontAPI.Product, "handle" | "title" | "id" | "vendor">;
    selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
  };
};

export type CartLineComponentFragment = Pick<
  StorefrontAPI.ComponentizableCartLine,
  "id" | "quantity"
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, "key" | "value">>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    "id" | "availableForSale" | "requiresShipping" | "title" | "requiresComponents"
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">>;
    price: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
    >;
    product: Pick<StorefrontAPI.Product, "handle" | "title" | "id" | "vendor">;
    selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
    components: {
      nodes: Array<
        Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
          productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
            product: Pick<StorefrontAPI.Product, "handle">;
          };
        }
      >;
    };
  };
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  "updatedAt" | "id" | "checkoutUrl" | "totalQuantity" | "note"
> & {
  appliedGiftCards: Array<
    Pick<StorefrontAPI.AppliedGiftCard, "id" | "lastCharacters"> & {
      amountUsed: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    }
  >;
  buyerIdentity: Pick<StorefrontAPI.CartBuyerIdentity, "countryCode" | "email" | "phone"> & {
    customer?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Customer, "id" | "email" | "firstName" | "lastName" | "displayName">
    >;
  };
  lines: {
    nodes: Array<
      | (Pick<StorefrontAPI.CartLine, "id" | "quantity"> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, "key" | "value">>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
            amountPerQuantity: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">
            >;
          };
          sellingPlanAllocation?: StorefrontAPI.Maybe<{
            sellingPlan: Pick<StorefrontAPI.SellingPlan, "name">;
          }>;
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            "id" | "availableForSale" | "requiresShipping" | "title"
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">
            >;
            price: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
            >;
            product: Pick<StorefrontAPI.Product, "handle" | "title" | "id" | "vendor">;
            selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
          };
        })
      | (Pick<StorefrontAPI.ComponentizableCartLine, "id" | "quantity"> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, "key" | "value">>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
            amountPerQuantity: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            "id" | "availableForSale" | "requiresShipping" | "title" | "requiresComponents"
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">
            >;
            price: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
            >;
            product: Pick<StorefrontAPI.Product, "handle" | "title" | "id" | "vendor">;
            selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
            components: {
              nodes: Array<
                Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                  productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                    product: Pick<StorefrontAPI.Product, "handle">;
                  };
                }
              >;
            };
          };
        })
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    totalAmount: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    totalDutyAmount?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">>;
    totalTaxAmount?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">>;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, "key" | "value">>;
  discountCodes: Array<Pick<StorefrontAPI.CartDiscountCode, "code" | "applicable">>;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  "id" | "resourceId" | "tags" | "title" | "type" | "url"
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  "id" | "resourceId" | "tags" | "title" | "type" | "url"
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  "id" | "resourceId" | "tags" | "title" | "type" | "url"
> & {
  items: Array<
    Pick<StorefrontAPI.MenuItem, "id" | "resourceId" | "tags" | "title" | "type" | "url">
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, "id"> & {
  items: Array<
    Pick<StorefrontAPI.MenuItem, "id" | "resourceId" | "tags" | "title" | "type" | "url"> & {
      items: Array<
        Pick<StorefrontAPI.MenuItem, "id" | "resourceId" | "tags" | "title" | "type" | "url">
      >;
    }
  >;
};

export type ShopFragment = Pick<StorefrontAPI.Shop, "id" | "name" | "description"> & {
  primaryDomain: Pick<StorefrontAPI.Domain, "url">;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{ image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "url">> }>;
  }>;
};

export type HeaderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars["String"]["input"];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderQuery = {
  shop: Pick<StorefrontAPI.Shop, "id" | "name" | "description"> & {
    primaryDomain: Pick<StorefrontAPI.Domain, "url">;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{ image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "url">> }>;
    }>;
  };
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, "id"> & {
      items: Array<
        Pick<StorefrontAPI.MenuItem, "id" | "resourceId" | "tags" | "title" | "type" | "url"> & {
          items: Array<
            Pick<StorefrontAPI.MenuItem, "id" | "resourceId" | "tags" | "title" | "type" | "url">
          >;
        }
      >;
    }
  >;
};

export type FooterQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  footerMenuHandle: StorefrontAPI.Scalars["String"]["input"];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FooterQuery = {
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, "id"> & {
      items: Array<
        Pick<StorefrontAPI.MenuItem, "id" | "resourceId" | "tags" | "title" | "type" | "url"> & {
          items: Array<
            Pick<StorefrontAPI.MenuItem, "id" | "resourceId" | "tags" | "title" | "type" | "url">
          >;
        }
      >;
    }
  >;
};

export type ProductItemFragment = Pick<
  StorefrontAPI.Product,
  "id" | "handle" | "title" | "vendor"
> & {
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, "currencyCode" | "amount">;
  };
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
  >;
};

export type OkendoStarRatingSnippetFragment = {
  okendoStarRatingSnippet?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "value">>;
};

export type OkendoReviewsSnippetFragment = {
  okendoReviewsSnippet?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "value">>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  handle: StorefrontAPI.Scalars["String"]["input"];
  selectedOptions: Array<StorefrontAPI.SelectedOptionInput> | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | "id"
      | "title"
      | "vendor"
      | "handle"
      | "publishedAt"
      | "descriptionHtml"
      | "description"
      | "encodedVariantExistence"
      | "encodedVariantAvailability"
      | "tags"
    > & { summary: StorefrontAPI.Product["description"] } & {
      featuredImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "id" | "url" | "altText">>;
      priceRange: {
        minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
        maxVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
      };
      badges: Array<
        StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "key" | "namespace" | "value">>
      >;
      options: Array<
        Pick<StorefrontAPI.ProductOption, "name"> & {
          optionValues: Array<
            Pick<StorefrontAPI.ProductOptionValue, "name"> & {
              firstSelectableVariant?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.ProductVariant,
                  | "id"
                  | "availableForSale"
                  | "quantityAvailable"
                  | "sku"
                  | "title"
                  | "requiresComponents"
                > & {
                  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
                  >;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
                  >;
                  product: Pick<StorefrontAPI.Product, "title" | "handle">;
                  components: {
                    nodes: Array<
                      Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                        productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                          product: Pick<StorefrontAPI.Product, "handle">;
                        };
                      }
                    >;
                  };
                  groupedBy: {
                    nodes: Array<
                      Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                        product: Pick<StorefrontAPI.Product, "handle">;
                      }
                    >;
                  };
                }
              >;
              swatch?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductOptionValueSwatch, "color"> & {
                  image?: StorefrontAPI.Maybe<{
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, "url" | "altText">
                    >;
                  }>;
                }
              >;
            }
          >;
        }
      >;
      selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          "id" | "availableForSale" | "quantityAvailable" | "sku" | "title" | "requiresComponents"
        > & {
          selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
          >;
          price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
          >;
          unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
          product: Pick<StorefrontAPI.Product, "title" | "handle">;
          components: {
            nodes: Array<
              Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                  product: Pick<StorefrontAPI.Product, "handle">;
                };
              }
            >;
          };
          groupedBy: {
            nodes: Array<
              Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                product: Pick<StorefrontAPI.Product, "handle">;
              }
            >;
          };
        }
      >;
      adjacentVariants: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          "id" | "availableForSale" | "quantityAvailable" | "sku" | "title" | "requiresComponents"
        > & {
          selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
          >;
          price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
          >;
          unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
          product: Pick<StorefrontAPI.Product, "title" | "handle">;
          components: {
            nodes: Array<
              Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                  product: Pick<StorefrontAPI.Product, "handle">;
                };
              }
            >;
          };
          groupedBy: {
            nodes: Array<
              Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                product: Pick<StorefrontAPI.Product, "handle">;
              }
            >;
          };
        }
      >;
      isBundle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.ProductVariant, "requiresComponents"> & {
          components: {
            nodes: Array<
              Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                productVariant: Pick<
                  StorefrontAPI.ProductVariant,
                  | "id"
                  | "availableForSale"
                  | "quantityAvailable"
                  | "sku"
                  | "title"
                  | "requiresComponents"
                > & {
                  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
                  >;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
                  >;
                  product: Pick<StorefrontAPI.Product, "title" | "handle">;
                  components: {
                    nodes: Array<
                      Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                        productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                          product: Pick<StorefrontAPI.Product, "handle">;
                        };
                      }
                    >;
                  };
                  groupedBy: {
                    nodes: Array<
                      Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                        product: Pick<StorefrontAPI.Product, "handle">;
                      }
                    >;
                  };
                };
              }
            >;
          };
          groupedBy: { nodes: Array<Pick<StorefrontAPI.ProductVariant, "id">> };
        }
      >;
      media: {
        nodes: Array<
          | ({ __typename: "ExternalVideo" } & Pick<
              StorefrontAPI.ExternalVideo,
              "id" | "embedUrl" | "host" | "mediaContentType" | "alt"
            > & {
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
                >;
              })
          | ({ __typename: "MediaImage" } & Pick<
              StorefrontAPI.MediaImage,
              "id" | "mediaContentType" | "alt"
            > & {
                image?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, "id" | "url" | "width" | "height">
                >;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
                >;
              })
          | ({ __typename: "Model3d" } & Pick<
              StorefrontAPI.Model3d,
              "id" | "mediaContentType" | "alt"
            > & {
                sources: Array<Pick<StorefrontAPI.Model3dSource, "mimeType" | "url">>;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
                >;
              })
          | ({ __typename: "Video" } & Pick<
              StorefrontAPI.Video,
              "id" | "mediaContentType" | "alt"
            > & {
                sources: Array<Pick<StorefrontAPI.VideoSource, "mimeType" | "url">>;
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
                >;
              })
        >;
      };
      seo: Pick<StorefrontAPI.Seo, "description" | "title">;
    }
  >;
  shop: Pick<StorefrontAPI.Shop, "name"> & {
    primaryDomain: Pick<StorefrontAPI.Domain, "url">;
    shippingPolicy?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ShopPolicy, "body" | "handle">>;
    refundPolicy?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ShopPolicy, "body" | "handle">>;
  };
};

export type LocalizationOptionsQueryVariables = StorefrontAPI.Exact<{ [key: string]: never }>;

export type LocalizationOptionsQuery = {
  localization: {
    availableCountries: Array<
      Pick<StorefrontAPI.Country, "isoCode" | "name"> & {
        defaultLanguage: Pick<StorefrontAPI.Language, "isoCode" | "name" | "endonymName">;
        availableLanguages: Array<Pick<StorefrontAPI.Language, "isoCode" | "name" | "endonymName">>;
        currency: Pick<StorefrontAPI.Currency, "isoCode" | "symbol">;
      }
    >;
  };
};

export type ApiAllProductsQueryVariables = StorefrontAPI.Exact<{
  query?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
  count?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Boolean"]["input"]>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  sortKey?: StorefrontAPI.InputMaybe<StorefrontAPI.ProductSortKeys>;
}>;

export type ApiAllProductsQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, "id" | "title" | "publishedAt" | "handle" | "vendor" | "tags"> & {
        images: {
          nodes: Array<Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">>;
        };
        options: Array<
          Pick<StorefrontAPI.ProductOption, "name"> & {
            optionValues: Array<
              Pick<StorefrontAPI.ProductOptionValue, "name"> & {
                firstSelectableVariant?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.ProductVariant,
                    | "id"
                    | "availableForSale"
                    | "quantityAvailable"
                    | "sku"
                    | "title"
                    | "requiresComponents"
                  > & {
                    selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
                    image?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
                    >;
                    price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
                    compareAtPrice?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
                    >;
                    unitPrice?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
                    >;
                    product: Pick<StorefrontAPI.Product, "title" | "handle">;
                    components: {
                      nodes: Array<
                        Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                          productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                            product: Pick<StorefrontAPI.Product, "handle">;
                          };
                        }
                      >;
                    };
                    groupedBy: {
                      nodes: Array<
                        Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                          product: Pick<StorefrontAPI.Product, "handle">;
                        }
                      >;
                    };
                  }
                >;
                swatch?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.ProductOptionValueSwatch, "color"> & {
                    image?: StorefrontAPI.Maybe<{
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, "url" | "altText">
                      >;
                    }>;
                  }
                >;
              }
            >;
          }
        >;
        badges: Array<
          StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "key" | "namespace" | "value">>
        >;
        priceRange: {
          maxVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
          minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
        };
        selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.ProductVariant,
            "id" | "availableForSale" | "quantityAvailable" | "sku" | "title" | "requiresComponents"
          > & {
            selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
            >;
            price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
            >;
            unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
            product: Pick<StorefrontAPI.Product, "title" | "handle">;
            components: {
              nodes: Array<
                Pick<StorefrontAPI.ProductVariantComponent, "quantity"> & {
                  productVariant: Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                    product: Pick<StorefrontAPI.Product, "handle">;
                  };
                }
              >;
            };
            groupedBy: {
              nodes: Array<
                Pick<StorefrontAPI.ProductVariant, "id" | "title"> & {
                  product: Pick<StorefrontAPI.Product, "handle">;
                }
              >;
            };
          }
        >;
        isBundle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ProductVariant, "requiresComponents">>;
      }
    >;
  };
};

export type ArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars["String"]["input"];
  blogHandle: StorefrontAPI.Scalars["String"]["input"];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, "handle"> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Article, "handle" | "title" | "contentHtml" | "publishedAt"> & {
          author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, "name">>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, "id" | "altText" | "url" | "width" | "height">
          >;
          seo?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Seo, "description" | "title">>;
        }
      >;
    }
  >;
};

export type BlogQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars["String"]["input"];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  startCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
  endCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
}>;

export type BlogQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, "title" | "handle"> & {
      seo?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Seo, "title" | "description">>;
      articles: {
        nodes: Array<
          Pick<StorefrontAPI.Article, "contentHtml" | "handle" | "id" | "publishedAt" | "title"> & {
            author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, "name">>;
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, "id" | "altText" | "url" | "width" | "height">
            >;
            blog: Pick<StorefrontAPI.Blog, "handle">;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          "hasPreviousPage" | "hasNextPage" | "endCursor" | "startCursor"
        >;
      };
    }
  >;
};

export type ArticleItemFragment = Pick<
  StorefrontAPI.Article,
  "contentHtml" | "handle" | "id" | "publishedAt" | "title"
> & {
  author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, "name">>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, "id" | "altText" | "url" | "width" | "height">
  >;
  blog: Pick<StorefrontAPI.Blog, "handle">;
};

export type BlogsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  startCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
}>;

export type BlogsQuery = {
  blogs: {
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
    >;
    nodes: Array<
      Pick<StorefrontAPI.Blog, "title" | "handle"> & {
        seo?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Seo, "title" | "description">>;
      }
    >;
  };
};

export type MoneyCollectionItemFragment = Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;

export type CollectionItemFragment = Pick<StorefrontAPI.Product, "id" | "handle" | "title"> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, "id" | "altText" | "url" | "width" | "height">
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
  };
};

export type CatalogQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  startCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
  endCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
}>;

export type CatalogQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, "id" | "handle" | "title"> & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, "id" | "altText" | "url" | "width" | "height">
        >;
        priceRange: {
          minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
          maxVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
        };
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      "hasPreviousPage" | "hasNextPage" | "startCursor" | "endCursor"
    >;
  };
};

export type MoneyProductItemFragment = Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;

export type ProductItemFragmentFragment = Pick<
  StorefrontAPI.Product,
  "id" | "handle" | "title" | "vendor"
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, "id" | "altText" | "url" | "width" | "height">
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
  };
};

export type CollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars["String"]["input"];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  startCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
  endCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
}>;

export type CollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Collection, "id" | "handle" | "title" | "description"> & {
      products: {
        nodes: Array<
          Pick<StorefrontAPI.Product, "id" | "handle" | "title" | "vendor"> & {
            featuredImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, "id" | "altText" | "url" | "width" | "height">
            >;
            priceRange: {
              minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
              maxVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
            };
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          "hasPreviousPage" | "hasNextPage" | "endCursor" | "startCursor"
        >;
      };
    }
  >;
};

export type CollectionFragment = Pick<StorefrontAPI.Collection, "id" | "title" | "handle"> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
  >;
};

export type StoreCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  startCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
}>;

export type StoreCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, "id" | "title" | "handle"> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
    >;
  };
};

export type FeaturedCollectionFragment = Pick<
  StorefrontAPI.Collection,
  "id" | "title" | "handle"
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
  >;
};

export type FeaturedCollectionQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FeaturedCollectionQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, "id" | "title" | "handle"> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
        >;
      }
    >;
  };
};

export type RecommendedProductFragment = Pick<StorefrontAPI.Product, "id" | "title" | "handle"> & {
  priceRange: { minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode"> };
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
  >;
};

export type RecommendedProductsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type RecommendedProductsQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, "id" | "title" | "handle"> & {
        priceRange: { minVariantPrice: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode"> };
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, "id" | "url" | "altText" | "width" | "height">
        >;
      }
    >;
  };
};

export type PageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars["String"]["input"];
}>;

export type PageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, "handle" | "id" | "title" | "body"> & {
      seo?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Seo, "description" | "title">>;
    }
  >;
};

export type CartBuyerIdentityUpdateMutationVariables = StorefrontAPI.Exact<{
  cartId: StorefrontAPI.Scalars["ID"]["input"];
  buyerIdentity: StorefrontAPI.CartBuyerIdentityInput;
}>;

export type CartBuyerIdentityUpdateMutation = {
  cartBuyerIdentityUpdate?: StorefrontAPI.Maybe<{
    cart?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Cart, "id">>;
  }>;
};

export type PolicyFragment = Pick<
  StorefrontAPI.ShopPolicy,
  "body" | "handle" | "id" | "title" | "url"
>;

export type PolicyQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars["Boolean"]["input"];
  refundPolicy: StorefrontAPI.Scalars["Boolean"]["input"];
  shippingPolicy: StorefrontAPI.Scalars["Boolean"]["input"];
  termsOfService: StorefrontAPI.Scalars["Boolean"]["input"];
}>;

export type PolicyQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, "body" | "handle" | "id" | "title" | "url">
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, "body" | "handle" | "id" | "title" | "url">
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, "body" | "handle" | "id" | "title" | "url">
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, "body" | "handle" | "id" | "title" | "url">
    >;
  };
};

export type PolicyItemFragment = Pick<StorefrontAPI.ShopPolicy, "id" | "title" | "handle">;

export type PoliciesQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type PoliciesQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ShopPolicy, "id" | "title" | "handle">>;
    shippingPolicy?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ShopPolicy, "id" | "title" | "handle">>;
    termsOfService?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ShopPolicy, "id" | "title" | "handle">>;
    refundPolicy?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ShopPolicy, "id" | "title" | "handle">>;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, "id" | "title" | "handle">
    >;
  };
};

export type ProductVariantProductPageFragment = Pick<
  StorefrontAPI.ProductVariant,
  "availableForSale" | "id" | "sku" | "title"
> & {
  compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
  image?: StorefrontAPI.Maybe<
    { __typename: "Image" } & Pick<
      StorefrontAPI.Image,
      "id" | "url" | "altText" | "width" | "height"
    >
  >;
  price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
  product: Pick<StorefrontAPI.Product, "title" | "handle">;
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
  unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
};

export type ProductFragment = Pick<
  StorefrontAPI.Product,
  | "id"
  | "title"
  | "vendor"
  | "handle"
  | "descriptionHtml"
  | "description"
  | "encodedVariantExistence"
  | "encodedVariantAvailability"
> & {
  options: Array<
    Pick<StorefrontAPI.ProductOption, "name"> & {
      optionValues: Array<
        Pick<StorefrontAPI.ProductOptionValue, "name"> & {
          firstSelectableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, "availableForSale" | "id" | "sku" | "title"> & {
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
              >;
              image?: StorefrontAPI.Maybe<
                { __typename: "Image" } & Pick<
                  StorefrontAPI.Image,
                  "id" | "url" | "altText" | "width" | "height"
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
              product: Pick<StorefrontAPI.Product, "title" | "handle">;
              selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
              >;
            }
          >;
          swatch?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductOptionValueSwatch, "color"> & {
              image?: StorefrontAPI.Maybe<{
                previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "url">>;
              }>;
            }
          >;
        }
      >;
    }
  >;
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ProductVariant, "availableForSale" | "id" | "sku" | "title"> & {
      compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
      image?: StorefrontAPI.Maybe<
        { __typename: "Image" } & Pick<
          StorefrontAPI.Image,
          "id" | "url" | "altText" | "width" | "height"
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
      product: Pick<StorefrontAPI.Product, "title" | "handle">;
      selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
      unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
    }
  >;
  adjacentVariants: Array<
    Pick<StorefrontAPI.ProductVariant, "availableForSale" | "id" | "sku" | "title"> & {
      compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
      image?: StorefrontAPI.Maybe<
        { __typename: "Image" } & Pick<
          StorefrontAPI.Image,
          "id" | "url" | "altText" | "width" | "height"
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
      product: Pick<StorefrontAPI.Product, "title" | "handle">;
      selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
      unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
    }
  >;
  seo: Pick<StorefrontAPI.Seo, "description" | "title">;
  okendoStarRatingSnippet?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "value">>;
  okendoReviewsSnippet?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "value">>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars["String"]["input"];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  selectedOptions: Array<StorefrontAPI.SelectedOptionInput> | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | "id"
      | "title"
      | "vendor"
      | "handle"
      | "descriptionHtml"
      | "description"
      | "encodedVariantExistence"
      | "encodedVariantAvailability"
    > & {
      options: Array<
        Pick<StorefrontAPI.ProductOption, "name"> & {
          optionValues: Array<
            Pick<StorefrontAPI.ProductOptionValue, "name"> & {
              firstSelectableVariant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductVariant, "availableForSale" | "id" | "sku" | "title"> & {
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
                  >;
                  image?: StorefrontAPI.Maybe<
                    { __typename: "Image" } & Pick<
                      StorefrontAPI.Image,
                      "id" | "url" | "altText" | "width" | "height"
                    >
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
                  product: Pick<StorefrontAPI.Product, "title" | "handle">;
                  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
                  >;
                }
              >;
              swatch?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductOptionValueSwatch, "color"> & {
                  image?: StorefrontAPI.Maybe<{
                    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "url">>;
                  }>;
                }
              >;
            }
          >;
        }
      >;
      selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.ProductVariant, "availableForSale" | "id" | "sku" | "title"> & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
          >;
          image?: StorefrontAPI.Maybe<
            { __typename: "Image" } & Pick<
              StorefrontAPI.Image,
              "id" | "url" | "altText" | "width" | "height"
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
          product: Pick<StorefrontAPI.Product, "title" | "handle">;
          selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
          unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
        }
      >;
      adjacentVariants: Array<
        Pick<StorefrontAPI.ProductVariant, "availableForSale" | "id" | "sku" | "title"> & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
          >;
          image?: StorefrontAPI.Maybe<
            { __typename: "Image" } & Pick<
              StorefrontAPI.Image,
              "id" | "url" | "altText" | "width" | "height"
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
          product: Pick<StorefrontAPI.Product, "title" | "handle">;
          selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
          unitPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">>;
        }
      >;
      seo: Pick<StorefrontAPI.Seo, "description" | "title">;
      okendoStarRatingSnippet?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "value">>;
      okendoReviewsSnippet?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, "value">>;
    }
  >;
};

export type SearchProductFragment = { __typename: "Product" } & Pick<
  StorefrontAPI.Product,
  "handle" | "id" | "publishedAt" | "title" | "trackingParameters" | "vendor"
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, "id"> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, "url" | "altText" | "width" | "height">
        >;
        price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
        >;
        selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
        product: Pick<StorefrontAPI.Product, "handle" | "title">;
      }
    >;
  };

export type SearchPageFragment = { __typename: "Page" } & Pick<
  StorefrontAPI.Page,
  "handle" | "id" | "title" | "trackingParameters"
>;

export type SearchArticleFragment = { __typename: "Article" } & Pick<
  StorefrontAPI.Article,
  "handle" | "id" | "title" | "trackingParameters"
>;

export type PageInfoFragmentFragment = Pick<
  StorefrontAPI.PageInfo,
  "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
>;

export type RegularSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["Int"]["input"]>;
  term: StorefrontAPI.Scalars["String"]["input"];
  startCursor?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars["String"]["input"]>;
}>;

export type RegularSearchQuery = {
  articles: {
    nodes: Array<
      { __typename: "Article" } & Pick<
        StorefrontAPI.Article,
        "handle" | "id" | "title" | "trackingParameters"
      >
    >;
  };
  pages: {
    nodes: Array<
      { __typename: "Page" } & Pick<
        StorefrontAPI.Page,
        "handle" | "id" | "title" | "trackingParameters"
      >
    >;
  };
  products: {
    nodes: Array<
      { __typename: "Product" } & Pick<
        StorefrontAPI.Product,
        "handle" | "id" | "publishedAt" | "title" | "trackingParameters" | "vendor"
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, "id"> & {
              image?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Image, "url" | "altText" | "width" | "height">
              >;
              price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">
              >;
              selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, "name" | "value">>;
              product: Pick<StorefrontAPI.Product, "handle" | "title">;
            }
          >;
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
    >;
  };
};

export type PredictiveArticleFragment = { __typename: "Article" } & Pick<
  StorefrontAPI.Article,
  "id" | "title" | "handle" | "trackingParameters"
> & {
    blog: Pick<StorefrontAPI.Blog, "handle">;
    image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "url" | "altText" | "width" | "height">>;
  };

export type PredictiveCollectionFragment = { __typename: "Collection" } & Pick<
  StorefrontAPI.Collection,
  "id" | "title" | "handle" | "trackingParameters"
> & {
    image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, "url" | "altText" | "width" | "height">>;
  };

export type PredictivePageFragment = { __typename: "Page" } & Pick<
  StorefrontAPI.Page,
  "id" | "title" | "handle" | "trackingParameters"
>;

export type PredictiveProductFragment = { __typename: "Product" } & Pick<
  StorefrontAPI.Product,
  "id" | "title" | "handle" | "trackingParameters"
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, "id"> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, "url" | "altText" | "width" | "height">
        >;
        price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
      }
    >;
  };

export type PredictiveQueryFragment = { __typename: "SearchQuerySuggestion" } & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  "text" | "styledText" | "trackingParameters"
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars["Int"]["input"];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  term: StorefrontAPI.Scalars["String"]["input"];
  types?: StorefrontAPI.InputMaybe<
    Array<StorefrontAPI.PredictiveSearchType> | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    articles: Array<
      { __typename: "Article" } & Pick<
        StorefrontAPI.Article,
        "id" | "title" | "handle" | "trackingParameters"
      > & {
          blog: Pick<StorefrontAPI.Blog, "handle">;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, "url" | "altText" | "width" | "height">
          >;
        }
    >;
    collections: Array<
      { __typename: "Collection" } & Pick<
        StorefrontAPI.Collection,
        "id" | "title" | "handle" | "trackingParameters"
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, "url" | "altText" | "width" | "height">
          >;
        }
    >;
    pages: Array<
      { __typename: "Page" } & Pick<
        StorefrontAPI.Page,
        "id" | "title" | "handle" | "trackingParameters"
      >
    >;
    products: Array<
      { __typename: "Product" } & Pick<
        StorefrontAPI.Product,
        "id" | "title" | "handle" | "trackingParameters"
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, "id"> & {
              image?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Image, "url" | "altText" | "width" | "height">
              >;
              price: Pick<StorefrontAPI.MoneyV2, "amount" | "currencyCode">;
            }
          >;
        }
    >;
    queries: Array<
      { __typename: "SearchQuerySuggestion" } & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        "text" | "styledText" | "trackingParameters"
      >
    >;
  }>;
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = { shop: Pick<StorefrontAPI.Shop, "id"> };

interface GeneratedQueryTypes {
  "#graphql\n  query CustomerDetails($customerAccessToken: String!) {\n    customer(customerAccessToken: $customerAccessToken) {\n      ...CustomerDetails\n    }\n  }\n  #graphql\n  fragment OrderCard on Order {\n    id\n    name\n    processedAt\n    financialStatus\n    fulfillmentStatus\n    totalPrice {\n      amount\n      currencyCode\n    }\n    lineItems(first: 2) {\n      edges {\n        node {\n          title\n          variant {\n            image {\n              altText\n              height\n              url\n              width\n            }\n          }\n        }\n      }\n    }\n  }\n\n  fragment AddressPartial on MailingAddress {\n    id\n    formatted\n    firstName\n    lastName\n    company\n    address1\n    address2\n    province\n    country\n    city\n    zip\n    phone\n  }\n\n  fragment CustomerDetails on Customer {\n    firstName\n    lastName\n    phone\n    email\n    defaultAddress {\n      ...AddressPartial\n    }\n    addresses(first: 6) {\n      edges {\n        node {\n          ...AddressPartial\n        }\n      }\n    }\n    orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {\n      edges {\n        node {\n          ...OrderCard\n        }\n      }\n    }\n  }\n\n": {
    return: CustomerDetailsQuery;
    variables: CustomerDetailsQueryVariables;
  };
  "#graphql\n  fragment OrderMoney on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment DiscountApplication on DiscountApplication {\n    value {\n      __typename\n      ... on MoneyV2 {\n        ...OrderMoney\n      }\n      ... on PricingPercentageValue {\n        percentage\n      }\n    }\n  }\n  fragment OrderLineItemFull on OrderLineItem {\n    title\n    quantity\n    variant {\n      id\n      price {\n        ...OrderMoney\n      }\n      image {\n        altText\n        height\n        url\n        width\n      }\n    }\n    discountAllocations {\n      allocatedAmount {\n        ...OrderMoney\n      }\n      discountApplication {\n        ...DiscountApplication\n      }\n    }\n  }\n  fragment Order on Order {\n    id\n    name\n    statusUrl\n    processedAt\n    fulfillmentStatus\n    totalTax {\n      ...OrderMoney\n    }\n    totalPrice {\n      ...OrderMoney\n    }\n    shippingAddress {\n      name\n      formatted(withName: true)\n      formattedArea\n    }\n    discountApplications(first: 100) {\n      nodes {\n        ...DiscountApplication\n      }\n    }\n    lineItems(first: 100) {\n      nodes {\n        ...OrderLineItemFull\n      }\n    }\n  }\n  query Order($orderId: ID!) {\n    node(id: $orderId) {\n      ... on Order {\n        ...Order\n      }\n    }\n  }\n": {
    return: OrderQuery;
    variables: OrderQueryVariables;
  };
  "#graphql\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n        }\n      }\n    }\n  }\n  query Header(\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n    menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n": {
    return: HeaderQuery;
    variables: HeaderQueryVariables;
  };
  "#graphql\n  query Footer(\n    $country: CountryCode\n    $footerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n": {
    return: FooterQuery;
    variables: FooterQueryVariables;
  };
  '#graphql\n  query product(\n    $country: CountryCode\n    $language: LanguageCode\n    $handle: String!\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      id\n      title\n      vendor\n      handle\n      publishedAt\n      descriptionHtml\n      description\n      summary: description(truncateAt: 200)\n      encodedVariantExistence\n      encodedVariantAvailability\n      tags\n      featuredImage {\n        id\n        url\n        altText\n      }\n      priceRange {\n        minVariantPrice {\n          amount\n          currencyCode\n        }\n        maxVariantPrice {\n          amount\n          currencyCode\n        }\n      }\n      badges: metafields(identifiers: [\n        { namespace: "custom", key: "best_seller" }\n      ]) {\n        key\n        namespace\n        value\n      }\n      options {\n        ...ProductOption\n      }\n      selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n        ...ProductVariant\n      }\n      adjacentVariants(selectedOptions: $selectedOptions) {\n        ...ProductVariant\n      }\n      # Check if the product is a bundle\n      isBundle: selectedOrFirstAvailableVariant(ignoreUnknownOptions: true, selectedOptions: { name: "", value: ""}) {\n        ...on ProductVariant {\n          requiresComponents\n          components(first: 100) {\n             nodes {\n                productVariant {\n                  ...ProductVariant\n                }\n                quantity\n             }\n          }\n          groupedBy(first: 100) {\n            nodes {\n                id\n              }\n            }\n          }\n      }\n      media(first: 50) {\n        nodes {\n          ...Media\n        }\n      }\n      seo {\n        description\n        title\n      }\n    }\n    shop {\n      name\n      primaryDomain {\n        url\n      }\n      shippingPolicy {\n        body\n        handle\n      }\n      refundPolicy {\n        body\n        handle\n      }\n    }\n  }\n  #graphql\n  fragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      id\n      url\n      altText\n      width\n      height\n    }\n    ... on MediaImage {\n      id\n      image {\n        id\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n\n  #graphql\n  fragment ProductOption on ProductOption {\n    name\n    optionValues {\n      name\n      firstSelectableVariant {\n        ...ProductVariant\n      }\n      swatch {\n        color\n        image {\n          previewImage {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment ProductVariantProductPage on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n  }\n\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  "#graphql\n  query LocalizationOptions {\n    localization {\n      availableCountries {\n        isoCode\n        name\n        defaultLanguage{\n          isoCode\n          name\n          endonymName\n        }\n        availableLanguages{\n          isoCode\n          name\n          endonymName\n        }\n        currency {\n          isoCode\n          symbol\n        }\n      }\n    }\n  }\n": {
    return: LocalizationOptionsQuery;
    variables: LocalizationOptionsQueryVariables;
  };
  '#graphql\n  query ApiAllProducts(\n    $query: String\n    $count: Int\n    $reverse: Boolean\n    $country: CountryCode\n    $language: LanguageCode\n    $sortKey: ProductSortKeys\n  ) @inContext(country: $country, language: $language) {\n    products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n  #graphql\n  fragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    tags\n    images(first: 50) {\n      nodes {\n        id\n        url\n        altText\n        width\n        height\n      }\n    }\n    options {\n      ...ProductOption\n    }\n    badges: metafields(identifiers: [\n      { namespace: "custom", key: "best_seller" }\n    ]) {\n      key\n      namespace\n      value\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      ...ProductVariant\n    }\n    # Check if the product is a bundle\n    isBundle: selectedOrFirstAvailableVariant(ignoreUnknownOptions: true, selectedOptions: { name: "", value: ""}) {\n      ...on ProductVariant {\n        requiresComponents\n      }\n    }\n  }\n  #graphql\n  fragment ProductOption on ProductOption {\n    name\n    optionValues {\n      name\n      firstSelectableVariant {\n        ...ProductVariant\n      }\n      swatch {\n        color\n        image {\n          previewImage {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment ProductVariantProductPage on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n  }\n\n\n\n': {
    return: ApiAllProductsQuery;
    variables: ApiAllProductsQueryVariables;
  };
  "#graphql\n  query Article(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      handle\n      articleByHandle(handle: $articleHandle) {\n        handle\n        title\n        contentHtml\n        publishedAt\n        author: authorV2 {\n          name\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n      }\n    }\n  }\n": {
    return: ArticleQuery;
    variables: ArticleQueryVariables;
  };
  "#graphql\n  query Blog(\n    $language: LanguageCode\n    $blogHandle: String!\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(language: $language) {\n    blog(handle: $blogHandle) {\n      title\n      handle\n      seo {\n        title\n        description\n      }\n      articles(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ArticleItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n\n      }\n    }\n  }\n  fragment ArticleItem on Article {\n    author: authorV2 {\n      name\n    }\n    contentHtml\n    handle\n    id\n    image {\n      id\n      altText\n      url\n      width\n      height\n    }\n    publishedAt\n    title\n    blog {\n      handle\n    }\n  }\n": {
    return: BlogQuery;
    variables: BlogQueryVariables;
  };
  "#graphql\n  query Blogs(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    blogs(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      nodes {\n        title\n        handle\n        seo {\n          title\n          description\n        }\n      }\n    }\n  }\n": {
    return: BlogsQuery;
    variables: BlogsQueryVariables;
  };
  "#graphql\n  query Catalog(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      nodes {\n        ...CollectionItem\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment MoneyCollectionItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment CollectionItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n  }\n\n": {
    return: CatalogQuery;
    variables: CatalogQueryVariables;
  };
  "#graphql\n  #graphql\n  fragment MoneyProductItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductItemFragment on Product {\n    id\n    handle\n    title\n    vendor\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductItem\n      }\n      maxVariantPrice {\n        ...MoneyProductItem\n      }\n    }\n\n  }\n\n  query Collection(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      products(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ProductItemFragment\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n      }\n    }\n  }\n": {
    return: CollectionQuery;
    variables: CollectionQueryVariables;
  };
  "#graphql\n  fragment Collection on Collection {\n    id\n    title\n    handle\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n  }\n  query StoreCollections(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...Collection\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": {
    return: StoreCollectionsQuery;
    variables: StoreCollectionsQueryVariables;
  };
  "#graphql\n  fragment FeaturedCollection on Collection {\n    id\n    title\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n    handle\n  }\n  query FeaturedCollection($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {\n      nodes {\n        ...FeaturedCollection\n      }\n    }\n  }\n": {
    return: FeaturedCollectionQuery;
    variables: FeaturedCollectionQueryVariables;
  };
  "#graphql\n  fragment RecommendedProduct on Product {\n    id\n    title\n    handle\n    priceRange {\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    featuredImage {\n      id\n      url\n      altText\n      width\n      height\n    }\n    \n  }\n  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    products(first: 4, sortKey: UPDATED_AT, reverse: true) {\n      nodes {\n        ...RecommendedProduct\n      }\n    }\n  }\n": {
    return: RecommendedProductsQuery;
    variables: RecommendedProductsQueryVariables;
  };
  "#graphql\n  query Page(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      handle\n      id\n      title\n      body\n      seo {\n        description\n        title\n      }\n    }\n  }\n": {
    return: PageQuery;
    variables: PageQueryVariables;
  };
  "#graphql\n  fragment Policy on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n  }\n  query Policy(\n    $country: CountryCode\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $refundPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      privacyPolicy @include(if: $privacyPolicy) {\n        ...Policy\n      }\n      shippingPolicy @include(if: $shippingPolicy) {\n        ...Policy\n      }\n      termsOfService @include(if: $termsOfService) {\n        ...Policy\n      }\n      refundPolicy @include(if: $refundPolicy) {\n        ...Policy\n      }\n    }\n  }\n": {
    return: PolicyQuery;
    variables: PolicyQueryVariables;
  };
  "#graphql\n  fragment PolicyItem on ShopPolicy {\n    id\n    title\n    handle\n  }\n  query Policies ($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    shop {\n      privacyPolicy {\n        ...PolicyItem\n      }\n      shippingPolicy {\n        ...PolicyItem\n      }\n      termsOfService {\n        ...PolicyItem\n      }\n      refundPolicy {\n        ...PolicyItem\n      }\n      subscriptionPolicy {\n        id\n        title\n        handle\n      }\n    }\n  }\n": {
    return: PoliciesQuery;
    variables: PoliciesQueryVariables;
  };
  '#graphql\n  #graphql\n  #graphql\n  fragment OkendoStarRatingSnippet on Product {\n    okendoStarRatingSnippet: metafield(\n      namespace: "app--1576377--reviews"\n      key: "star_rating_snippet"\n    ) {\n      value\n    }\n  }\n\n  #graphql\n  fragment OkendoReviewsSnippet on Product {\n    okendoReviewsSnippet: metafield(\n      namespace: "app--1576377--reviews"\n      key: "reviews_widget_snippet"\n    ) {\n      value\n    }\n  }\n\n  fragment Product on Product {\n    id\n    title\n    vendor\n    handle\n    descriptionHtml\n    description\n    encodedVariantExistence\n    encodedVariantAvailability\n    options {\n      name\n      optionValues {\n        name\n        firstSelectableVariant {\n          ...ProductVariantProductPage\n        }\n        swatch {\n          color\n          image {\n            previewImage {\n              url\n            }\n          }\n        }\n      }\n    }\n    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n      ...ProductVariantProductPage\n    }\n    adjacentVariants (selectedOptions: $selectedOptions) {\n      ...ProductVariantProductPage\n    }\n    seo {\n      description\n      title\n    }\n    ...OkendoStarRatingSnippet\n    ...OkendoReviewsSnippet\n  }\n  #graphql\n  fragment ProductVariantProductPage on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n  }\n\n\n  query Product(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  "#graphql\n  query RegularSearch(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $term: String!\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    articles: search(\n      query: $term,\n      types: [ARTICLE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Article {\n          ...SearchArticle\n        }\n      }\n    }\n    pages: search(\n      query: $term,\n      types: [PAGE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Page {\n          ...SearchPage\n        }\n      }\n    }\n    products: search(\n      after: $endCursor,\n      before: $startCursor,\n      first: $first,\n      last: $last,\n      query: $term,\n      sortKey: RELEVANCE,\n      types: [PRODUCT],\n      unavailableProducts: HIDE,\n    ) {\n      nodes {\n        ...on Product {\n          ...SearchProduct\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  #graphql\n  fragment SearchProduct on Product {\n    __typename\n    handle\n    id\n    publishedAt\n    title\n    trackingParameters\n    vendor\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n      compareAtPrice {\n        amount\n        currencyCode\n      }\n      selectedOptions {\n        name\n        value\n      }\n      product {\n        handle\n        title\n      }\n    }\n  }\n\n  #graphql\n  fragment SearchPage on Page {\n     __typename\n     handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment SearchArticle on Article {\n    __typename\n    handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment PageInfoFragment on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n\n": {
    return: RegularSearchQuery;
    variables: RegularSearchQueryVariables;
  };
  "#graphql\n  query PredictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $term: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $term,\n      types: $types,\n    ) {\n      articles {\n        ...PredictiveArticle\n      }\n      collections {\n        ...PredictiveCollection\n      }\n      pages {\n        ...PredictivePage\n      }\n      products {\n        ...PredictiveProduct\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n  fragment PredictiveArticle on Article {\n    __typename\n    id\n    title\n    handle\n    blog {\n      handle\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveProduct on Product {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n    }\n  }\n\n  #graphql\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n\n": {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
  "#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n": {
    return: StoreRobotsQuery;
    variables: StoreRobotsQueryVariables;
  };
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation customerAddressUpdate(\n    $address: MailingAddressInput!\n    $customerAccessToken: String!\n    $id: ID!\n ) {\n    customerAddressUpdate(\n      address: $address\n      customerAccessToken: $customerAccessToken\n      id: $id\n    ) {\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {
    return: CustomerAddressUpdateMutation;
    variables: CustomerAddressUpdateMutationVariables;
  };
  "#graphql\n  mutation customerAddressDelete(\n    $customerAccessToken: String!\n    $id: ID!\n  ) {\n    customerAddressDelete(\n      customerAccessToken: $customerAccessToken\n      id: $id\n    ) {\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {
    return: CustomerAddressDeleteMutation;
    variables: CustomerAddressDeleteMutationVariables;
  };
  "#graphql\n  mutation customerAddressCreate(\n    $address: MailingAddressInput!\n    $customerAccessToken: String!\n  ) {\n    customerAddressCreate(\n      address: $address\n      customerAccessToken: $customerAccessToken\n    ) {\n      customerAddress {\n        id\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {
    return: CustomerAddressCreateMutation;
    variables: CustomerAddressCreateMutationVariables;
  };
  "#graphql\nmutation customerUpdate(\n  $customer: CustomerUpdateInput!\n  $customerAccessToken: String!\n) {\n  customerUpdate(\n    customer: $customer\n    customerAccessToken: $customerAccessToken\n  ) {\n    userErrors {\n      field\n      message\n    }\n  }\n}\n": {
    return: CustomerUpdateMutation;
    variables: CustomerUpdateMutationVariables;
  };
  "#graphql\n  mutation CartBuyerIdentityUpdate(\n    $cartId: ID!\n    $buyerIdentity: CartBuyerIdentityInput!\n  ) {\n    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {\n      cart {\n        id\n      }\n    }\n  }\n": {
    return: CartBuyerIdentityUpdateMutation;
    variables: CartBuyerIdentityUpdateMutationVariables;
  };
}

declare module "@shopify/hydrogen" {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}

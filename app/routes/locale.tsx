import type {
  Cart,
  CartBuyerIdentityInput,
  CountryCode,
  LanguageCode,
} from "@shopify/hydrogen/storefront-api-types";
import { type ActionFunction, type AppLoadContext, redirect } from "react-router";
import invariant from "tiny-invariant";
import { LOCALIZATION_OPTIONS_QUERY } from "~/graphql/queries";
import { getCountries } from "~/lib/get-countries";

export const action: ActionFunction = async ({ request, context }) => {
  const { session, storefront } = context;
  const formData = await request.formData();

  // Make sure the form request is valid
  const languageCode = formData.get("language") as LanguageCode;
  invariant(languageCode, "Missing language");

  const countryCode = formData.get("country") as CountryCode;
  invariant(countryCode, "Missing country");

  // Determine where to redirect to relative to where user navigated from
  // ie. hydrogen.shop/collections -> ca.hydrogen.shop/collections
  const path = formData.get("path");

  const localizationResponse = await storefront.query(LOCALIZATION_OPTIONS_QUERY, {
    cache: storefront.CacheLong(),
  });

  const countries = getCountries(localizationResponse.localization.availableCountries);
  const toLocale = countries[`${countryCode}-${languageCode}`.toLowerCase()];

  const cartId = await session.get("cartId");

  // Update cart buyer's country code if there is a cart id
  if (cartId) {
    await updateCartBuyerIdentity(context, {
      cartId,
      buyerIdentity: {
        countryCode,
      },
    });
  }

  const { PUBLIC_ENVIRONMENT } = context.env;

  const isDev = PUBLIC_ENVIRONMENT === "development";

  const redirectUrl = new URL(
    `${toLocale.pathPrefix || ""}${path}`,
    `http${isDev ? "" : "s"}://${toLocale.host}`,
  ).toString();

  return redirect(redirectUrl, 302);
};

async function updateCartBuyerIdentity(
  { storefront }: AppLoadContext,
  {
    cartId,
    buyerIdentity,
  }: {
    cartId: string;
    buyerIdentity: CartBuyerIdentityInput;
  },
) {
  const data = await storefront.mutate<{
    cartBuyerIdentityUpdate: { cart: Cart };
  }>(UPDATE_CART_BUYER_COUNTRY, {
    variables: {
      cartId,
      buyerIdentity,
    },
  });

  invariant(data, "No data returned from Shopify API");

  return data.cartBuyerIdentityUpdate.cart;
}

const UPDATE_CART_BUYER_COUNTRY = `#graphql
  mutation CartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
  ) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
      }
    }
  }
`;

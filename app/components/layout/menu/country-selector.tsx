import { Form, useLocation, useRouteLoaderData } from "react-router";
import type { Locale } from "~/data/countries";
import type { RootLoader } from "~/root";
import { CartForm } from "@shopify/hydrogen";
import { DynamicFlag } from "@sankyu/react-circle-flags";

export function CountrySelector() {
  const root = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = root?.selectedLocale as Locale;
  const countries = root?.countries || {};
  const { pathname, search } = useLocation();

  if (!selectedLocale || Object.keys(countries).length === 0) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
      {Object.values(countries).map((locale) => {
        const redirectTo = `https://${locale.host}${pathname}${search}`;
        const isSelected = locale.country === selectedLocale.country;

        return (
          <Form
            key={locale.country}
            method="post"
            action="/cart"
            className="bg-muted py-3 px-4 flex items-center hover:bg-muted/80 cursor-pointer"
          >
            <input
              type="hidden"
              name={CartForm.INPUT_NAME}
              value={JSON.stringify({
                action: CartForm.ACTIONS.BuyerIdentityUpdate,
                inputs: {
                  buyerIdentity: {
                    countryCode: locale.country,
                  },
                },
              })}
            />

            <input type="hidden" name="redirectTo" value={redirectTo} />

            <div className="w-6 overflow-hidden h-6 rounded-full flex justify-center items-center mr-2">
              <DynamicFlag code={locale.country} />
            </div>

            <button type="submit" disabled={isSelected}>
              {locale.label}
            </button>
          </Form>
        );
      })}
    </div>
  );
}

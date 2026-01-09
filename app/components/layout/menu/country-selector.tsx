import { Form, useLocation, useRouteLoaderData } from "react-router";
import type { Locale } from "~/data/countries";
import type { RootLoader } from "~/root";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { CartForm } from "@shopify/hydrogen";

export function CountrySelector() {
  const root = useRouteLoaderData<RootLoader>("root");
  const selectedLocale = root?.selectedLocale as Locale;
  const countries = root?.countries || {};
  const { pathname, search } = useLocation();

  if (!selectedLocale || Object.keys(countries).length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">{selectedLocale.label}</Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-auto border-t py-2 bg-contrast w-full max-h-36">
        {Object.values(countries).map((locale) => {
          const redirectTo = `https://${locale.host}${pathname}${search}`;
          const isSelected = locale.country === selectedLocale.country;

          return (
            <Form key={locale.country} method="post" action="/cart">
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
              <button type="submit" disabled={isSelected}>
                {locale.label}
              </button>
            </Form>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

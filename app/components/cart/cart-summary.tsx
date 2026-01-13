import { CartForm, Money, type OptimisticCart } from "@shopify/hydrogen";
import { useEffect, useRef } from "react";
import type { FetcherWithComponents } from "react-router";
import { useFetcher } from "react-router";
import type { CartApiQueryFragment } from "storefrontapi.generated";
import type { CartLayout } from "~/components/cart/cart-main";

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
};

export function CartSummary({ cart }: CartSummaryProps) {
  const className = "bg-gray-50 rounded-lg p-4 mt-4";

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <h4 className="text-lg font-semibold mb-4">Totals</h4>
      <dl className="flex justify-between items-center mb-4">
        <dt className="text-gray-600">Subtotal</dt>
        <dd>
          {cart?.cost?.subtotalAmount?.amount ? <Money data={cart?.cost?.subtotalAmount} /> : "-"}
        </dd>
      </dl>
      <CartDiscounts discountCodes={cart?.discountCodes} />
      <CartGiftCard giftCardCodes={cart?.appliedGiftCards} />
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

function CartCheckoutActions({ checkoutUrl }: { checkoutUrl?: string }) {
  if (!checkoutUrl) return null;

  return (
    <div className="mt-6">
      <a
        href={checkoutUrl}
        target="_self"
        className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Continue to Checkout →
      </a>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment["discountCodes"];
}) {
  const codes: string[] =
    discountCodes?.filter((discount) => discount.applicable)?.map(({ code }) => code) || [];

  return (
    <div className="mb-4">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="mb-4">
        <div className="flex justify-between items-start">
          <dt className="text-gray-600">Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="flex items-center gap-2">
              <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                {codes?.join(", ")}
              </code>
              <button
                type="submit"
                className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
              >
                Remove
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex gap-2">
          <input
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment["appliedGiftCards"] | undefined;
}) {
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const giftCardAddFetcher = useFetcher({ key: "gift-card-add" });

  // Clear the gift card code input after the gift card is added
  useEffect(() => {
    if (giftCardAddFetcher.data) {
      giftCardCodeInput.current!.value = "";
    }
  }, [giftCardAddFetcher.data]);

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, ""); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
  }

  return (
    <div className="mb-4">
      {/* Display applied gift cards with individual remove buttons */}
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl className="mb-4">
          <dt className="text-gray-600 mb-2">Applied Gift Card(s)</dt>
          {giftCardCodes.map((giftCard) => (
            <RemoveGiftCardForm key={giftCard.id} giftCardId={giftCard.id}>
              <div className="flex items-center justify-between bg-purple-50 rounded-lg px-3 py-2 mb-2">
                <div className="flex items-center gap-2">
                  <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                    ***{giftCard.lastCharacters}
                  </code>
                  <Money data={giftCard.amountUsed} />
                </div>
                <button
                  type="submit"
                  className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            </RemoveGiftCardForm>
          ))}
        </dl>
      )}

      {/* Show an input to apply a gift card */}
      <UpdateGiftCardForm
        giftCardCodes={appliedGiftCardCodes.current}
        saveAppliedCode={saveAppliedCode}
        fetcherKey="gift-card-add"
      >
        <div className="flex gap-2">
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={giftCardAddFetcher.state !== "idle"}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply
          </button>
        </div>
      </UpdateGiftCardForm>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  fetcherKey,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get("giftCardCode");
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  children,
}: {
  giftCardId: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
    </CartForm>
  );
}

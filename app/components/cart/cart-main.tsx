import { useOptimisticCart } from "@shopify/hydrogen";
import { Link } from "react-router";
import type { CartApiQueryFragment } from "storefrontapi.generated";

import { CartLineItem } from "~/components/cart/cart-line-item";
import { CartSummary } from "./cart-summary";

export type CartLayout = "page" | "aside";

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({ cart: originalCart }: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart && Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className="w-full">
      <CartEmpty hidden={linesCount} />
      <div className="cart-details">
        <div aria-labelledby="cart-lines">
          <ul className="divide-y divide-gray-200">
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} />}
      </div>
    </div>
  );
}

function CartEmpty({ hidden = false }: { hidden: boolean }) {
  if (hidden) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-lg text-gray-600">Your cart is empty.</p>
      <p className="mt-4">
        <Link
          to="/collections"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Start Shopping →
        </Link>
      </p>
    </div>
  );
}

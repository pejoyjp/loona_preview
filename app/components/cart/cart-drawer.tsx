import { Suspense } from "react";
import { Await } from "react-router";
import type { CartApiQueryFragment } from "storefrontapi.generated";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { CartMain } from "./cart-main";

interface CartDrawerProps {
  cart: Promise<CartApiQueryFragment | null>;
}

export function CartDrawer({ cart }: CartDrawerProps) {
  const { open, setOpen } = useCartStore();

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerContent className="flex flex-col h-dvh">
        <DrawerHeader className="shrink-0">
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription>Review your items before checkout</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <Suspense fallback={<div>Loading cart...</div>}>
            <Await resolve={cart}>{(cart) => <CartMain cart={cart} />}</Await>
          </Suspense>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

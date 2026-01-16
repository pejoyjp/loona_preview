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
import { CartMain } from "../cart/cart-main";

interface CartDrawerProps {
  cart: Promise<CartApiQueryFragment | null>;
}

export function CartDrawer({ cart }: CartDrawerProps) {
  const { open, setOpen } = useCartStore();

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription>Review your items before checkout</DrawerDescription>
        </DrawerHeader>
        <div>
          <Suspense fallback={<div>Loading cart...</div>}>
            <Await resolve={cart}>{(cart) => <CartMain cart={cart} />}</Await>
          </Suspense>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

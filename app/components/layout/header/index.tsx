import { useAnalytics, useOptimisticCart } from "@shopify/hydrogen";
import { MenuIcon, ShoppingBagIcon, Menu, CircleUserRound } from "lucide-react";
import { startTransition, Suspense, useState } from "react";
import { Await, NavLink, useAsyncValue, type LoaderFunctionArgs } from "react-router";
import type { HeaderQuery } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { useMobileMenuDrawerStore } from "~/hooks/store/use-mobile-menu-store";
import { MobileMenuDrawer } from "./mobile-menu-drawer";
import { CountrySelectorModal } from "../../modal/country-selector-modal";
import { HeaderMenu } from "../menu/menu";
import { HamburgerButton, Shopping, Me, Search } from "@icon-park/react";
import type { CartApiQueryFragment } from "storefrontapi.generated";
import { SearchButton } from "./search-button";

interface HeaderProps {
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  cart: Promise<CartApiQueryFragment | null>;
}

export function Header({ header, isLoggedIn, publicStoreDomain, cart }: HeaderProps) {
  const { shop, menu } = header;

  const { setOpen: setMobileMenuOpen } = useMobileMenuDrawerStore();

  // const optimisticCart = useOptimisticCart(cart);

  return (
    <>
      <header className="flex flex-col ">
        {/* <NavLink className="text-center" prefetch="intent" to="/" end>
          <strong>{shop.name}</strong>
        </NavLink> */}
        <div className="h-14 flex items-center justify-between px-4 sm:px-8 flex-none relative">
          {/* <Menu
            // size={24}
            onClick={() => setMobileMenuOpen(true)}
            className=" block sm:hidden  w-6 h-6"
          /> */}
          <MobileMenuDrawer />

          <HeaderMenu
            menu={menu}
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
          <div className="flex items-center justify-center ">
            <div className="flex items-center justify-center space-x-2  sm:space-x-6 sm:mr-6 ">
              <SearchButton />
              <NavLink to="/account" prefetch="intent">
                <CircleUserRound className="header-btn text-foreground" strokeWidth={1} />
              </NavLink>
              <CartBadge cart={cart} />
            </div>
            <CountrySelectorModal />
          </div>

          {/* <MobileMenuDrawer /> */}
        </div>

        {/* <MenuIcon
          onClick={() => setMobileMenuOpen(true)}
          className="block lg:hidden"
        /> */}
      </header>

      {/* <MobileMenu
        menu={menu}
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      /> */}
    </>
  );
}

export function CartBadge({ cart }: { cart: Promise<CartApiQueryFragment | null> }) {
  const { setOpen: setCartOpen } = useCartStore();
  return (
    <div className="w-6 h-6 flex flex-col relative">
      {" "}
      <ShoppingBagIcon
        className="text-foreground cursor-pointer w-6 h-6"
        strokeWidth={1}
        onClick={() => {
          startTransition(() => {
            setCartOpen(true);
          });
        }}
      />
      <Suspense fallback={null}>
        <Await resolve={cart}>
          {(cart) =>
            (cart?.totalQuantity ?? 0) > 0 && (
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cart?.totalQuantity}
              </div>
            )
          }
        </Await>
      </Suspense>
    </div>
  );
}

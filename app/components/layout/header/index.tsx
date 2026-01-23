import { useAnalytics, useOptimisticCart } from "@shopify/hydrogen";
import { MenuIcon, ShoppingBagIcon, Menu } from "lucide-react";
import { startTransition, Suspense, useEffect, useState } from "react";
import { Await, NavLink, useAsyncValue, type LoaderFunctionArgs } from "react-router";
import type { HeaderQuery } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { useMobileMenuDrawerStore } from "~/hooks/store/use-mobile-menu-store";
import { MobileMenuDrawer } from "./mobile-menu-drawer";
import { CountrySelectorModal } from "../../modal/country-selector-modal";
import { HeaderMenu } from "../menu/menu";
import { HamburgerButton, Shopping, Me, Search } from "@icon-park/react";
import type { CartApiQueryFragment } from "storefrontapi.generated";
import { SeachButton } from "./search-button";

interface HeaderProps {
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  cart: Promise<CartApiQueryFragment | null>;
}

export function Header({ header, isLoggedIn, publicStoreDomain, cart }: HeaderProps) {
  const { shop, menu } = header;

  const { setOpen: setMobileMenuOpen } = useMobileMenuDrawerStore();
  // useEffect(() => {
  //   (window as any).omnisend = (window as any).omnisend || [];
  //   (window as any).omnisend.push(["brandID", "6805f076aae9d7bc6fdc2d8f"]);
  //   (window as any).omnisend.push(["track", "$pageViewed"]);
  //   (function () {
  //     var e = document.createElement("script");
  //     ((e.type = "text/javascript"),
  //       (e.async = !0),
  //       (e.src = "https://omnisnippet1.com/inshop/launcher-v2.js"));
  //     var t = document.getElementsByTagName("script")[0];
  //     t.parentNode.insertBefore(e, t);
  //   })();
  // }, []);

  // const optimisticCart = useOptimisticCart(cart);
  // 6805f076aae9d7bc6fdc2d8f-utBoZkdnEkeyCA3Ses3tG16YE9O2Sjm5k7hyxlZHz2LHX0k142
  return (
    <>
      {/* <div
        id="omnisend-embedded-v2-6971ebb973065ef99f63bf3a"
        className="text-sm bg-amber-300"
        /> */}
      <header className="flex flex-col ">
        <NavLink className="text-center" prefetch="intent" to="/" end>
          <strong>{shop.name}</strong>
        </NavLink>
        <div className="flex items-center justify-between px-4 sm:px-8 flex-none">
          <Menu
            // size={24}
            onClick={() => setMobileMenuOpen(true)}
            className=" block sm:hidden  w-6 h-6"
          />

          <HeaderMenu
            menu={menu}
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
          <div className="flex items-center justify-center gap-2 sm:gap-6 flex-none">
            <SeachButton />

            <NavLink to="/account" prefetch="intent">
              <Me className="header-btn text-foreground" strokeWidth={1}></Me>
            </NavLink>
            <CartBadge cart={cart} />
            <CountrySelectorModal />
          </div>
          <MobileMenuDrawer
            menu={menu}
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
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

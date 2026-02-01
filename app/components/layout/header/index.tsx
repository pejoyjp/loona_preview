import { useAnalytics, useOptimisticCart } from "@shopify/hydrogen";
import { MenuIcon, ShoppingBagIcon, Menu, CircleUserRound } from "lucide-react";
import { startTransition, Suspense, useState, useEffect } from "react";
import { Await, NavLink, useAsyncValue, type LoaderFunctionArgs } from "react-router";
import type { HeaderQuery } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { useViewportStore } from "~/hooks/store/use-viewport-store";
import { useViewport } from "~/hooks/use-viewport";
import { MobileMenuDrawer } from "./mobile-menu-drawer";
import { CountrySelectorModal } from "../../modal/country-selector-modal";
import { HeaderMenu } from "../menu/menu";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { isMobile, isDesktop, canRender } = useViewport({
    onExitMobile: () => setMobileMenuOpen(false),
  });
  const setIsMobile = useViewportStore((state) => state.setIsMobile);
  const setIsDesktop = useViewportStore((state) => state.setIsDesktop);
  const setCanRender = useViewportStore((state) => state.setCanRender);

  useEffect(() => {
    setIsMobile(isMobile);
    setIsDesktop(isDesktop);
    setCanRender(canRender);
  }, [isMobile, isDesktop, canRender, setIsMobile, setIsDesktop, setCanRender]);

  return (
    <>
      {/* <div
        id="omnisend-embedded-v2-6971ebb973065ef99f63bf3a"
        className="text-sm bg-amber-300"
        /> */}
      <header className="flex flex-col" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>
        {/* <NavLink className="text-center" prefetch="intent" to="/" end>
          <strong>{shop.name}</strong>
        </NavLink> */}
        <div className="h-14 flex items-center justify-between px-4 sm:px-8 flex-none relative">
          <Menu
            strokeWidth={1}
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(true);
            }}
            className="sm:hidden header-btn"
          />
          <HeaderMenu
            menu={menu}
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center space-x-2  sm:space-x-6 sm:mr-6 ">
              <SearchButton />
              <NavLink to="/account" prefetch="intent">
                <CircleUserRound className="header-btn text-foreground" strokeWidth={1} />
              </NavLink>
              <CartBadge cart={cart} />
            </div>
            <CountrySelectorModal />
          </div>
        </div>
        <MobileMenuDrawer mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      </header>
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

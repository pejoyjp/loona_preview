import { useAnalytics, useOptimisticCart } from "@shopify/hydrogen";
import { MenuIcon, ShoppingBagIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { Await, NavLink, useAsyncValue } from "react-router";
import type { HeaderQuery } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { useMobileMenuDrawerStore } from "~/hooks/store/use-mobile-menu-store";
import { MobileMenuDrawer } from "../drawer/mobile-menu-drawer";
import { CountrySelector } from "./menu/country-selector";
import { HeaderMenu } from "./menu/menu";

interface HeaderProps {
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export function Header({ header, isLoggedIn, publicStoreDomain }: HeaderProps) {
  const { shop, menu } = header;
  const { setOpen: setCartOpen } = useCartStore();
  const { setOpen: setMobileMenuOpen } = useMobileMenuDrawerStore();

  return (
    <>
      <header className="flex items-center justify-center gap-6">
        <NavLink prefetch="intent" to="/" end>
          <strong>{shop.name}</strong>
        </NavLink>
        <HeaderMenu
          menu={menu}
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        <MobileMenuDrawer
          menu={menu}
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />

        <ShoppingBagIcon onClick={() => setCartOpen(true)} />
        <MenuIcon onClick={() => setMobileMenuOpen(true)} className="block lg:hidden" />
        <CountrySelector />
      </header>

      {/* <MobileMenu
        menu={menu}
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      /> */}
    </>
  );
}

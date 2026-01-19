import { useAnalytics, useOptimisticCart } from "@shopify/hydrogen";
import { MenuIcon, ShoppingBagIcon, Menu } from "lucide-react";
import { Suspense, useState } from "react";
import { Await, NavLink, useAsyncValue } from "react-router";
import type { HeaderQuery } from "storefrontapi.generated";
import { useCartStore } from "~/hooks/store/use-cart-store";
import { useMobileMenuDrawerStore } from "~/hooks/store/use-mobile-menu-store";
import { MobileMenuDrawer } from "../drawer/mobile-menu-drawer";
import { CountrySelectorModal } from "../modal/country-selector-modal";
import { HeaderMenu } from "./menu/menu";
import { HamburgerButton, Shopping, Me, Search } from "@icon-park/react";

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
            <Search className="header-btn cursor-pointer"></Search>

            <NavLink to="/account" prefetch="intent">
              <Me className="header-btn"></Me>
            </NavLink>

            <ShoppingBagIcon onClick={() => setCartOpen(true)} />
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

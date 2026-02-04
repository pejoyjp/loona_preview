import { NavLink } from "react-router";
import type { CartApiQueryFragment, HeaderQuery } from "storefrontapi.generated";

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: HeaderQuery["menu"];
  primaryDomainUrl: HeaderQuery["shop"]["primaryDomain"]["url"];
  publicStoreDomain: HeaderProps["publicStoreDomain"];
}) {
  const FALLBACK_HEADER_MENU = {
    id: "gid://shopify/Menu/199655587896",
    items: [
      {
        id: "gid://shopify/MenuItem/461609500728",
        resourceId: null,
        tags: [],
        title: "Collections",
        type: "HTTP",
        url: "/collections",
        items: [],
      },
      {
        id: "gid://shopify/MenuItem/461609533496",
        resourceId: null,
        tags: [],
        title: "Blog",
        type: "HTTP",
        url: "/blogs/journal",
        items: [],
      },
      {
        id: "gid://shopify/MenuItem/461609566264",
        resourceId: null,
        tags: [],
        title: "Policies",
        type: "HTTP",
        url: "/policies",
        items: [],
      },
      {
        id: "gid://shopify/MenuItem/461609599032",
        resourceId: "gid://shopify/Page/92591030328",
        tags: [],
        title: "About",
        type: "PAGE",
        url: "/pages/about",
        items: [],
      },
    ],
  };

  return (
    <nav className="hidden items-center gap-10  sm:flex sm:flex-1 justify-center mx-6 min-w-0">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        const url =
          item.url.includes("myshopify.com") ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item text-base text-foreground relative inline-block py-2  font-normal
            hover:text-primary
         after:absolute after:left-0 after:bottom-0
         after:h-[2px] after:w-full after:bg-primary after:rounded-full
         after:scale-x-0 after:origin-left
         after:transition-transform after:duration-300
         hover:after:scale-x-100"
            end
            key={item.id}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

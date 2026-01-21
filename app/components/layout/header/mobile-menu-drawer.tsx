import type { HeaderQuery } from "storefrontapi.generated";
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
import { useMobileMenuDrawerStore } from "~/hooks/store/use-mobile-menu-store";
import { MobileMenu } from "../menu/mobile-menu";
import { useEffect, useState } from "react";
import { useClientMobile } from "~/hooks/use-client-mobile";

interface MobileMenuDrawerProps {
  menu: HeaderQuery["menu"];
  primaryDomainUrl: HeaderQuery["shop"]["primaryDomain"]["url"];
  publicStoreDomain: string;
}

/**
 * Ensures the component only renders on the client,
 * after hydration has fully completed.
 */

export function MobileMenuDrawer({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: MobileMenuDrawerProps) {
  const { open, setOpen } = useMobileMenuDrawerStore();

  const { canRender } = useClientMobile({
    onExitMobile: () => setOpen(false),
  });

  if (!canRender) return null;

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <DrawerContent className="top-20">
        <DrawerHeader>
          <DrawerTitle>Mobile Menu</DrawerTitle>
          <DrawerDescription>Navigate through our shop</DrawerDescription>
        </DrawerHeader>

        <MobileMenu
          menu={menu}
          primaryDomainUrl={primaryDomainUrl}
          publicStoreDomain={publicStoreDomain}
        />

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

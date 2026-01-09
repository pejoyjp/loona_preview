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
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useMobileMenuDrawerStore } from "~/hooks/store/use-mobile-menu-store";
import { MobileMenu } from "../layout/menu/mobile-menu";

interface MobileMenuDrawerProps {
  menu: HeaderQuery["menu"];
  primaryDomainUrl: HeaderQuery["shop"]["primaryDomain"]["url"];
  publicStoreDomain: string;
}

export function MobileMenuDrawer({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: MobileMenuDrawerProps) {
  const { open, setOpen } = useMobileMenuDrawerStore();
  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Mobile Menu</DrawerTitle>
          <DrawerDescription>Navigate through our shop</DrawerDescription>
        </DrawerHeader>
        <div>
          <MobileMenu
            menu={menu}
            primaryDomainUrl={primaryDomainUrl}
            publicStoreDomain={publicStoreDomain}
          />
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

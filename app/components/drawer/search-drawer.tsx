import { Search } from "lucide-react";
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
import { useSearchStore } from "~/hooks/store/use-search-store";

export function SearchDrawer() {
  const { open, setOpen } = useSearchStore();

  return (
    <Drawer direction="top" open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="h-14 flex items-center px-4 py-3 relative">
          <input
            className="bg-[#F5F5F5] w-full h-full rounded-full pl-4 pr-12 focus:outline-none"
            type="search"
            name=""
            id=""
          />
          <Search
            className=" cursor-pointer text-foreground absolute right-8"
            strokeWidth={1}
            // onClick={() => setOpen(true)}
          ></Search>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

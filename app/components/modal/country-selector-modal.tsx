import { Earth } from "@icon-park/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { CountrySelector } from "../layout/menu/country-selector";

export function CountrySelectorModal() {
  return (
    <div>
      <Dialog>
        <form className="flex items-center justify-center">
          <DialogTrigger>
            <Earth
              size="24"
              theme="outline"
              className="cursor-pointer text-foreground hidden md:block"
              strokeWidth={1}
            />
          </DialogTrigger>
          <DialogContent className="lg:max-w-158 max-w-90 max-h-100 p-0 ">
            <DialogHeader className="p-4 border-b">
              <DialogTitle>Language Selector</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <CountrySelector />
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

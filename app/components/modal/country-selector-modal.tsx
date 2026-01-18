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
    <div className="">
      <Dialog>
        <form>
          <DialogTrigger>
            <Earth size="24" theme="outline" />
          </DialogTrigger>
          <DialogContent className="lg:max-w-158 max-w-90 p-0 ">
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

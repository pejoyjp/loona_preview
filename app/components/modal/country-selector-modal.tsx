import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import { CountrySelector } from "../layout/menu/country-selector";
import { Earth } from "@icon-park/react";

export function CountrySelectorModal() {
  return (
    <div className="">
      <Dialog>
        <form>
          <DialogTrigger>
            <Earth size="24" theme="outline" />
          </DialogTrigger>
          <DialogContent className="lg:max-w-4xl">
            <DialogHeader className="">
              <DialogTitle>Country Selector</DialogTitle>
              <DialogDescription>Select your country and language preferences</DialogDescription>
              <Separator className="my-4" />
            </DialogHeader>

            <CountrySelector />
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

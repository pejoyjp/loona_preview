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
    <div>
      <Dialog>
        <form className="flex items-center justify-center size-6">
          <DialogTrigger>
            <Earth size="24" theme="outline" className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="lg:max-w-4xl max-w-11/12">
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

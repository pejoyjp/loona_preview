import { Earth } from "@icon-park/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { CountrySelector } from "../layout/menu/country-selector";

export function CountrySelectorModal() {
  return (
    <Dialog>
      <DialogTrigger aria-label="Open country selector">
        <Earth size="24" theme="outline" />
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] lg:max-w-[600px] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Select Country / Language</DialogTitle>
        </DialogHeader>
        <CountrySelector />
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "~/components/ui/button";
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
import { CountrySelector } from "../layout/menu/country-selector";
import { Separator } from "~/components/ui/separator"

export function CountrySelectorModal() {
  return (
    <div className="">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="ghost">Country Selector</Button>
          </DialogTrigger>
          <DialogContent className="lg:max-w-4xl">
            <DialogHeader className="">
              <DialogTitle>Country Selector</DialogTitle>
              <Separator className="my-4"/>
            </DialogHeader>

            <CountrySelector />

            
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

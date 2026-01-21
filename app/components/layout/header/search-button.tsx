import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

export function SeachButton() {
  return (
    <Popover>
      <PopoverTrigger>
        <Search className="text-foreground" />
      </PopoverTrigger>

      <PopoverContent className="w-screen">
        <div className="h-14 flex items-center px-4 py-3 relative w-full">
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
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

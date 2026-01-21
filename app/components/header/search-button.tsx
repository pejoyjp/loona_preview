import { Search } from "lucide-react";
import { useSearchStore } from "~/hooks/store/use-search-store";

export default function SearchButton() {
  const { open, setOpen } = useSearchStore();
  return (
    <Search
      className="header-btn cursor-pointer text-foreground"
      strokeWidth={1}
      onClick={() => setOpen(true)}
    ></Search>
  );
}

import { Search } from "lucide-react";
import { useFetcher } from "react-router";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

export function SearchButton() {
  const fetcher = useFetcher();

  const products = fetcher.data?.products ?? [];
  const isLoading = fetcher.state !== "idle";
  const showResults = products.length > 0;

  return (
    <Drawer direction="top">
      <DrawerTrigger>
        <Search className="header-btn cursor-pointer text-foreground" strokeWidth={1} />
      </DrawerTrigger>

      <DrawerContent className="data-[vaul-drawer-direction=top]:border-b-0">
        <DrawerHeader className="hidden">
          <DrawerTitle />
        </DrawerHeader>

        <div className="bg-white">
          <fetcher.Form
            method="get"
            action="/api/predictive-search"
            className="h-14 flex items-center px-4 relative"
          >
            <input
              autoFocus
              type="search"
              name="q"
              placeholder="搜索商品"
              className="bg-[#F5F5F5] w-full h-8 rounded-full pl-4 pr-12 focus:outline-none"
              onChange={(e) => fetcher.submit(e.currentTarget.form)}
            />

            <Search className="cursor-pointer text-foreground absolute right-8" strokeWidth={1} />
          </fetcher.Form>

          {isLoading && <p className="px-4 mt-4 text-gray-500">加载中…</p>}

          {showResults && (
            <ul className="search-results mb-4 px-4">
              <p className="text-black text-xl mt-4 mb-4">Search Result</p>

              {products.map((product: any) => (
                <li key={product.id} className="flex items-center gap-2 mb-2">
                  <img src={product.variants.nodes[0]?.image?.url} width="40" alt={product.title} />
                  <span>{product.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

export function SearchButton() {
  // return <HeaderSearch />;
  return (
    <Drawer direction="top">
      <DrawerTrigger>
        <Search className="header-btn cursor-pointer text-foreground" strokeWidth={1} />
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=top]:border-b-0">
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div
          className={`
              bg-white
            `}
        >
          <div className="h-14 flex items-center px-4 relative">
            <input
              autoFocus
              className="bg-[#F5F5F5] w-full h-8 rounded-full pl-4 pr-12 focus:outline-none"
              type="search"
              placeholder="搜索商品"
            />
            <Search className="cursor-pointer text-foreground absolute right-8" strokeWidth={1} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
export function HeaderSearch() {
  const [open, setOpen] = useState(false); // 控制动画状态
  const [visible, setVisible] = useState(false); // 控制是否渲染
  const searchRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const HEADER_HEIGHT = 0;

  const openSearch = () => {
    setVisible(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const closeSearch = () => {
    setOpen(false);
    setTimeout(() => setVisible(false), 200);
  };

  // 点击 header / 页面任意区域关闭
  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (searchRef.current?.contains(e.target as Node)) return;
      if (triggerRef.current?.contains(e.target as Node)) return;
      closeSearch();
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <>
      {/* header 内触发按钮 */}
      <div ref={triggerRef}>
        <Search
          className="header-btn cursor-pointer text-foreground"
          strokeWidth={1}
          onClick={openSearch}
        />
      </div>

      {visible && (
        <>
          {/* mask（不遮 header） */}
          <div
            className={`
              absolute left-0 right-0 z-40 bg-black/70
              transition-opacity duration-200
              ${open ? "opacity-100" : "opacity-0"}
            `}
            style={{
              top: HEADER_HEIGHT,
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            }}
          />

          {/* 搜索框 */}
          <div
            ref={searchRef}
            className={`
              absolute left-0 right-0 z-50 bg-white
              transform transition-all duration-200 ease-out
              ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
            `}
            style={{ top: HEADER_HEIGHT }}
          >
            <div className="h-14 flex items-center px-4 relative">
              <input
                autoFocus
                className="bg-[#F5F5F5] w-full h-8 rounded-full pl-4 pr-12 focus:outline-none"
                type="search"
                placeholder="搜索商品"
              />
              <Search className="cursor-pointer text-foreground absolute right-8" strokeWidth={1} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

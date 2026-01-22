import { useEffect, useRef, useState, type ReactNode } from "react";
import { useClientMobile } from "~/hooks/use-client-mobile";
import { CircleUserRound, EarthIcon, Menu, ShoppingCart } from "lucide-react";

/**
 * Ensures the component only renders on the client,
 * after hydration has fully completed.
 */

export function MobileMenuDrawer() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { canRender } = useClientMobile({
    onExitMobile: () => setOpen(false),
  });

  const HEADER_HEIGHT = 56;

  const openMenu = () => {
    setVisible(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const closeMenu = () => {
    setOpen(false);
    setTimeout(() => setVisible(false), 200);
  };

  // 点击页面任意位置关闭
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (searchRef.current?.contains(e.target as Node)) return;
      if (triggerRef.current?.contains(e.target as Node)) return;
      closeMenu();
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <>
      <div ref={triggerRef}>
        <Menu strokeWidth={1} onClick={openMenu} className="sm:hidden header-btn" />
      </div>
      {visible && canRender && (
        <>
          <div
            className={`absolute left-0 right-0 z-40 bg-black/50 transition-opacity duration-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ top: HEADER_HEIGHT, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
          />
          <div
            ref={searchRef}
            className={`absolute left-0 right-0 z-50 bg-white transform transition-all duration-200 ease-out ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
            style={{ top: HEADER_HEIGHT }}
          >
            <MobileMenuDrawerItem
              title="Language Setting"
              icon={<EarthIcon strokeWidth={1} className="header-btn" />}
              onClick={() => console.log("clicked！！！")}
            />
            <MobileMenuDrawerItem
              title="Cart"
              icon={<ShoppingCart strokeWidth={1} className="header-btn" />}
              onClick={() => console.log("clicked！！！")}
            />
            <MobileMenuDrawerItem
              title="Language Setting"
              icon={<CircleUserRound strokeWidth={1} className="header-btn" />}
              onClick={() => console.log("clicked！！！")}
            />
          </div>
        </>
      )}
    </>
  );
}

interface MobileMenuDrawerItemProps {
  title: string;
  icon?: ReactNode; // 可以传 svg 或组件
  onClick?: () => void;
}

export function MobileMenuDrawerItem({ title, icon, onClick }: MobileMenuDrawerItemProps) {
  return (
    <div
      className="flex items-center justify-between  h-14 px-4 cursor-pointer border-t border-border"
      onClick={onClick}
    >
      <span>{title}</span>
      {icon}
    </div>
  );
}

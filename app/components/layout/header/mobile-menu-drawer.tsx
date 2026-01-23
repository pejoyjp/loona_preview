import { useEffect, useRef, useState, type ReactNode } from "react";
import { useClientMobile } from "~/hooks/use-client-mobile";
import { CircleUserRound, EarthIcon, Menu, ShoppingCart, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { useMobileMenuDrawerStore } from "~/hooks/store/use-mobile-menu-store";

export function MobileMenuDrawer() {
  const { open, setOpen } = useMobileMenuDrawerStore();
  const searchRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { canRender } = useClientMobile({
    onExitMobile: () => setOpen(false),
  });

  const HEADER_HEIGHT = 56;

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <div ref={triggerRef} className="flex items-center">
        {open ? (
          <X strokeWidth={1} onClick={closeMenu} className="sm:hidden header-btn" />
        ) : (
          <Menu strokeWidth={1} onClick={openMenu} className="sm:hidden header-btn" />
        )}
      </div>

      {canRender && (
        <div
          className={cn("fixed inset-0 z-40 overflow-hidden", `top-${HEADER_HEIGHT / 4}`)}
          onClick={closeMenu}
        >
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          />

          <div
            ref={searchRef}
            className={`absolute left-0 right-0 bg-white transform transition-transform duration-300 ease-out ${
              open ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex flex-col bg-white">
              <MobileMenuDrawerItem
                title="Language Setting"
                icon={<EarthIcon strokeWidth={1} className="w-5 h-5 text-gray-600" />}
              />
              <MobileMenuDrawerItem
                title="Cart"
                icon={<ShoppingCart strokeWidth={1} className="w-5 h-5 text-gray-600" />}
              />
              <MobileMenuDrawerItem
                title="Account"
                icon={<CircleUserRound strokeWidth={1} className="w-5 h-5 text-gray-600" />}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface MobileMenuDrawerItemProps {
  title: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export function MobileMenuDrawerItem({ title, icon, onClick }: MobileMenuDrawerItemProps) {
  return (
    <div
      className="flex items-center justify-between h-14 px-4 cursor-pointer border-t border-border"
      onClick={onClick}
    >
      <span>{title}</span>
      {icon}
    </div>
  );
}

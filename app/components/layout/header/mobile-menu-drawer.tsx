import { type ReactNode } from "react";
import { useClientMobile } from "~/hooks/use-client-mobile";
import { CircleUserRound, EarthIcon, ShoppingCart } from "lucide-react";
import { cn } from "~/lib/utils";
import { useMobileMenuDrawerStore } from "~/hooks/store/use-mobile-menu-store";

export function MobileMenuDrawer() {
  const { open, setOpen } = useMobileMenuDrawerStore();

  const { canRender } = useClientMobile({
    onExitMobile: () => setOpen(false),
  });

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {canRender && (
        <div
          className={cn(
            "fixed inset-0 z-40 overflow-hidden top-14",
            !open && "pointer-events-none",
          )}
          onClick={closeMenu}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/50 transition-opacity duration-300",
              !open && "opacity-0",
            )}
            onClick={closeMenu}
          />

          <div
            className={`absolute left-0 right-0 transform transition-transform duration-300 ease-out ${
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

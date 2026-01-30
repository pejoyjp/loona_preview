import { type ReactNode } from "react";
import { useClientMobile } from "~/hooks/use-client-mobile";
import { CircleUserRound, EarthIcon, ShoppingCart } from "lucide-react";
import { cn } from "~/lib/utils/cn";
interface MobileMenuDrawerProps {
  setMobileMenuOpen: (value: boolean) => void;
  mobileMenuOpen: boolean;
}

export function MobileMenuDrawer({ setMobileMenuOpen, mobileMenuOpen }: MobileMenuDrawerProps) {
  const { canRender } = useClientMobile({
    onExitMobile: () => setMobileMenuOpen(false),
  });

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {canRender && (
        <div
          className={cn(
            "fixed inset-0 z-40 overflow-hidden top-14",
            !mobileMenuOpen && "pointer-events-none",
          )}
          onClick={closeMenu}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/50 transition-opacity duration-300",
              !mobileMenuOpen && "opacity-0",
            )}
            onClick={closeMenu}
          />

          <div
            className={`absolute left-0 right-0 transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
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

function MobileMenuDrawerItem({ title, icon, onClick }: MobileMenuDrawerItemProps) {
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

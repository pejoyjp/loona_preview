import { Bell, CreditCard, ShoppingBag, BadgeCheck, PackageCheck, Truck } from "lucide-react";
import { Carousel, SliderContainer, Slider, SliderDotButton } from "~/components/ui/carousel";
import { useViewportStore } from "~/hooks/store/use-viewport-store";

const warrantItems = [
  { icon: Bell, label: "Lifetime Customer Support" },
  { icon: BadgeCheck, label: "1-Year Warranty" },
  { icon: CreditCard, label: "Secure Payment" },
  { icon: PackageCheck, label: "Dispatch within 3 business days." },
  { icon: ShoppingBag, label: "Loona's outfit shipped separately." },
  { icon: Truck, label: "Free shipping in the US." },
];

function groupItems<T>(items: T[], groupSize: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += groupSize) {
    groups.push(items.slice(i, i + groupSize));
  }
  return groups;
}

const mobileGroups = groupItems(warrantItems, 3);

interface WarrantItemProps {
  icon: React.ElementType;
  label: string;
}

function WarrantItem({ icon: Icon, label }: WarrantItemProps) {
  return (
    <div className={"flex flex-col items-center text-center gap-2 "}>
      <Icon className="w-6 h-6" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function PaymentWarrant() {
  const isMobile = useViewportStore((state) => state.isMobile);
  if (isMobile)
    return (
      <div>
        <Carousel
          className="bg-muted"
          options={{
            align: "start",
            loop: true,
          }}
        >
          <SliderContainer>
            {mobileGroups.map((group, groupIndex) => (
              <Slider key={groupIndex} className="flex-[0_0_100%] min-w-0">
                <div className="grid grid-cols-3 gap-4 text-muted-foreground px-5 p-5">
                  {group.map((item) => (
                    <WarrantItem key={item.label} {...item} />
                  ))}
                </div>
              </Slider>
            ))}
          </SliderContainer>
          <div className="flex justify-center pb-5">
            <SliderDotButton variant="dot" />
          </div>
        </Carousel>
      </div>
    );

  return (
    <div className="xl:grid-cols-2 md:grid md:grid-cols-6 md:bg-muted xl:bg-transparent md:p-5 xl:p-0 md:text-muted-foreground xl:text-foreground md:gap-4">
      {warrantItems.map((item) => (
        <div key={item.label} className="flex items-center gap-1 xl:gap-2 flex-col xl:flex-row ">
          <item.icon className="h-6 w-6 " />
          <span className="text-sm xl:text-base text-center">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

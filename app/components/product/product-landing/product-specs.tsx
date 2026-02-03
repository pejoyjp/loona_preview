import {
  Carousel,
  SliderContainer,
  Slider,
  SliderDotButton,
  SliderPrevButton,
  SliderNextButton,
  useCarousel,
} from "~/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils/cn";

const specsData = [
  { label: "Dimensions", value: '8.3"L x 68"W x 6.8"H' },
  { label: "Weight", value: "2.42lbs" },
  { label: "CPU", value: "Quad-core Cortex A53, up to 1.5GHz" },
  { label: "BPU", value: "5 TOPS (Tera Operations Per Second)" },
  { label: "Co-processor", value: "CortexM4,100MHz" },
  { label: "Audio-processor", value: "Dual-core DSP, 360MHz, HIFI Audio Engine" },
  { label: "RAM", value: "2GB LPDDR4" },
  { label: "ROM", value: "8GB eMMC 5.0" },
  { label: "Battery", value: "1350 mAh, 11.1V Lithium-Ion Rechargeable" },
  { label: "Charging", value: "USB Type-C Port, Charging Contacts for Dock" },
  { label: "Wi-Fi", value: "Dual-band 2.4G/5.8G, 802.11a/b/g/n" },
  { label: "Display", value: '2.4" LCD' },
  { label: "Camera", value: "720P RGB Camera" },
  {
    label: "Sensors",
    value: "3D ToF (Time of Flight) Sensor,Touch Sensor; 3-axis Accelerometer; 3-axis Gyroscope",
  },
  { label: "Microphone", value: "4-Microphone Array" },
  { label: "Speaker", value: "2W" },
  {
    label: "Actuators",
    value:
      "2 Outer Rotor Brushless DC Servomotors (Wheels); 4 Brushed DC Servomotors (Body and Ears)",
  },
];

// 将数据分组，每组6项（移动端）
const groupSpecs = (items: typeof specsData, groupSize: number) => {
  const groups: (typeof specsData)[] = [];
  for (let i = 0; i < items.length; i += groupSize) {
    groups.push(items.slice(i, i + groupSize));
  }
  return groups;
};

const mobileGroups = groupSpecs(specsData, 6);
const desktopGroups = groupSpecs(specsData, 6);

export function ProductSpecs() {
  return (
    <div className="bg-black text-white py-12 md:py-16 xl:py-20">
      <div className="px-4 md:px-8 xl:px-16 max-w-7xl mx-auto">
        {/* 移动端 Carousel */}
        <div className="md:hidden">
          <Carousel
            options={{
              align: "start",
              loop: false,
              dragFree: false,
            }}
          >
            <SliderContainer>
              {mobileGroups.map((group, index) => (
                <Slider key={index} className="flex-[0_0_100%] min-w-0">
                  <div className="space-y-4">
                    {group.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-start gap-4">
                        <span className="text-white font-medium shrink-0">{spec.label}</span>
                        <span className="text-gray-400 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </Slider>
              ))}
            </SliderContainer>
            <div className="flex justify-center mt-6">
              <SliderDotButton variant="dot" />
            </div>
          </Carousel>
        </div>

        {/* 桌面端 Carousel - 每页6项 */}
        <div className="hidden md:block">
          <Carousel
            options={{
              align: "start",
              loop: false,
              dragFree: false,
              slidesToScroll: 1,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div /> {/* Spacer */}
              <div className="flex items-center gap-4">
                <SliderPrevButton className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-30">
                  <ChevronLeft className="w-5 h-5" />
                </SliderPrevButton>
                <SliderSnapDisplay className="text-sm text-gray-400" />
                <SliderNextButton className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-30">
                  <ChevronRight className="w-5 h-5" />
                </SliderNextButton>
              </div>
            </div>
            <SliderContainer>
              {desktopGroups.map((group, index) => (
                <Slider key={index} className="flex-[0_0_100%] min-w-0">
                  <div className="space-y-4">
                    {group.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between items-start gap-4 py-2 border-b border-gray-800 last:border-0"
                      >
                        <span className="text-white font-medium">{spec.label}</span>
                        <span className="text-gray-400 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </Slider>
              ))}
            </SliderContainer>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

function SliderSnapDisplay({ className }: { className?: string }) {
  const { selectedSnap, snapCount, onDotButtonClick } = useCarousel();

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {Array.from({ length: snapCount }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onDotButtonClick(i)}
          className={cn(
            "text-sm transition-colors",
            i === selectedSnap ? "text-white" : "text-gray-500 hover:text-gray-300",
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

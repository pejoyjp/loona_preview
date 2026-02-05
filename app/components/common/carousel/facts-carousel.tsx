import {
  Carousel,
  SliderContainer,
  Slider,
  SliderPrevButton,
  SliderNextButton,
} from "~/components/ui/carousel";
import {
  ChevronLeft,
  ChevronRight,
  Smile,
  Bot,
  Shield,
  Gamepad2,
  BatteryCharging,
  ScanFace,
} from "lucide-react";

const factsData = [
  {
    icon: Smile,
    title: "Facial Recognition",
    description:
      "Loona can recognize the whole family to make sure nobody is left out and everyone feels special.",
  },
  {
    icon: Bot,
    title: "Intelligent AI",
    description:
      "Using Chat GPT, the world's leading AI technology, Loona can become your family's source of knowledge!",
  },
  {
    icon: Shield,
    title: "Leading Security",
    description:
      "As much data processing as possible is done by Loona directly to maximize security & safety.",
  },
  {
    icon: Gamepad2,
    title: "Endless Games",
    description:
      "Keep the fun going with Loona's app-enabled games that engage and entertain children for hours.",
  },
  {
    icon: BatteryCharging,
    title: "Long Play",
    description:
      "Loona's battery has 2 hours of continuous playtime and returns to the dock to recharge automatically.",
  },
  {
    icon: ScanFace,
    title: "Amazing Sensors",
    description:
      "Loona uses their 3D-ToF, RGB, accelerometer and gyroscope sensors to predict perfectly where to go.",
  },
];

export function FactsCarousel() {
  return (
    <div className="w-full pt-10">
      <Carousel
        options={{
          align: "start",
          loop: false,
          dragFree: false,
          slidesToScroll: "auto",
          containScroll: false,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground font-semibold text-headline">6 fast facts about Loona</h2>

          <div className="gap-10 hidden xl:flex">
            <SliderPrevButton className="w-15 h-15 rounded-full border  flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-6 h-6 text-black" />
            </SliderPrevButton>
            <SliderNextButton className="w-15 h-15 rounded-full border  flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="w-6 h-6 text-black" />
            </SliderNextButton>
          </div>
        </div>

        <SliderContainer className="gap-4 xl:gap-5 select-none items-stretch">
          {factsData.map((fact) => {
            const IconComponent = fact.icon;
            return (
              <Slider key={fact.title} className="h-auto w-63.5 xl:w-97">
                <div className="bg-surface rounded-2xl h-full space-y-2 xl:space-y-4 pl-3 pr-5.5 pt-10 pb-5 flex flex-col xl:pt-16 xl:pb-10 xl:pl-6 xl:pr-16">
                  <IconComponent className="w-6.5 h-6.5 md:w-8 md:h-8 xl:w-12 xl:h-12 text-icon shrink-0" />
                  <h3 className="text-lg xl:text-2xl xl:leading-8 text-foreground leading-6 font-medium shrink-0">
                    {fact.title}
                  </h3>
                  <p className="text-muted-foreground text-base flex-1">{fact.description}</p>
                </div>
              </Slider>
            );
          })}
        </SliderContainer>
      </Carousel>
    </div>
  );
}

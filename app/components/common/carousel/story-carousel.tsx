import Autoplay from "embla-carousel-autoplay";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import Fade from "embla-carousel-fade";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { useClientMobile } from "~/hooks/use-client-mobile";

export function StoryCarousel() {
  const autoplayDelay = 5000;
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const { canRender } = useClientMobile();

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    setScrollSnaps(api.scrollSnapList());
    handleSelect();

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const root = api.rootNode();

    const onWheelCapture = (e: WheelEvent) => {
      const isAtStart = !api.canScrollPrev();
      const isAtEnd = !api.canScrollNext();

      if (e.deltaY > 0 && isAtEnd) {
        e.stopImmediatePropagation();
        return;
      }

      if (e.deltaY < 0 && isAtStart) {
        e.stopImmediatePropagation();
        return;
      }
    };

    root.addEventListener("wheel", onWheelCapture, {
      passive: false,
      capture: true,
    });

    return () => {
      root.removeEventListener("wheel", onWheelCapture, true);
    };
  }, [api]);

  return (
    <Carousel
      orientation={canRender ? "horizontal" : "vertical"}
      className="w-full bg-gray-500 pr-10"
      opts={{
        align: "start",
      }}
      setApi={setApi}
      plugins={[
        WheelGesturesPlugin({
          forceWheelAxis: "y",
        }),
        Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: false,
        }),
        Fade(),
      ]}
    >
      <CarouselContent className="h-[500px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <span className="text-3xl font-semibold">{index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2  lg:right-2 lg:top-1/2 flex lg:-translate-y-1/2 lg:flex-col lg:bottom-auto lg:left-auto lg:translate-x-0 gap-3">
        {scrollSnaps.map((_, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className="group flex items-center"
              onClick={() => {
                api?.plugins().autoplay?.reset();
                api?.scrollTo(index);
              }}
            >
              <span className="relative overflow-hidden rounded-full bg-white shadow-sm h-1 w-14 lg:h-14 lg:w-1">
                {isActive && (
                  <>
                    {/* mobile: horizontal progress */}
                    <motion.span
                      className="absolute left-0 top-0 h-full bg-gray-800 lg:hidden"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: autoplayDelay / 1000,
                        ease: "linear",
                      }}
                    />

                    {/* desktop: vertical progress */}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full bg-gray-800 hidden lg:block"
                      initial={{ height: "100%" }}
                      animate={{ height: "0%" }}
                      transition={{
                        duration: autoplayDelay / 1000,
                        ease: "linear",
                      }}
                    />
                  </>
                )}
              </span>

              <span className="sr-only">{`Slide ${index + 1}`}</span>
            </button>
          );
        })}
      </div>
    </Carousel>
  );
}

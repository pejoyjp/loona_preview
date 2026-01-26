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

export function CarouselDemo() {
  const autoplayDelay = 5000;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
      orientation="vertical"
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

      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-3">
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
              <span className="relative h-14 w-1 overflow-hidden rounded-full bg-white shadow-sm">
                {isActive && (
                  <motion.span
                    className="absolute inset-x-0 bottom-0 bg-gray-800"
                    initial={{ height: "100%" }}
                    animate={{ height: "0%" }}
                    transition={{
                      duration: autoplayDelay / 1000,
                      ease: "linear",
                    }}
                  />
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

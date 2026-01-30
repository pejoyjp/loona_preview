import { useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { Carousel, Slider, SliderContainer, ThumbsSlider } from "~/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import { useClientMobile } from "~/hooks/use-client-mobile";
import { cn } from "~/lib/utils/cn";

export function ProductCarousel() {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  const { isMobile } = useClientMobile();

  const scrollTo = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  const OPTIONS: EmblaOptionsType = {
    loop: false,
    axis: isMobile ? "x" : "y",
  };

  const data = [
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/how-to-choose-an-intelligent-robot-dog-toy.webp?v=1769584757",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/intelligent-robot-dog-toy.webp?v=1769584395",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/intelligent-robot-dog-toy-loona.webp?v=1769584395",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/ai-robot-for-companionship.webp?v=1769157836",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/how-we-chose-toy-robot-dogs.webp?v=1769062270",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/8-best-toy-robot-dogs.webp?v=1769062270",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/how-ai-fits-into-a-robot.webp?v=1768985696",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/realistic-robotic-dog-toy.webp?v=1768978859",
  ];

  return (
    <div className="pl-4 ">
      <Carousel
        options={OPTIONS}
        className="relative flex "
        plugins={[Autoplay({ delay: 2000 })]}
        onApi={setEmblaApi}
      >
        <ThumbsSlider
          className="w-20 hidden md:block"
          thumbsClassName="h-[400px]"
          thumbsSliderClassName="border-black"
        />
        <SliderContainer className="h-58 w-full">
          {data.map((item, index) => (
            <Slider
              className="h-full w-[calc(100%-1rem)] xl:w-full"
              key={index}
              thumbnailSrc={item}
            >
              <img
                src={item}
                alt="image"
                className={cn("h-full object-cover w-full", index > 0 ? "pl-1" : "pl-0")}
              />
            </Slider>
          ))}
        </SliderContainer>
      </Carousel>

      <div className="">
        <Button onClick={() => scrollTo(4)}>Click 4</Button>
      </div>
    </div>
  );
}

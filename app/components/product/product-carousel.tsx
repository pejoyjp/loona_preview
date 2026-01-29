import { useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { Carousel, Slider, SliderContainer, ThumbsSlider } from "~/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";

export function ProductCarousel() {
  const OPTIONS: EmblaOptionsType = {
    loop: false,
    axis: "y",
  };
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  const scrollTo = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  const data = [
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/loona_petbot.png?v=1728545260",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/loona_robot_petbot_1.jpg?v=1728542645",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/loona_robot_petbot.jpg?v=1728542761",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/loona_robot_petbot_2.jpg?v=1728542776",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/LoonaCollarV1-1.png?v=1769483172",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/LoonaCollarV1-2.png?v=1769483172",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/2026_newyear_loona_can_do_hero.webp?v=1766056558",
    "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/2026_newyear_loona_can_do_PC.webp?v=1765937149",
  ];

  return (
    <div>
      <Carousel
        options={OPTIONS}
        className="relative flex gap-2"
        plugins={[Autoplay({ delay: 2000 })]}
        onApi={setEmblaApi}
      >
        <ThumbsSlider
          className="w-20 hidden md:block"
          thumbsClassName="h-[400px]"
          thumbsSliderClassName="border-black"
        />
        <SliderContainer className="gap-2 h-[400px] w-full">
          {data.map((item, index) => (
            <Slider className="h-full w-full" key={index} thumbnailSrc={item}>
              <img src={item} alt="image" className="h-full object-cover rounded-lg w-full" />
            </Slider>
          ))}
        </SliderContainer>
      </Carousel>

      <div className="bg-red-200">
        <Button onClick={() => scrollTo(4)}>Click 4</Button>
      </div>
    </div>
  );
}

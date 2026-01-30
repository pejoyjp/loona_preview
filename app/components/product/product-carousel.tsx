import { useEffect, useMemo, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@shopify/hydrogen";

import { Carousel, Slider, SliderContainer, ThumbsSlider } from "~/components/ui/carousel";
import { useClientMobile } from "~/hooks/use-client-mobile";
import { cn } from "~/lib/utils/cn";

type GalleryMedia =
  | {
      __typename: "MediaImage";
      image: any;
    }
  | {
      __typename: "Video";
      previewImage: any;
      sources?: any[];
    };

type GalleriesByOption = Record<string, GalleryMedia[]>;

export function ProductCarousel({
  galleriesByOption = [],
  selectedVariant,
}: {
  galleriesByOption?: GalleriesByOption[];
  selectedVariant?: {
    selectedOptions?: { name: string; value: string }[];
  };
}) {
  const { isMobile } = useClientMobile();
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>();

  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({
      loop: false,
      axis: isMobile ? "x" : "y",
    }),
    [isMobile],
  );

  const { slides, optionIndexMap } = useMemo(() => {
    const slides: any[] = [];
    const optionIndexMap = new Map<string, number>();

    galleriesByOption.forEach((galleryGroup) => {
      Object.entries(galleryGroup).forEach(([optionValue, mediaList]) => {
        if (!mediaList || mediaList.length === 0) return;

        optionIndexMap.set(optionValue, slides.length);

        mediaList.forEach((media) => {
          if (media.__typename === "MediaImage") {
            slides.push(media.image);
          } else if (media.__typename === "Video") {
            slides.push(media.previewImage);
          }
        });
      });
    });

    return { slides, optionIndexMap };
  }, [galleriesByOption]);

  useEffect(() => {
    if (!emblaApi || !selectedVariant) return;

    const optionValue = selectedVariant.selectedOptions?.[0]?.value;
    if (!optionValue) return;

    const index = optionIndexMap.get(optionValue);
    if (index !== undefined) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi, selectedVariant, optionIndexMap]);

  if (slides.length === 0) return null;

  return (
    <Carousel
      options={OPTIONS}
      className="relative flex"
      plugins={[Autoplay({ delay: 2000 })]}
      onApi={setEmblaApi}
    >
      <ThumbsSlider
        className="w-20 hidden md:block"
        thumbsClassName="h-[400px]"
        thumbsSliderClassName="border-black"
      />

      <SliderContainer className="h-58 w-full">
        {slides.map((image, index) => (
          <Slider
            key={index}
            className="h-full w-[calc(100%-1rem)] xl:w-full"
            thumbnailSrc={image.url}
          >
            <Image
              data={image}
              alt=""
              sizes="(min-width: 45em) 400px, 100vw"
              className={cn("h-full w-full object-cover", index > 0 && "pl-1")}
            />
          </Slider>
        ))}
      </SliderContainer>
    </Carousel>
  );
}

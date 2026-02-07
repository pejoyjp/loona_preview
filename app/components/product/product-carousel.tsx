import { useEffect, useMemo, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@shopify/hydrogen";

import { Carousel, Slider, SliderContainer, ThumbsSlider } from "~/components/ui/carousel";
import { useViewportStore } from "~/hooks/store/use-viewport-store";
import { cn } from "~/lib/cn";
import type {
  Image as ImageType,
  Video as VideoType,
} from "@shopify/hydrogen/storefront-api-types";

type GalleryMedia =
  | {
      __typename: "MediaImage";
      image: ImageType;
    }
  | {
      __typename: "Video";
      previewImage: any;
      sources?: VideoType[];
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
  const isDesktop = useViewportStore((state) => state.isDesktop);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>();

  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({
      loop: false,
      axis: "x",
      containScroll: "trimSnaps",
    }),
    [isDesktop],
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
      className="relative w-full flex flex-col xl:h-[calc(100svh-4rem)] xl:gap-10 "
      plugins={[Autoplay({ delay: 5000 })]}
      onApi={setEmblaApi}
    >
      <div className="w-full flex-1 min-h-0">
        <SliderContainer className="w-full h-full flex-1 ">
          {slides.map((image, index) => (
            <Slider
              key={index}
              className={cn(
                "w-90 md:w-172 xl:w-full h-full pl-2 first:pl-0 last:pr-4 last:md:pr-10 last:xl:pr-0 bg-amber-950-",
              )}
              thumbnailSrc={image.url}
            >
              <Image
                data={image}
                alt=""
                sizes="(min-width: 45em) 400px, 100vw"
                className={cn("h-full w-full object-cover")}
              />
            </Slider>
          ))}
        </SliderContainer>
      </div>
      <ThumbsSlider
        className="hidden xl:block h-24 shrink-0"
        thumbsClassName=""
        thumbsSliderClassName="w-24 h-24"
      />
    </Carousel>
  );
}

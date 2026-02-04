import { FactsCarousel } from "~/components/common/carousel/facts-carousel";
import { StoryCarousel } from "~/components/common/carousel/story-carousel";
import { Carousel, SliderContainer, Slider } from "~/components/ui/carousel";
import { useViewportStore } from "~/hooks/store/use-viewport-store";
import { useTranslationContext } from "~/hooks/use-translation-context";
import { Button } from "~/components/ui/button";
import { ProductIntelligence } from "./product-intelligence";
import { Separator } from "~/components/ui/separator";

const mediaData = [
  {
    image:
      "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/Frame_1524901834.png?v=1728467275",
    quote: "The new adorable little smart robot puppy you've always dreamed about.",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/Frame_1524901834_1.png?v=1728467275",
    quote: "The world most intelligent petbot...straight from a Pixar movie.",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/Frame_1524901834_2.png?v=1728467276",
    quote: "The most fluid I've ever seen from a consumer robot.",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/Frame_1524901834_3.png?v=1728467275",
    quote: "The KEYI Loona robot is extremely expressive.",
  },
];

export function ProductDetails() {
  const isDesktop = useViewportStore((state) => state.isDesktop);
  const { t } = useTranslationContext();

  return (
    <section>
      <div className="relative w-full h-svh text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://cdn.shopify.com/videos/c/vp/1374775a98a64e3bafc2e8ee5224154e/1374775a98a64e3bafc2e8ee5224154e.HD-1080p-4.8Mbps-13542835.mp4"
            type="video/mp4"
          />
        </video>

        <div className="flex flex-col h-svh xl:w-300 m-auto">
          <div className="text-center xl:text-left flex flex-col items-center xl:items-start pt-12.5 md:pt-16 xl:pt-26">
            <h2 className="text-4xl  md:text-7xl xl:text-9xl font-bold max-w-67 md:max-w-80 xl:max-w-100">
              {t("petbot.banner.title")}
            </h2>

            <p className="text-base pt-2 xl:pt-6 leading-5 md:text-md md:leading-6 xl:text-xl xl:leading-9 max-w-67 md:max-w-80 xl:max-w-140">
              {t("petbot.banner.subtitle")}
            </p>
            <Button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-10 px-10 rounded-full block xl:hidden"
            >
              Buy Now
            </Button>
          </div>

          <div className="flex-1 border-b" />

          <div className="py-4 xl:py-6">
            <Carousel
              options={{
                align: "start",
                loop: false,
                dragFree: true,
                watchDrag: isDesktop ? false : true,
              }}
              className="flex justify-center"
            >
              <SliderContainer className="h-full select-none space-x-8">
                {mediaData.map((item) => (
                  <Slider
                    key={item.image}
                    className="flex items-center gap-3 xl:flex-col xl:text-center"
                  >
                    <img src={item.image} alt={item.quote} className="object-cover h-8 w-20" />
                    <p className="text-sm max-w-58 leading-4.5">{item.quote}</p>
                  </Slider>
                ))}
              </SliderContainer>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-10 xl:w-300 xl:p-0 xl:pt-10 m-auto w-full">
        <StoryCarousel />
        <FactsCarousel />
        <Button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="hidden xl:flex text-lg font-medium transition-colors h-11 mt-6 mb-10  justify-center items-center rounded-full w-47.5"
        >
          Buy Now
        </Button>
      </div>

      <div>
        <ProductIntelligence />
      </div>
    </section>
  );
}

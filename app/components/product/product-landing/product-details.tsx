import { Carousel, SliderContainer, Slider } from "~/components/ui/carousel";
import { useViewportStore } from "~/hooks/store/use-viewport-store";
import { useTranslationContext } from "~/hooks/use-translation-context";

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
    <div className="h-full w-full bg-blue-50 relative text-white">
      <video
        className="absolute inset-0 w-full h-full object-cover"
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

      <div className="absolute top-14.5 md:top-16 xl:top-26 left-1/2 transform -translate-x-1/2 text-center xl:text-left  xl:left-10 xl:translate-x-0">
        <h2 className="text-4xl md:text-7xl xl:text-9xl font-bold pb-4 xl:max-w-100">
          {t("petbot.banner.title")}
        </h2>
        <p className="text-base leading-5 md:text-md md:leading-6 xl:text-xl xl:leading-9 xl:max-w-138">
          {t("petbot.banner.subtitle")}
        </p>
      </div>

      <div className="h-17 xl:h-31 absolute bottom-0 left-0 right-0">
        <Carousel
          options={{
            align: "start",
            loop: false,
            dragFree: true,
            watchDrag: isDesktop ? false : true,
          }}
          className="flex justify-center"
        >
          <SliderContainer className="h-full px-4   select-none space-x-8">
            {mediaData.map((item) => (
              <Slider key={item.image} className="flex items-center gap-3">
                <img src={item.image} alt={item.quote} className="object-cover h-8 w-20" />
                <p className="text-sm max-w-58">{item.quote}</p>
              </Slider>
            ))}
          </SliderContainer>
        </Carousel>
      </div>
    </div>
  );
}

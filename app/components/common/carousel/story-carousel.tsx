// import Autoplay from "embla-carousel-autoplay";
// import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
// import Fade from "embla-carousel-fade";
// import { motion } from "motion/react";
// import { useEffect, useState } from "react";

// import {
//   type CarouselApi,
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "~/components/ui/carousel";
// import { useClientMobile } from "~/hooks/use-client-mobile";

// export function StoryCarousel() {
//   const autoplayDelay = 5000;
//   const [api, setApi] = useState<CarouselApi | null>(null);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

//   const { canRender } = useClientMobile();

//   useEffect(() => {
//     if (!api) return;

//     const handleSelect = () => {
//       setSelectedIndex(api.selectedScrollSnap());
//     };

//     setScrollSnaps(api.scrollSnapList());
//     handleSelect();

//     api.on("select", handleSelect);
//     api.on("reInit", handleSelect);

//     return () => {
//       api.off("select", handleSelect);
//       api.off("reInit", handleSelect);
//     };
//   }, [api]);

//   useEffect(() => {
//     if (!api) return;

//     const root = api.rootNode();

//     const onWheelCapture = (e: WheelEvent) => {
//       const isAtStart = !api.canScrollPrev();
//       const isAtEnd = !api.canScrollNext();

//       if (e.deltaY > 0 && isAtEnd) {
//         e.stopImmediatePropagation();
//         return;
//       }

//       if (e.deltaY < 0 && isAtStart) {
//         e.stopImmediatePropagation();
//         return;
//       }
//     };

//     root.addEventListener("wheel", onWheelCapture, {
//       passive: false,
//       capture: true,
//     });

//     return () => {
//       root.removeEventListener("wheel", onWheelCapture, true);
//     };
//   }, [api]);

//   return (
//     <Carousel
//       orientation={canRender ? "horizontal" : "vertical"}
//       className="w-full bg-gray-500 pr-10"
//       opts={{
//         align: "start",
//       }}
//       setApi={setApi}
//       plugins={[
//         WheelGesturesPlugin({
//           forceWheelAxis: "y",
//         }),
//         Autoplay({
//           delay: autoplayDelay,
//           stopOnInteraction: false,
//         }),
//         Fade(),
//       ]}
//     >
//       <CarouselContent className="h-[500px]">
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <span className="text-3xl font-semibold">{index + 1}</span>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       <div className="absolute bottom-2 left-1/2 -translate-x-1/2  md:right-2 md:top-1/2 flex md:-translate-y-1/2 md:flex-col md:bottom-auto md:left-auto md:translate-x-0 gap-3">
//         {scrollSnaps.map((_, index) => {
//           const isActive = index === selectedIndex;
//           return (
//             <button
//               key={index}
//               type="button"
//               aria-label={`Go to slide ${index + 1}`}
//               className="group flex items-center"
//               onClick={() => {
//                 api?.plugins().autoplay?.reset();
//                 api?.scrollTo(index);
//               }}
//             >
//               <span className="relative overflow-hidden rounded-full bg-white shadow-sm h-1 w-14 md:h-14 md:w-1">
//                 {isActive && (
//                   <>
//                     {/* mobile: horizontal progress */}
//                     <motion.span
//                       className="absolute left-0 top-0 h-full bg-gray-800 md:hidden"
//                       initial={{ width: "0%" }}
//                       animate={{ width: "100%" }}
//                       transition={{
//                         duration: autoplayDelay / 1000,
//                         ease: "linear",
//                       }}
//                     />

//                     {/* desktop: vertical progress */}
//                     <motion.span
//                       className="absolute bottom-0 left-0 w-full bg-gray-800 hidden md:block"
//                       initial={{ height: "100%" }}
//                       animate={{ height: "0%" }}
//                       transition={{
//                         duration: autoplayDelay / 1000,
//                         ease: "linear",
//                       }}
//                     />
//                   </>
//                 )}
//               </span>

//               <span className="sr-only">{`Slide ${index + 1}`}</span>
//             </button>
//           );
//         })}
//       </div>
//     </Carousel>
//   );
// }

import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from "~/components/ui/progressive-carousel";
import { useViewportStore } from "~/hooks/store/use-viewport-store";

const items = [
  {
    img: "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/2026-ces-banner.webp?v=1767178237",
    title: "Bridge",
    desc: "A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.",
    sliderName: "bridge",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/2025-newyear-banner-pc.webp?v=1766057533",
    title: "Mountains View",
    desc: "A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.",
    sliderName: "mountains",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/2025_Chrismas_Banner_PC.webp?v=1763949811",
    title: "Autumn",
    desc: "A picturesque path winding through a dense forest adorned with vibrant autumn foliage.",
    sliderName: "autumn",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/reviews_banner_pc.webp?v=1763547149",
    title: "Foggy",
    desc: "A stunning foggy view over the forest, with the sun casting a golden glow across the trees.",
    sliderName: "foggy",
  },
];

export function StoryCarousel() {
  const isMobile = useViewportStore((state) => state.isMobile);
  return (
    <ProgressSlider
      duration={4000}
      fastDuration={300}
      activeSlider="bridge"
      vertical={isMobile ? false : true}
      className="relative w-full h-[500px]"
    >
      <SliderContent className="w-full h-full">
        {items.map((item) => (
          <SliderWrapper key={item.sliderName} value={item.sliderName} className="h-full w-full">
            <img className="h-full w-full object-cover" src={item.img} alt="" />
          </SliderWrapper>
        ))}
      </SliderContent>

      <SliderBtnGroup
        className="
          absolute bottom-2 left-1/2 -translate-x-1/2 z-10
          flex flex-row gap-3  
          md:left-auto
          md:translate-x-0
          md:right-3
          md:top-1/2
          md:-translate-y-1/2
          md:flex-col            
          md:h-4/5
          md:w-auto
        "
      >
        {items.map((item) => (
          <SliderBtn
            key={item.sliderName}
            value={item.sliderName}
            className="
              relative
              w-20 h-1     
              backdrop-blur-md
              bg-white
              md:w-1
              md:flex-1
            "
            progressBarClass="
              absolute left-0 bottom-0
              h-full w-full
              bg-black
              md:left-auto
              md:right-0
              md:top-0
              md:w-3
            "
          />
        ))}
      </SliderBtnGroup>
    </ProgressSlider>
  );
}

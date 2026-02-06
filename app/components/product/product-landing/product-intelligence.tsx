import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ReactLenis } from "lenis/react";

const statsData = [
  { value: "5 Trillion", label: "calculations per second for fast decision-making" },
  { value: "200", label: "user inputs per minute with voice, gesture, and facial recognition" },
  { value: "95%", label: "accuracy in recognizing facial expressions and gestures" },
];

const showcaseProjects = [
  {
    title: "Loona Converses",
    description:
      "From thoughtful discussions to creative storytelling, chat with a friend who adds movie-like charm to every conversation.",
    image:
      "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/valentine-gift.webp?v=1770084429",
    link: "#",
    color: "#5196fd",
  },
  {
    title: "Loona Perceives",
    description:
      "Show Loona objects, pictures, or your surroundings - she'll bring them to life with colorful descriptions and stories.",
    image:
      "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/how-we-ranked-these-valentine-gifts.webp?v=1770087499",
    link: "#",
    color: "#8f89ff",
  },
  {
    title: "Loona Creates",
    description:
      "Speak your imagination, and watch it bloom. Loona's AI transforms your ideas into vibrant digital artwork.",
    image: "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/1440-1.webp?v=1769991007",
    link: "#",
    color: "#13006c",
  },
  {
    title: "Loona Learns",
    description:
      "Building memories together is what makes Loona unique. Through each interaction, Loona understands you and your home better, creating a more personalized companionship.",
    image: "https://cdn.shopify.com/s/files/1/0737/1194/3957/files/1440-2.webp?v=1769991007",
    link: "#",
    color: "#fd521a",
  },
];

type ShowcaseItem = (typeof showcaseProjects)[number];

function StackedShowcaseCards({ items }: { items: ShowcaseItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="w-full">
      {items.map((item, index) => {
        const targetScale = 1 - (items.length - index) * 0.05;
        return (
          <StackedShowcaseCard
            key={item.title}
            index={index}
            item={item}
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

function StackedShowcaseCard({
  index,
  item,
  progress,
  range,
  targetScale,
}: {
  index: number;
  item: ShowcaseItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <div ref={cardRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: item.color,
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className="relative -top-[20%] h-[440px] w-[85%] max-w-5xl rounded-2xl p-5 md:p-8 lg:p-10 origin-top shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row h-full gap-6 lg:gap-10">
          <div className="lg:w-[45%] text-black/90 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold">{item.title}</h3>
              <p className="text-sm md:text-base mt-4 leading-relaxed">{item.description}</p>
            </div>
            <a
              href={item.link}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] mt-6"
            >
              See more
              <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="relative lg:w-[55%] h-full rounded-xl overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProductIntelligence() {
  return (
    <ReactLenis root>
      <section className="text-white relative">
        <div className="absolute inset-0 w-full h-150">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover ">
            <source
              src="https://cdn.shopify.com/videos/c/vp/1374775a98a64e3bafc2e8ee5224154e/1374775a98a64e3bafc2e8ee5224154e.HD-1080p-4.8Mbps-13542835.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="h-92" />
        <div className="relative flex flex-col items-center ">
          <div className="absolute top-0 h-57.5 w-full bg-linear-to-t from-black to-transparent "></div>
          <div className="absolute top-57.5 bottom-0 bg-black w-full  h-full"></div>

          <div className="h-full px-4 md:px-10 xl:px-0 relative space-y-10 md:space-y-11.5 xl:space-y-20 xl:max-w-300">
            <h2 className="text-headline font-bold text-center">Intelligence Made Alive</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              {statsData.map((stat) => (
                <div key={stat.value} className="flex flex-col items-center text-center gap-3">
                  <p className="text-lg leading-7 md:text-3xl xl:text-4xl font-semibold">
                    {stat.value}
                  </p>
                  <p className="text-base max-w-48 text-auxiliary">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-md leading-6 md:text-lg md:leading-7 xl:text-4xl xl:leading-11 font-bold text-center pb-5 md:pb-6">
                Interactive Nature Powered by GPT
              </h3>

              <div className="relative w-full">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] opacity-40"></div>
                <StackedShowcaseCards items={showcaseProjects} />
              </div>
            </div>

            <div className="flex flex-col  items-center ">
              <h3 className="text-md leading-6 md:text-lg md:leading-7 xl:text-4xl xl:leading-11 font-bold text-center pb-5 md:pb-6">
                Technology That Understands
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 xl:max-w-230">
                <div className="flex flex-col">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0737/1194/3957/files/valentine-gift.webp?v=1770084429"
                      alt="Child playing with Loona"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-lg mb-2">
                      Intelligent Perception & Interaction
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Face Recognition: Recognizes family members, remembers preferences for
                      personalized interactions.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0737/1194/3957/files/how-we-ranked-these-valentine-gifts.webp?v=1770087499"
                      alt="Face recognition technology"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-lg mb-2">
                      Intelligent Perception & Interaction
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Face Recognition: Recognizes family members, remembers preferences for
                      personalized interactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ReactLenis>
  );
}

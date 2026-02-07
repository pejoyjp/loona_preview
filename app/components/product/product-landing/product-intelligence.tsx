import { MessageSquare, Eye, Palette, Heart } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ReactLenis } from "lenis/react";

const statsData = [
  { value: "5 Trillion", label: "calculations per second for fast decision-making" },
  { value: "200", label: "user inputs per minute with voice, gesture, and facial recognition" },
  { value: "95%", label: "accuracy in recognizing facial expressions and gestures" },
];

const featuresData = [
  {
    icon: MessageSquare,
    title: "Loona Converses",
    description:
      "From thoughtful discussions to creative storytelling, chat with a friend who adds movie-like charm to every conversation.",
    color: "text-green-400",
  },
  {
    icon: Eye,
    title: "Loona Perceives",
    description:
      "Show Loona objects, pictures, or your surroundings - she'll bring them to life with colorful descriptions and stories.",
    color: "text-blue-400",
  },
  {
    icon: Palette,
    title: "Loona Creates",
    description:
      "Speak your imagination, and watch it bloom. Loona's AI transforms your ideas into vibrant digital artwork.",
    color: "text-yellow-400",
  },
  {
    icon: Heart,
    title: "Loona Learns",
    description:
      "Building memories together is what makes Loona unique. Through each interaction, Loona understands you and your home better, creating a more personalized companionship.",
    color: "text-pink-400",
  },
];

type FeatureItem = (typeof featuresData)[number];

function StackedShowcaseCards({ items }: { items: FeatureItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef}>
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
  item: FeatureItem;
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

  const contentScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  const IconComponent = item.icon;

  return (
    <div ref={cardRef} className="h-70 flex items-center justify-center sticky top-80 w-full">
      <motion.div
        style={{
          scale,
          top: `${index * 20}px`,
        }}
        className="relative w-full h-43"
      >
        <motion.div
          style={{ scale: contentScale }}
          className="rounded-sm border  p-4 flex flex-col gap-3 items-center justify-center  backdrop-blur"
        >
          <IconComponent className={`w-8 h-8  ${item.color} `} />
          <h4 className="text-card-title">{item.title}</h4>
          <p className="text-center text-base text-auxiliary">{item.description}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProductIntelligence() {
  return (
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
            <h3 className="text-md sticky top-40 md:required: md:top-auto leading-6 md:text-lg md:leading-7 xl:text-4xl xl:leading-11 font-bold text-center pb-5 md:pb-6">
              Interactive Nature Powered by GPT
            </h3>
            <div className="sticky top-40">
              <ReactLenis root>
                <div className="relative w-full md:hidden">
                  <StackedShowcaseCards items={featuresData} />
                </div>
              </ReactLenis>
            </div>

            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 xl:max-w-198.5">
              {featuresData.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="border border-muted-foreground border-0.25 rounded-sm p-4 flex flex-col gap-3 items-center"
                  >
                    <IconComponent className={`w-8 h-8  ${feature.color} `} />
                    <h4 className="text-card-title">{feature.title}</h4>
                    <p className="text-center text-base text-auxiliary">{feature.description}</p>
                  </div>
                );
              })}
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
                  <p className="font-semibold text-lg mb-2">Intelligent Perception & Interaction</p>
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
                  <p className="font-semibold text-lg mb-2">Intelligent Perception & Interaction</p>
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
  );
}

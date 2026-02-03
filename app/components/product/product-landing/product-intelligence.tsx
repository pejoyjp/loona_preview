import { MessageSquare, Eye, Palette, Heart } from "lucide-react";

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

export function ProductIntelligence() {
  return (
    <section className=" text-white relative">
      {/* Hero Section with Video */}

      <div className="absolute inset-0 w-full h-150">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover ">
          <source
            src="https://cdn.shopify.com/videos/c/vp/1374775a98a64e3bafc2e8ee5224154e/1374775a98a64e3bafc2e8ee5224154e.HD-1080p-4.8Mbps-13542835.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="h-92" />

      <div className="relative ">
        <div className="absolute top-0 h-57.5 w-full bg-linear-to-t from-black to-transparent "></div>
        <div className="absolute top-57.5 bottom-0 bg-black w-full  h-full"></div>

        <div className="h-full px-4 relative space-y-10">
          <h2 className="text-xl leading-8 md:text-4xl xl:text-5xl font-bold text-center">
            Intelligence Made Alive
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {statsData.map((stat) => (
              <div key={stat.value} className="flex flex-col items-center text-center gap-3">
                <p className="text-lg leading-7 md:text-3xl xl:text-4xl font-semibold">
                  {stat.value}
                </p>
                <p className="text-base leading-5 max-w-48 text-auxiliary">{stat.label}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl leading-8 md:text-4xl xl:text-5xl font-bold text-center pb-4">
              Interactive Nature Powered by GPT
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {featuresData.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="border border-muted-foreground border-0.25 rounded-2xl p-4 flex flex-col gap-3 items-center "
                  >
                    <IconComponent className={`w-8 h-8  ${feature.color} `} />
                    <h4 className="text-lg leading-6">{feature.title}</h4>
                    <p className="text-center text-base leading-5 text-auxiliary">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" ">
            <h3 className="text-xl leading-8 md:text-4xl xl:text-5xl font-bold text-center pb-4">
              Technology That Understands
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
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
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
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

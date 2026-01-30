import { Close } from "@icon-park/react";
import { Image } from "@shopify/hydrogen";
import type { Image as ImageType } from "@shopify/hydrogen/storefront-api-types";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { cn } from "~/lib/utils/cn";

export const transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.5,
} as const;

interface IMediaModal {
  imgSrc?: string;
  videoSrc?: string;
  image?: ImageType;
  className?: string;
  size?: string;
}

export function MediaModal({ imgSrc, videoSrc, image, className, size }: IMediaModal) {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const uniqueId = useId();

  // useEffect(() => {
  //   if (isMediaModalOpen) {
  //     document.body.classList.add("overflow-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-hidden");
  //   }

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       setIsMediaModalOpen(false);
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [isMediaModalOpen]);

  // 6805f076aae9d7bc6fdc2d8f
  // 6805f076aae9d7bc6fdc2d8f-DcInAhZr72tzj7RLJ3qusEouwc66YbYD2IGF4uN2P9Tw5g5G3r

  return (
    <MotionConfig transition={transition}>
      <motion.div
        className="w-full h-full flex relative flex-col overflow-hidden border cursor-zoom-in dark:bg-black bg-gray-300 hover:bg-gray-200 dark:hover:bg-gray-950"
        layoutId={`dialog-${uniqueId}`}
        onClick={() => {
          setIsMediaModalOpen(true);
        }}
      >
        {imgSrc && (
          <motion.div layoutId={`dialog-img-${uniqueId}`} className="w-full h-full">
            <img
              src={imgSrc}
              alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
              className=" w-full object-cover h-full"
            />
          </motion.div>
        )}
        {image && (
          <motion.div layoutId={`dialog-image-${uniqueId}`} className="w-full h-full">
            <Image
              alt={image.altText || ""}
              aspectRatio="1/1"
              data={image}
              loading="eager"
              sizes={size}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
        {videoSrc && (
          <motion.div layoutId={`dialog-video-${uniqueId}`} className="w-full h-full">
            <video autoPlay muted loop className="h-full w-full object-cover  rounded-xs">
              <source src={videoSrc!} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence initial={false} mode="popLayout">
        {isMediaModalOpen && (
          <>
            <motion.div
              key={`backdrop-${uniqueId}`}
              className="fixed inset-0 h-full w-full z-50 bg-black/50"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => {
                setIsMediaModalOpen(false);
              }}
            />
            <motion.div
              key="dialog"
              className="pointer-events-none fixed inset-0 flex items-center justify-center z-50"
            >
              <motion.div
                className={cn(
                  "pointer-events-auto relative flex flex-col overflow-hidden dark:bg-gray-950 bg-gray-200 border w-1/4 aspect-square",
                  imgSrc && "cursor-zoom-out",
                )}
                layoutId={`dialog-${uniqueId}`}
                layout={isMediaModalOpen}
                tabIndex={-1}
                style={{
                  borderRadius: "24px",
                }}
              >
                {imgSrc && (
                  <motion.div
                    layoutId={`dialog-img-${uniqueId}`}
                    className="w-full h-full"
                    onClick={() => setIsMediaModalOpen(false)}
                  >
                    <img src={imgSrc} alt="" className="h-full w-full object-cover" />
                    <button
                      onClick={() => setIsMediaModalOpen(false)}
                      className="absolute right-6 top-6 p-3 text-zinc-50 cursor-pointer dark:bg-gray-900 bg-gray-400 hover:bg-gray-500 rounded-xl dark:hover:bg-gray-800"
                      type="button"
                      aria-label="Close dialog"
                    >
                      <Close size={"24"} />
                    </button>
                  </motion.div>
                )}
                {image && (
                  <motion.div layoutId={`dialog-image-${uniqueId}`} className="w-full h-full">
                    <Image
                      alt=""
                      data={image}
                      sizes="(min-width: 45em) 400px, 100vw"
                      className="object-cover"
                    />
                    <button
                      onClick={() => setIsMediaModalOpen(false)}
                      className="absolute right-6 top-6 p-3 text-zinc-50 cursor-pointer dark:bg-gray-900 bg-gray-400 hover:bg-gray-500 rounded-xl dark:hover:bg-gray-800"
                      type="button"
                      aria-label="Close dialog"
                    >
                      <Close size={"24"} />
                    </button>
                  </motion.div>
                )}
                {videoSrc && (
                  <motion.div layoutId={`dialog-video-${uniqueId}`} className="w-full h-full">
                    <video
                      autoPlay
                      muted
                      loop
                      controls
                      className="h-full w-full object-cover  rounded-xs"
                    >
                      <source src={videoSrc!} type="video/mp4" />
                    </video>
                  </motion.div>
                )}
                {videoSrc && (
                  <button
                    onClick={() => setIsMediaModalOpen(false)}
                    className="absolute right-6 top-6 p-3 text-zinc-50 cursor-pointer dark:bg-gray-900 bg-gray-400 hover:bg-gray-500 rounded-xl dark:hover:bg-gray-800"
                    type="button"
                    aria-label="Close dialog"
                  >
                    <Close size={"24"} />
                  </button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

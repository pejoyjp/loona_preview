import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils/cn";
import { useThrottledCallback } from "@mantine/hooks";
import { motion, LayoutGroup } from "motion/react";

interface ScrollspyNavProps {
  sections: Array<{
    ref: React.RefObject<HTMLDivElement>;
    label: string;
  }>;
  className?: string;
}

export function ScrollspyNav({ sections, className }: ScrollspyNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // 标记是否是点击触发的滚动
  const isManualScrolling = useRef(false);
  const scrollTimer = useRef<number | null>(null);

  const OFFSET = 100;

  // 滚动监听（节流）
  const throttledScroll = useThrottledCallback(() => {
    if (isManualScrolling.current) return;

    let currentIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      const el = sections[i].ref.current;
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top <= OFFSET + 2) {
        currentIndex = i;
      } else {
        break;
      }
    }

    setActiveIndex((prev) => (prev === currentIndex ? prev : currentIndex));
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll, { passive: true });

    const handleScrollEnd = () => {
      if (isManualScrolling.current) {
        isManualScrolling.current = false;
        throttledScroll();
      }
    };

    window.addEventListener("scrollend", handleScrollEnd);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, [sections, throttledScroll]);

  const handleClick = (index: number) => {
    isManualScrolling.current = true;
    setActiveIndex(index);

    const targetElement = sections[index]?.ref.current;
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - OFFSET,
        behavior: "smooth",
      });
    }

    if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-10 bg-white/80 backdrop-blur-md dark:bg-neutral-950/80",
        className,
      )}
    >
      <LayoutGroup id="scrollspy-nav">
        <ul className="flex gap-2 p-2">
          {sections.map((section, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(index)}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap relative",
                  "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50",
                  activeIndex === index && "text-neutral-900 dark:text-neutral-50",
                )}
              >
                {section.label}

                {activeIndex === index && (
                  <motion.span
                    layoutId="scrollspy-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-neutral-50"
                    transition={{
                      type: "tween",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </LayoutGroup>
    </nav>
  );
}

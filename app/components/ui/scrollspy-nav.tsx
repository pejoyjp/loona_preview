import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "~/lib/cn";
import { motion, LayoutGroup } from "motion/react";
import { Button } from "./button";

interface ScrollspyNavProps {
  sections: Array<{
    ref: React.RefObject<HTMLDivElement>;
    label: string;
  }>;
  className?: string;
  offset?: number;
}

export function ScrollspyNav({ sections, className, offset = 100 }: ScrollspyNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isManualScrolling = useRef(false);
  const scrollTimer = useRef<number | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const validSections = sections
      .map((s, index) => ({ el: s.ref.current, index }))
      .filter((s): s is { el: HTMLDivElement; index: number } => s.el !== null);

    if (validSections.length === 0) return;

    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;

        let topmostVisibleIndex = -1;
        let topmostY = Infinity;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            if (rect.top <= offset + 50 && rect.top < topmostY) {
              topmostY = rect.top;
              topmostVisibleIndex = validSections.findIndex((s) => s.el === entry.target);
            }
          }
        }

        if (topmostVisibleIndex !== -1) {
          setActiveIndex((prev) => (prev === topmostVisibleIndex ? prev : topmostVisibleIndex));
        }
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    validSections.forEach(({ el }) => {
      intersectionObserverRef.current?.observe(el);
    });

    return () => {
      intersectionObserverRef.current?.disconnect();
    };
  }, [sections, offset]);

  const handleClick = useCallback(
    (index: number) => {
      isManualScrolling.current = true;
      setActiveIndex(index);

      const targetElement = sections[index]?.ref.current;
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }

      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    },
    [sections, offset],
  );

  return (
    <nav className={cn("flex justify-center h-9.5 xl:h-13.5 items-center relative", className)}>
      <LayoutGroup id="scrollspy-nav">
        <ul className="flex gap-3 md:gap-6 text-base leading-5.5 ">
          {sections.map((section, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(index)}
                className={cn("relative  py-2 px-4", " hover:text-primary ")}
              >
                {section.label}

                {activeIndex === index && (
                  <motion.span
                    layoutId="scrollspy-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
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
          <li className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block">
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full px-10 xl:px-6"
            >
              Buy Now
            </Button>
          </li>
        </ul>
      </LayoutGroup>
    </nav>
  );
}

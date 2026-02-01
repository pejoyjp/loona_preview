import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@mantine/hooks";

interface UseViewportProps {
  onExitMobile?: () => void;
}

export function useViewport({ onExitMobile }: UseViewportProps = {}) {
  const [mounted, setMounted] = useState(false);
  const onExitMobileRef = useRef(onExitMobile);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    onExitMobileRef.current = onExitMobile;
  });

  useEffect(() => {
    if (!mounted) return;
    if (!isMobile) {
      onExitMobileRef.current?.();
    }
  }, [mounted, isMobile]);

  return {
    mounted,
    isMobile,
    isDesktop,
    canRender: mounted && isMobile,
  };
}

import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@mantine/hooks";

interface UseClientMobileProps {
  onExitMobile?: () => void;
}

export function useClientMobile({ onExitMobile }: UseClientMobileProps = {}) {
  const [mounted, setMounted] = useState(false);
  const onExitMobileRef = useRef(onExitMobile);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

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
    canRender: mounted && isMobile,
  };
}

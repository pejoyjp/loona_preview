import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

interface UseClientMobileProps {
  onExitMobile?: () => void;
}

export function useClientMobile(options?: UseClientMobileProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (!mounted) return;
    if (!isMobile) {
      options?.onExitMobile?.();
    }
  }, [mounted, isMobile, options]);

  return {
    mounted,
    isMobile,
    canRender: mounted && isMobile,
  };
}

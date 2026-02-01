import { create } from "zustand";

interface ViewportState {
  isMobile: boolean;
  isDesktop: boolean;
  canRender: boolean;
  setIsMobile: (value: boolean) => void;
  setIsDesktop: (value: boolean) => void;
  setCanRender: (value: boolean) => void;
}

export const useViewportStore = create<ViewportState>((set) => ({
  isMobile: false,
  isDesktop: false,
  canRender: false,
  setIsMobile: (value) => set({ isMobile: value }),
  setIsDesktop: (value) => set({ isDesktop: value }),
  setCanRender: (value) => set({ canRender: value }),
}));

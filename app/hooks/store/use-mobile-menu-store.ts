import { create } from "zustand";

interface MobileMenuDrawerStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useMobileMenuDrawerStore = create<MobileMenuDrawerStore>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

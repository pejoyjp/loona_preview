import { create } from "zustand";

interface CountrySelectorStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCountrySelectorStore = create<CountrySelectorStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

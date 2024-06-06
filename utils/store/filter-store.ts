import { create } from "zustand";

export type FilterSettings = {
  numMembers: number;
  languages: string[];
}

type FilterStore = {
  settings: FilterSettings;
  setSettings: (newSettings: FilterSettings) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  settings: {
    numMembers: 0,
    languages: []
  },
  setSettings: (newSettings) => set({ settings: newSettings })
}));

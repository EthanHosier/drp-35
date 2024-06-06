import { create } from "zustand";

type FilterStore = {
  numMembers: number;
  setNumMembers: (newNum: number) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  numMembers: 0,
  setNumMembers: (newNum) => {
    set({ numMembers: newNum });
  }
}));

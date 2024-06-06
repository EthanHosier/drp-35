import { create } from "zustand";

type FilterStore = {
  numMembers: number;
  setNumMembers: (newNumMmebers: number) => void;

  languages: string[];
  addLanguage: (language: string) => void;
  removeLanguage: (language: string) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  numMembers: 0,
  setNumMembers: (newNumMembers) => set({ numMembers: newNumMembers }),

  languages: [],
  addLanguage: (language: string) => {
    set((state) => ( {...state, languages: [...state.languages, language] }));
  },
  removeLanguage: (language: string) => {
    set((state) => ({...state,
      languages: state.languages.filter((s) => s !== language),
    }));
  },
}));

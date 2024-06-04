import { create } from "zustand";

type LanguagesStore = {
  languages: string[];
  setLanguages: (languages: string[]) => void;
  addLanguage: (language: string) => void;
  removeLanguage: (language: string) => void;
};

export const useLanguagesStore = create<LanguagesStore>((set) => ({
  languages: [],
  setLanguages: (languages: string[]) => {
    set({ languages });
  },
  addLanguage: (language: string) => {
    set((state) => ({ languages: [...state.languages, language] }));
  },
  removeLanguage: (language: string) => {
    set((state) => ({
      languages: state.languages.filter((s) => s !== language),
    }));
  },
}));

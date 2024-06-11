import { create } from "zustand";

export type FilterStore = {
  numMembers: number;
  setNumMembers: (newNumMmebers: number) => void;

  languages: string[];
  addLanguage: (language: string) => void;
  removeLanguage: (language: string) => void;

  skills: string[];
  addSkill: (language: string) => void;
  removeSkill: (language: string) => void;
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

  skills: [],
  addSkill: (skill: string) => {
    set((state) => ( {...state, skills: [...state.skills, skill] }));
  },
  removeSkill: (skill: string) => {
    set((state) => ({...state,
      skills: state.skills.filter((s) => s !== skill),
    }));
  },
}));

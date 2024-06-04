import { create } from "zustand";

type SkillsStore = {
  skills: string[];
  setSkills: (skills: string[]) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
};

export const useSkillsStore = create<SkillsStore>((set) => ({
  skills: [],
  setSkills: (skills: string[]) => {
    set({ skills });
  },
  addSkill: (skill: string) => {
    set((state) => ({ skills: [...state.skills, skill] }));
  },
  removeSkill: (skill: string) => {
    set((state) => ({ skills: state.skills.filter((s) => s !== skill) }));
  },
}));

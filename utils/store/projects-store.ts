import { create } from "zustand";

export type Project = {
  description: string;
  maxGroupSize: number;
  minGroupSize: number;
  name: string;
  projectId: string;
  startDateTime: Date;
  image: string;
};

type ProjectsStore = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
};

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  setProjects: (projects: Project[]) => {
    set({ projects });
  },
  addProject: (project: Project) => {
    set((state) => ({
      projects: [...state.projects, project],
    }));
  },
}));

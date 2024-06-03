import { create } from "zustand";

type ProjectFieldsStore = {
  image: string;
  setImage: (image: string) => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  minGroupSize: string;
  setMinGroupSize: (minGroupSize: string) => void;
  maxGroupSize: string;
  setMaxGroupSize: (maxGroupSize: string) => void;
  startDateTime: Date;
  setStartDateTime: (startDateTime: Date) => void;
};

export const useProjectFieldsStore = create<ProjectFieldsStore>((set) => ({
  image: "",
  setImage: (image: string) => {
    set({ image });
  },
  name: "",
  setName: (name: string) => {
    set({ name });
  },
  description: "",
  setDescription: (description: string) => {
    set({ description });
  },
  minGroupSize: "",
  setMinGroupSize: (minGroupSize: string) => {
    set({ minGroupSize });
  },
  maxGroupSize: "",
  setMaxGroupSize: (maxGroupSize: string) => {
    set({ maxGroupSize });
  },
  startDateTime: new Date(),
  setStartDateTime: (startDateTime: Date) => {
    set({ startDateTime });
  },
}));

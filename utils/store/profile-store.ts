import { create } from "zustand";

type ProfileStore = {
  image: string;
  setImage: (newImage: string) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  image: "",
  setImage: (newImage) => {
    set({ image: newImage });
  },
}));

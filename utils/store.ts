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

type UserIdStore = {
  userId: string;
  setUserId: (newUserId: string) => void;
};

export const useUserIdStore = create<UserIdStore>((set) => ({
  userId: "",
  setUserId: (newUserId) => {
    set({ userId: newUserId });
  },
}));

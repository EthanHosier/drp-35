import { create } from "zustand";

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

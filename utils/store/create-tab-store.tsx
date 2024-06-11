import { create } from "zustand";

enum Tab {
  Projects,
  Organisations,

}

type CreateTabStore = {
  tab: Tab,
  setTab: (tab: Tab) => void;
};

export const useCreateTabStore = create<CreateTabStore>((set) => ({
  tab: Tab.Projects,
  setTab: (tab: Tab) => {
    set({ tab: tab });
  },
}));
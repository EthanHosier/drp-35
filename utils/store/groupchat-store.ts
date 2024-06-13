import { create } from "zustand";
import { GroupChat, Message } from "../api/groupchats";

type GroupChatStore = {
  groupChats: GroupChat[];
  setGroupChats: (groupChats: GroupChat[]) => void;
  addGroupChat: (groupChat: GroupChat) => void;
  addMessage: (groupId: string, message: Message) => void;
};

export const useGroupchatStore = create<GroupChatStore>((set) => ({
  groupChats: [],
  setGroupChats: (groupChats: GroupChat[]) => {
    set({ groupChats });
  },
  addGroupChat: (groupChat: GroupChat) => {
    set((state) => ({
      groupChats: [
        ...state.groupChats.filter((g) => g.group_id != groupChat.group_id),
        groupChat,
      ],
    }));
  },
  addMessage: (groupId: string, message: Message) => {
    set((state) => {
      const groupChat = state.groupChats.find(
        (groupChat) => groupChat.group_id === groupId
      );
      if (!groupChat) return state;

      groupChat.messages = [...groupChat.messages, message];

      let newGroupchats = [
        ...state.groupChats.filter((g) => g.group_id != groupId),
      ];
      newGroupchats = [...newGroupchats, groupChat];

      return { groupChats: newGroupchats };
    });
  },
}));

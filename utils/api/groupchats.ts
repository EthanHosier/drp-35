import { useGroupchatStore } from "../store/groupchat-store";
import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { getProjectPicUrl } from "./project-pics";

export type Message = {
  id: string;
  group_id: string;
  content: string;
  created_at: string;
  sender_id: string;
};

export type GroupChat = {
  group_id: string;
  name: string;
  created_at: string;
  messages: Message[];
  imgUri: string;
};

export const sendMessage: (
  groupId: string,
  content: string
) => Promise<DRPResponse<null>> = async (groupId, content) => {
  const { data, error } = await supabase
    .from("messages")
    .insert({ group_id: groupId, content })
    .select()
    .single();

  if (error) return { data: null, error };

  return { data: null, error: null };
};

export const getGroupchat: (
  group_id: string
) => Promise<DRPResponse<GroupChat>> = async (group_id) => {
  const { data: groupChat, error } = await supabase
    .from("groups")
    .select("*, messages(*), projects(name)")
    .eq("group_id", group_id)
    .order("created_at", { referencedTable: "messages" })
    .single();

  if (error) return { data: null, error };

  return {
    data: {
      ...groupChat,
      name: groupChat.projects!.name,
      imgUri: getProjectPicUrl(groupChat.project_id).data!,
    },
    error: null,
  };
};

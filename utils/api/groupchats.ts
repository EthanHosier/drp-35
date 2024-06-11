import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

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
};

export const sendMessage: (
  groupId: string,
  content: string
) => Promise<DRPResponse<null>> = async (groupId, content) => {
  const { error } = await supabase
    .from("messages")
    .insert({ group_id: groupId, content });

  if (error) return { data: null, error };
  return { data: null, error: null };
};

export const getGroupchat: (
  group_id: string
) => Promise<DRPResponse<GroupChat>> = async (group_id) => {
  const { data: groupChat, error } = await supabase
    .from("group_chats")
    .select("*,messages(*)")
    .eq("group_id", group_id)
    .single();

  if (error) return { data: null, error };

  return { data: groupChat, error: null };
};

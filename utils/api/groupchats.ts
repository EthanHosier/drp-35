import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

export type Message = {
  id: string;
  group_id: string;
  content: string;
  created_at: string;
};

export type GroupChat = {
  id: string;
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

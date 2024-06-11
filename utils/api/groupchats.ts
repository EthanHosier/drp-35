import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

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

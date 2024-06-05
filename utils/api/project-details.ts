import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

export const getProjectDetails: (
  projectId: string
) => Promise<DRPResponse> = async (projectId) => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("project_id", projectId)
    .single();
  if (error) {
    return { data: null, error };
  }
  return { data, error: null };
};

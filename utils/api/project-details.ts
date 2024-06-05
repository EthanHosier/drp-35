import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

export type Project = {
  description: string;
  max_group_size: number;
  min_group_size: number;
  name: string;
  start_date_time: string;
};

export const getProjectDetails: (
  projectId: string
) => Promise<DRPResponse<Project>> = async (projectId) => {
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

export const getProjectGroups: (
  projectId: string
) => Promise<DRPResponse<null>> = async (projectId) => {
  const {} = await supabase
    .from("projects")
    .select("")
    .eq("project_id", projectId);
  return { data: null, error: null };
};

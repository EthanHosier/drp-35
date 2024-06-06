import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { Project } from "./project-details";

export const getProjectsByOrganisation: (
  orgId: string
) => Promise<DRPResponse<Project[]>> = async (orgId) => {
  const { data, error } = await supabase
    .from("organisations")
    .select("projects(*)")
    .eq("org_id", orgId)
    .single();
  if (error) return { data: null, error };
  return { data: data.projects, error: null };
};

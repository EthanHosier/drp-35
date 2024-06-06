import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { Project } from "./project-details";

export type Organisation = {
  name: string;
  description: string;
  org_id: string;
};

export const getAllOrganisations: () => Promise<
  DRPResponse<Organisation[]>
> = async () => {
  return await supabase.from("organisations").select();
};

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

export const joinOrganisation: (
  orgId: string,
  userId: string
) => Promise<DRPResponse<null>> = async (orgId, userId) => {
  return await supabase
    .from("organisation_members")
    .insert({ org_id: orgId, user_id: userId });
};

export const leaveOrganisation: (
  orgId: string,
  userId: string
) => Promise<DRPResponse<null>> = async (orgId, userId) => {
  return await supabase
    .from("organisation_members")
    .delete()
    .eq("org_id", orgId)
    .eq("user_id", userId);
};

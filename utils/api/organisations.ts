import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { Project } from "./project-details";

export type Organisation = {
  name: string;
  subtitle: string;
  description: string;
  org_id: string;
  image: string;
};

export const getOrganisationById: (
    orgId: string
) => Promise<DRPResponse<Organisation>> = async (orgId) => {
    const { data: rawData, error } = await supabase
        .from("organisations")
        .select("*")
        .eq("org_id", orgId)
        .single();
    if (error) return { data: null, error };

    const data: Organisation = rawData!;
    return { data, error: null };
};

export const getAllJoinedOrganisations: (
  userId: string
) => Promise<DRPResponse<Organisation[]>> = async (userId) => {
  const { data: rawData, error } = await supabase
    .from("organisation_members")
    .select("organisations(*)")
    .eq("user_id", userId);
  if (error) return { data: null, error };

  const data: Organisation[] = rawData.map(
    (organisation) => organisation.organisations!
  );
  return { data, error: null };
};

export const getAllOrganisationsExceptJoined: (
  userId: string
) => Promise<DRPResponse<Organisation[]>> = async (userId) => {
  const { data: rawData, error } = await supabase
    .from("organisations")
    .select("*, organisation_members(user_id)");
  if (error) return { data: null, error };

  const data: Organisation[] = rawData.filter(
    (organisation) =>
      !organisation.organisation_members.some(
        (member) => member.user_id === userId
      )
  );
  return { data, error: null };
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

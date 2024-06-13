import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { getOrganisationPicUrl } from "./organisation-pics";
import { Project } from "./project-details";
import { getProjectPicUrl } from "./project-pics";

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

  const data = {
    ...rawData,
    image: getOrganisationPicUrl(rawData.org_id).data!,
  };
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

  const data: Organisation[] = rawData.map((organisation) => ({
    ...organisation.organisations!,
    image: getOrganisationPicUrl(organisation.organisations!.org_id).data!,
  }));
  return { data, error: null };
};

export const getAllOrganisationsExceptJoined: (
  userId: string
) => Promise<DRPResponse<Organisation[]>> = async (userId) => {
  const { data: rawData, error } = await supabase
    .from("organisations")
    .select("*, organisation_members(user_id)");
  if (error) return { data: null, error };

  const data: Organisation[] = rawData
    .filter(
      (organisation) =>
        !organisation.organisation_members.some(
          (member) => member.user_id === userId
        )
    )
    .map((organisation) => ({
      ...organisation,
      image: getOrganisationPicUrl(organisation.org_id).data!,
    }));

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
  return {
    data: data.projects.map((project) => ({
      ...project,
      image_uri: getProjectPicUrl(project.project_id).data!,
    })),
    error: null,
  };
};

export const joinOrganisation: (
  orgId: string,
  userId: string
) => Promise<DRPResponse<null>> = async (orgId, userId) => {
  return await supabase
    .from("organisation_members")
    .insert({ org_id: orgId, user_id: userId });
};

export const joinAllProjectsInOrg: (
  orgId: string,
  userId: string
) => Promise<DRPResponse<null>> = async (orgId, userId) => {
  // Get all projects in organisation
  const { data, error } = await supabase
    .from("projects")
    .select("project_id")
    .eq("org_id", orgId);
  if (error) return { data: null, error };

  for (const projectId of data.map((project) => project.project_id)) {
    // Create group
    const { data: newGroup, error: newGroupError } = await supabase
      .from("groups")
      .insert({ project_id: projectId })
      .select()
      .single();
    if (newGroupError) return { data: null, error: newGroupError };

    // Add yourself to the new group
    const { error: joinNewGroupError } = await supabase
      .from("group_members")
      .insert({ group_id: newGroup.group_id, user_id: userId });
    if (joinNewGroupError) return { data: null, error: joinNewGroupError };
  }

  return { data: null, error: null };
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

export const getOrganisationsByLeader: (
  leader: string
) => Promise<DRPResponse<Organisation[]>> = async (leader) => {
  const { data: rawData, error } = await supabase
    .from("organisations")
    .select()
    .eq("leader", leader);
  if (error) return { data: null, error };
  const data: Organisation[] = rawData.map((organisation) => ({
    ...organisation,
    image: getOrganisationPicUrl(organisation.org_id).data!,
  }));
  return { data, error: null };
};

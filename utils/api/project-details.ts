import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

export type Project = {
  description: string;
  max_group_size: number;
  min_group_size: number;
  name: string;
  start_date_time: string;
};

export type Group = {
  group_id: string;
  description: string;
  members: string[];
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
) => Promise<DRPResponse<Group[]>> = async (projectId) => {
  const { data: groups, error: groupIdError } = await supabase
    .from("groups")
    .select("group_id, description")
    .eq("project_id", projectId);
  if (groupIdError) return { data: null, error: groupIdError };

  const groupIds = groups.map((group) => group.group_id);

  const memberIds = new Map<string, string[]>();
  const errors = await Promise.all(
    groupIds.map(async (groupId) => {
      const { data: memberIdsInGroup, error: memberIdError } = await supabase
        .from("group_members")
        .select("user_id")
        .eq("group_id", groupId);
      if (memberIdError) return memberIdError;
      memberIds.set(
        groupId,
        memberIdsInGroup.map((e) => e.user_id)
      );
      return null;
    })
  );
  for (const error of errors) {
    if (error) return { data: null, error };
  }
  const data = groups.map((group) => ({
    ...group,
    members: memberIds.get(group.group_id)!,
  }));
  return { data, error: null };
};

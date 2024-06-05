import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { getProfilePicUrl } from "./profile-pics";
import { Profile } from "./profiles";

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
  members: Profile[];
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
  // Fetch groups and their members in a single query
  const { data, error } = await supabase
    .from("groups")
    .select("*, group_members(*, profiles(*))")
    .eq("project_id", projectId);

  console.log(error);
  // Handle any errors from the query
  if (error) return { data: null, error };

  // Transform the data to the desired structure
  const groups = data.map((group) => {
    return {
      group_id: group.group_id,
      description: group.description,
      members: group.group_members.map((member, i) => {
        const { user_id, ...profileWithoutUserId } = member.profiles;
        console.log(member.profiles);
        return {
          ...profileWithoutUserId,
          imageUrl: getProfilePicUrl(user_id).data ?? "",
        };
      }),
    };
  });
  return { data: groups, error: null };
};

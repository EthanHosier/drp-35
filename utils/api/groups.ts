import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { getProfilePicUrl } from "./profile-pics";
import { Profile } from "./profiles";
import { Group } from "./project-details";

export const getGroupById: (
  groupId: string
) => Promise<DRPResponse<Group>> = async (groupId) => {
  const { data, error } = await supabase
    .from("groups")
    .select("description, projects(max_group_size), group_members(profiles(*))")
    .eq("group_id", groupId)
    .single();
  if (error) return { data: null, error };

  const members: Profile[] = data.group_members.map((member) => {
    const profile: Profile = member.profiles;
    return { ...profile, imageUrl: getProfilePicUrl(profile.user_id).data! };
  });
  return {
    data: { description: data.description, group_id: groupId, members },
    error: null,
  };
};

export const getPendingGroupMembers: (
  groupId: string
) => Promise<DRPResponse<Profile[]>> = async (groupId) => {
  const { data: rawData, error } = await supabase
    .from("group_members_pending")
    .select("user_id, profiles(*)")
    .eq("group_id", groupId);
  if (error) return { data: null, error };

  const data: Profile[] = rawData.map((member) => {
    const profile: Profile = member.profiles;
    return { ...profile, imageUrl: getProfilePicUrl(profile.user_id).data! };
  });
  return { data, error: null };
};

export const requestToJoinGroup: (
  groupId: string,
  userId: string
) => Promise<DRPResponse<null>> = async (groupId, userId) => {
  const { data: projectId, error: projectIdError } = await supabase
    .from("groups")
    .select("project_id")
    .eq("group_id", groupId)
    .single();
  if (projectIdError) return { data: null, error: projectIdError };

  // Create group containing single user
  const { data: newGroup, error: newGroupError } = await supabase
    .from("groups")
    .insert({ project_id: projectId.project_id })
    .select()
    .single();
  if (newGroupError) return { data: null, error: newGroupError };

  const { error: requestError } = await supabase
    .from("group_requests")
    .insert({ request_group_id: newGroup.group_id, target_group_id: groupId });
  if (requestError) return { data: null, error: requestError };

  return { data: null, error: null };
};

export const acceptRequestToJoinGroup: (
  requestGroupId: string,
  targetGroupId: string
) => Promise<DRPResponse<null>> = async (requestGroupId, targetGroupId) => {
  const { error } = await supabase
    .from("group_requests")
    .delete()
    .eq("request_group_id", requestGroupId)
    .eq("target_group_id", targetGroupId);
  if (error) return { data: null, error };

  const { error: joinError } = await supabase
    .from("group_members")
    .update({ group_id: targetGroupId })
    .eq("group_id", requestGroupId);
  if (joinError) return { data: null, error: joinError };

  return { data: null, error: null };
};

export const rejectRequestToJoinGroup: (
  requestGroupId: string,
  targetGroupId: string
) => Promise<DRPResponse<null>> = async (requestGroupId, targetGroupId) => {
  const { error } = await supabase
    .from("group_requests")
    .delete()
    .eq("request_group_id", requestGroupId)
    .eq("target_group_id", targetGroupId);
  if (error) return { data: null, error };

  return { data: null, error: null };
};

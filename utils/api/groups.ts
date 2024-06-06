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
  return await supabase
    .from("group_members_pending")
    .insert({ group_id: groupId, user_id: userId });
};

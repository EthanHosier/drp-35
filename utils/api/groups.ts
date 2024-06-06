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
    const profile = member.profiles[0];
    return { ...profile, imageUrl: getProfilePicUrl(profile.user_id).data! };
  });
  return {
    data: { description: data.description, group_id: groupId, members },
    error: null,
  };
};

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
    const profile: Profile = {
      imageUrl: "",
      skills: ["DOESN'T FETCH SKILLS HERE"],
      languages: ["DOESN'T FETCH LANGS HERE"],
      ...member.profiles,
      id: member.profiles?.user_id ?? "",
    } as Profile;
    return { ...profile, imageUrl: getProfilePicUrl(profile.id).data! };
  });
  return {
    data: { description: data.description, group_id: groupId, members },
    error: null,
  };
};

export const getGroupRequests: (
  groupId: string
) => Promise<DRPResponse<Group[]>> = async (groupId) => {
  const { data, error } = await supabase
    .from("group_requests")
    .select(
      `
      request_group_id,
      groups!group_requests_request_group_id_fkey(
        *,
        group_members(
          *,
          profiles(
            *,
            user_skills(skill_name),
            user_languages(language_name)
          )
        )
      )
      `
    )
    .eq("target_group_id", groupId);
  if (error) return { data: null, error };

  const groups = data.map((group) => {
    return {
      group_id: group.request_group_id,
      description: group.groups!.description,
      members: group.groups!.group_members.map((member) => {
        const { user_id, ...profile } = member.profiles!;
        return {
          ...profile,
          id: user_id,
          imageUrl: getProfilePicUrl(user_id).data ?? "",
          skills: profile.user_skills.map((skill) => skill.skill_name),
          languages: profile.user_languages.map(
            (language) => language.language_name
          ),
        };
      }),
    };
  });

  return { data: groups, error: null };
};

export const requestToJoinGroup: (
  targetGroupId: string,
  requestGroupId: string | null,
  projectId: string,
  userId: string
) => Promise<DRPResponse<null>> = async (groupId, requestGroupId, projectId, userId) => {
  const { data, error } = await checkIfUserHasGroup(projectId, userId);
  if (error) return { data: null, error };
  if (data && requestGroupId) {
    return await requestToMergeGroups(requestGroupId, groupId);
  } else {
    return await createGroupAndRequestToJoin(groupId, projectId, userId);
  }
};

export const checkIfUserHasGroup: (
  projectId: string,
  userId: string
) => Promise<DRPResponse<boolean>> = async (projectId, userId) => {
  const { count, error } = await supabase
    .from("group_members")
    .select(
      `
      groups(
        project_id
      )
      `,
      { count: "exact", head: true }
    )
    .eq("user_id", userId)
    .eq("groups.project_id", projectId);
  if (error) return { data: null, error };
  return { data: count! > 0, error: null };
};

export const requestToMergeGroups: (
  requestGroupId: string,
  targetGroupId: string
) => Promise<DRPResponse<null>> = async (requestGroupId, targetGroupId) => {
  const { error } = await supabase.from("group_requests").insert({
    request_group_id: requestGroupId,
    target_group_id: targetGroupId,
  });
  if (error) return { data: null, error };
  return { data: null, error: null };
};

export const createGroupAndRequestToJoin: (
  groupId: string,
  projectId: string,
  userId: string
) => Promise<DRPResponse<null>> = async (groupId, projectId, userId) => {
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

  const { error: mergeRequestsError} = await supabase
    .from("group_requests")
    .update({ target_group_id: targetGroupId })
    .eq("target_group_id", requestGroupId);
  if (mergeRequestsError) return { data: null, error: mergeRequestsError };

  const {error: deleteError} = await supabase
    .from("groups")
    .delete()
    .eq("group_id", requestGroupId);
  if (deleteError) return { data: null, error: deleteError };

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

export const isMatch: (
  requestGroupId: string,
  targetGroupId: string
) => Promise<DRPResponse<boolean>> = async (requestGroupId, targetGroupId) => {
  // requestGroupId is the group making the latest swipe request
  const { count, error } = await supabase
    .from("group_requests")
    .select("", { count: "exact", head: true })
    .eq("request_group_id", targetGroupId)
    .eq("target_group_id", requestGroupId);
  if (error) return { data: null, error };
  return { data: count! > 0, error: null };
};

// TODO: refactor to use joins
export const getGroupIdFromProjectIdAndUserId = async (
  projectId: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from("group_members")
    .select(
      `
    user_id,
    groups(group_id)

  `
    )
    .eq("user_id", userId);
  // .filter("group_members.user_id", "eq", userId);
  if (error) return { data: null, error };

  return { data: data[0].groups?.group_id, error };
};

import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { getProfilePicUrl } from "./profile-pics";
import { Profile } from "./profiles";
import { getProjectPicUrl } from "./project-pics";
import {getAverageRating} from "@/utils/api/reviews";

export type Project = {
  description: string;
  max_group_size: number;
  min_group_size: number;
  name: string;
  start_date_time: string;
  project_id: string;
  image_uri: string;
  end_date_time: string;
};

export type Group = {
  group_id: string;
  description: string;
  members: Profile[];
};

export const getAllProjects: () => Promise<
  DRPResponse<Project[]>
> = async () => {
  const { data: rawData, error } = await supabase.from("projects").select();
  if (error) return { data: null, error };
  const data = rawData.map((project) => ({
    ...project,
    image_uri: getProjectPicUrl(project.project_id).data!,
  }));
  return { data, error: null };
};

export const getAllProjectsExceptJoined: (
  userId: string
) => Promise<DRPResponse<Project[]>> = async (userId) => {
  const { data, error } = await supabase.from("projects").select(
    `
    *,
    groups(
      group_members(user_id)
    )
    `
  );
  if (error) return { data: null, error };
  const filteredData = data.filter((project) => {
    const userJoined = project.groups.some((group) =>
      group.group_members.some((member) => member.user_id === userId)
    );
    return !userJoined;
  });
  const processedData = filteredData.map((project) => ({
    ...project,
    image_uri: getProjectPicUrl(project.project_id).data!,
  }));
  return { data: processedData, error: null };
};

export const getProjectDetails: (
  projectId: string
) => Promise<DRPResponse<Project>> = async (projectId) => {
  const { data: rawData, error } = await supabase
    .from("projects")
    .select()
    .eq("project_id", projectId)
    .single();
  if (error) {
    return { data: null, error };
  }
  const image_uri = getProjectPicUrl(projectId).data!;
  if (error) return { data: null, error };
  const data = { ...rawData, image_uri };
  return { data, error: null };
};

export const getProjectGroups: (
  projectId: string
) => Promise<DRPResponse<Group[]>> = async (projectId) => {
  // Fetch groups and their members in a single query
  const { data, error } = await supabase
    .from("groups")
    .select(
      `
      *,
      group_members(
        *,
        profiles(
          *,
          user_skills(skill_name),
          user_languages(language_name)
        )
      )
      `
    )
    .eq("project_id", projectId);

  // Handle any errors from the query
  if (error) return { data: null, error };

  const ratings = await Promise.all(data.map(async (group) => {
    return await Promise.all(group.group_members.map(async (member) => {
      return (await getAverageRating(member.user_id)).data ?? 0;
    }));
  }));

  // Transform the data to the desired structure
  const groups = data.map((group, i) => {
    return {
      group_id: group.group_id,
      description: group.description,
      members: group.group_members.map((member, j) => {
        const { user_id, ...profile } = member.profiles;
        return {
          ...profile,
          imageUrl: getProfilePicUrl(user_id).data ?? "",
          rating: ratings[i][j] ?? 0,
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

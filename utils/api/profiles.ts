import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";
import { getProfilePicUrl } from "./profile-pics";

export type Profile = {
  imageUrl: string;
  full_name: string;
  pronouns: string;
  university: string;
  course: string;
  linkedin: string;
  github: string;
  website: string;
  skills: string[];
  languages: string[];
  id: string;
};

export const getProfileByUserId: (
  userId: string
) => Promise<DRPResponse<Profile>> = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, user_skills(skill_name), user_languages(language_name)")
    .eq("user_id", userId)
    .single();
  if (error) return { data: null, error };
  const imageUrl = getProfilePicUrl(userId).data!;
  return {
    data: {
      fullName: data.full_name,
      ...data,
      id: userId,
      imageUrl,
      skills: data.user_skills.map((skill) => skill.skill_name),
      languages: data.user_languages.map((language) => language.language_name),
    },
    error: null,
  };
};

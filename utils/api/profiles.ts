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
};

export const getProfileByUserId: (
  userId: string
) => Promise<DRPResponse<Profile>> = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", userId)
    .single();
  if (error) return { data: null, error };
  const imageUrl = getProfilePicUrl(userId).data!;
  return { data: { ...data, imageUrl }, error: null };
};

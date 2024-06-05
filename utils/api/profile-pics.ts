import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

export const getProfilePicUrl: (userId: string) => DRPResponse<string> = (
  userId
) => {
  const { data } = supabase.storage.from("profilepics").getPublicUrl(userId);
  return { data: data.publicUrl, error: null };
};

export const uploadProfilePic: (
  userId: string,
  imageBase64: string,
  imageMimeType: string
) => Promise<DRPResponse<null>> = async (
  userId,
  imageBase64,
  imageMimeType
) => {
  const { error } = await supabase.storage
    .from("profilepics")
    .upload(userId, decode(imageBase64), {
      contentType: imageMimeType,
      upsert: true,
    });
  if (error) return { data: null, error };
  return { data: null, error: null };
};

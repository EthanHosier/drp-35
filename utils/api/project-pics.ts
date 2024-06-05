import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";
import { DRPError } from "./error-types";

export const getProjectPicUrl: (projectId: string) => string = (projectId) => {
  const { data } = supabase.storage.from("projectpics").getPublicUrl(projectId);
  return data.publicUrl;
};

export const uploadProjectPic: (
  projectId: string,
  imageBase64: string,
  imageMimeType: string
) => Promise<DRPError | null> = async (
  projectId,
  imageBase64,
  imageMimeType
) => {
  const { error } = await supabase.storage
    .from("projectpics")
    .upload(projectId, decode(imageBase64), {
      contentType: imageMimeType,
    });
  if (error) return { message: error.message };
  return null;
};

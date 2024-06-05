import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

export const getProjectPicUrl: (projectId: string) => DRPResponse<string> = (
  projectId
) => {
  const { data } = supabase.storage.from("projectpics").getPublicUrl(projectId);
  return { data: data.publicUrl, error: null };
};

export const uploadProjectPic: (
  projectId: string,
  imageBase64: string,
  imageMimeType: string
) => Promise<DRPResponse<null>> = async (
  projectId,
  imageBase64,
  imageMimeType
) => {
  const { error } = await supabase.storage
    .from("projectpics")
    .upload(projectId, decode(imageBase64), {
      contentType: imageMimeType,
    });
  if (error) return { data: null, error };
  return { data: null, error: null };
};

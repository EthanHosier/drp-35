import { supabase } from "../supabase";
import { DRPResponse } from "./error-types";

export const addReview: (
  reviewer_id: string,
  reviewee_id: string,
  projectId: string,
  rating: number
) => Promise<DRPResponse<null>> = async (reviewer_id, reviewee_id, project_id, rating) => {
  const { error } = await supabase
    .from("reviews")
    .upsert({ reviewer_id, reviewee_id, project_id, rating });
  console.log(error);
  if (error) return { data: null, error };
  return { data: null, error: null };
};

export const getAverageRating: (
  user_id: string
) => Promise<DRPResponse<number>> = async (user_id) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("reviewee_id", user_id);
  if (error) return { data: null, error };
  if (!data) return { data: 0, error: null };
  const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
  return { data: sum / data.length, error: null };
};

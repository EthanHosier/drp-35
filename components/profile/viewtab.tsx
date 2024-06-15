import React from "react";

import Profile from "./profile";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "@/utils/supabase";
import { getProfileByUserId } from "@/utils/api/profiles";
import { getAverageRating } from "@/utils/api/reviews";
import { useProfileStore } from "@/utils/store/profile-store";

const ViewTab = () => {
  const {
    imageUri,
    fullName,
    pronouns,
    university,
    course,
    linkedin,
    github,
    website,
    bio,
  } = useProfileStore();

  const { data: rating } = useQuery({
    queryKey: ["rating"],
    queryFn: async () => {
      const userId = await getUserId();
      return getAverageRating(userId!);
    },
    staleTime: Infinity,
  });

  return (
    <Profile
      fullName={fullName}
      pronouns={pronouns}
      university={university}
      course={course}
      linkedin={linkedin}
      github={github}
      website={website}
      skills={[]}
      languages={[]}
      imageUrl={imageUri}
      bio={bio}
      rating={rating?.data ?? 0}
    />
  );
};

export default ViewTab;

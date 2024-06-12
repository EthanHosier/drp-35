import React from "react";

import Profile from "./profile";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "@/utils/supabase";
import { getProfileByUserId } from "@/utils/api/profiles";

const ViewTab = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const userId = await getUserId();
      return getProfileByUserId(userId!);
    },
    staleTime: Infinity,
  });

  return (
    <Profile
      fullName={profile?.data?.full_name ?? ""}
      pronouns={profile?.data?.pronouns ?? ""}
      university={profile?.data?.university ?? ""}
      course={profile?.data?.course ?? ""}
      linkedin={profile?.data?.linkedin ?? ""}
      github={profile?.data?.github ?? ""}
      website={profile?.data?.website ?? ""}
      skills={profile?.data?.skills ?? []}
      languages={profile?.data?.skills ?? []}
      imageUrl={profile?.data?.imageUrl ?? ""}
    />
  );
};

export default ViewTab;

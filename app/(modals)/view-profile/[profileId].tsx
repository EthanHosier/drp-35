import Profile from "@/components/profile/profile";
import {
  Profile as ProfileType,
  getProfileByUserId,
} from "@/utils/api/profiles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import React, { Text } from "react-native";

const EMPTY_PROFILE = {
  imageUrl: "",
  full_name: "",
  pronouns: "",
  university: "",
  course: "",
  linkedin: "",
  github: "",
  website: "",
  skills: [],
  languages: [],
  id: "",
};

const ProfileId = () => {
  const profileId = useLocalSearchParams().profileId as string;
  const [profile, setProfile] = useState<ProfileType>(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileId) return;
    getProfileByUserId(profileId).then((res) => {
      if (res.error) {
        console.error(res.error);
        setLoading(false);
        return;
      }
      console.log(res.data);
      setProfile(res.data);
      setLoading(false);
    });
  }, [profileId]);

  return (
    !loading && <Profile {...profile} fullName={profile?.full_name ?? ""} />
  );
};

export default ProfileId;

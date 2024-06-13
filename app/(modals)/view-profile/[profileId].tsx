import Profile from "@/components/profile/profile";
import {
  Profile as ProfileType,
  getProfileByUserId,
} from "@/utils/api/profiles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import React from "react-native";
import {getAverageRating} from "@/utils/api/reviews";

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
  bio: "",
};

const ProfileId = () => {
  const profileId = useLocalSearchParams().profileId as string;
  const [profile, setProfile] = useState<ProfileType>(EMPTY_PROFILE);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileId) return;
    getProfileByUserId(profileId).then((res) => {
      if (res.error) {
        console.error(res.error);
        setLoading(false);
        return;
      }
      setProfile(res.data);
      setLoading(false);
    });
    getAverageRating(profileId).then((res) => {
      if (res.error) return console.error(res.error);
      setRating(res.data);
    });
  }, [profileId]);

  return (
    !loading && <Profile {...profile} fullName={profile?.full_name ?? ""} rating={rating} />
  );
};

export default ProfileId;

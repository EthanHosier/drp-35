import { useLocalSearchParams } from "expo-router";
import React, { Text } from "react-native";

const ProfileId = () => {
  const profileId = useLocalSearchParams().profileId as string;

  return <Text>{profileId}</Text>;
};

export default ProfileId;

import Colors from "@/constants/Colors";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useProfileStore } from "@/utils/store/profile-store";
import React from "react";
import { useSkillsStore } from "@/utils/store/skills-store";
import { useLanguagesStore } from "@/utils/store/languages-store";

import Profile from "./profile";

const ViewTab = () => {
  const profile = useProfileStore();

  const { skills } = useSkillsStore();
  const { languages } = useLanguagesStore();

  return (
    <Profile
      {...profile}
      skills={skills}
      languages={languages}
      imageUrl={profile.imageUri}
    />
  );
};

export default ViewTab;

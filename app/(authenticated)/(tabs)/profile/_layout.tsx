import { Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { getUserId, supabase } from "@/utils/supabase";
import { useProfileStore } from "@/utils/store/profile-store";
import { decode } from "base64-arraybuffer";
import { useSkillsStore } from "@/utils/store/skills-store";
import { useLanguagesStore } from "@/utils/store/languages-store";
import { useMyGroupsStore } from "@/utils/store/my-groups-store";
import { getProjectPicUrl } from "@/utils/api/project-pics";
import { queryClient } from "@/app/_layout";
import { Image } from "expo-image";

const Layout = () => {
  const router = useRouter();
  const imageBase64 = useProfileStore((state) => state.imageBase64);
  const imageMimeType = useProfileStore((state) => state.imageMimeType);
  const setImageUri = useProfileStore((state) => state.setImageUri);
  const {
    fullName,
    pronouns,
    university,
    course,
    linkedin,
    github,
    website,
    bio,
    resetProfileStore,
  } = useProfileStore();

  const skills = useSkillsStore((state) => state.skills);
  const languages = useLanguagesStore((state) => state.languages);

  const saveProfile = async () => {
    const userId = (await getUserId())!;

    const { error } = await supabase.from("profiles").upsert({
      user_id: userId,
      full_name: fullName,
      pronouns,
      university,
      course,
      linkedin,
      github,
      website,
      bio,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { error: deleteError } = await supabase
      .from("user_skills")
      .delete()
      .eq("user_id", userId);
    if (deleteError) {
      alert(deleteError.message);
      return;
    }

    const { error: skillError } = await supabase
      .from("user_skills")
      .upsert(skills.map((skill) => ({ user_id: userId, skill_name: skill })));

    if (skillError) {
      alert(skillError.message);
      return;
    }

    const { error: deleteLanguageError } = await supabase
      .from("user_languages")
      .delete()
      .eq("user_id", userId);
    if (deleteLanguageError) {
      alert(deleteLanguageError.message);
      return;
    }

    const { error: languageError } = await supabase
      .from("user_languages")
      .upsert(
        languages.map((language) => ({
          user_id: userId,
          language_name: language,
        }))
      );

    if (languageError) {
      alert(languageError.message);
      return;
    }

    if (imageBase64 === "") {
      resetProfileStore();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.back();

      return;
    }

    const img = imageBase64;

    const { error: picError } = await supabase.storage
      .from("profilepics")
      .upload(userId, decode(imageBase64), {
        contentType: imageMimeType,
        upsert: true,
      });
    if (picError) {
      alert(picError.message);
      return;
    }
    resetProfileStore();
    queryClient.invalidateQueries({ queryKey: ["profile"] });

    await Promise.all([Image.clearDiskCache, Image.clearMemoryCache]);

    router.back();
  };

  return (
    <Stack>
      <Stack.Screen name="view-profile" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          presentation: "fullScreenModal",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                resetProfileStore();
                queryClient.invalidateQueries({ queryKey: ["profile"] });
                router.back();
              }}
            >
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={saveProfile}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Save
              </Text>
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="skills"
        options={{
          title: "",
          presentation: "fullScreenModal",
          headerLeft: () => <></>,
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="languages"
        options={{
          title: "",
          presentation: "fullScreenModal",
          headerLeft: () => <></>,
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { useProfileStore } from "@/utils/store/profile-store";
import { useUserIdStore } from "@/utils/store/user-id-store";
import { decode } from "base64-arraybuffer";

const Layout = () => {
  const router = useRouter();
  const userId = useUserIdStore((state) => state.userId);
  const imageBase64 = useProfileStore((state) => state.imageBase64);
  const imageMimeType = useProfileStore((state) => state.imageMimeType);
  const setImageUri = useProfileStore((state) => state.setImageUri);
  const { fullName, pronouns, university, course, linkedin, github, website } =
    useProfileStore();

  useEffect(() => {
    const getImage = async () => {
      const { data, error } = await supabase.storage
        .from("profilepics")
        .download(userId);
      if (error) return;

      const fr = new FileReader();
      fr.readAsDataURL(data!);
      fr.onload = () => {
        setImageUri(fr.result as string);
      };
    };
    getImage();
  }, []);

  const saveProfile = async () => {
    const { error } = await supabase.from("profiles").upsert({
      user_id: userId,
      full_name: fullName,
      pronouns,
      university,
      course,
      linkedin,
      github,
      website,
    });

    if (error) alert(error.message);

    if (imageBase64 === "") {
      router.back();
      return;
    }
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
            <TouchableOpacity onPress={router.back}>
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
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          ),
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

const styles = StyleSheet.create({});

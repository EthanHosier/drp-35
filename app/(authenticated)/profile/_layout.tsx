import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useProfileStore, useUserIdStore } from "@/utils/store";
import { supabase } from "@/utils/supabase";

const Layout = () => {
  const router = useRouter();
  const userId = useUserIdStore((state) => state.userId);
  const setImage = useProfileStore((state) => state.setImage);

  useEffect(() => {
    const getImage = async () => {
      const { data, error } = await supabase.storage
        .from("profilepics")
        .download(userId);
      if (error) return;

      const fr = new FileReader();
      fr.readAsDataURL(data!);
      fr.onload = () => {
        setImage(fr.result as string);
      };
    };
    getImage();
  }, []);

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
            <TouchableOpacity onPress={router.back}>
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

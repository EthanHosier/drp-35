import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { useProjectFieldsStore } from "@/utils/store/add-project-store";

const Layout = () => {
  const router = useRouter();
  const {
    image,
    name,
    description,
    minGroupSize,
    maxGroupSize,
    startDateTime,
  } = useProjectFieldsStore();

  const checkProjectFields: () => string = () => {
    if (!name) return "Name must not be empty";
    const min = parseInt(minGroupSize);
    const max = parseInt(maxGroupSize);
    if (Number.isNaN(min) || Number.isNaN(max))
      return "Group size must be an integer";
    if (min > max) return "Max group size must not be less than min group size";
    return "";
  };

  const saveProject = async () => {
    const err = checkProjectFields();
    if (err) {
      alert(err);
      return;
    }

    const { error } = await supabase.from("projects").insert({
      name,
      description,
      min_group_size: parseInt(minGroupSize),
      max_group_size: parseInt(maxGroupSize),
      start_date_time: startDateTime.toISOString(),
    });
    if (error) {
      alert(error.message);
      return;
    }
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen name="discover-projects" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-project"
        options={{
          presentation: "fullScreenModal",
          title: "New Project",
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
            <TouchableOpacity onPress={saveProject}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Create
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[projectId]"
        options={{
          presentation: "fullScreenModal",
          title: "View Project",
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

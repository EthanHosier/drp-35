import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { useProjectFieldsStore } from "@/utils/store/add-project-store";
import { useProjectsStore } from "@/utils/store/projects-store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { uploadProjectPic } from "@/utils/api/project-pics";

const Layout = () => {
  const router = useRouter();
  const {
    imageUri,
    imageBase64,
    imageMimeType,
    name,
    description,
    minGroupSize,
    maxGroupSize,
    startDateTime,
  } = useProjectFieldsStore();

  const { projects, addProject } = useProjectsStore();

  const checkProjectFields: () => string = () => {
    if (!name) return "Name must not be empty";
    const min = parseInt(minGroupSize);
    const max = parseInt(maxGroupSize);
    if (Number.isNaN(min) || Number.isNaN(max))
      return "Group size must be an integer";
    if (min > max) return "Max group size must not be less than min group size";
    if (!imageBase64) return "Please upload an image";
    return "";
  };

  const saveProject = async () => {
    const err = checkProjectFields();
    if (err) {
      alert(err);
      return;
    }
    const min = parseInt(minGroupSize);
    const max = parseInt(maxGroupSize);

    const { data, error } = await supabase
      .from("projects")
      .insert({
        name,
        description,
        min_group_size: min,
        max_group_size: max,
        start_date_time: startDateTime.toISOString(),
      })
      .select("project_id")
      .single();
    if (error) {
      alert(error.message);
      return;
    }

    const { error: picError } = await uploadProjectPic(
      data.project_id,
      imageBase64,
      imageMimeType
    );
    if (picError) {
      alert(picError.message);
      return;
    }

    addProject({
      name,
      description,
      minGroupSize: min,
      maxGroupSize: max,
      startDateTime,
      image: imageUri,
      projectId: data.project_id,
    });
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
        name="view-project"
        options={{
          presentation: "fullScreenModal",
          title: "View Project",
          headerRight: () => (
            // <TouchableOpacity
            //   onPress={() => router.navigate("../filter")}
            //   style={{ marginRight: 8 }}
            // >
            //   <FontAwesome name="filter" size={24} color="black" />
            // </TouchableOpacity>
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
        name="view-org"
        options={{
          presentation: "fullScreenModal",
          title: "View Organistion",
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
        name="filter"
        options={{
          presentation: "fullScreenModal",
          title: "Filter Groups",
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

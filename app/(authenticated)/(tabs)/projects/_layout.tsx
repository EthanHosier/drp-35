import { Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { useProjectFieldsStore } from "@/utils/store/add-project-store";
import { useProjectsStore } from "@/utils/store/projects-store";
import { uploadProjectPic } from "@/utils/api/project-pics";
import {useCreateTabStore} from "@/utils/store/create-tab-store";
import {useOrganisationFieldsStore} from "@/utils/store/add-organisation-store";
import {getOrganisationPicUrl, uploadOrganisationPic} from "@/utils/api/organisation-pics";

const Layout = () => {
  const router = useRouter();

  const {
    imageUri: projectImageUri,
    imageBase64: projectImageBase64,
    imageMimeType: projectImageMimeType,
    name: projectName,
    description: projectDescription,
    minGroupSize,
    maxGroupSize,
    startDateTime,
  } = useProjectFieldsStore();

  const { addProject } = useProjectsStore();

  const checkProjectFields: () => string = () => {
    if (!projectName) return "Name must not be empty";
    const min = parseInt(minGroupSize);
    const max = parseInt(maxGroupSize);
    if (Number.isNaN(min) || Number.isNaN(max))
      return "Group size must be an integer";
    if (min > max) return "Max group size must not be less than min group size";
    if (!projectImageBase64) return "Please upload an image";
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
        name: projectName,
        description: projectDescription,
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
      projectImageBase64,
      projectImageMimeType
    );
    if (picError) {
      alert(picError.message);
      return;
    }

    addProject({
      name: projectName,
      description: projectDescription,
      minGroupSize: min,
      maxGroupSize: max,
      startDateTime,
      image: projectImageUri,
      projectId: data.project_id,
    });
    router.back();
  };

  const {
    imageBase64: organisationImageBase64,
    imageMimeType: organisationImageMimeType,
    name: organisationName,
    subtitle,
    description: organisationDescription,
  } = useOrganisationFieldsStore();

  const checkOrganisationFields: () => string = () => {
    if (!organisationName) return "Name must not be empty";
    if (!organisationImageBase64) return "Please upload an image";
    return "";
  };

  const saveOrganisation = async () => {
    const err = checkOrganisationFields();
    if (err) {
      alert(err);
      return;
    }

    const { data, error } = await supabase
    .from("organisations")
    .insert({
      name: organisationName,
      description: organisationDescription,
      subtitle: subtitle,
    })
    .select("org_id")
    .single();
    if (error) {
      alert(error.message);
      return;
    }

    const { error: picError } = await uploadOrganisationPic(
        data.org_id,
        organisationImageBase64,
        organisationImageMimeType
    );
    if (picError) {
      alert(picError.message);
      return;
    }

    const { data: urlData, error: getUrlError} = getOrganisationPicUrl(data.org_id);
    if (getUrlError) {
      alert(getUrlError.message);
      return;
    }

    const { error: updatePicError } = await supabase
      .from("organisations")
      .update({ image: urlData })
      .eq("org_id", data.org_id);
    if (updatePicError) {
      alert(updatePicError.message);
      return;
    }

    router.back();
  };

  const { tab} = useCreateTabStore();

  return (
    <Stack>
      <Stack.Screen name="discover-projects" options={{ headerShown: false }} />
      <Stack.Screen
        name="create"
        options={{
          presentation: "fullScreenModal",
          title: "Create",
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
            <TouchableOpacity onPress={tab ? saveOrganisation : saveProject}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Create
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import {
  RefreshControl,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/DefaultStyles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ProjectPreview from "@/components/projects/project-preview";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import OrganisationPreview from "@/components/projects/organisation-preview";
import { getAllOrganisationsExceptJoined } from "@/utils/api/organisations";
import { getAllProjectsExceptJoined } from "@/utils/api/project-details";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/_layout";
import { getUserId } from "@/utils/supabase";
import { getProfileByUserId } from "@/utils/api/profiles";

const DiscoverProjects = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const userId = await getUserId();
      return getProfileByUserId(userId!);
    },
    staleTime: Infinity,
  });

  const { data: allProjects, status: allProjectsStatus } = useQuery({
    queryKey: ["allProjects"],
    queryFn: async () => {
      const userId = await getUserId();
      console.log("yeahhh");
      const { data, error } = await getAllProjectsExceptJoined(userId!);
      if (error) {
        alert(error.message);
        return;
      }
      const processedData = data
        .map((project) => ({
          ...project,
          maxGroupSize: project.max_group_size,
          minGroupSize: project.min_group_size,
          projectId: project.project_id,
          startDateTime: new Date(project.start_date_time),
          image: project.image_uri,
        }))
        .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime());
      return processedData;
    },
  });

  const { data: orgs, status: allOrgsStatus } = useQuery({
    queryKey: ["allOrgs"],
    queryFn: async () => {
      const userId = await getUserId();
      return getAllOrganisationsExceptJoined(userId!);
    },
  });

  const [search, setSearch] = React.useState("");

  const orgSearchResults = orgs?.data
    ? orgs.data
        .filter((org) => org.name.toLowerCase().includes(search.toLowerCase()))
        .map((organisation, i) => (
          <OrganisationPreview organisation={organisation} key={i} />
        ))
    : [];
  const projectSearchResults = allProjects
    ? allProjects
        .filter((project) =>
          project.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((project, i) => <ProjectPreview project={project} key={i} />)
    : [];

  const CARD_WIDTH = 320;
  const HORIZONTAL_PADDING = 24;
  function generateSnapPoints(projectsLength: number): number[] {
    const arr = [0].concat(
      Array.from(
        { length: projectsLength - 1 },
        (_, i) =>
          CARD_WIDTH +
          HORIZONTAL_PADDING / 2 +
          (i - 1) * (CARD_WIDTH + HORIZONTAL_PADDING)
      )
    );
    return arr;
  }

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["allProjects"] });
    queryClient.invalidateQueries({ queryKey: ["allOrgs"] });
  };

  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.primary, Colors.primaryMuted, Colors.background]}
        style={{ height: "100%" }}
        locations={[0, 0.2, 0.6]} // Adjust the second value to make the transition earlier or later
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                allOrgsStatus === "pending" || allProjectsStatus === "pending"
              }
              onRefresh={refresh}
            />
          }
          contentContainerStyle={{ marginTop: 64, paddingBottom: 200 }}
          style={{ height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 24 }}>
            {search === "" && (
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  marginTop: 12,
                }}
                onPress={() =>
                  router.navigate("/(authenticated)/projects/create")
                }
              >
                <View style={{ borderRadius: 8, overflow: "hidden" }}>
                  <BlurView
                    tint="extraLight"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.05)",
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 8,
                      paddingVertical: 4,
                      paddingRight: 4,
                      gap: 4,
                    }}
                    intensity={50}
                  >
                    <Text
                      style={{
                        color: Colors.dark,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Create
                    </Text>
                    <Entypo name="plus" size={24} color={Colors.primary} />
                  </BlurView>
                </View>
              </TouchableOpacity>
            )}
            {search === "" && (
              <View style={{ marginTop: 32 }}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                  Hello, {profile?.data?.full_name}
                </Text>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: Colors.primary,
                  }}
                >
                  There are {allProjects?.length} new projects in your area.
                </Text>
              </View>
            )}
            <View
              style={[
                defaultStyles.textInput,
                styles.textInputView,
                {
                  shadowColor: Colors.gray,
                  shadowOffset: {
                    width: 0,
                    height: 9,
                  },
                  shadowOpacity: 0.6,
                  shadowRadius: 12.35,

                  elevation: 19,
                },
              ]}
            >
              <Ionicons name="search" size={20} color={Colors.gray} />

              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 8,
                  fontSize: 16,
                }}
                onChangeText={(text) => setSearch(text)}
                placeholder="Search for a project"
                cursorColor={Colors.primary}
              />
            </View>
            {search !== "" && (
              <Text
                style={{
                  marginTop: 10,
                  color: Colors.gray,
                  fontWeight: "bold",
                }}
              >
                {`Search results for: "${search}"`}
              </Text>
            )}
            {projectSearchResults.length > 0 && (
              <Text style={{ marginTop: 56, fontSize: 24, fontWeight: "600" }}>
                {search === ""
                  ? "Projects you might like"
                  : projectSearchResults &&
                    projectSearchResults.length > 0 &&
                    "Projects:"}
              </Text>
            )}
          </View>
          <View>
            <ScrollView
              style={{ marginTop: 12 }}
              contentContainerStyle={{ paddingRight: 24 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToOffsets={generateSnapPoints(projectSearchResults.length)}
              snapToAlignment={"center"}
              snapToStart={true}
            >
              {projectSearchResults}
            </ScrollView>
          </View>

          <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
            <Text style={{ marginTop: 16, fontSize: 24, fontWeight: "600" }}>
              {search === ""
                ? "Organisations you might like"
                : orgSearchResults &&
                  orgSearchResults.length > 0 &&
                  "Organisations:"}
            </Text>
          </View>
          <View>
            <ScrollView
              style={{
                marginTop: 12,
              }}
              contentContainerStyle={{ paddingRight: 24 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToOffsets={generateSnapPoints(
                orgSearchResults ? orgSearchResults.length : 0
              )}
              snapToAlignment={"center"}
              snapToStart={true}
            >
              {orgSearchResults}
            </ScrollView>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default DiscoverProjects;

const styles = StyleSheet.create({
  textInputView: {
    marginTop: 32,
    flexDirection: "row",
  },
});

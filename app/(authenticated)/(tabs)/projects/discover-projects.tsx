import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import {RefreshControl, ScrollView, TextInput} from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/DefaultStyles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ProjectPreview from "@/components/projects/project-preview";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useProfileStore } from "@/utils/store/profile-store";
import { useProjectsStore } from "@/utils/store/projects-store";
import OrganisationPreview from "@/components/projects/organisation-preview";
import {
  Organisation,
  getAllOrganisationsExceptJoined,
} from "@/utils/api/organisations";
import { useUserIdStore } from "@/utils/store/user-id-store";
import { getAllProjects } from "@/utils/api/project-details";

const DiscoverProjects = () => {
  const fullName = useProfileStore((state) => state.fullName);

  const { projects, setProjects } = useProjectsStore();
  const userId = useUserIdStore((state) => state.userId);
  const [loading, setLoading] = useState(false);
  const [orgs, setOrgs] = useState<Organisation[] | null>([]);

  const getProjects = async () => {
    const { data, error } = await getAllProjects();
    if (error) {
      alert(error.message);
      return;
    }

    const processedData = data.map((project) => ({
      ...project,
      maxGroupSize: project.max_group_size,
      minGroupSize: project.min_group_size,
      projectId: project.project_id,
      startDateTime: new Date(project.start_date_time),
      image: project.image_uri,
    }));

    setProjects(processedData);
  };

  const getOrganisations = async () => {
    getAllOrganisationsExceptJoined(userId).then((res) => {
      if (!res.data) return;
      setOrgs(res.data);
    });
  };

  useEffect(() => {
    getProjects();
    getOrganisations();
  }, []);

  const [search, setSearch] = React.useState("");

  const orgSearchResults = orgs
    ?.filter((org) => org.name.toLowerCase().includes(search.toLowerCase()))
    .map((organisation, i) => (
      <OrganisationPreview organisation={organisation} key={i} />
    ));
  const projectSearchResults = projects
    .filter((project) =>
      project.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((project, i) => <ProjectPreview project={project} key={i} />);

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

  const refresh = () => async () => {
    setLoading(true);
    await Promise.all([getProjects(), getOrganisations()]);
    setLoading(false);
  };

  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.primaryMuted, "#fff"]}
        style={{ height: "100%" }}
        locations={[0, 1]} // Adjust the second value to make the transition earlier or later
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          contentContainerStyle={{ marginTop: 64, paddingBottom: 200 }}
          style={{ height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 24 }}>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginTop: 12,
              }}
              onPress={() =>
                router.navigate("/(authenticated)/projects/add-project")
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
                  intensity={80}
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
            <View style={{ marginTop: 32 }}>
              <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                Hello, {fullName}
              </Text>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: Colors.primary,
                }}
              >
                There are {projects.length} new projects in your area.
              </Text>
            </View>
            <View style={[defaultStyles.textInput, styles.textInputView]}>
              <Ionicons name="search" size={20} color={Colors.gray} />

              <TextInput
                style={{ flex: 1, marginLeft: 8, fontSize: 16 }}
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
            <Text style={{ marginTop: 56, fontSize: 24, fontWeight: "600" }}>
              {search === ""
                ? "Projects you might like"
                : projectSearchResults &&
                  projectSearchResults.length > 0 &&
                  "Projects:"}
            </Text>
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

          <Text
            style={{
              marginTop: 56,
              fontSize: 24,
              fontWeight: "600",
              marginLeft: 24,
            }}
          >
            {search === ""
              ? "Imperial Computing Projects"
              : `Imperial Computing Projets`}
          </Text>
          <View>
            <ScrollView
              style={{ marginTop: 12 }}
              horizontal
              contentContainerStyle={{ paddingRight: 24 }}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToOffsets={generateSnapPoints(projectSearchResults.length)}
              snapToAlignment={"center"}
              snapToStart={true}
            >
              {projectSearchResults}
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

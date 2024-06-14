import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import TinderSwipe from "@/components/projects/tinder-swipe";
import InfoSheet from "@/components/projects/info-sheet";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useLocalSearchParams, useRouter } from "expo-router";
import { formatHumanReadableDate } from "@/utils/utils";
import {
  Group,
  getProjectDetails,
  getProjectGroups,
  type Project,
} from "@/utils/api/project-details";
import { useFilterStore } from "@/utils/store/filter-store";
import LottieView from "lottie-react-native";
import { defaultStyles } from "@/constants/DefaultStyles";
import {
  acceptRequestToJoinGroup,
  createGroup,
  getGroupById,
  isMatch,
  requestToJoinGroup,
} from "@/utils/api/groups";
import { getUserId, supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/_layout";
import { RefreshControl } from "react-native-gesture-handler";

const InfoTab = () => {
  const id = useLocalSearchParams().projectId;

  const { data: projectData, status } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectDetails(id as string),
    staleTime: Infinity,
  });

  if (status === "pending")
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View
      style={[
        styles.container,
        { flex: 1, backgroundColor: Colors.background },
      ]}
    >
      <ScrollView>
        <Image
          source={{ uri: projectData ? projectData?.data?.image_uri : "" }}
          style={styles.img}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: Colors.dark,
            marginTop: 16,
          }}
        >
          {projectData?.data?.name}
        </Text>
        <View style={[styles.attributeContainer, { marginTop: 24 }]}>
          <View style={styles.attributeIconContainer}>
            <Ionicons name="people-outline" size={24} color="black" />
          </View>
          <Text style={styles.attributeText}>
          {projectData?.data?.min_group_size === projectData?.data?.max_group_size
            ? `${projectData?.data?.min_group_size} team members`
            : `${projectData?.data?.min_group_size}-${projectData?.data?.max_group_size} team members`}
          </Text>
        </View>
        <View style={[styles.attributeContainer, { marginTop: 24 }]}>
          <View style={styles.attributeIconContainer}>
            <FontAwesome6 name="clock" size={24} color="black" />
          </View>
          <Text style={styles.attributeText}>
            {formatHumanReadableDate(projectData?.data?.start_date_time ?? "")}
          </Text>
        </View>
        <Text style={{ marginTop: 24 }}>
          {projectData?.data?.description || "No description provided."}
        </Text>
      </ScrollView>
    </View>
  );
};

const getGroupId = async (projectId: string) => {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("groups")
    .select(
      `
      group_id,
      project_id,
      group_members(
        user_id
      )
      `
    )
    .eq("project_id", projectId)
    .eq("group_members.user_id", userId!);

  console.log({ data: data });

  if (!error && data && data.length > 0) return data[0].group_id;
  return null;
};

const getMembersNeeded = async (groupId: string, projectId: string) => {
  const { data: project, error: maxError } = await supabase
    .from("projects")
    .select("max_group_size")
    .eq("project_id", projectId)
    .single();
  if (maxError) return console.error(maxError);

  await getGroupById(groupId as string).then((res) => {
    if (res.data) return project.max_group_size - res.data.members.length;
  });

  return -1;
};

const GroupsTab = () => {
  const id = useLocalSearchParams().projectId;

  const [memberIndex, setMemberIndex] = useState<number>(0);
  const [groupIndex, setGroupIndex] = useState<number>(0);
  const animation = useRef(null);

  const [pressed, setPressed] = useState<boolean>(false);

  const projectId = useLocalSearchParams().projectId as string;

  const [creatingGroup, setCreatingGroup] = useState<boolean>(false);

  const { data: myGroupId, status: myGroupIdStatus } = useQuery({
    queryKey: ["myGroupId", projectId],
    queryFn: () => getGroupId(projectId),
    staleTime: Infinity,
  });

  const { data: projectGroups, status: projectGroupsStatus } = useQuery({
    queryKey: ["thisProjectGroups", projectId],
    queryFn: () => getProjectGroups(projectId, myGroupId ?? ""),
    staleTime: Infinity,
    enabled: myGroupId != undefined,
  });

  const { data: membersNeeded, status: membersNeededStatus } = useQuery({
    queryKey: ["membersNeeded", projectId],
    queryFn: () => getMembersNeeded(myGroupId!, projectId),
    staleTime: Infinity,
    enabled: !!myGroupId,
  });

  const router = useRouter();

  // FilterMain settings
  const numMembers = useFilterStore((state) => state.numMembers);
  const languages = useFilterStore((state) => state.languages);
  const skills = useFilterStore((state) => state.skills);

  const handleSwipeRight = async (targetGroupId: string) => {
    if (myGroupId) {
      const { data, error } = await isMatch(myGroupId as string, targetGroupId);
      if (error) return console.log(error);
      if (data) {
        const { error } = await acceptRequestToJoinGroup(
          targetGroupId,
          myGroupId
        );
        if (error) return console.log(error);
        router.push({
          pathname: "/(authenticated)/projects/view-project/match",
          params: { matchId: "123" }, // TODO: what is matchId?
        });
        return;
      }
      const userId = await getUserId();
      await requestToJoinGroup(targetGroupId, myGroupId, projectId, userId!);
    }
  };

  const refresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["thisProjectGroups", projectId],
    });
    queryClient.invalidateQueries({
      queryKey: ["myGroupId", projectId],
    });
    queryClient.invalidateQueries({
      queryKey: ["membersNeeded", projectId],
    });
  };

  return projectGroupsStatus === "pending" ||
    myGroupIdStatus === "pending" ||
    membersNeededStatus === "pending" ? (
    <Text>Loading...</Text>
  ) : (
    <View style={{ flex: 1, position: "relative" }}>
      {projectGroups && projectGroups.data && projectGroups.data.length > 0 ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => router.navigate("../filter/filter-main")}
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                height: 48,
                width: 48,
                borderRadius: 24,
                backgroundColor: Colors.background,
                marginTop: 12,
              }}
            >
              <Ionicons
                name="filter"
                size={24}
                color={Colors.gray}
                style={{ marginTop: 2 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                height: 48,
                width: 96,
                borderRadius: 24,
                backgroundColor: Colors.primary,
                marginTop: 12,
                flexDirection: "row",
              }}
            >
              <AntDesign
                name="addusergroup"
                size={24}
                color={Colors.background}
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: Colors.background }}>New</Text>
            </TouchableOpacity>
          </View>

          <TinderSwipe
            pressed={pressed}
            setPressed={setPressed}
            groups={projectGroups?.data}
            memberIndex={memberIndex}
            setMemberIndex={setMemberIndex}
            groupIndex={groupIndex}
            setGroupIndex={setGroupIndex}
            onSwipeRight={handleSwipeRight}
          />
          <InfoSheet
            profile={
              projectGroups && projectGroups.data
                ? projectGroups.data[groupIndex].members[memberIndex]
                : null
            }
          />
        </>
      ) : (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  refresh();
                }}
              />
            }
            style={{ height: "100%" }}
            contentContainerStyle={{
              height: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                padding: 24,
                position: "relative",
                justifyContent: "center",
              }}
            >
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  marginTop: -200,
                  width: "100%",
                  height: 200,
                }}
                source={require("@/assets/images/tumbleweed.json")}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 28,
                  fontWeight: "600",
                  color: Colors.dark,
                }}
              >
                No groups found
              </Text>
            </View>
          </ScrollView>
          {!creatingGroup && (
            <TouchableOpacity
              disabled={creatingGroup}
              onPress={async () => {
                setCreatingGroup(true);
                const userId = await getUserId();
                await createGroup(projectId, userId!);

                queryClient.invalidateQueries({
                  queryKey: ["projectGroups"],
                });
                queryClient.invalidateQueries({
                  queryKey: ["myGroups"],
                });
                refresh();
                setCreatingGroup(false);
              }}
              style={[
                defaultStyles.pillButton,
                {
                  backgroundColor: Colors.primary,
                  width: "90%",
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 24,
                  zIndex: 100000,
                },
              ]}
            >
              <Text style={{ fontSize: 16, color: Colors.background }}>
                Create group
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const renderScene = SceneMap({
  first: InfoTab,
  second: GroupsTab,
});

export default function ProjectTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Info" },
    { key: "second", title: "Groups" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "white" }}
          indicatorStyle={{
            backgroundColor: Colors.primary,
            width: 75, // Change this to the desired indicator width
            marginLeft: (layout.width / routes.length - 75) / 2, // Center the indicator
          }}
          renderLabel={({ route, focused }) => (
            <Text
              style={{
                color: focused ? Colors.primary : "black",
                fontWeight: "600",
              }}
            >
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  img: { aspectRatio: 5 / 3, width: "100%", borderRadius: 16 },
  attributeContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    gap: 16,
  },
  attributeIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    height: 44,
    width: 44,
    borderRadius: 8,
  },
  attributeText: { fontSize: 16, fontWeight: "500" },
});

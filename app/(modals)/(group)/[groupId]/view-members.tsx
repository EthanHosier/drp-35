import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/DefaultStyles";
import { getGroupById, getGroupRequests } from "@/utils/api/groups";
import Skeleton from "@/components/LoadingSkeleton";
import { RefreshControl } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/_layout";
import { getProjectDetails } from "@/utils/api/project-details";

const ViewMembers = () => {
  const { groupId, maxGroupSize, projectId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const { data: group } = useQuery({
    queryKey: ["myGroup", groupId],
    queryFn: () => getGroupById(groupId as string),
    staleTime: Infinity,
  });

  const { data: rawInterested } = useQuery({
    queryKey: ["interested", groupId],
    queryFn: async () => {
      return getGroupRequests(groupId as string);
    },
  });

  const { data: projectData } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectDetails(projectId as string),
    staleTime: Infinity,
  });

  const interested = rawInterested?.data?.filter(
    (other) =>
      group?.data &&
      other.members.length + group?.data?.members.length <=
        parseInt(maxGroupSize as string)
  );

  const isOver =
    projectData?.data &&
    Date.parse(projectData.data.end_date_time) < Date.now();

  // const rejectOversizedGroups = async () => {
  //   if (group && group.data?.members?.length) {
  //     await Promise.all(
  //       interested.map((g) => {
  //         if (
  //           g.members.length + group?.data?.members.length >
  //           parseInt(maxGroupSize as string)
  //         ) {
  //           rejectRequestToJoinGroup(g.group_id, groupId as string);
  //         }
  //       })
  //     );
  //     setInterested([]);
  //   }
  // };

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["myGroup", groupId] });
    queryClient.invalidateQueries({ queryKey: ["interested", groupId] });
  };

  if (loading)
    return (
      <View
        style={{ flex: 1, padding: 24, backgroundColor: Colors.background }}
      >
        <Skeleton
          style={{
            height: 32,
            width: 200,
            alignSelf: "center",
            borderRadius: 8,
          }}
        />

        <View
          style={{
            gap: 8,
            marginTop: 32,
            paddingBottom: 16,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.gray,
          }}
        >
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Skeleton style={{ height: 80, width: 80, borderRadius: 40 }} />
              <Skeleton
                style={{
                  height: 32,
                  width: 120 + Math.random() * 60,
                  borderRadius: 8,
                  marginLeft: 16,
                }}
              />
              <FontAwesome
                name="chevron-right"
                size={16}
                color={Colors.gray}
                style={{ marginLeft: "auto" }}
              />
            </View>
          ))}
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Skeleton style={{ height: 80, width: 80, borderRadius: 40 }} />
          <Skeleton
            style={{
              height: 32,
              width: 164,
              borderRadius: 8,
              marginLeft: 16,
            }}
          />
          <FontAwesome
            name="chevron-right"
            size={16}
            color={Colors.gray}
            style={{ marginLeft: "auto" }}
          />
        </View>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        position: "relative",
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
      >
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <Text style={{ alignSelf: "center", fontSize: 16 }}>
            You currently have{" "}
            <Text style={{ fontWeight: "700" }}>
              {group?.data?.members?.length}/{maxGroupSize as string}
            </Text>{" "}
            members
          </Text>
          {isOver && (
            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                fontSize: 16,
                color: Colors.gray,
              }}
            >
              The project is now over. Click on a member to review them.
            </Text>
          )}
          <View
            style={{
              marginTop: 32,
              gap: 12,
              borderBottomColor: Colors.gray,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingBottom: 16,
            }}
          >
            {group?.data?.members?.map((member, i) => (
              <TouchableOpacity
                key={i}
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  if (isOver) {
                    router.navigate(
                      `/(modals)/review/${member.id}?projectId=${projectId}`
                    );
                  } else {
                    router.navigate(`/(modals)/view-profile/${member.id}`);
                  }
                }}
              >
                <Image
                  source={member.imageUrl + "?t=" + new Date()}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
                <Text
                  style={{ marginLeft: 24, fontWeight: "600", fontSize: 16 }}
                >
                  {member.full_name}
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={Colors.dark}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            ))}
          </View>
          {interested && interested.length > 0 && (
            <Link
              href={`./view-interested?maxGroupSize=${maxGroupSize}`}
              asChild
              style={{ marginTop: 16 }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {interested.slice(0, 2).map((e, index) => (
                  <Image
                    key={index}
                    source={e.members[0].imageUrl}
                    style={[
                      {
                        width: index === 0 ? 82 : 80,
                        height: index === 0 ? 82 : 80,
                        borderRadius: 40,
                      },
                      index === 0 && {
                        marginRight: interested.length > 1 ? -64 : 0,
                        zIndex: 100,
                        borderColor: Colors.background,
                        borderWidth: 2,
                      },
                    ]}
                    cachePolicy={"none"}
                  />
                ))}
                <View
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.primary,
                    borderRadius: 12,
                    marginTop: -48,
                    marginLeft: -18,
                    zIndex: 100,
                  }}
                >
                  <Text style={{ color: Colors.background }}>
                    {interested.length}
                  </Text>
                </View>
                <Text
                  style={{ marginLeft: 8, fontWeight: "600", fontSize: 14 }}
                >
                  Interested in your group
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={Colors.dark}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            </Link>
          )}
        </ScrollView>
      </ScrollView>
      {group?.data?.members?.length &&
        group?.data?.members.length < parseInt(maxGroupSize as string) && (
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              {
                backgroundColor: Colors.primary,
                position: "absolute",
                bottom: 32,
                alignSelf: "center",
                width: "90%",
                zIndex: 100,
              },
            ]}
            onPress={() => {
              router.navigate(`/(modals)/view-project/${projectId}`);
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Colors.background,
              }}
            >
              Search for Group Members
            </Text>
          </TouchableOpacity>
        )}
    </View>
  );
};

export default ViewMembers;

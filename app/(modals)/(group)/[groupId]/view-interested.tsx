import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import {
  acceptRequestToJoinGroup, getGroupById,
  getGroupRequests,
  rejectRequestToJoinGroup,
} from "@/utils/api/groups";
import { queryClient } from "@/app/_layout";
import { useQuery } from "@tanstack/react-query";

const ViewInterested = () => {
  const { groupId, maxGroupSize } = useLocalSearchParams();
  const {data: group} = useQuery({
    queryKey: ["myGroup", groupId],
    queryFn: () => getGroupById(groupId as string),
  });

  const { data: rawInterested, status } = useQuery({
    queryKey: ["interested", groupId],
    queryFn: async () => {
      return getGroupRequests(groupId as string);
    },
  });

  const interested = rawInterested?.data?.filter(
      (other) =>
          (group?.data) && other.members.length + group.data.members.length <= parseInt(maxGroupSize as string)
  )

  const refresh = async () => {
    queryClient.invalidateQueries({ queryKey: ["interested", groupId] });
    queryClient.invalidateQueries({ queryKey: ["myGroup", groupId] });
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={status === "pending"}
            onRefresh={refresh}
          />
        }
        style={{ paddingTop: 24 }}
        contentContainerStyle={{ gap: 16 }}
      >
        {interested &&
          interested.map((group, index) => (
            <View style={{}} key={index}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 24,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  {group.members.length} Member
                  {group.members.length != 1 && "s"}
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                      await acceptRequestToJoinGroup(
                        group.group_id,
                        groupId as string
                      );
                      refresh();
                    }}
                  >
                    <Text
                      style={[styles.buttonText, { color: Colors.background }]}
                    >
                      Accept
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.rejectButton]}
                    onPress={async () => {
                      await rejectRequestToJoinGroup(
                        group.group_id,
                        groupId as string
                      );
                      refresh();
                    }}
                  >
                    <Text style={[styles.buttonText, {}]}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{ marginTop: 16 }}
                contentContainerStyle={{ paddingLeft: 16, gap: 16 }}
              >
                {group.members.map((member, id) => (
                  <Link
                    href={`/(modals)/view-profile/${member.id}`}
                    asChild
                    key={id}
                  >
                    <TouchableOpacity key={id} style={{ marginRight: 12 }}>
                      <Image source={member.imageUrl} style={styles.image} />
                      <Text style={[styles.text, { marginTop: 8 }]}>
                        {member.full_name.split(" ")[0]}
                      </Text>
                    </TouchableOpacity>
                  </Link>
                ))}
              </ScrollView>
              {index < interested.length - 1 && (
                <View style={{ width: "100%", paddingHorizontal: 24 }}>
                  <View
                    style={{
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: Colors.gray,
                      marginTop: 16,
                    }}
                  />
                </View>
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.background,
    width: "100%",
  },

  text: {
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-end",
    height: 32,
    justifyContent: "center",
  },
  rejectButton: {
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});

export default ViewInterested;

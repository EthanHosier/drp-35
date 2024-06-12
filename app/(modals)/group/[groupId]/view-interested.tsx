import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Group } from "@/utils/api/project-details";
import { useUserIdStore } from "@/utils/store/user-id-store";
import {
  acceptRequestToJoinGroup,
  getGroupRequests,
  rejectRequestToJoinGroup,
} from "@/utils/api/groups";

const ViewInterested = () => {
  const userId = useUserIdStore((state) => state.userId);
  const [loading, setLoading] = useState(false);
  const { groupId, interested } = useLocalSearchParams();
  const [groups, setGroups] = useState(
    JSON.parse(interested as string) as Group[]
  );

  const refreshGroups = async () => {
    if (!groupId || !userId) return;
    getGroupRequests(groupId as string).then((res) => {
      if (res.error) {
        console.error(res.error);
        return;
      }
      setGroups(res.data);
    });
  };

  const refresh = async () => {
    setLoading(true);
    await Promise.all([refreshGroups()]);
    setLoading(false);
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        style={{ paddingTop: 24 }}
        contentContainerStyle={{ gap: 16 }}
      >
        {groups.map((group, index) => (
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
                {group.members.length} Member{group.members.length != 1 && "s"}
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    await acceptRequestToJoinGroup(
                      group.group_id,
                      groupId as string
                    );
                    await refresh();
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
                    await refresh();
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
            {index < groups.length - 1 && (
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

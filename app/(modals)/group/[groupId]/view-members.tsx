import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Link, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/DefaultStyles";
import {
  getGroupById,
  getGroupRequests,
} from "@/utils/api/groups";
import { useUserIdStore } from "@/utils/store/user-id-store";
import { Profile } from "@/utils/api/profiles";
import { Group } from "@/utils/api/project-details";
import Skeleton from "@/components/LoadingSkeleton";
import {RefreshControl} from "react-native-gesture-handler";

const ViewMembers = () => {
  const { groupId, maxGroupSize } = useLocalSearchParams();
  const userId = useUserIdStore((state) => state.userId);
  const [members, setMembers] = useState<Profile[] | null>(null);
  const [loadingGroup, setLoadingGroup] = useState(true);
  const [loadingInterested, setLoadingInterested] = useState(true);
  const [interested, setInterested] = useState<Group[]>([]);

  const loadGroup = async () => {
    setLoadingGroup(true);
    getGroupById(groupId as string).then((res) => {
      if (res.error) return console.error(res.error);
      setMembers(res.data?.members);
    });
    setLoadingGroup(false);
  }

  useEffect(() => {
    if (!groupId || !userId) return;
    getGroupRequests(groupId as string).then((res) => {
      setLoadingInterested(false);
      if (res.error) return console.error(res.error);
      setInterested(res.data);
    });
    loadGroup();
  }, [groupId, userId]);

  if (loadingGroup || loadingInterested)
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
    <View style={{
      flex: 1,
      backgroundColor: Colors.background,
      position: "relative",
    }}>
      <ScrollView
          refreshControl={
            <RefreshControl
                refreshing={loadingGroup || loadingInterested}
                onRefresh={loadGroup}
            />
          }
      >
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <Text style={{ alignSelf: "center", fontSize: 16 }}>
            You currently have{" "}
            <Text style={{ fontWeight: "700" }}>
              {members?.length}/{maxGroupSize as string}
            </Text>{" "}
            members
          </Text>
          <View
              style={{
                marginTop: 32,
                gap: 12,
                borderBottomColor: Colors.gray,
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingBottom: 16,
              }}
          >
            {members?.map((member, i) => (
                <Link href={`/(modals)/view-profile/${member.id}`} asChild key={i}>
                  <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Image
                        source={member.imageUrl}
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
                </Link>
            ))}
          </View>
          {interested.length > 0 && (
              <Link href={`./view-interested?interested=${JSON.stringify(interested)}`} asChild style={{ marginTop: 16 }}>
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
                  <Text style={{ marginLeft: 8, fontWeight: "600", fontSize: 14 }}>
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
    </View>
  );
};

export default ViewMembers;

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { getUserId, supabase } from "@/utils/supabase";
import { getAllAffiliatedOrganisations } from "@/utils/api/organisations";
import { useQuery } from "@tanstack/react-query";
import { getMyGroups } from "@/utils/api/groups";
import { queryClient } from "@/app/_layout";
import { getProfileByUserId } from "@/utils/api/profiles";

const ViewProfile = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const userId = await getUserId();
      return getProfileByUserId(userId!);
    },
    staleTime: Infinity,
  });

  const { data: myGroups } = useQuery({
    queryKey: ["myGroups"],
    queryFn: getMyGroups,
    staleTime: Infinity,
  });

  const { data: orgs } = useQuery({
    queryKey: ["myOrgs"],
    queryFn: async () => {
      const userId = await getUserId();
      return getAllAffiliatedOrganisations(userId!);
    },
  });

  const refresh = async () => {
    queryClient.invalidateQueries({
      queryKey: ["myGroups"],
    });
    queryClient.invalidateQueries({
      queryKey: ["myOrgs"],
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refresh} />
        }
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors.background, paddingBottom: 100 },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            marginTop: 16,
            backgroundColor: Colors.background,
            padding: 8,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Image
            source={
              profile?.data
                ? { uri: profile?.data?.imageUrl ?? "" }
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            style={styles.img}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {profile?.data?.full_name}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.gray, marginTop: 4 }}>
              Pro User
            </Text>
          </View>
          <View
            style={{
              height: "80%",
              backgroundColor: Colors.lightGray,
              width: 2,
              alignSelf: "center",
              marginLeft: "auto",
            }}
          />
          <Link asChild href="/(authenticated)/profile/edit-profile">
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginRight: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="edit"
                size={24}
                color={Colors.primary}
                style={{
                  alignSelf: "center",

                  paddingVertical: 16,
                }}
              />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => supabase.auth.signOut()}
          >
            <Ionicons name="log-out-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 32, fontSize: 24, fontWeight: "600" }}>
          My Groups
        </Text>
        {myGroups && myGroups.length <= 0 ? (
          <Text style={{ color: Colors.gray, marginTop: 16 }}>
            You are not in any groups
          </Text>
        ) : (
          myGroups &&
          myGroups.map((group, i) => (
            <Link
              asChild
              href={`/(modals)/group/${group.id}/view-members?maxGroupSize=${group.maxGroupSize}&projectId=${group.projectId}`}
              key={i}
            >
              <TouchableOpacity
                style={{
                  paddingTop: i == 0 ? 16 : 12,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: Colors.lightGray,
                  paddingVertical: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={group.image}
                  style={{ width: 64, height: 64, borderRadius: 32 }}
                />
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {group.projectName}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: Colors.gray, marginTop: 4 }}
                  >
                    {group.currentGroupSize}/{group.maxGroupSize} team members
                  </Text>
                </View>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={Colors.dark}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            </Link>
          ))
        )}
        <Text style={{ marginTop: 32, fontSize: 24, fontWeight: "600" }}>
          My Organisations
        </Text>
        {orgs?.data && orgs.data.length <= 0 ? (
          <Text style={{ color: Colors.gray, marginTop: 16 }}>
            You are not in any organisations
          </Text>
        ) : (
          orgs?.data &&
          orgs.data.map((org, i) => (
            <Link asChild href={`/(modals)/view-org/${org.org_id}`} key={i}>
              <TouchableOpacity
                style={{
                  paddingTop: i == 0 ? 16 : 12,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: Colors.lightGray,
                  paddingVertical: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                key={i}
              >
                <Image
                  source={org.image}
                  style={{ width: 64, height: 64, borderRadius: 32 }}
                />
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {org.name}
                  </Text>
                </View>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={Colors.dark}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            </Link>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 48,
  },
});

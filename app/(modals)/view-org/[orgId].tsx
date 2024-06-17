import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { defaultStyles } from "@/constants/DefaultStyles";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useUserIdStore } from "@/utils/store/user-id-store";
import {
  getAllJoinedOrganisations,
  getAllMembersInOrganisation,
  getOrganisationById,
  getProjectsByOrganisation,
  joinOrganisation,
} from "@/utils/api/organisations";
import { FontAwesome } from "@expo/vector-icons";
import { Project } from "@/utils/api/project-details";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "@/utils/supabase";
import { queryClient } from "@/app/_layout";

const ViewOrg = () => {
  const orgId = useLocalSearchParams().orgId as string;

  const { data: orgs, status: myOrgsStatus } = useQuery({
    queryKey: ["myOrgs"],
    queryFn: async () => {
      const userId = await getUserId();
      return getAllJoinedOrganisations(userId!);
    },
  });

  const inOrg = orgs?.data?.some((org) => org.org_id === orgId);

  const { data: thisOrg, status: thisOrgStatus } = useQuery({
    queryKey: ["org", orgId],
    queryFn: () => getOrganisationById(orgId),
  });

  const { data: projects } = useQuery({
    queryKey: ["projects", orgId],
    queryFn: () => getProjectsByOrganisation(orgId),
  });

  const { data: members } = useQuery({
    queryKey: ["members", orgId],
    queryFn: () => getAllMembersInOrganisation(orgId),
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        position: "relative",
      }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors.background, paddingBottom: 100 },
        ]}
      >
        <View style={{ position: "relative" }}>
          <Image source={thisOrg?.data?.image} style={styles.img} />
          <View
            style={[
              styles.img,
              {
                position: "absolute",
                backgroundColor: Colors.gray,
                opacity: 0.15,
              },
            ]}
          />
        </View>

        <Text style={{ marginTop: 16, fontSize: 24, fontWeight: "600" }}>
          {thisOrg?.data?.name}
        </Text>
        <Text style={{ fontSize: 16, color: Colors.gray }}>
          {thisOrg?.data?.subtitle}
        </Text>
        <Text style={{ marginTop: 24 }}>{thisOrg?.data?.description}</Text>
        <Text
          style={{
            marginTop: 32,
            marginBottom: 4,
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          Projects
        </Text>
        <View style={{ gap: 4 }}>
          {projects?.data?.map((project, i) => (
            <Link
              asChild
              href={`/(modals)/view-project/${project.project_id}`}
              key={i}
            >
              <TouchableOpacity
                style={{
                  borderColor: Colors.lightGray,
                  paddingVertical: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: project.image_uri }}
                  style={{ width: 64, height: 64, borderRadius: 32 }}
                />
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {project.name.length > 25
                      ? project.name.substring(0, 25) + "..."
                      : project.name}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: Colors.gray, marginTop: 4 }}
                  >
                    {project.min_group_size === project.max_group_size
                      ? `${project.min_group_size} team members`
                      : `${project.min_group_size}-${project.max_group_size} team members`}
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
          ))}
        </View>
        <Text
          style={{
            marginTop: 16,
            marginBottom: 4,
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          Organisation Members
        </Text>
        <View style={{ gap: 20, marginTop: 16 }}>
          {members?.data?.map((member, i) => (
            <TouchableOpacity
              key={i}
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                router.navigate(`/(modals)/view-profile/${member.id}`);
              }}
            >
              <Image
                source={member.imageUrl + "?t=" + new Date()}
                style={{ width: 64, height: 64, borderRadius: 32 }}
              />
              <Text style={{ marginLeft: 24, fontWeight: "500", fontSize: 16 }}>
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
      </ScrollView>
      {!inOrg && (
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: Colors.primary,
              marginTop: "auto",
              position: "absolute",
              width: "90%",
              alignSelf: "center",
              bottom: 32,
            },
          ]}
          onPress={async () => {
            if (thisOrgStatus === "pending" || !orgId) return;
            if (inOrg) {
              // leaveOrganisation(orgId, userId).then((res) => {
              //   if (!res.error) setInOrg(false);
              // });
            } else {
              const userId = await getUserId();
              joinOrganisation(orgId, userId!).then((res) => {
                queryClient.invalidateQueries({ queryKey: ["myOrgs"] });
              });
            }
            router.back();
          }}
        >
          <View>
            <Text style={{ color: Colors.lightGray, fontSize: 16 }}>
              {thisOrgStatus === "pending" || myOrgsStatus === "pending"
                ? "Loading..."
                : inOrg
                ? "Leave Organisation"
                : "Join Organisation"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ViewOrg;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  img: {
    width: "100%",
    aspectRatio: 5 / 3,
    borderRadius: 12,
    alignSelf: "center",
    resizeMode: "cover",
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    width: "100%",
    height: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  img2: {
    height: 80,
    width: 80,
    borderRadius: 48,
  },
});

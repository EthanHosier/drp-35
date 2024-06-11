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
  getOrganisationById,
  getProjectsByOrganisation,
  joinOrganisation,
  leaveOrganisation,
} from "@/utils/api/organisations";
import { FontAwesome } from "@expo/vector-icons";
import { Project } from "@/utils/api/project-details";

const ViewOrg = () => {
  const orgId = useLocalSearchParams().orgId as string;
  const userId = useUserIdStore((user) => user.userId);

  const [loading, setLoading] = React.useState(true);
  const [inOrg, setInOrg] = React.useState(false);
  const [organisation, setOrganisation] = React.useState({
    name: "",
    subtitle: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    getAllJoinedOrganisations(userId).then((res) =>
      setInOrg(!res.error && res.data?.some((org) => org.org_id === orgId))
    );
    getOrganisationById(orgId).then((res) => {
      if (!res.error)
        setOrganisation({
          name: res.data.name,
          subtitle: res.data.subtitle,
          description: res.data.description,
          image: res.data.image,
        });
    });
    setLoading(false);
  }, []);

  const [projects, setProjects] = useState<Project[] | null>([]);
  useEffect(() => {
    const getProjects = () => {
      getProjectsByOrganisation(orgId).then((res) => {
        if (!res.data) return;
        setProjects(res.data);
      });
    };
    getProjects();
  }, []);

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
          <Image source={organisation.image} style={styles.img} />
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
          {organisation.name}
        </Text>
        <Text style={{ fontSize: 16, color: Colors.gray }}>
          {organisation.subtitle}
        </Text>
        <Text style={{ marginTop: 24 }}>{organisation.description}</Text>
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
          {projects?.map((project, i) => (
            <Link
              asChild
              href={`/(authenticated)/profile/projects/${project.project_id}`}
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
          onPress={() => {
            if (loading || !orgId) return;
            if (inOrg) {
              // leaveOrganisation(orgId, userId).then((res) => {
              //   if (!res.error) setInOrg(false);
              // });
            } else {
              joinOrganisation(orgId, userId).then((res) => {
                if (!res.error) setInOrg(true);
              });
            }
            router.back();
          }}
        >
          <View>
            <Text style={{ color: Colors.lightGray, fontSize: 16 }}>
              {loading
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

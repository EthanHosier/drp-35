import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "@/utils/supabase";
import { useProfileStore } from "@/utils/store/profile-store";
import { useMyGroupsStore } from "@/utils/store/my-groups-store";
import {
  Organisation,
  getAllJoinedOrganisations,
} from "@/utils/api/organisations";
import { useUserIdStore } from "@/utils/store/user-id-store";

const ViewProfile = () => {
  const image = useProfileStore((state) => state.imageUri);
  const fullName = useProfileStore((state) => state.fullName);
  const myGroups = useMyGroupsStore((state) => state.groups);
  const userId = useUserIdStore((state) => state.userId);
  const [orgs, setOrgs] = useState<Organisation[] | null>([]);
  useEffect(() => {
    const getOrganisations = () => {
      getAllJoinedOrganisations(userId).then((res) => {
        if (!res.data) return;
        setOrgs(res.data);
      });
    };
    getOrganisations();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
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
              image
                ? { uri: image }
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            style={styles.img}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>{fullName}</Text>
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
        {myGroups.map((group, i) => (
          <Link
            asChild
            href={`/(authenticated)/profile/projects/${group.id}/view-members?maxGroupSize=${group.maxGroupSize}`}
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
        ))}
        <Text style={{ marginTop: 32, fontSize: 24, fontWeight: "600" }}>
          My Organisations
        </Text>
        {orgs?.map((org, i) => (
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
        ))}
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

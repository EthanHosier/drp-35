import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

type Project = {
  title: string;
  image: string;
  date: Date;
  teamMembersGot: number;
  teamMembersNeeded: number;
};

const PROJECTS: Project[] = [
  {
    title: "Project 1",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shield_of_Imperial_College_London.svg/1200px-Shield_of_Imperial_College_London.svg.png",
    date: new Date(),
    teamMembersGot: 2,
    teamMembersNeeded: 4,
  },
  {
    title: "Project 2",
    image:
      "https://pbs.twimg.com/profile_images/1742880732207329280/NYKXBC3k_400x400.jpg",
    date: new Date(),
    teamMembersGot: 1,
    teamMembersNeeded: 2,
  },
  {
    title: "Project 3",
    image:
      "https://image.similarpng.com/very-thumbnail/2021/11/Mcdonalds-logo-on-transparent-background-PNG.png",
    date: new Date(),
    teamMembersGot: 3,
    teamMembersNeeded: 5,
  },
];

const ViewProfile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors.background, flex: 1 },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            backgroundColor: Colors.background,
            padding: 8,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Image
            source={"https://avatars.githubusercontent.com/u/80335311?v=4"}
            style={styles.img}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Ethan Hosier
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
                  paddingRight: 16,
                  paddingVertical: 16,
                }}
              />
            </TouchableOpacity>
          </Link>
        </View>
        <Text style={{ marginTop: 32, fontSize: 24, fontWeight: "600" }}>
          My Projects
        </Text>
        {PROJECTS.map((project, i) => (
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
              source={project.image}
              style={{ width: 64, height: 64, borderRadius: 32 }}
            />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {project.title}
              </Text>
              <Text style={{ fontSize: 14, color: Colors.gray, marginTop: 4 }}>
                {project.teamMembersGot}/{project.teamMembersNeeded} team
                members
              </Text>
            </View>
            <FontAwesome
              name="chevron-right"
              size={16}
              color={Colors.dark}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
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

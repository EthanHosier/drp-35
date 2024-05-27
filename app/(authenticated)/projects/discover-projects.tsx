import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/DefaultStyles";
import { Ionicons } from "@expo/vector-icons";
import ProjectPreview from "@/components/projects/project-preview";

export type Project = {
  name: string;
  date: Date;
  image: string;
  groupSize: number;
};

const PROJECTS: Project[] = [
  {
    name: "Learn to code with Amelia",
    date: new Date(),
    image:
      "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg",
    groupSize: 5,
  },
  {
    name: "Guided tour at the museum",
    date: new Date(),
    image:
      "https://infed.org/mobi/wp-content/uploads/2014/03/eldan-goldenberg-groupwork-eldan-492925839-ccbyncsa2.jpg",
    groupSize: 5,
  },
  {
    name: "Guided tour at the museum",
    date: new Date(),
    image:
      "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg",
    groupSize: 5,
  },
  {
    name: "Guided tour at the museum",
    date: new Date(),
    image:
      "https://infed.org/mobi/wp-content/uploads/2014/03/eldan-goldenberg-groupwork-eldan-492925839-ccbyncsa2.jpg",
    groupSize: 5,
  },
];

const DiscoverProjects = () => {
  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.primaryMuted, "#fff"]}
        style={{ height: "100%" }}
        locations={[0, 1]} // Adjust the second value to make the transition earlier or later
      >
        <SafeAreaView>
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View style={{ paddingHorizontal: 24 }}>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  marginTop: 12,
                }}
              >
                <Ionicons name="add" size={32} color={Colors.primary} />
              </TouchableOpacity>
              <View style={{ marginTop: 24 }}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                  Hello, Ethan
                </Text>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: Colors.primary,
                  }}
                >
                  There are 25 new projects in your area.
                </Text>
              </View>
              <View style={[defaultStyles.textInput, styles.textInputView]}>
                <Ionicons name="search" size={20} color={Colors.gray} />

                <TextInput
                  style={{ flex: 1, marginLeft: 8, fontSize: 16 }}
                  placeholder="Search for a project"
                />
              </View>
              <Text style={{ marginTop: 56, fontSize: 24, fontWeight: "600" }}>
                You might like
              </Text>
            </View>

            <View>
              <ScrollView
                style={{ marginTop: 12 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {PROJECTS.map((project, i) => (
                  <ProjectPreview project={project} key={i} />
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default DiscoverProjects;

const styles = StyleSheet.create({
  textInputView: {
    marginTop: 32,
    flexDirection: "row",
  },
});

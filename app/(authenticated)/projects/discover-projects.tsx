import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/DefaultStyles";
import { Ionicons } from "@expo/vector-icons";

type Project = {
  name: string;
  date: Date;
  image: string;
  groupSize: number;
};

const PROJECTS: Project[] = [
  {
    name: "Project 1",
    date: new Date(),
    image: "https://picsum.photos/200",
    groupSize: 5,
  },
  {
    name: "Project 2",
    date: new Date(),
    image: "https://picsum.photos/200",
    groupSize: 5,
  },
  {
    name: "Project 3",
    date: new Date(),
    image: "https://picsum.photos/200",
    groupSize: 5,
  },
  {
    name: "Project 4",
    date: new Date(),
    image: "https://picsum.photos/200",
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
        locations={[0, 0.9]} // Adjust the second value to make the transition earlier or later
      >
        <SafeAreaView style={{ padding: 24 }}>
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View>
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

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/DefaultStyles";
import Badge from "@/components/profile/badge";
import { Stack } from "expo-router";

const TEXT_FIELDS = [
  "Full Name",
  "Pronouns",
  "University",
  "Course",
  "LinkedIn",
  "GitHub",
  "Website",
];

const SKILLS = [
  "JavaScript",
  "Python",
  "Java",
  "HTML",
  "CSS",
  "SQL",
  "TypeScript",
  "React",
  "Node.js",
  "C#",
  "C++",
  "C",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Go",
  "React Native",
  "Angular",
  "Vue",
  "Express",
  "MongoDB",
  "Flutter",
  "Dart",
  "Svelte",
  "Rust",
];

const EditProfile = () => {
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          padding: 24,
        }}
      >
        <Image
          source={
            "https://i.pinimg.com/236x/30/bc/74/30bc74c40ec71c440c9c11202772edb9.jpg"
          }
          style={styles.image}
        />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: Colors.lightGray,
              width: 132,
              height: 36,
              marginTop: 16,
            },
          ]}
        >
          <Text style={{ fontWeight: "600", fontSize: 12 }}>
            Edit Profile Photo
          </Text>
        </TouchableOpacity>

        {TEXT_FIELDS.map((e, i) => (
          <View style={{ width: "100%" }} key={i}>
            <Text style={styles.attributeTitle}>{e}</Text>
            <TextInput
              style={[styles.textInput]}
              placeholder={e}
              placeholderTextColor={Colors.gray}
            />
          </View>
        ))}

        <View style={{ width: "100%" }}>
          <Text style={styles.attributeTitle}>Skills</Text>
          <View
            style={{
              marginTop: 16,
              flexWrap: "wrap",
              width: "100%",
              flexDirection: "row",
              gap: 8,
            }}
          >
            {SKILLS.map((e, i) => (
              <Badge text={e} key={i} selectable />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%",
  },
  textInput: {
    marginTop: 8,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    width: "100%",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    resizeMode: "cover",
  },
  attributeTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
  },
});

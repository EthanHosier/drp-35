import React from 'react';
import {ScrollView, StyleSheet, View, Text} from "react-native";
import {Image} from "expo-image";
import Colors from "@/constants/Colors";

export const TEXT_FIELDS = [
  "Full Name",
  "Pronouns",
  "University",
  "Course",
  "LinkedIn",
  "GitHub",
  "Website",
];

const EXAMPLE_DETAILS = [
  "John Doe",
  "He/Him",
  "Imperial College London",
  "Computing",
  "https://www.linkedin.com/in/johndoe",
  "",
  "",
]

const ProfileCard = () => {
  return <View style={{ flex: 1 }}>
    <ScrollView
        contentContainerStyle={[styles.scrollContainer, { padding: 16 }]}
    >
      <Image
          source={"https://avatars.githubusercontent.com/u/80335311?v=4"}
          style={styles.img}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {EXAMPLE_DETAILS[0]}
        </Text>
        <Text style={{ fontSize: 16, color: Colors.gray, verticalAlign: "bottom" }}>
          {EXAMPLE_DETAILS[1]}
        </Text>
      </View>

    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 8,
    paddingBottom: 40,
    justifyContent: "center",
  },
  img: {
    width: "100%",
    aspectRatio: 1, //#endregion
    borderRadius: 12,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.dark,
    paddingLeft: 10,
    marginRight: 8
  }
});

export default ProfileCard;

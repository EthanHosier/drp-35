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
      <View style={styles.imgContainer}>
        <Image
            source={"https://avatars.githubusercontent.com/u/80335311?v=4"}
            style={styles.img}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {EXAMPLE_DETAILS[0]}
          </Text>
          <Text style={{ fontSize: 16, color: "white", verticalAlign: "bottom" }}>
            {EXAMPLE_DETAILS[1]}
          </Text>
        </View>
      </View>
      {TEXT_FIELDS.map((field, index) => (
          <>
            <Text style={{ fontSize: 16, color: "white", marginHorizontal: 20 }}>
              {field}
            </Text>
            <View style={styles.fieldsContainer}>
              <Text style={{ fontSize: 16, color: "white", flex: 2, padding: 8 }}>
                {EXAMPLE_DETAILS[index + 2]}
              </Text>
            </View>
          </>
      ))}
    </ScrollView>
  </View>
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 8,
    paddingBottom: 40,
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  imgContainer: {
    marginVertical: 16,
    alignItems: "flex-start",
    borderRadius: 20,
    backgroundColor: Colors.primaryMuted,
  },
  img: {
    width: "100%",
    aspectRatio: 1, //#endregion
    borderRadius: 20,
  },
  nameContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    flex: 1,
  },
  fieldsContainer: {
    marginBottom: 16,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Colors.primaryMuted,
  },
});

export default ProfileCard;
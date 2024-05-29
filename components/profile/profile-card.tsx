import React from "react";
import { ScrollView, StyleSheet, View, Text, Linking } from "react-native";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { useProfileStore } from "@/utils/store/profile-store";

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
];

const ProfileCard = () => {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const LinkText = ({ text }: { text: string }) => {
    const regex = /(https?:\/\/\S+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text
          key={index}
          style={[styles.fieldsText, styles.link]}
          onPress={() => handleLinkPress(part)}
        >
          {part}
        </Text>
      ) : (
        <Text key={index} style={styles.fieldsText}>
          {part}
        </Text>
      )
    );
  };

  const image = useProfileStore((state) => state.image);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { padding: 16 }]}
      >
        <View style={styles.imgContainer}>
          <Image
            source={
              image
                ? { uri: image }
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            style={styles.img}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{EXAMPLE_DETAILS[0]}</Text>
            <Text
              style={{ fontSize: 16, color: "white", verticalAlign: "middle" }}
            >
              {EXAMPLE_DETAILS[1]}
            </Text>
          </View>
        </View>
        {TEXT_FIELDS.slice(2, -1).map((field, index) => (
          <View key={index} style={styles.detailContainer}>
            <Text
              style={{ fontSize: 16, color: "white", marginHorizontal: 20 }}
            >
              {field}
            </Text>
            <View style={styles.fieldsContainer}>
              <LinkText text={EXAMPLE_DETAILS[index + 2]} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 8,
    paddingBottom: 40,
    justifyContent: "center",
    backgroundColor: "#988bff",
  },
  imgContainer: {
    marginVertical: 16,
    alignItems: "flex-start",
    borderRadius: 20,
    backgroundColor: Colors.primary,
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
  detailContainer: {
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: Colors.primary,
  },
  fieldsContainer: {
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Colors.primaryMuted,
  },
  fieldsText: {
    fontSize: 16,
    color: Colors.dark,
    flex: 2,
    padding: 8,
  },
  link: {
    textDecorationLine: "underline",
  },
});

export default ProfileCard;

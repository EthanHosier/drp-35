import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const ProjectId = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source="https://infed.org/mobi/wp-content/uploads/2014/03/eldan-goldenberg-groupwork-eldan-492925839-ccbyncsa2.jpg"
          style={styles.img}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: Colors.dark,
            marginTop: 16,
          }}
        >
          Learn to code with Amelia
        </Text>
        <Text style={{ marginTop: 4, color: Colors.gray }}>
          Fri, Dec 23, 4:00 PM
        </Text>
        <View style={[styles.attributeContainer, { marginTop: 24 }]}>
          <View style={styles.attributeIconContainer}>
            <Ionicons name="people-outline" size={24} color="black" />
          </View>
          <Text style={styles.attributeText}>4 Group Members</Text>
        </View>
        <Text style={{ marginTop: 24 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </ScrollView>
    </View>
  );
};

export default ProjectId;

const styles = StyleSheet.create({
  container: { padding: 24 },
  img: { aspectRatio: 5 / 3, width: "100%", borderRadius: 16 },
  attributeContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    gap: 16,
  },
  attributeIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    height: 44,
    width: 44,
    borderRadius: 8,
  },
  attributeText: { fontSize: 16, fontWeight: "500" },
});

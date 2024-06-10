import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import { Group } from "@/utils/api/project-details";

const ViewInterested = () => {
  const { interested } = useLocalSearchParams();
  const groups = JSON.parse(interested as string) as Group[];

  return (
    <View style={[styles.container]}>
      <ScrollView
        style={{ paddingTop: 24 }}
        contentContainerStyle={{ gap: 16 }}
      >
        {groups.map((group, index) => (
          <View style={{}} key={index}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 24,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {group.members.length} Member{group.members.length != 1 && "s"}
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={[styles.buttonText, { color: Colors.background }]}
                  >
                    Accept
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                  <Text style={[styles.buttonText, {}]}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ marginTop: 16 }}
              contentContainerStyle={{ paddingLeft: 16, gap: 16 }}
            >
              {group.members.map((member, id) => (
                <TouchableOpacity key={id} style={{ marginRight: 12 }}>
                  <Image source={member.imageUrl} style={styles.image} />
                  <Text style={[styles.text, { marginTop: 8 }]}>
                    {member.full_name.split(" ")[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {index < groups.length - 1 && (
              <View style={{ width: "100%", paddingHorizontal: 24 }}>
                <View
                  style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: Colors.gray,
                    marginTop: 16,
                  }}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: Colors.background,
    width: "100%",
  },

  text: {
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-end",
    height: 32,
    justifyContent: "center",
  },
  rejectButton: {
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});

export default ViewInterested;

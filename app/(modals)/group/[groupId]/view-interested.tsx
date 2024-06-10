import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import {Image} from "expo-image";
import {ScrollView} from "react-native-gesture-handler";
import { Group } from "@/utils/api/project-details";

const ViewInterested = () => {
  const { interested } = useLocalSearchParams();
  const groups = JSON.parse(interested as string) as Group[];

  return (
      <View style={styles.container}>
        {groups.map((group, id) => (
          <View key={id} style={styles.groupContainer}>
            <View style={{flexDirection: "row", width: "100%", gap: 8}}>
              <Text style={styles.text}>
                {group.members.length} Member{(group.members.length != 1) && "s"}
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{marginTop: 12}}
            >
              {group.members.map((member, id) =>
                  <TouchableOpacity key={id} style={{marginRight: 12}}>
                    <Image source={member.imageUrl} style={styles.image}/>
                    <Text style={[styles.text, {width: 80}]}>{member.full_name}</Text>
                  </TouchableOpacity>)}
            </ScrollView>
          </View>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
    width: "100%",
  },
  groupContainer: {
    width: "100%",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    padding: 8,
    paddingBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  rejectButton: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    color: Colors.background,
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

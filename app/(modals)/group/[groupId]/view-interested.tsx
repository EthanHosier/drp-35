import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useLocalSearchParams} from "expo-router";
import Colors from "@/constants/Colors";
import {Group} from "@/utils/api/project-details";

const ViewInterested = () => {

  const { interested } = useLocalSearchParams();
  const groups = JSON.parse(interested as string) as Group[];

  return (
      <View style={styles.container}>
        {groups.map((group, id) => (
          <View key={id} style={{width: "100%"}}>
            <View style={{flexDirection: "row", width: "100%", gap: 8}}>
              <Text style={styles.text}>
                {group.members.length} Member{(group.members.length != 1) && "s"}
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
            {group.members.map((member, id) => <View></View>)}
          </View>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    padding: 4,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  }
})

export default ViewInterested;

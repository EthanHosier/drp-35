import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const Messages = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.messagesHeader}>Messages</Text>
        <TouchableOpacity>
          <Text style={styles.requests}>Requests</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%",
    padding: 24,
  },
  messagesHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  requests: {
    color: Colors.dark,
    fontWeight: "semibold",
  },
});

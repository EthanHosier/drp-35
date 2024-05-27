import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";

const DiscoverProjects = () => {
  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.primaryMuted, "Colors.background"]}
        style={{ height: "100%" }}
      />
    </View>
  );
};

export default DiscoverProjects;

const styles = StyleSheet.create({});

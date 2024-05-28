import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="discover-projects" options={{ headerShown: false }} />
      <Stack.Screen name="add-project" options={{ headerShown: false }} />
      <Stack.Screen
        name="[projectId]"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});

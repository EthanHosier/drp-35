import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="messages"
        options={{
          title: "",

          headerLargeTitle: true,
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});

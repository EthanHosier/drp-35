import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="discover-projects" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-project"
        options={{
          presentation: "fullScreenModal",
          title: "New Project",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Create
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[projectId]"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});

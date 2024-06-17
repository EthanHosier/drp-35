import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="[projectId]" options={{ headerShown: false }} />
      <Stack.Screen
        name="match"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          animationDuration: 10,
          headerTransparent: true,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close" size={32} color={Colors.background} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="filter-main"
        options={{
          title: "Filter Groups",
          presentation: "fullScreenModal",
          animationDuration: 300,
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="languages"
        options={{
          title: "Languages",
          presentation: "fullScreenModal",
          animationDuration: 300,
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="skills"
        options={{
          title: "Skills",
          presentation: "fullScreenModal",
          animationDuration: 300,
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{ color: Colors.primary, fontWeight: 500, fontSize: 16 }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

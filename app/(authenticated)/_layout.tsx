import React from "react";
import { Tabs, useSegments } from "expo-router";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";

const Layout = () => {
  const segments = useSegments();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark,
        tabBarBackground: () => (
          <BlurView
            tint="extraLight"
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}
            intensity={80}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,

          tabBarStyle: {
            display: segments[2] === "[chatId]" ? "none" : "flex",
          },
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="message-text"
                size={size + 1}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="message-text-outline"
                size={size}
                color={color}
              />
            ),
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="projects"
        options={{
          headerShown: false,
          title: "Projects",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <Ionicons name="compass" size={size + 1 + 4} color={color} />
            ) : (
              <Ionicons name="compass-outline" size={size + 4} color={color} />
            ),
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={size + 1} color={color} />
            ) : (
              <FontAwesome name="user-circle-o" size={size} color={color} />
            ),
          tabBarLabel: "",
        }}
      />
    </Tabs>
  );
};

export default Layout;

import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
      }}
    >
      <Tabs.Screen
        name="one"
        options={{
          title: "One",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={size + 1} color={color} />
            ) : (
              <FontAwesome name="user-circle-o" size={size} color={color} />
            ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Two",
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

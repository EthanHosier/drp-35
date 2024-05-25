import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
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
        name="one"
        options={{
          title: "One",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="downcircleo" size={24} color="black" />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Two",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="downcircleo" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

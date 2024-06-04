import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="chats"
        options={{
          headerShown: false,
          animation: "slide_from_left",
          customAnimationOnGesture: true,
          animationDuration: 300,
        }}
      />
    </Stack>
  );
};

export default Layout;

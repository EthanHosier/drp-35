import { TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="[organisationId]" options={{ headerShown: false }} />
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
    </Stack>
  );
};

export default Layout;

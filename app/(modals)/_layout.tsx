import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="view-org"
        options={{
          title: "View Organisation",
          headerRight: () => (
            <TouchableOpacity onPress={router.back}>
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: 500,
                  fontSize: 16,
                }}
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

import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import Colors from "@/constants/Colors";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="[groupId]"
        options={{
          title: "My Group",
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

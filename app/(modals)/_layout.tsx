import { Text } from "react-native";
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
      <Stack.Screen
        name="view-profile"
        options={{
          title: "View Profile",
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
      <Stack.Screen
        name="group"
        options={{
          title: "Group",
          headerShown: false,
        }}
      />

      <Stack.Screen
          name="view-project"
          options={{
            presentation: "fullScreenModal",
            title: "View Project",
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
      <Stack.Screen name="filter" options={{headerShown: false}}/>
    </Stack>
  );
};

export default Layout;

import {Text, TouchableOpacity} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
          name="filter-main"
          options={{
            presentation: "fullScreenModal",
            title: "Filter Groups",
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
            presentation: "fullScreenModal",
            title: "Languages",
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
            presentation: "fullScreenModal",
            title: "Skills",
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

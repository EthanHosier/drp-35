import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="[groupId]"
        options={{
          title: "My Group",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="chevron-back-sharp"
                size={24}
                color={Colors.primary}
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="ellipsis-horizontal-sharp"
                size={24}
                color={Colors.primary}
                style={{
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

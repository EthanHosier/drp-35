import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="messages"
        options={{
          title: "",
          headerLargeTitle: true,
          headerLeft: () => (
            <TouchableOpacity style={{ padding: 12 }}>
              <Ionicons
                name="ellipsis-horizontal-sharp"
                size={24}
                color={Colors.dark}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={router.back}
              style={{ paddingLeft: 24, paddingVertical: 24 }}
            >
              <FontAwesome
                name="chevron-right"
                size={20}
                color={Colors.dark}
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[chatId]"
        options={{
          title: "",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingBottom: 4,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Group Chat
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Image
                source=""
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});

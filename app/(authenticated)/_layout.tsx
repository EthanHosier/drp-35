import React, { useEffect } from "react";
import { Tabs, useRouter, useSegments } from "expo-router";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { supabase } from "@/utils/supabase";
import { useUserIdStore } from "@/utils/store/user-id-store";
import { useProfileStore } from "@/utils/store/profile-store";

const Layout = () => {
  const segments = useSegments();
  const setUserId = useUserIdStore((state) => state.setUserId);
  const setFullName = useProfileStore((state) => state.setFullName);

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert("User not found");
        return;
      }
      setUserId(user.id);
    };

    const getFullName = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .single();
      if (error) return;
      setFullName(data.full_name);
    };

    getUserId().then(() => {
      getFullName();
    });
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark,
        tabBarBackground: () => (
          <BlurView
            tint="extraLight"
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}
            intensity={80}
          />
        ),
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
        name="chats"
        options={{
          headerShown: false,

          tabBarStyle: {
            display: segments[2] === "[chatId]" ? "none" : "flex",
          },
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <Ionicons
                name="chatbubble-ellipses"
                size={size + 1}
                color={color}
              />
            ) : (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={size}
                color={color}
              />
            ),
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="projects"
        options={{
          headerShown: false,
          title: "Projects",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <Ionicons name="compass" size={size + 1 + 4} color={color} />
            ) : (
              <Ionicons name="compass-outline" size={size + 4} color={color} />
            ),
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
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

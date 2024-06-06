import React, { useEffect } from "react";
import { Link, Tabs, useRouter, useSegments } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { supabase } from "@/utils/supabase";
import { useUserIdStore } from "@/utils/store/user-id-store";
import { useProfileStore } from "@/utils/store/profile-store";
import { TouchableOpacity } from "react-native-gesture-handler";

const SIZE = 25;

const Layout = () => {
  const router = useRouter();
  const segments = useSegments();
  const setUserId = useUserIdStore((state) => state.setUserId);
  const setFullName = useProfileStore((state) => state.setFullName);

  useEffect(() => {
    const getUserIdAndFullName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert("User not found");
        return;
      }
      setUserId(user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .single();
      if (error) return;
      setFullName(data.full_name);
    };

    getUserIdAndFullName();
  }, []);

  return (
    <>
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
            display: "none",
          },
        }}
      >
        <Tabs.Screen
          name="projects"
          options={{
            headerShown: false,
            title: "Projects",
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
      </Tabs>
      <BlurView
        tint="extraLight"
        intensity={80}
        style={{
          flexDirection: "row",
          gap: 4,
          backgroundColor: "rgba(0,0,0,0.1)",
          justifyContent: "space-around",
          paddingHorizontal: 12,
          height: 80,
          paddingTop: 4,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Link href={"/(authenticated)/chats"} style={{ flex: 1 }} asChild>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 100,
              alignItems: "center",
            }}
          >
            {segments[1] === "chats" ? (
              <Ionicons
                name="chatbubble-ellipses"
                size={SIZE + 1}
                color={"black"}
              />
            ) : (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={SIZE}
                color={Colors.gray}
              />
            )}
          </TouchableOpacity>
        </Link>
        <Link href={"/projects"} style={{ flex: 1 }} asChild>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 100,
              alignItems: "center",
            }}
          >
            {segments[2] === "projects" ? (
              <Ionicons name="compass" size={SIZE + 1 + 4} color={"black"} />
            ) : (
              <Ionicons
                name="compass-outline"
                size={SIZE + 4}
                color={Colors.gray}
              />
            )}
          </TouchableOpacity>
        </Link>
        <Link href={"/profile"} style={{ flex: 1 }} asChild>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 100,
              alignItems: "center",
            }}
          >
            {segments[2] === "profile" ? (
              <FontAwesome name="user-circle" size={26} color={"black"} />
            ) : (
              <FontAwesome
                name="user-circle-o"
                size={SIZE}
                color={Colors.gray}
              />
            )}
          </TouchableOpacity>
        </Link>
      </BlurView>
    </>
  );
};

export default Layout;

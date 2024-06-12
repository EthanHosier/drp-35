import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useMyGroupsStore } from "@/utils/store/my-groups-store";
import { supabase } from "@/utils/supabase";
import { useUserIdStore } from "@/utils/store/user-id-store";
import { getProjectPicUrl } from "@/utils/api/project-pics";
import { Message, getGroupchat, sendMessage } from "@/utils/api/groupchats";
import { useGroupchatStore } from "@/utils/store/groupchat-store";

const Layout = () => {
  const { groups, setGroups } = useMyGroupsStore();
  const { addGroupChat, addMessage } = useGroupchatStore();
  const { userId } = useUserIdStore();

  const getMyGroups = async () => {
    const { data, error } = await supabase
      .from("group_members")
      .select(
        "group_id, groups(description, projects(name, max_group_size, project_id))"
      )
      .eq("user_id", userId);
    if (error) {
      alert(error.message);
      return;
    }

    const groupIds = data.map((group) => group.group_id);

    const currentGroupSizes = new Map<string, number>();
    await Promise.all(
      groupIds.map(async (groupId) => {
        const { count, error } = await supabase
          .from("group_members")
          .select("*", { count: "exact", head: true })
          .eq("group_id", groupId);
        if (error) {
          alert(error.message);
        }
        currentGroupSizes.set(groupId, count ?? 0);
      })
    );

    setGroups(
      data.map((group) => ({
        id: group.group_id,
        projectName: group.groups?.projects?.name ?? "",
        projectId: group.groups?.projects?.project_id!,
        maxGroupSize: group.groups?.projects?.max_group_size ?? 0,
        currentGroupSize: currentGroupSizes.get(group.group_id) ?? 0,
        image: getProjectPicUrl(group.groups?.projects?.project_id!).data!,
      }))
    );
  };

  useEffect(() => {
    if (!userId) return;
    getMyGroups();
  }, [userId]);

  useEffect(() => {
    if (!!(groups?.length < 0)) return;

    groups.forEach((group) => {
      console.log(group.id);
      getGroupchat(group.id).then((res) => {
        if (res.error) {
          alert(res.error.message);
          return;
        }
        addGroupChat(res.data);
      });
      supabase
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `group_id=eq.${group.id}`,
          },
          (payload) => {
            console.log(payload);
            const { id, group_id, content, created_at, sender_id } =
              payload.new;
            addMessage(group_id, {
              id,
              group_id,
              content,
              created_at,
              sender_id,
            });
          }
        )
        .subscribe();
    });
  }, [groups]);

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

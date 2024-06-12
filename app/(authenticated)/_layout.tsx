import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useMyGroupsStore } from "@/utils/store/my-groups-store";
import { supabase } from "@/utils/supabase";
import { useUserIdStore } from "@/utils/store/user-id-store";
import { getProjectPicUrl } from "@/utils/api/project-pics";
import { getGroupchat } from "@/utils/api/groupchats";
import { useGroupchatStore } from "@/utils/store/groupchat-store";
import { useQuery } from "@tanstack/react-query";
import { getMyGroups } from "@/utils/api/groups";

const Layout = () => {
  const { addGroupChat, addMessage } = useGroupchatStore();

  const { data: myGroups } = useQuery({
    queryKey: ["myGroups"],
    queryFn: getMyGroups,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!myGroups) return;
    if (!myGroups || myGroups.length < 0) return;

    myGroups.forEach((group) => {
      getGroupchat(group.id).then((res) => {
        if (res.error) {
          alert(res.error.message);
          return;
        }
        addGroupChat(res.data);
      });
      supabase
        .channel(`channel:messages:group_id=${group.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `group_id=eq.${group.id}`,
          },
          (payload) => {
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
  }, [myGroups]);

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

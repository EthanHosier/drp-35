import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import {
  GroupChat,
  Message,
  getGroupchat,
  sendMessage,
} from "@/utils/api/groupchats";
import Skeleton from "@/components/LoadingSkeleton";
import { getProfilePicUrl } from "@/utils/api/profile-pics";
import { useUserIdStore } from "@/utils/store/user-id-store";
import { useGroupchatStore } from "@/utils/store/groupchat-store";
import { getUserId } from "@/utils/supabase";

// DELETE THIS FUNCTION IF NOT NEEDED WHEN HOOK UP REAL BACKEND:
function convertToHumanReadable(datetime: string) {
  const date = new Date(datetime);

  // Get date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  // Get time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
}

const BORDER_RADIUS = 20;

const ChatId = () => {
  const chatId = useLocalSearchParams().chatId;
  const [userId, setUserId] = useState<string>();

  const flatListRef = useRef<FlatList<Message>>(null);

  const [groupChat, setGroupChat] = useState<GroupChat | null>(null);
  const [message, setMessage] = useState("");
  const addMessage = useGroupchatStore((state) => state.addMessage);
  const { groupChats } = useGroupchatStore();

  useEffect(() => {
    const gc = groupChats.find((g) => g.group_id === chatId);
    if (!gc) setGroupChat(null);
    setGroupChat(gc!);
    getUserId().then(setUserId);
  }, [groupChats]);

  if (!groupChat) return <Skeleton />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={72}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          position: "relative",
        }}
      >
        <FlatList
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
          ref={flatListRef}
          ListHeaderComponent={
            <Text
              style={{
                alignSelf: "center",
                color: Colors.gray,
                marginVertical: 24,
              }}
            >
              Chat created at {convertToHumanReadable(groupChat.created_at)}
            </Text>
          }
          data={groupChat.messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.bubble,
                index > 0 &&
                  groupChat.messages[index - 1].sender_id ===
                    item.sender_id && {
                    marginTop: 4,
                  },
                item.sender_id === userId
                  ? styles.myBubble
                  : styles.theirBubble,
                item.sender_id === userId
                  ? {
                      borderBottomRightRadius:
                        index < groupChat.messages.length - 1 &&
                        groupChat.messages[index + 1].sender_id === userId
                          ? 0
                          : BORDER_RADIUS,
                      borderTopRightRadius:
                        index > 0 &&
                        groupChat.messages[index - 1].sender_id === userId
                          ? 0
                          : BORDER_RADIUS,
                    }
                  : {
                      borderBottomLeftRadius:
                        index < groupChat.messages.length - 1 &&
                        groupChat.messages[index + 1].sender_id ===
                          item.sender_id
                          ? 0
                          : BORDER_RADIUS,
                      borderTopLeftRadius:
                        index > 0 &&
                        groupChat.messages[index - 1].sender_id ===
                          item.sender_id
                          ? 0
                          : BORDER_RADIUS,
                    },
                ,
                index === groupChat.messages.length - 1 && {
                  marginBottom: 172,
                },
              ]}
            >
              <Text
                style={{
                  color:
                    item.sender_id === userId ? Colors.background : Colors.dark,
                }}
              >
                {item.content}
              </Text>
              {item.sender_id !== userId &&
                (index === groupChat.messages.length - 1 ||
                  groupChat.messages[index + 1].sender_id !==
                    item.sender_id) && (
                  <Image
                    source={
                      getProfilePicUrl(item.sender_id).data! +
                      "?t=" +
                      new Date()
                    }
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      position: "absolute",
                      bottom: 0,
                      left: -44,
                    }}
                  />
                )}
            </View>
          )}
        />
        <View
          style={{
            overflow: "hidden",
            borderRadius: 24,
            position: "absolute",
            bottom: 32,
            width: "90%",
            alignSelf: "center",
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "rgba(235, 236, 246,1)",
          }}
        >
          <BlurView
            tint="light"
            intensity={80}
            style={{
              height: 44,
              borderRadius: 24,
              backgroundColor: "rgba(235, 236, 246,0.65)",
              flexDirection: "row",
              alignItems: "center",
              padding: 4,
            }}
          >
            <TextInput
              value={message}
              style={{
                flex: 1,
                paddingHorizontal: 16,
              }}
              placeholder="Message"
              cursorColor={Colors.primary}
              onChangeText={setMessage}
            />
            {message.length === 0 ? (
              <Animated.View
                style={{ flexDirection: "row", gap: 8, marginRight: 8 }}
                entering={FadeIn}
                exiting={FadeOut}
              >
                <TouchableOpacity>
                  <Ionicons
                    name="camera-outline"
                    size={24}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="image-outline"
                    size={24}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <TouchableOpacity
                  style={{
                    width: 48,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.primary,
                    borderRadius: 24,
                  }}
                  onPress={() => {
                    setMessage("");
                    sendMessage(chatId as string, message);
                  }}
                >
                  <Feather name="send" size={16} color={Colors.background} />
                </TouchableOpacity>
              </Animated.View>
            )}
          </BlurView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatId;

const styles = StyleSheet.create({
  bubble: { marginTop: 12, borderRadius: BORDER_RADIUS, padding: 12 },
  myBubble: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
    maxWidth: "70%",
    marginRight: 12,
  },
  theirBubble: {
    backgroundColor: Colors.lightGray,
    alignSelf: "flex-start",
    maxWidth: "80%",
    marginLeft: 52,
  },
});

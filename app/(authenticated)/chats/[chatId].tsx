import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";

type Message = {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
};

const MY_ID = "user123";

const MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hello! How are you?",
    createdAt: "2024-06-01T10:00:00Z",
    senderId: "user123",
  },
  {
    id: "2",
    content: "I am doing well, thank you! How about you?",
    createdAt: "2024-06-01T10:05:00Z",
    senderId: "user456",
  },
  {
    id: "3",
    content: "I am great, thanks for asking.",
    createdAt: "2024-06-01T10:10:00Z",
    senderId: "user123",
  },
  {
    id: "4",
    content: "Oh yeah oh yeah",
    createdAt: "2024-06-01T10:11:00Z",
    senderId: "user123",
  },
  {
    id: "5",
    content: "Oh yeahhhhhhhhhh ughhh.",
    createdAt: "2024-06-01T10:12:00Z",
    senderId: "user123",
  },

  {
    id: "6",
    content: "What are your plans for today?",
    createdAt: "2024-06-01T10:15:00Z",
    senderId: "user456",
  },
  {
    id: "7",
    content: "Oh nah nah",
    createdAt: "2024-06-01T10:16:00Z",
    senderId: "user456",
  },
  {
    id: "8",
    content: "Oh nahhhhh anasdasds",
    createdAt: "2024-06-01T10:17:00Z",
    senderId: "user456",
  },
  {
    id: "9",
    content: "I have a meeting in the afternoon. What about you?",
    createdAt: "2024-06-01T10:20:00Z",
    senderId: "user123",
  },
  {
    id: "10",
    content: "I am going to finish some work and then go for a walk.",
    createdAt: "2024-06-01T10:25:00Z",
    senderId: "user456",
  },
];

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
  const [message, setMessage] = useState("");
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
          ListFooterComponent={<View style={{ height: 80 }} />}
          ListHeaderComponent={
            <Text
              style={{
                alignSelf: "center",
                color: Colors.gray,
                marginVertical: 24,
              }}
            >
              Chat created at {convertToHumanReadable(MESSAGES[0].createdAt)}
            </Text>
          }
          data={MESSAGES}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.bubble,
                index > 0 &&
                  MESSAGES[index - 1].senderId === item.senderId && {
                    marginTop: 4,
                  },
                item.senderId === MY_ID ? styles.myBubble : styles.theirBubble,
                item.senderId === MY_ID
                  ? {
                      borderBottomRightRadius:
                        index < MESSAGES.length - 1 &&
                        MESSAGES[index + 1].senderId === MY_ID
                          ? 0
                          : BORDER_RADIUS,
                      borderTopRightRadius:
                        index > 0 && MESSAGES[index - 1].senderId === MY_ID
                          ? 0
                          : BORDER_RADIUS,
                    }
                  : {
                      borderBottomLeftRadius:
                        index < MESSAGES.length - 1 &&
                        MESSAGES[index + 1].senderId === item.senderId
                          ? 0
                          : BORDER_RADIUS,
                      borderTopLeftRadius:
                        index > 0 &&
                        MESSAGES[index - 1].senderId === item.senderId
                          ? 0
                          : BORDER_RADIUS,
                    },
              ]}
            >
              <Text
                style={{
                  color:
                    item.senderId === MY_ID ? Colors.background : Colors.dark,
                }}
              >
                {item.content}
              </Text>
              {item.senderId !== MY_ID &&
                (index === MESSAGES.length - 1 ||
                  MESSAGES[index + 1].senderId !== item.senderId) && (
                  <Image
                    source="https://media.licdn.com/dms/image/D4E03AQFLn8iwSgskug/profile-displayphoto-shrink_800_800/0/1700180573782?e=2147483647&v=beta&t=NOzU847G3z8sbatSzna7FNvjC5ruJSo-8GbJPTycEIY"
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
                    console.log("Send message: ", message);
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

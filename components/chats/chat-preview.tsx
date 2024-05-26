import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { formatDate } from "@/utils/utils";

interface ChatPreviewProps {
  name: string;
  message: string;
  imgUrl: string;
  date: Date;
  unreadMessages: number;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
  name,
  message,
  imgUrl,
  date,
  unreadMessages,
}) => {
  return (
    <TouchableOpacity style={styles.chatContainer}>
      <Image source={imgUrl} style={styles.userPic} />
      <View style={{ marginRight: "auto", marginTop: 8 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={{ marginTop: 8 }}>
        <Text
          style={{ color: unreadMessages > 0 ? Colors.primary : Colors.gray }}
        >
          {formatDate(date)}
        </Text>
        {unreadMessages > 0 && (
          <View
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
              marginTop: 4,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              {unreadMessages}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatPreview;

const styles = StyleSheet.create({
  chatContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  name: {
    fontWeight: "600",
  },
  message: {
    color: Colors.gray,
    marginTop: 4,
  },
  userPic: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
});

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import ChatPreview from "@/components/chats/chat-preview";

type ChatPreview = {
  name: string;
  message: string;
  unreadMessages: number;
  date: Date;
};

const CHATS: ChatPreview[] = [
  {
    name: "John Doe",
    message: "Hey, what's up?",
    unreadMessages: 3,
    date: new Date(),
  },
  {
    name: "Bob Smith",
    message: "Hello, how are you?",
    unreadMessages: 4,
    date: new Date(),
  },
  {
    name: "Jane Doe",
    message: "Hi, how's it going?",
    unreadMessages: 2,
    date: new Date(2020, 10, 12), // November 12, 2020
  },
  {
    name: "Alice Smith",
    message: "Hey, what's up?",
    unreadMessages: 0,
    date: new Date(2020, 10, 12), // November 12, 2020
  },
  {
    name: "John Doe",
    message: "Hey, what's up?",
    unreadMessages: 0,
    date: new Date(2020, 10, 12), // November 12, 2020
  },
  {
    name: "Bob Smith",
    message: "Hello, how are you?",
    unreadMessages: 0,
    date: new Date(2020, 10, 12), // November 12, 2020
  },
  {
    name: "Jane Doe",
    message: "Hi, how's it going?",
    unreadMessages: 0,
    date: new Date(2020, 10, 12), // November 12, 2020
  },
  {
    name: "Alice Smith",
    message: "Hey, what's up?",
    unreadMessages: 0,
    date: new Date(2020, 10, 12), // November 12, 2020
  },
  {
    name: "John Doe",
    message: "Hey, what's up?",
    unreadMessages: 0,
    date: new Date(2020, 10, 12), // November 12, 2020
  },
  {
    name: "Bob Smith",
    message: "Hello, how are you?",
    unreadMessages: 0,
    date: new Date(2020, 10, 12), // November 12, 2020
  },
];

const Messages = () => {
  return (
    <View style={{ height: "100%", backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={styles.messagesHeader}>Messages</Text>
          <TouchableOpacity>
            <Text style={styles.requests}>Requests</Text>
          </TouchableOpacity>
        </View>
        {CHATS.map((chat, i) => (
          <ChatPreview
            key={i}
            {...chat}
            imgUrl="https://media.licdn.com/dms/image/D4E03AQFLn8iwSgskug/profile-displayphoto-shrink_800_800/0/1700180573782?e=2147483647&v=beta&t=NOzU847G3z8sbatSzna7FNvjC5ruJSo-8GbJPTycEIY"
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%",
    padding: 24,
  },
  messagesHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  requests: {
    color: Colors.gray,
    fontWeight: "bold",
  },
});

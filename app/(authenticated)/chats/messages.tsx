import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  ScrollView,
} from "react-native-gesture-handler";
import ChatPreview from "@/components/chats/chat-preview";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { defaultStyles } from "@/constants/DefaultStyles";

const windowDimensions = Dimensions.get("window");
const BUTTON_WIDTH = 80;
const MAX_TRANSLATE = -BUTTON_WIDTH;

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

export default function MessagesList() {
  const [search, setSearch] = useState("");

  function onRemove() {
    Alert.alert("Removed");
  }

  return (
    <>
      <Stack.Screen options={{ title: "Messages" }} />
      <View style={[s.container]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
          <View style={{ paddingHorizontal: 16 }}>
            <TextInput
              style={[
                defaultStyles.textInput,
                {
                  marginTop: Platform.OS === "android" ? 8 : 164,
                },
              ]}
              placeholderTextColor={Colors.gray}
              placeholder="Search"
              onChangeText={(e) => setSearch(e.toLowerCase())}
            />
            <Text
              style={{
                marginTop: 4,
                marginBottom: 8,
                fontWeight: "600",
                color: Colors.gray,
              }}
            >
              {search.length > 0
                ? `Search results for "${search}"`
                : "All messages"}
            </Text>
          </View>

          {CHATS.filter((chat) => chat.name.toLowerCase().includes(search)).map(
            (chat, i) => (
              <ListItem id={i} key={i} item={chat} onRemove={onRemove} />
            )
          )}
        </ScrollView>
      </View>
    </>
  );
}

const springConfig = (velocity: number) => {
  "worklet";

  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};

const timingConfig = {
  duration: 400,
  easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
};

type ListItemProps = {
  id: number;
  item: ChatPreview;
  onRemove: () => void;
};
function ListItem({ id, item, onRemove }: ListItemProps) {
  const isRemoving = useSharedValue(false);
  const translateX = useSharedValue(0);

  type AnimatedGHContext = {
    startX: number;
  };
  const handler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_evt, ctx) => {
      ctx.startX = translateX.value;
    },

    onActive: (evt, ctx) => {
      const nextTranslate = evt.translationX + ctx.startX;
      translateX.value = Math.min(0, Math.max(nextTranslate, MAX_TRANSLATE));
    },

    onEnd: (evt) => {
      if (evt.velocityX < -20) {
        translateX.value = withSpring(
          MAX_TRANSLATE,
          springConfig(evt.velocityX)
        );
      } else {
        translateX.value = withSpring(0, springConfig(evt.velocityX));
      }
    },
  });

  const styles = useAnimatedStyle(() => {
    if (isRemoving.value) {
      return {
        height: withTiming(0, timingConfig, () => {
          runOnJS(onRemove)();
        }),
        transform: [
          {
            translateX: withTiming(-windowDimensions.width, timingConfig),
          },
        ],
      };
    }

    return {
      height: 78,
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  function handleRemove() {
    isRemoving.value = true;
  }

  const removeButton = {
    title: "Delete",
    backgroundColor: "red",
    color: "white",
    onPress: handleRemove,
  };

  return (
    <View style={s.item}>
      <PanGestureHandler activeOffsetX={[-10, 10]} onGestureEvent={handler}>
        <Animated.View style={styles}>
          <ListItemContent id={id} item={item} />

          <View style={s.buttonsContainer}>
            <Button item={removeButton} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
type ButtonData = {
  title: string;
  backgroundColor: string;
  color: string;
  onPress: () => void;
};
function Button({ item }: { item: ButtonData }) {
  return (
    <View style={[s.button, { backgroundColor: item.backgroundColor }]}>
      <TouchableOpacity onPress={item.onPress} style={s.buttonInner}>
        <FontAwesome name="trash" size={28} color={"white"} />
      </TouchableOpacity>
    </View>
  );
}

function ListItemContent({ id, item }: { id: number; item: ChatPreview }) {
  return (
    <ChatPreview
      id={id}
      {...item}
      imgUrl="https://media.licdn.com/dms/image/D4E03AQFLn8iwSgskug/profile-displayphoto-shrink_800_800/0/1700180573782?e=2147483647&v=beta&t=NOzU847G3z8sbatSzna7FNvjC5ruJSo-8GbJPTycEIY"
    />
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  item: {
    justifyContent: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    color: "white",
  },
  title: {
    fontSize: 18,
    marginLeft: 16,
  },
  button: {
    width: windowDimensions.width,
    paddingRight: windowDimensions.width - BUTTON_WIDTH,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInner: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: BUTTON_WIDTH,
  },
  buttonsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: windowDimensions.width,
    width: windowDimensions.width,
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

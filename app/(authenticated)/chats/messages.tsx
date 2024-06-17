import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Text,
  TextInput,
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
  TouchableOpacity,
  PanGestureHandlerGestureEvent,
  FlatList,
  RefreshControl,
} from "react-native-gesture-handler";
import ChatPreview from "@/components/chats/chat-preview";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { defaultStyles } from "@/constants/DefaultStyles";
import { useGroupchatStore } from "@/utils/store/groupchat-store";
import { GroupChat } from "@/utils/api/groupchats";
import { queryClient } from "@/app/_layout";

const windowDimensions = Dimensions.get("window");
const BUTTON_WIDTH = 80;
const MAX_TRANSLATE = -BUTTON_WIDTH;

export default function MessagesList() {
  const { groupChats } = useGroupchatStore();

  const [search, setSearch] = useState("");

  function onRemove() {
    Alert.alert("Removed");
  }

  const refresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["myGroups"],
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: "Messages" }} />
      <View style={[s.container]}>
        {/* <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
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
        </ScrollView> */}
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refresh} />
          }
          ListHeaderComponent={
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
                onChangeText={(e) => {
                  setSearch(e);
                }}
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
          }
          data={groupChats
            .filter((chat) =>
              chat.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort(
              (a, b) =>
                -(a.messages.length > 0
                  ? new Date(
                      a.messages[a.messages.length - 1].created_at
                    ).getTime()
                  : -1) +
                (b.messages.length > 0
                  ? new Date(
                      b.messages[b.messages.length - 1].created_at
                    ).getTime()
                  : -1)
            )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ListItem id={index} item={item} onRemove={onRemove} />
          )}
        />
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
  item: GroupChat;
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

function ListItemContent({ id, item }: { id: number; item: GroupChat }) {
  let date;
  let content;
  if (item.messages.length > 0) {
    date = new Date(item.messages[item.messages.length - 1].created_at);
    content = item.messages[item.messages.length - 1].content;
  } else {
    date = new Date(item.created_at);
    content = "Click here to start the chat";
  }

  return (
    <ChatPreview
      unreadMessages={item.messages.length}
      id={item.group_id}
      name={item.name}
      date={date}
      message={content}
      imgUrl={item.imgUri}
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

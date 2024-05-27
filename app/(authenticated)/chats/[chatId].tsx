import ChatMessageBox from "@/components/chats/chat-message-box";
import ReplyMessageBar from "@/components/chats/reply-message-bar";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MESSAGES = [
  {
    id: "6139e7c6580e9b39d1c6bd79",
    from: 1,
    date: "Wed Aug 25 2021 04:34:39 GMT+0200 (Central European Summer Time)",
    msg: "Et nulla tempor nulla minim in veniam excepteur nisi deserunt cupidatat commodo reprehenderit duis pariatur. Eu ullamco velit minim cupidatat sit nisi laborum.",
  },
  {
    id: "6139e7c645df995d423a0c61",
    from: 1,
    date: "Sat Aug 14 2021 06:09:53 GMT+0200 (Central European Summer Time)",
    msg: "Veniam esse non occaecat eiusmod. Adipisicing quis consectetur irure nostrud proident.",
  },
  {
    id: "6139e7c687a7db674021c553",
    from: 0,
    date: "Tue Aug 03 2021 05:13:50 GMT+0200 (Central European Summer Time)",
    msg: "Aute nostrud eu aliqua reprehenderit consequat fugiat nulla reprehenderit pariatur ad veniam tempor mollit irure. Tempor Lorem sint non fugiat esse duis pariatur tempor irure.",
  },
  {
    id: "6139e7c62b83d7f2c8d8f21c",
    from: 1,
    date: "Tue Aug 24 2021 21:09:23 GMT+0200 (Central European Summer Time)",
    msg: "Proident sunt cupidatat culpa id Lorem cillum duis nulla duis incididunt. Elit ad ut eu aliquip nisi tempor tempor reprehenderit est et id.",
  },
  {
    id: "6139e7c6bf08d6589abff47d",
    from: 0,
    date: "Thu Aug 19 2021 05:57:54 GMT+0200 (Central European Summer Time)",
    msg: "Sint quis aliqua consectetur non esse do in ullamco do ea enim nostrud sit incididunt. Fugiat dolore esse voluptate tempor consequat veniam ad adipisicing aliquip.",
  },
  {
    id: "6139e7c65e0794cb2e92b4d1",
    from: 1,
    date: "Fri Aug 27 2021 16:48:53 GMT+0200 (Central European Summer Time)",
    msg: "Anim ad proident cillum sit reprehenderit. Incididunt fugiat reprehenderit aliquip duis nostrud proident elit culpa eu ut.",
  },
  {
    id: "6139e7c66e1691e1c8f0dd12",
    from: 0,
    date: "Sat Sep 04 2021 03:24:13 GMT+0200 (Central European Summer Time)",
    msg: "Nostrud ipsum qui excepteur cupidatat proident sit exercitation mollit ad magna. Irure sit do cillum sunt nostrud dolor.",
  },
  {
    id: "6139e7c6f219f2a2ff61a21e",
    from: 1,
    date: "Sat Sep 04 2021 19:30:36 GMT+0200 (Central European Summer Time)",
    msg: "Voluptate amet labore est eu labore velit deserunt aliqua occaecat. Ex enim Lorem ad eiusmod velit velit velit.",
  },
  {
    id: "6139e7c6be26f83b10403cbd",
    from: 1,
    date: "Sun Aug 08 2021 04:45:04 GMT+0200 (Central European Summer Time)",
    msg: "Nulla est labore in sint excepteur. Elit aliqua laborum dolore do.",
  },
  {
    id: "6139e7c6c200a7eaf09c1d7d",
    from: 1,
    date: "Fri Aug 27 2021 06:23:41 GMT+0200 (Central European Summer Time)",
    msg: "Nostrud occaecat pariatur laborum aliqua ad reprehenderit mollit magna ex incididunt non sunt. Ullamco sunt nulla aliqua quis ex ullamco minim.",
  },
  {
    id: "6139e7c658a955b40b50f382",
    from: 1,
    date: "Tue Aug 31 2021 20:57:48 GMT+0200 (Central European Summer Time)",
    msg: "Cupidatat occaecat consequat incididunt irure mollit enim duis incididunt ut id. Esse officia adipisicing cillum amet occaecat labore.",
  },
  {
    id: "6139e7c63d23c8d990ffb3de",
    from: 1,
    date: "Thu Aug 05 2021 07:37:11 GMT+0200 (Central European Summer Time)",
    msg: "Exercitation consequat amet ut nisi. Do ex enim ullamco ex ex est et aliqua laborum ullamco magna.",
  },
  {
    id: "6139e7c6d2b0ff349f80a2e5",
    from: 1,
    date: "Tue Aug 03 2021 16:28:33 GMT+0200 (Central European Summer Time)",
    msg: "Sunt amet deserunt sint amet pariatur duis anim commodo incididunt eu laborum. Consectetur excepteur amet incididunt qui irure.",
  },
  {
    id: "6139e7c60af348dbd057f496",
    from: 0,
    date: "Tue Aug 10 2021 18:00:43 GMT+0200 (Central European Summer Time)",
    msg: "Anim reprehenderit voluptate nulla et officia qui nisi sunt nulla sint voluptate esse reprehenderit cupidatat. Incididunt elit fugiat culpa aliquip fugiat est officia.",
  },
  {
    id: "6139e7c65dd5a5e8218ba2fa",
    from: 1,
    date: "Tue Aug 10 2021 23:22:28 GMT+0200 (Central European Summer Time)",
    msg: "Dolor adipisicing laborum esse incididunt esse consequat cupidatat esse. Est consequat incididunt pariatur sint sint magna.",
  },
  {
    id: "6139e7c6281accff5fe55075",
    from: 0,
    date: "Tue Aug 31 2021 12:53:37 GMT+0200 (Central European Summer Time)",
    msg: "Ut ut esse occaecat Lorem aliquip aliquip ad eiusmod nulla eiusmod. Non commodo voluptate proident excepteur.",
  },
  {
    id: "6139e7c6fabd8bfbfe184079",
    from: 1,
    date: "Thu Aug 26 2021 17:40:52 GMT+0200 (Central European Summer Time)",
    msg: "Adipisicing nulla ad ad nostrud mollit culpa ea cillum aute excepteur minim fugiat. Eiusmod et qui amet mollit aliqua eu anim adipisicing cupidatat.",
  },
  {
    id: "6139e7c667c119fc716e4637",
    from: 1,
    date: "Fri Aug 13 2021 02:20:38 GMT+0200 (Central European Summer Time)",
    msg: "Do ipsum sint eiusmod incididunt sunt minim deserunt laborum nulla mollit reprehenderit ut veniam esse. Velit tempor amet ut magna non do.",
  },
  {
    id: "6139e7c62a1478365c271d1a",
    from: 0,
    date: "Thu Aug 05 2021 14:18:52 GMT+0200 (Central European Summer Time)",
    msg: "Consectetur elit aute mollit sit dolor cupidatat. Voluptate non aliqua duis minim nostrud minim.",
  },
  {
    id: "6139e7c65845fe107e9d8a03",
    from: 1,
    date: "Wed Sep 01 2021 06:10:22 GMT+0200 (Central European Summer Time)",
    msg: "Nulla proident consequat dolore Lorem Lorem. Enim minim ut aute duis.",
  },
  {
    id: "6139e7c62d7582a17e8a5000",
    from: 0,
    date: "Mon Aug 16 2021 15:46:07 GMT+0200 (Central European Summer Time)",
    msg: "Dolor consectetur adipisicing velit enim officia. Mollit cupidatat nisi occaecat non sunt nisi eu incididunt adipisicing est non.",
  },
  {
    id: "6139e7c6817200a4ecadb374",
    from: 1,
    date: "Sun Sep 05 2021 19:38:53 GMT+0200 (Central European Summer Time)",
    msg: "Deserunt ex ad esse non. Culpa incididunt sit ipsum qui excepteur velit proident ut.",
  },
  {
    id: "6139e7c6766e6a212c44f378",
    from: 0,
    date: "Mon Aug 30 2021 11:04:14 GMT+0200 (Central European Summer Time)",
    msg: "Amet consectetur culpa ad sint laborum eu laboris non proident fugiat anim. Ad voluptate ipsum exercitation veniam ea reprehenderit.",
  },
  {
    id: "6139e7c6b662a6e643064544",
    from: 1,
    date: "Mon Aug 30 2021 23:51:25 GMT+0200 (Central European Summer Time)",
    msg: "Exercitation sint ea dolore qui. Non minim nisi ex tempor mollit qui aute laborum.",
  },
  {
    id: "6139e7c6f618709859887343",
    from: 0,
    date: "Tue Aug 03 2021 11:47:04 GMT+0200 (Central European Summer Time)",
    msg: "Elit ullamco sit do dolore et dolore id eiusmod dolor eiusmod occaecat sunt. Laboris occaecat adipisicing sint ad ea mollit et mollit laborum et occaecat duis sint.",
  },
  {
    id: "6139e7c6763f4da907851d1f",
    from: 1,
    date: "Fri Sep 03 2021 23:46:25 GMT+0200 (Central European Summer Time)",
    msg: "Adipisicing do mollit et excepteur. Nulla eu ex deserunt proident eu anim culpa cillum.",
  },
  {
    id: "6139e7c61a36a01ce3afe180",
    from: 0,
    date: "Fri Aug 13 2021 14:22:52 GMT+0200 (Central European Summer Time)",
    msg: "Lorem cillum consectetur quis qui magna cillum ullamco consequat eiusmod ad. Commodo do voluptate ullamco ullamco laborum in ullamco dolore.",
  },
  {
    id: "6139e7c62fa2b5553022f27a",
    from: 0,
    date: "Mon Aug 02 2021 20:14:54 GMT+0200 (Central European Summer Time)",
    msg: "Aute ullamco commodo et aliquip est fugiat eu do fugiat consectetur officia excepteur tempor. Aute adipisicing eiusmod in ea laboris velit proident dolore voluptate veniam esse amet nostrud.",
  },
  {
    id: "6139e7c67084a40c3adbe65e",
    from: 0,
    date: "Thu Aug 26 2021 09:31:50 GMT+0200 (Central European Summer Time)",
    msg: "Pariatur Lorem laboris aute tempor consectetur deserunt. Ullamco nostrud occaecat Lorem exercitation sit minim dolor.",
  },
  {
    id: "6139e7c62333a40c3adbe65e",
    from: 0,
    date: "Thu Aug 26 2021 11:31:50 GMT+0200 (Central European Summer Time)",
    msg: "Check out this image!",
    img: "https://i0.wp.com/ionicacademy.com/wp-content/uploads/2019/09/simon_insta.jpg",
  },
  {
    id: "6139e7c6364562bd5ae10297",
    from: 0,
    date: "Thu Sep 02 2021 06:12:56 GMT+0200 (Central European Summer Time)",
    msg: "Proident qui do consequat labore magna amet reprehenderit do id. Eiusmod sunt fugiat aliquip sunt excepteur reprehenderit.",
  },
];

const Page = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();

  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    setMessages([
      ...MESSAGES.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? "You" : "Bob",
          },
        };
      })
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages: any[]) =>
      GiftedChat.append(previousMessages, messages.map(
        (message) => ({...message, replyMessage: replyMessage})
      ))
    );
    setReplyMessage(null);
  }, []);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: Colors.background }}
        renderActions={() => (
          <View
            style={{
              height: 47,
              justifyContent: "center",
              alignItems: "center",
              left: 5,
            }}
          >
            <Ionicons name="add" color={Colors.primary} size={28} />
          </View>
        )}
      />
    );
  };

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        marginBottom: insets.bottom,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{
          _id: 1,
        }}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
        )}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        textInputProps={styles.composer}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "#fff",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: Colors.lightGray,
                },
                right: {
                  backgroundColor: Colors.primary,
                },
              }}
            />
          );
        }}
        renderSend={(props) => (
          <View
            style={{
              height: 44,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              paddingHorizontal: 14,
            }}
          >
            {text === "" && (
              <>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={28}
                />
                <Ionicons name="mic-outline" color={Colors.primary} size={28} />
              </>
            )}
            {text !== "" && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: "center",
                }}
              >
                <Ionicons name="send" color={Colors.primary} size={28} />
              </Send>
            )}
          </View>
        )}
        renderInputToolbar={renderInputToolbar}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => setReplyMessage(null)}
            message={replyMessage}
          />
        )}
        onLongPress={(context, message) => setReplyMessage(message)}
        renderMessage={(props) => (
          <ChatMessageBox
            {...props}
            setReplyOnSwipeOpen={setReplyMessage}
            updateRowRef={updateRowRef}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
});

export default Page;

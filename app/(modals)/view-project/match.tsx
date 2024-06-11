import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import {
  EmojiWaterfallProvider,
  useEmojiWaterfall,
} from "@/components/projects/emoji-waterfall";
import { TouchableOpacity } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/DefaultStyles";

const MatchContainer = () => {
  return (
    <EmojiWaterfallProvider>
      <Match />
    </EmojiWaterfallProvider>
  );
};

const Match = () => {
  const { startAnimation } = useEmojiWaterfall();
  useEffect(() => {
    startAnimation();
  });
  return (
    <>
      <View
        style={{
          opacity: 0.9,
          backgroundColor: Colors.dark,
          flex: 1,
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text style={styles.header}>Its a Match!</Text>
        <Text
          style={{ color: Colors.gray, marginTop: 8, marginHorizontal: 24 }}
        >
          Your group has been merged with Francois, Jonny and Henry.
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginBottom: 32,
          position: "absolute",
          bottom: 24,
        }}
      >
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            { backgroundColor: Colors.primary },
          ]}
        >
          <Text style={{ color: "white", fontSize: 16 }}>View Group</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MatchContainer;

const styles = StyleSheet.create({
  header: {
    marginTop: 320,
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
});

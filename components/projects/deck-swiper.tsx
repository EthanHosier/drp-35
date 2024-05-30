import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import Swiper from "react-native-deck-swiper";
import { TouchableOpacity } from "react-native-gesture-handler";

const DeckSwiper = () => {
  return (
    <View style={[styles.container, { width: "100%", height: 240 }]}>
      <Swiper
        cards={["DO", "MORE", "OF", "WHAT", "MAKES", "YOU", "HAPPY"]}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{card}</Text>
            </View>
          );
        }}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        cardIndex={0}
        backgroundColor={"#4FD0E9"}
        stackSize={3}
        horizontalSwipe={false}
      />
    </View>
  );
};

export default DeckSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  card: {
    height: 100,
    width: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});

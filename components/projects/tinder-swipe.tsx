import React, { useCallback, useRef } from "react";
import { StyleSheet, Text, View, type ImageSourcePropType } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";

const IMAGES: ImageSourcePropType[] = [
  require("@/assets/images/ccl422.jpeg"),
  require("@/assets/images/fp522.jpeg"),
  require("@/assets/images/ccl422.jpeg"),
];

const TinderSwipe = () => {
  const ref = useRef<SwiperCardRefType>();

  const renderCard = useCallback((image: ImageSourcePropType) => {
    return (
      <View style={[styles.renderCardContainer, { height: "100%" }]}>
        <Image source={image} style={styles.renderCardImage} resizeMode="cover">
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.background,
              alignSelf: "flex-end",
              position: "absolute",
              bottom: 0,
              padding: 16,
              paddingLeft: 24,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 20 }}>
              Ethan Hosier
            </Text>

            <View style={{ flexDirection: "row", gap: 8 }}>
              <View
                style={{
                  backgroundColor: Colors.lightGray,
                  height: 32,
                  paddingHorizontal: 12,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "500" }}>🇺🇸 🇫🇷</Text>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }, []);

  return (
    <View style={[styles.subContainer, { width: "100%", height: 600 }]}>
      <Swiper
        translateXRange={[-100, 0, 100]}
        ref={ref}
        cardStyle={styles.cardStyle}
        data={IMAGES}
        renderCard={renderCard}
        onSwipeRight={(cardIndex) => {
          console.log("cardIndex", cardIndex);
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        onSwipeLeft={(cardIndex) => {
          console.log("onSwipeLeft", cardIndex);
        }}
        onSwipeTop={(cardIndex) => {
          console.log("onSwipeTop", cardIndex);
        }}
        onSwipeActive={() => {
          console.log("onSwipeActive");
        }}
        onSwipeStart={() => {
          console.log("onSwipeStart");
        }}
        onSwipeEnd={() => {
          console.log("onSwipeEnd");
        }}
      />
    </View>
  );
};

export default TinderSwipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    bottom: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 80,
    borderRadius: 40,
    marginHorizontal: 20,
    aspectRatio: 1,
    backgroundColor: "#3A3D45",
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardStyle: {
    width: "95%",
    height: "75%",
    borderRadius: 15,
    marginVertical: 20,
  },
  renderCardContainer: {
    flex: 1,
    borderRadius: 15,
    height: "75%",
    width: "100%",
  },
  renderCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    position: "relative",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlayLabelContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

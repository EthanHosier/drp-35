import React, { useCallback, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";

const IMAGES: ImageSourcePropType[] = [
  require("@/assets/images/ccl422.jpeg"),
  require("@/assets/images/fp522.jpeg"),
  require("@/assets/images/ccl422.jpeg"),
];

const TinderSwipe = () => {
  const ref = useRef<SwiperCardRefType>();

  const renderCard = useCallback((image: ImageSourcePropType) => {
    return (
      <View style={styles.renderCardContainer}>
        <Image
          source={image}
          style={styles.renderCardImage}
          resizeMode="cover"
        />
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
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayLabelContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

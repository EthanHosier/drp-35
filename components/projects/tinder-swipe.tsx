import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import {Swiper, type SwiperCardRefType} from "rn-swiper-list";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {sleep} from "@/utils/utils";
import {BlurView} from "expo-blur";

const IMAGES: ImageSourcePropType[] = [
  require("@/assets/images/jamal.jpg"),
  require("@/assets/images/joe.jpg"),
  require("@/assets/images/wang.jpg"),
];

const NUM_CARDS = 3;

const TAGS = ["Tryhard", "Onsite"];
const LOOKING_FOR = ["React Native", "JS"];

const TinderSwipe = ({onSwipeRight}: { onSwipeRight: () => void }) => {
  const [index, setIndex] = useState(0);

  const handleTap = (xIndex: number, screenWidth: number) => {
    const quarterWidth = screenWidth / 4;

    if (xIndex >= 0 && xIndex < quarterWidth) {
      setIndex((i) => Math.max(0, i - 1));
    } else if (xIndex >= quarterWidth * 3 && xIndex < screenWidth) {
      setIndex((i) => Math.min(i + 1, IMAGES.length - 1));
    }
  };
  const {width} = Dimensions.get("window");

  const OverlayLabelRight = useCallback(() => {
    return (
        <View
            style={[
              styles.overlayLabelContainer,
              {
                backgroundColor: Colors.primary,
                opacity: 0.7,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
        >
          <Ionicons name="happy-outline" size={80} color={Colors.background}/>
        </View>
    );
  }, []);

  const ref = useRef<SwiperCardRefType>();

  useEffect(() => console.log(index), [index]);

  const renderCard = (image: ImageSourcePropType) => {
    return (
        <View style={[styles.renderCardContainer, {height: "100%"}]}>
          <View style={{padding: 16, borderRadius: 16, backgroundColor: Colors.background}}>
            <ImageBackground
                source={IMAGES[index]}
                imageStyle={styles.renderCardImage}
                resizeMode="cover"
            >
              <TouchableOpacity
                  onPress={(e) => {
                    handleTap(e.nativeEvent.locationX, width);
                  }}
                  activeOpacity={1}
                  style={{flex: 1, position: "absolute", width: "100%", height: "100%"}}
              >
                <View style={styles.groupContainer}>
                  {Array.from({length: NUM_CARDS}).map((_, i) => (
                      <View
                          style={{flex: 1, borderRadius: 4, overflow: "hidden"}}
                          key={i}
                      >
                        <BlurView
                            tint="extraLight"
                            style={{
                              flex: 1,
                              backgroundColor: `rgba(255,255,255,${
                                  index === i ? 0.9 : 0.3
                              })`,
                            }}
                            intensity={80}
                        />
                      </View>
                  ))}
                </View>
                <View
                    style={styles.nameInfo}
                >
                  <Text style={{fontWeight: "600", fontSize: 20}}>
                    Ethan Hosier
                  </Text>

                  <View style={{flexDirection: "row", gap: 8}}>
                    <View
                        style={styles.flagContainer}
                    >
                      <Text style={{fontWeight: "500"}}>🇺🇸 🇫🇷</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </ImageBackground>

            <View style={styles.tagsContainer}>
              <Text style={styles.tagTitle}>
                We are:
              </Text>
              {
                TAGS.map((tag, i) => <View style={styles.tag} key={i}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>)
              }
            </View>
            <View style={styles.tagsContainer}>
              <Text style={styles.tagTitle}>
                Looking for:
              </Text>
              {
                LOOKING_FOR.map((tag, i) => <View style={styles.tag} key={i}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>)
              }
            </View>
          </View>

        </View>
    );
  };

  return (
      <View style={[styles.subContainer, {width: "100%", height: 600}]}>
        <Swiper
            translateXRange={[-100, 0, 100]}
            ref={ref}
            disableTopSwipe
            cardStyle={styles.cardStyle}
            data={IMAGES}
            renderCard={renderCard}
            onSwipeRight={(cardIndex) => {
              console.log("onSwipeRight", cardIndex);
              onSwipeRight();
            }}
            onSwipedAll={async () => {
              await sleep(100);
              for (let i = 0; i < NUM_CARDS; i++) {
                ref.current?.swipeBack();
                console.log("swipeBack");
                await sleep(50);
              }
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
            OverlayLabelRight={OverlayLabelRight}
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
    height: 300,
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
  groupContainer: {
    height: 8,
    gap: 8,
    flexDirection: "row",
    marginTop: 8,
    paddingHorizontal: 12,
    position: "absolute",
    width:"100%",
    top: 0
  },
  nameInfo: {
    width: "100%",
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Colors.gray,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    padding: 16,
    paddingLeft: 24,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  flagContainer: {
    backgroundColor: Colors.lightGray,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 4,
    alignItems: "center",
    marginTop: 12
  },
  tag: {
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  tagTitle: {
    fontSize: 16,
    marginLeft: 4
  },
  tagText: {
    color: "white",
    fontSize: 16
  }
});

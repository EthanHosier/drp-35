import React, { useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { sleep } from "@/utils/utils";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Group } from "@/utils/api/project-details";

interface TinderSwipeProps {
  onSwipeRight: (groupId: string) => void;
  groups: Group[];
  memberIndex: number;
  setMemberIndex: React.Dispatch<React.SetStateAction<number>>;
  groupIndex: number;
  setGroupIndex: React.Dispatch<React.SetStateAction<number>>;
  pressed: boolean;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
}

const TinderSwipe: React.FC<TinderSwipeProps> = ({
  onSwipeRight,
  groups,
  memberIndex,
  setMemberIndex,
  groupIndex,
  setGroupIndex,
  pressed,
  setPressed,
}) => {
  
  const { width } = Dimensions.get("window");

  const OverlayLabelLeft = useCallback(() => {
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
        <Ionicons name="sad-outline" size={80} color={Colors.background} />
      </View>
    );
  }, []);

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
        <Ionicons name="happy-outline" size={80} color={Colors.background} />
      </View>
    );
  }, []);

  const ref = useRef<SwiperCardRefType>();

  const renderCard = (group: Group, index: number) => {
    const topOfPile = index === groupIndex;
    const member = group.members[Math.min(memberIndex, group.members.length - 1)];
    const handleTap = (xIndex: number, screenWidth: number) => {
      const quarterWidth = screenWidth / 4;
      if(!topOfPile) return;
      if (xIndex >= 0 && xIndex < quarterWidth) {
        setMemberIndex((i) => Math.max(0, i - 1));
      } else if (xIndex >= quarterWidth * 3 && xIndex < screenWidth) {
        setMemberIndex((i) => Math.min(i + 1, groups[groupIndex].members.length - 1));
      }
    };
    if (!member) return <></>;
    
    return (
      <View style={[styles.renderCardContainer, { height: "100%" }]}>
        <>
          {index === 0 && !pressed && (
            <Pressable
              onTouchStart={() => setPressed(true)}
              style={{
                backgroundColor: "transparent",
                position: "absolute",
                height: "100%",
                width: "100%",
                zIndex: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/assets/images/swipe-right.gif")}
                style={{
                  height: 300,
                  width: 300,
                  tintColor: "#fff",
                }}
              />
            </Pressable>
          )}
        </>
        <Image
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            borderRadius: 16,
          }}
          source={member.imageUrl}
        />
        <TouchableOpacity
          onPress={(e) => {
            handleTap(e.nativeEvent.locationX, width);
          }}
          activeOpacity={1}
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        >
          <View
            style={{
              height: 8,
              gap: 8,
              flexDirection: "row",
              marginTop: 8,
              paddingHorizontal: 12,
              position: "absolute",
              width: "100%",
              top: 0,
            }}
          >
            {group.members.length > 1 &&
              Array.from({ length: group.members.length }).map((_, i) => (
                <View
                  style={{ flex: 1, borderRadius: 4, overflow: "hidden" }}
                  key={i}
                >
                  <BlurView
                    tint="extraLight"
                    style={{
                      flex: 1,
                      backgroundColor: `rgba(255,255,255,${
                        (memberIndex === i && topOfPile) ||
                        (i === 0 && !topOfPile)
                          ? 0.9
                          : 0.3
                      })`,
                    }}
                    intensity={80}
                  />
                </View>
              ))}
          </View>
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
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 20 }}>
              {member.full_name}
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
                <Text style={{ fontWeight: "500" }}>
                  {member.languages.map((l) => l.split(" ")[0]).join("")}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.subContainer, { width: "100%", height: 600 }]}>
      <Swiper
        translateXRange={[-100, 0, 100]}
        ref={ref}
        disableTopSwipe
        cardStyle={styles.cardStyle}
        data={groups}
        renderCard={renderCard}
        onSwipeRight={(cardIndex) => {
          onSwipeRight(groups[cardIndex].group_id);
          setGroupIndex((i) => (i < groups.length - 1 ? i + 1 : i));
          setMemberIndex(0);
        }}
        onSwipedAll={async () => {
          await sleep(100);
          for (let i = 0; i < groups.length; i++) {
            ref.current?.swipeBack();
            setGroupIndex((i) => (i > 0 ? i - 1 : i));
            await sleep(50);
          }
        }}
        onSwipeLeft={(cardIndex) => {
          setGroupIndex((i) => (i < groups.length - 1 ? i + 1 : i));
          setMemberIndex(0);
        }}
        onSwipeTop={(cardIndex) => {}}
        onSwipeActive={() => {}}
        onSwipeStart={() => {}}
        onSwipeEnd={() => {}}
        OverlayLabelRight={OverlayLabelRight}
        OverlayLabelLeft={OverlayLabelLeft}
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
    height: "70%",
    borderRadius: 15,
    marginVertical: 20,
  },
  renderCardContainer: {
    position: "relative",
    backgroundColor: "white",
    flex: 1,
    borderRadius: 16,
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

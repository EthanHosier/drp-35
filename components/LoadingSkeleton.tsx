import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

interface SkeletonProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Skeleton: React.FC<SkeletonProps> = ({ children, style }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 2, width * 2],
  });

  return (
    <View
      style={[
        {
          backgroundColor: "#e8e8e8",
          borderColor: "#f2f2f2",

          position: "relative",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <AnimatedLG
        colors={["#e8e8e8", "#f2f2f2", "#f2f2f2", "#e8e8e8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ translateX: translateX }] },
        ]}
      />
      {children}
    </View>
  );
};
export default Skeleton;

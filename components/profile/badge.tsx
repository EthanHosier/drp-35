import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/DefaultStyles";
import Colors from "@/constants/Colors";

interface BadgeProps {
  text: string;
  selected: boolean;
  onPress: () => void;
}

const Badge: React.FC<BadgeProps> = ({ text, selected, onPress }) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          defaultStyles.pillButtonSmall,
          {
            borderColor: selected ? Colors.primary : Colors.lightGray,
            borderWidth: 1,
            backgroundColor: "transparent",
            height: 24,
            paddingHorizontal: 8,
          },
        ]}
        onPress={() => onPress()}
        activeOpacity={0.8}
      >
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({});

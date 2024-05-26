import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/DefaultStyles";
import Colors from "@/constants/Colors";

interface BadgeProps {
  text: string;
  selected: boolean;
}

const Badge: React.FC<BadgeProps> = ({ text, selected: wasSelected }) => {
  const [selected, setSelected] = useState(wasSelected);

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
        onPress={() => setSelected(!selected)}
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

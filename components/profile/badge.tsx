import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/DefaultStyles";
import Colors from "@/constants/Colors";

interface BadgeProps {
  text: string;
  selectable?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ text, selectable }) => {
  const [selected, setSelected] = useState(false);

  return (
    <View>
      <TouchableOpacity
        disabled={!selectable}
        style={[
          defaultStyles.pillButtonSmall,
          { backgroundColor: selected ? Colors.primary : Colors.lightGray },
        ]}
        onPress={() => setSelected(!selected)}
        activeOpacity={0.8}
      >
        <Text style={{ color: selected ? "white" : "black" }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({});

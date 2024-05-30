import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

const InfoSheet = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "80%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: Colors.dark,
          }}
        >
          Learn to code with Amelia
        </Text>
        <Text style={{ marginTop: 4, color: Colors.gray }}>
          Fri, Dec 23, 4:00 PM
        </Text>
        <Image
          source="https://infed.org/mobi/wp-content/uploads/2014/03/eldan-goldenberg-groupwork-eldan-492925839-ccbyncsa2.jpg"
          style={styles.img}
        />
        <View style={[styles.attributeContainer, { marginTop: 24 }]}>
          <View style={styles.attributeIconContainer}>
            <Ionicons name="people-outline" size={24} color="black" />
          </View>
          <Text style={styles.attributeText}>4 Group Members</Text>
        </View>
        <Text style={{ marginTop: 24 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  container: { padding: 24 },
  img: { aspectRatio: 5 / 3, width: "100%", borderRadius: 16, marginTop: 16 },
  attributeContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    gap: 16,
  },
  attributeIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    height: 44,
    width: 44,
    borderRadius: 8,
  },
  attributeText: { fontSize: 16, fontWeight: "500" },
});

export default InfoSheet;

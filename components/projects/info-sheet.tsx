import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Profile } from "@/utils/api/profiles";
import { openBrowserAsync } from "expo-web-browser";
import ExternalLink from "../profile/external-link";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { toOneDecimalPlace } from "@/utils/utils";

interface InfoSheetProps {
  profile: Profile | null;
}

const InfoSheet: React.FC<InfoSheetProps> = ({ profile }) => {
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
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginLeft: 24,
              marginTop: 12,
            }}
          >
            I'm skilled at
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginLeft: "auto",
              marginRight: 24,
            }}
          >
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
                {profile?.languages.map((l) => l.split(" ")[0]).join("")}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <ScrollView
            horizontal
            contentContainerStyle={{ gap: 12, marginTop: 12, paddingLeft: 24 }}
            showsHorizontalScrollIndicator={false}
          >
            {profile?.skills.map((skill, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: Colors.lightGray,
                  height: 32,
                  paddingHorizontal: 12,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "500" }}>{skill}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            paddingHorizontal: 24,
            gap: 8,
          }}
        >
          <View style={[styles2.attributeContainer, { marginTop: 24 }]}>
            <View style={styles2.attributeIconContainer}>
              <Ionicons name="school-outline" size={24} color="black" />
            </View>
            <Text style={styles2.attributeText}>
              I go to {profile?.university}
            </Text>
          </View>
          <View style={styles2.attributeContainer}>
            <View style={styles2.attributeIconContainer}>
              <Ionicons name="book-outline" size={24} color="black" />
            </View>
            <Text style={styles2.attributeText}>I study {profile?.course}</Text>
          </View>
          <Text style={{ marginTop: 24 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </View>
        <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
          {profile?.github && (
            <ExternalLink
              display_name="Github"
              url={profile.github}
              icon={<Feather name="github" size={24} color="black" />}
            />
          )}

          {profile?.linkedin && (
            <ExternalLink
              display_name="LinkedIn"
              url={profile.linkedin}
              icon={<Feather name="linkedin" size={24} color="black" />}
            />
          )}

          {profile?.website && (
            <ExternalLink
              display_name="Website"
              url={profile.website}
              icon={<Ionicons name="globe-outline" size={24} color="black" />}
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles2 = StyleSheet.create({
  img: {
    width: "100%",
    aspectRatio: 1, //#endregion
    borderRadius: 16,
  },
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

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 0,
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

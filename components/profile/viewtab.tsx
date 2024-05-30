import Colors from "@/constants/Colors";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useProfileStore } from "@/utils/store/profile-store";
import React from "react";

const ViewTab = () => {
  const {
    imageUri,
    fullName,
    pronouns,
    university,
    course,
    linkedin,
    github,
    website,
  } = useProfileStore();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: Colors.background,
          paddingBottom: 48,
        }}
      >
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            style={styles2.img}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 24, color: Colors.dark }}
            >
              {fullName}
            </Text>
            <Text style={{ color: Colors.gray, fontSize: 16, marginTop: 6 }}>
              {pronouns}
            </Text>
          </View>
          <View style={[styles2.attributeContainer, { marginTop: 24 }]}>
            <View style={styles2.attributeIconContainer}>
              <Ionicons name="school-outline" size={24} color="black" />
            </View>
            <Text style={styles2.attributeText}>I go to {university}</Text>
          </View>
          <View style={styles2.attributeContainer}>
            <View style={styles2.attributeIconContainer}>
              <Ionicons name="book-outline" size={24} color="black" />
            </View>
            <Text style={styles2.attributeText}>I study {course}</Text>
          </View>
          <Text style={{ marginTop: 24 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 24 }}>
            I'm skilled at
          </Text>
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 12, marginTop: 12, paddingLeft: 24 }}
          showsHorizontalScrollIndicator={false}
        >
          {["Java", "Python", "JavaScript", "React", "Node.js"].map(
            (skill, i) => (
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
            )
          )}
        </ScrollView>

        <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
          <TouchableOpacity style={styles2.attributeContainer}>
            <View style={styles2.attributeIconContainer}>
              <Feather name="github" size={24} color="black" />
            </View>
            <Text style={styles2.attributeText}>{"Github"}</Text>
            <FontAwesome
              style={{ marginLeft: "auto", marginRight: 16 }}
              name="chevron-right"
              size={16}
              color={Colors.dark}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles2.attributeContainer}>
            <View style={styles2.attributeIconContainer}>
              <Feather name="linkedin" size={24} color="black" />
            </View>
            <Text style={styles2.attributeText}>{"LinkedIn"}</Text>
            <FontAwesome
              style={{ marginLeft: "auto", marginRight: 16 }}
              name="chevron-right"
              size={16}
              color={Colors.dark}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles2.attributeContainer}>
            <View style={styles2.attributeIconContainer}>
              <Ionicons name="globe-outline" size={24} color="black" />
            </View>
            <Text style={styles2.attributeText}>{"Website"}</Text>
            <FontAwesome
              style={{ marginLeft: "auto", marginRight: 16 }}
              name="chevron-right"
              size={16}
              color={Colors.dark}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles2 = StyleSheet.create({
  img: {
    marginTop: 20,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    alignSelf: "center",
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

export default ViewTab;

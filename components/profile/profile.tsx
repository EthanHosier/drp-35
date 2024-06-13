import Colors from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ExternalLink from "./external-link";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { toOneDecimalPlace } from "@/utils/utils";

interface ProfileProps {
  imageUrl: string;
  fullName: string;
  pronouns: string;
  university: string;
  course: string;
  skills: string[];
  languages: string[];
  github: string;
  linkedin: string;
  website: string;
  bio: string;
  rating: number;
}

const Profile: React.FC<ProfileProps> = ({
  imageUrl,
  fullName,
  pronouns,
  university,
  course,
  skills,
  languages,
  github,
  linkedin,
  website,
  bio,
  rating,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: Colors.background,
          paddingBottom: 48,
        }}
      >
        <View style={{ paddingHorizontal: 24 }}>
          <Image
            source={
              imageUrl
                ? { uri: imageUrl }
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            style={[styles2.img]}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <ScrollView
            horizontal
            style={{ marginRight: 16 }}
            contentContainerStyle={{
              marginLeft: 24,
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
          </ScrollView>
          <View
            style={{
              marginLeft: "auto",
              height: 32,
              borderRadius: 16,
              backgroundColor: Colors.lightGray,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16,
              gap: 4,
              marginRight: 24,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {toOneDecimalPlace(Number.isNaN(rating) ? 5 : rating)}
            </Text>
            <Ionicons
              name="star"
              size={18}
              color={Colors.gold}
              style={{ marginBottom: 2 }}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 24 }}>
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
          {bio && <Text style={{ marginTop: 24 }}>{bio}</Text>}
          <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 24 }}>
            I'm skilled at
          </Text>
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 12, marginTop: 12, paddingLeft: 24 }}
          showsHorizontalScrollIndicator={false}
        >
          {skills.map((skill, i) => (
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

        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginTop: 24,
            marginLeft: 24,
          }}
        >
          I speak
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 12, marginTop: 12, paddingLeft: 24 }}
          showsHorizontalScrollIndicator={false}
        >
          {languages.map((language, i) => (
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
              <Text style={{ fontWeight: "500" }}>{language}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
          {github && (
            <ExternalLink
              display_name="GitHub"
              url={github}
              icon={<Feather name="github" size={24} color="black" />}
            />
          )}

          {linkedin && (
            <ExternalLink
              display_name="LinkedIn"
              url={linkedin}
              icon={<Feather name="linkedin" size={24} color="black" />}
            />
          )}

          {website && (
            <ExternalLink
              display_name="Website"
              url={website}
              icon={<Ionicons name="globe-outline" size={24} color="black" />}
            />
          )}
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

export default Profile;

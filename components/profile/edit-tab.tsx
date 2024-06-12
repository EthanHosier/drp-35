import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { getUserId } from "@/utils/supabase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useQuery } from "@tanstack/react-query";
import { getProfileByUserId } from "@/utils/api/profiles";

const TEXT_FIELDS = [
  "Full Name",
  "Pronouns",
  "University",
  "Course",
  "LinkedIn",
  "GitHub",
  "Website",
  "Bio",
];

const EditTab = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const userId = await getUserId();
      return getProfileByUserId(userId!);
    },
    staleTime: Infinity,
  });

  const [progress, setProgress] = useState<number>(0);

  const setImageFromPicker = (e: any) => {};

  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });
    if (canceled) return;
    setImageFromPicker(assets[0]);
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {
          <View style={[styles.fieldsContainer, { paddingBottom: 12 }]}>
            <View
              style={{
                marginTop: 16,
                width: "100%",
                height: 8,
                borderRadius: 4,
                backgroundColor: Colors.lightGray,
              }}
            >
              <View
                style={{
                  width: `${progress * 100}%`,
                  height: "100%",
                  backgroundColor: Colors.primary,
                  borderRadius: 4,
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 12,
                fontSize: 18,
                fontWeight: "600",
                color: Colors.dark,
              }}
            >
              Your profile is {Math.round(progress * 100)}% complete!
            </Text>
            <Text style={{ marginTop: 4, fontSize: 12, color: Colors.gray }}>
              Complete your profile to increase your chances of optimal
              collaborations!
            </Text>
          </View>
        }

        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profile?.data
                ? { uri: profile?.data.imageUrl }
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            style={styles.img}
          />
          <View style={styles.editPhotoBtn}>
            <AntDesign name="edit" size={24} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <View style={[styles.fieldsContainer, { paddingBottom: 20 }]}>
          {TEXT_FIELDS.map((field, i) => (
            <View key={i}>
              <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 16 }}>
                {field}
              </Text>
              <TextInput
                style={{
                  marginTop: 8,
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderColor: Colors.lightGray,
                  padding: 8,
                  borderRadius: 12,
                }}
                value={
                  profile?.data
                    ? field === "Full Name"
                      ? profile?.data?.full_name
                      : (profile?.data?.[
                          field.toLowerCase() as keyof typeof profile.data
                        ] as string)
                    : ""
                }
                placeholderTextColor={Colors.gray}
                placeholder={field}
                onChangeText={(text) => {
                  // const newDetails = [...details];
                  // newDetails[i] = text;
                  // setDetails(newDetails);
                  // setProgress(
                  //   newDetails.filter((d) => d).length / TEXT_FIELDS.length
                  // );
                }}
              />
            </View>
          ))}
        </View>
        <Link
          asChild
          href="/(authenticated)/profile/skills"
          style={[
            styles.fieldsContainer,
            { paddingBottom: 20, paddingRight: 32 },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 16 }}>
              Skills
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.skillsText}
              >
                {profile?.data?.skills.join(", ")}
              </Text>
              <FontAwesome name="chevron-right" size={16} color={Colors.dark} />
            </View>
          </TouchableOpacity>
        </Link>
        <Link
          asChild
          href="/(authenticated)/profile/languages"
          style={[
            styles.fieldsContainer,
            { paddingBottom: 20, paddingRight: 32 },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 16 }}>
              Languages
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.skillsText}
              >
                {profile?.data?.languages.join(", ")}
              </Text>
              <FontAwesome name="chevron-right" size={16} color={Colors.dark} />
            </View>
          </TouchableOpacity>
        </Link>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 8,
    paddingBottom: 40,
  },
  editPhotoBtn: {
    marginTop: -48,
    marginLeft: 80,
    height: 48,
    width: 48,
    backgroundColor: "white",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  img: {
    marginTop: 20,
    width: 144,
    height: 144,
    borderRadius: 72,
    alignSelf: "center",
  },
  fieldsContainer: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  skillsText: {
    width: "100%", // You can set a specific width or maxWidth instead
    overflow: "hidden",
    color: Colors.gray,
  },
});

export default EditTab;

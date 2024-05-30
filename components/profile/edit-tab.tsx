import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TEXT_FIELDS } from "@/components/profile/profile-card";
import { useDetails, useProfileStore } from "@/utils/store/profile-store";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const EditTab = () => {
  const [progress, setProgress] = useState<number>(0);
  const details = useDetails();
  const {
    imageUri,
    setImageFromPicker,
    setFullName,
    setPronouns,
    setUniversity,
    setCourse,
    setLinkedin,
    setGithub,
    setWebsite,
    setDetails,
  } = useProfileStore();

  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });
    if (canceled) return;
    setImageFromPicker(assets[0]);
  };

  useEffect(() => {
    const getDetails = async () => {
      const { data, error } = await supabase.from("profiles").select().single();
      if (error) return;
      setFullName(data.full_name);
      setPronouns(data.pronouns);
      setUniversity(data.university);
      setCourse(data.course);
      setLinkedin(data.linkedin);
      setGithub(data.github);
      setWebsite(data.website);
      setProgress(
        (Object.values(data).filter((d) => d).length - 1) / TEXT_FIELDS.length
      );
    };
    getDetails();
  }, []);

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
              imageUri
                ? { uri: imageUri }
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
                value={details[i]}
                placeholderTextColor={Colors.gray}
                placeholder={field}
                onChangeText={(text) => {
                  const newDetails = [...details];
                  newDetails[i] = text;
                  setDetails(newDetails);
                  setProgress(
                    newDetails.filter((d) => d).length / TEXT_FIELDS.length
                  );
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
                Java, C, Python, JavaScript, HTML, CSS, SQL, TypeScript, React,
                Node.js
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
import Colors from "@/constants/Colors";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ProfileCard, { TEXT_FIELDS } from "@/components/profile/profile-card";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useDetails, useProfileStore } from "@/utils/store/profile-store";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

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
      <ScrollView
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
      </ScrollView>
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
            style={styles.img}
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
            <Text style={styles2.attributeText}>{github || "Github"}</Text>
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
            <Text style={styles2.attributeText}>{linkedin || "LinkedIn"}</Text>
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
            <Text style={styles2.attributeText}>{website || "Website"}</Text>
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

const renderScene = SceneMap({
  first: EditTab,
  second: ViewTab,
});

export default function ProfileTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Edit" },
    { key: "second", title: "View" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "white" }}
          indicatorStyle={{
            backgroundColor: Colors.primary,
            width: 75, // Change this to the desired indicator width
            marginLeft: (layout.width / routes.length - 75) / 2, // Center the indicator
          }}
          renderLabel={({ route, focused }) => (
            <Text
              style={{
                color: focused ? Colors.primary : "black",
                fontWeight: "600",
              }}
            >
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
}

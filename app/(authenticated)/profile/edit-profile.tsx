import Colors from "@/constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const TEXT_FIELDS = [
  "Full Name",
  "Pronouns",
  "University",
  "Course",
  "LinkedIn",
  "GitHub",
  "Website",
];

const SKILLS = [
  "JavaScript",
  "Python",
  "Java",
  "HTML",
  "CSS",
  "SQL",
  "TypeScript",
  "React",
  "Node.js",
  "C#",
  "C++",
  "C",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Go",
  "React Native",
  "Angular",
  "Vue",
  "Express",
  "MongoDB",
  "Flutter",
  "Dart",
  "Svelte",
  "Rust",
];

const PROGRESS = 0.8;

const FirstRoute = () => (
  <ScrollView contentContainerStyle={styles1.container}>
    <View style={[styles1.fieldsContainer, { paddingBottom: 12 }]}>
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
            width: `${PROGRESS * 100}%`,
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
        Your profile is {PROGRESS * 100}% complete!
      </Text>
      <Text style={{ marginTop: 4, fontSize: 12, color: Colors.gray }}>
        Complete your profile to increase your chances of optimal
        collaborations!
      </Text>
    </View>

    <TouchableOpacity>
      <Image
        source={"https://avatars.githubusercontent.com/u/80335311?v=4"}
        style={styles1.img}
      />
      <View style={styles1.editPhotoBtn}>
        <AntDesign name="edit" size={24} color={Colors.primary} />
      </View>
    </TouchableOpacity>
    <View style={[styles1.fieldsContainer, { paddingBottom: 20 }]}>
      {TEXT_FIELDS.map((field, i) => (
        <>
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
            placeholderTextColor={Colors.gray}
            placeholder={field}
          />
        </>
      ))}
    </View>
    <View></View>
  </ScrollView>
);

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
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
  },
  img: {
    marginTop: 20,
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  fieldsContainer: {
    marginTop: 24,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
});

const SecondRoute = () => <View style={{ flex: 1 }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
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

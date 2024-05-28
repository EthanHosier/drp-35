import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import * as React from "react";
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

const TEXT_FIELDS = [
  "Full Name",
  "Pronouns",
  "University",
  "Course",
  "LinkedIn",
  "GitHub",
  "Website",
];

const FirstRoute = () => {

  const [progress, setProgress] = React.useState(0);
  const [details, setDetails] = React.useState(new Array(TEXT_FIELDS.length).fill(''));

  return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles1.scrollContainer}>
          {(progress < 1.0) && <View style={[styles1.fieldsContainer, {paddingBottom: 12}]}>
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
            <Text style={{marginTop: 4, fontSize: 12, color: Colors.gray}}>
              Complete your profile to increase your chances of optimal
              collaborations!
            </Text>
          </View>}

          <TouchableOpacity>
            <Image
                source={"https://avatars.githubusercontent.com/u/80335311?v=4"}
                style={styles1.img}
            />
            <View style={styles1.editPhotoBtn}>
              <AntDesign name="edit" size={24} color={Colors.primary}/>
            </View>
          </TouchableOpacity>
          <View style={[styles1.fieldsContainer, {paddingBottom: 20}]}>
            {TEXT_FIELDS.map((field, i) => (
                <View key={i}>
                  <Text style={{fontSize: 16, fontWeight: "500", marginTop: 16}}>
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
                      onChangeText={(text) => {
                        const newDetails = [...details];
                        newDetails[i] = text;
                        setDetails(newDetails);
                        setProgress(newDetails.filter((d) => d).length / TEXT_FIELDS.length);
                      }}
                  />
                </View>
            ))}
          </View>
          <Link
              asChild
              href="/(authenticated)/profile/skills"
              style={[
                styles1.fieldsContainer,
                {paddingBottom: 20, paddingRight: 32},
              ]}
          >
            <TouchableOpacity>
              <Text style={{fontSize: 16, fontWeight: "600", marginTop: 16}}>
                Skills
              </Text>
              <View style={{flexDirection: "row", gap: 8, marginTop: 4}}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles1.skillsText}
                >
                  Java, C, Python, JavaScript, HTML, CSS, SQL, TypeScript, React,
                  Node.js
                </Text>
                <FontAwesome name="chevron-right" size={16} color={Colors.dark}/>
              </View>
            </TouchableOpacity>
          </Link>
        </ScrollView>
      </View>
  )
};

const styles1 = StyleSheet.create({
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

const SecondRoute = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={[styles1.scrollContainer, { padding: 16 }]}
    >
      <Image
        source={"https://avatars.githubusercontent.com/u/80335311?v=4"}
        style={styles2.img}
      />
    </ScrollView>
  </View>
);

const styles2 = StyleSheet.create({
  img: {
    width: "100%",
    aspectRatio: 1, //#endregion
    borderRadius: 12,
  },
});

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

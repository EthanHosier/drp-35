import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import TinderSwipe from "@/components/projects/tinder-swipe";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoSheet from "@/components/projects/info-sheet";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { defaultStyles } from "@/constants/DefaultStyles";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { Link, useRouter } from "expo-router";
import { sleep } from "@/utils/utils";

const InfoTab = () => {
  return (
    <View
      style={[
        styles.container,
        { flex: 1, backgroundColor: Colors.background },
      ]}
    >
      <Image
        source="https://infed.org/mobi/wp-content/uploads/2014/03/eldan-goldenberg-groupwork-eldan-492925839-ccbyncsa2.jpg"
        style={styles.img}
      />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          color: Colors.dark,
          marginTop: 16,
        }}
      >
        Learn to code with Amelia
      </Text>
      <Text style={{ marginTop: 4, color: Colors.gray }}>
        Fri, Dec 23, 4:00 PM
      </Text>
      <View style={[styles.attributeContainer, { marginTop: 24 }]}>
        <View style={styles.attributeIconContainer}>
          <Ionicons name="people-outline" size={24} color="black" />
        </View>
        <Text style={styles.attributeText}>4 Group Members</Text>
      </View>
      <Text style={{ marginTop: 24 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
    </View>
  );
};

const GroupsTab = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <TinderSwipe
        onSwipeRight={async () => {
          await sleep(20);
          router.push({
            pathname: "/(authenticated)/projects/view-project/match",
            params: { matchId: "123" },
          });
        }}
      />
      <InfoSheet />
    </View>
  );
};

const renderScene = SceneMap({
  first: InfoTab,
  second: GroupsTab,
});

export default function ProjectTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Info" },
    { key: "second", title: "Groups" },
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

const styles = StyleSheet.create({
  container: { padding: 24 },
  img: { aspectRatio: 5 / 3, width: "100%", borderRadius: 16 },
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

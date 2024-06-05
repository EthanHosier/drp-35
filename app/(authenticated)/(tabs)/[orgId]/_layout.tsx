import Colors from "@/constants/Colors";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import React from "react";
import { Image } from "expo-image";
import ViewOrg from "./view-org";
import {Organisations} from "@/constants/PlaceholderValues"
import { ScrollView } from "react-native-gesture-handler";

const InfoTab = () => {
  return (
    <View>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors.background, paddingBottom: 100},
        ]}
      >
        <Image
          source={Organisations[0].image}
          style={styles.img}
        />
        <Text style={{marginBottom:5, fontSize: 24, fontWeight: "600"}}>
          {Organisations[0].name}
        </Text>
        <Text style={{fontSize: 16, color: Colors.gray}}>
          {Organisations[0].subtitle}
        </Text>
        <Text style={{ marginTop: 24 }}>
          {Organisations[0].description}
        </Text>
        <TouchableOpacity style={styles.button}>
          <View>
            <Text style={{color: Colors.lightGray}}>Join Project</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const renderScene = SceneMap({
  first: InfoTab,
  second: ViewOrg,
});

export default function ProfileTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Info" },
    { key: "second", title: "Projects" },
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
  container: {
    padding: 16,
  },
  img: {
    marginTop: 20,
    width: "100%",
    aspectRatio: 5/3,
    borderRadius: 12,
    alignSelf: "center",
    resizeMode: "contain",
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    width: "100%",
    height: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  }
});
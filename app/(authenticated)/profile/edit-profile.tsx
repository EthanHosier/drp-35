import Colors from "@/constants/Colors";
import {
  Text,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import React from "react";
import ViewTab from "@/components/profile/viewtab";
import EditTab from "@/components/profile/edit-tab";

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

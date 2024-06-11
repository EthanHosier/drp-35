import React from 'react';
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import ProjectsTab from "./add-project";
import {Text, useWindowDimensions} from "react-native";
import Colors from "@/constants/Colors";
import OrganisationsTab from "@/app/(authenticated)/(tabs)/projects/organisations-tab";
import {useCreateTabStore} from "@/utils/store/create-tab-store";

const renderScene = SceneMap({
  first: ProjectsTab,
  second: OrganisationsTab,
});

const CreateTabs = () => {

  const layout = useWindowDimensions();

  const [routes] = React.useState([
    { key: "first", title: "Project" },
    { key: "second", title: "Organisation" },
  ]);

  const { tab, setTab } = useCreateTabStore();

  return (
      <TabView
          navigationState={{ index: tab, routes }}
          renderScene={renderScene}
          onIndexChange={setTab}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
              <TabBar
                  {...props}
                  style={{ backgroundColor: "white" }}
                  indicatorStyle={{
                    backgroundColor: Colors.primary,
                    width: 75,
                    marginLeft: (layout.width / routes.length - 75) / 2,
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
};

export default CreateTabs;

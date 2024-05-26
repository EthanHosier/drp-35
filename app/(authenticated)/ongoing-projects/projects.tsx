import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {defaultStyles} from "@/constants/DefaultStyles";
import Colors from "@/constants/Colors";
import {Link} from "expo-router";

const OngoingProjects = () => {
  return (
      <SafeAreaView>
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
          marginBottom: 60,
          paddingHorizontal: 20,
        }}>
          <LinkButton text="Add Project" href="./add-project" />
          <LinkButton text="Join Project" href="./join-project" />
        </View>
      </SafeAreaView>
  );
};

const LinkButton = ({text, href}: {text: string, href: string}) => {
  return (
      <Link
        href={href}
        style={[
          defaultStyles.pillButton,
          {flex: 1, backgroundColor: Colors.primary},
        ]}
        asChild
      >
        <TouchableOpacity>
          <Text style={{color: "white", fontSize: 15, fontWeight: "500"}}>
            {text}
          </Text>
        </TouchableOpacity>
      </Link>
  );
}

export default OngoingProjects;

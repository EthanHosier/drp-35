import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {defaultStyles} from "@/constants/DefaultStyles";
import Colors from "@/constants/Colors";
import {Link} from "expo-router";

const OngoingProjects = () => {
  return (
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>Projects you've joined</Text>
        <ScrollView contentContainerStyle={styles.projects}>
          <Text>placeholder</Text>
        </ScrollView>
        <View style={styles.buttons}>
          <LinkButton text="Add Project" href="add-project" />
          <LinkButton text="Join Project" href="join-project" />
        </View>
      </SafeAreaView>
  );
};

const LinkButton = ({text, href}: {text: string, href: string}) => {
  return (
      <Link
        href={'/(authenticated)/ongoing-projects/' + href}
        style={[
          defaultStyles.pillButton,
          styles.button,
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  projects:{
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 70,
    paddingHorizontal: 20,
  },
});

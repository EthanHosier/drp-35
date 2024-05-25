import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const ViewProfile = () => {
  return (
    <View>
      <Text>
        <Link href="/(authenticated)/profile/edit-profile" asChild>
          <Text>Edit profile</Text>
        </Link>
      </Text>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({});

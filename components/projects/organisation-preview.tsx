import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {router} from "expo-router";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {Organisation} from "@/constants/PlaceholderValues";

interface OrganisationPreviewProps {
  organisation: Organisation;
}

const ProjectPreview: React.FC<OrganisationPreviewProps> = ({ organisation }) => {

  return (
      <View style={{ marginLeft: 24 }}>
          <TouchableOpacity
              onPress={() => router.navigate("(authenticated)/(tabs)/projects/view-org/1")}
          >
            <View style={{ width: 320, aspectRatio: 5 / 3 }}>
              <Image source={organisation.image} style={styles.image} />
            </View>
            <Text style={{ marginTop: 8, fontWeight: "700", fontSize: 16 }}>
              {organisation.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="people-outline" size={24} color={Colors.gray} />
              <Text
                  style={{
                    color: Colors.gray,
                    fontWeight: "600",
                    marginLeft: 5,
                    marginTop: 1,
                  }}
              >
                {organisation.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
      </View>
  );
};

export default ProjectPreview;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    top: 0,
    borderRadius: 24,
    padding: 16,
  },
});

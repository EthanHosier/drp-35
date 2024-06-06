import {ImageBackground, StyleSheet, Text, View} from "react-native";
import React from "react";
import {router} from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Organisation } from "@/utils/api/organisations";

interface OrganisationPreviewProps {
  organisation: Organisation;
}

const OrganisationPreview: React.FC<OrganisationPreviewProps> = ({ organisation }) => {

  return (
      <View style={{ marginLeft: 24 }}>
          <TouchableOpacity
              onPress={() => router.navigate(`(authenticated)/(tabs)/projects/view-org/${organisation.org_id}`)}
          >
            <View style={{ width: 320, aspectRatio: 5 / 3, borderRadius: 20 }}>
              <ImageBackground
                  source={{uri: organisation.image}}
                  style={{borderRadius: 24, aspectRatio: 5/3, width: "100%"}}
                  imageStyle={styles.image}
              >
                <View style={styles.imageOverlay}/>
              </ImageBackground>
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

export default OrganisationPreview;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    top: 0,
    borderRadius: 24,
    padding: 16,
  },
  imageOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: 24
  }
});

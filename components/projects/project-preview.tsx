import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Project } from "@/app/(authenticated)/projects/discover-projects";
import { Link } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface ProjectPreviewProps {
  project: Project;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  return (
    <View style={{ marginLeft: 24 }}>
      <Link asChild href={"projects"}>
        <TouchableOpacity onPress={() => console.log("yeahh")}>
          <View style={{ height: 200, width: 320, position: "relative" }}>
            <Image source={project.image} style={styles.image} />
          </View>
          <Text style={{ marginTop: 8, fontWeight: "700", fontSize: 16 }}>
            {project.name}
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
              {project.groupSize} members
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ProjectPreview;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    top: 0,
    borderRadius: 32,
  },
});

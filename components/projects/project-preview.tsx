import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Project } from "@/app/(authenticated)/projects/discover-projects";
import { Link } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { getMonthAbbreviation } from "@/utils/utils";
import { BlurView } from "expo-blur";

interface ProjectPreviewProps {
  project: Project;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  return (
    <View style={{ marginLeft: 24 }}>
      <Link asChild href={"projects"}>
        <TouchableOpacity onPress={() => console.log("yeahh")}>
          <View style={{ height: 200, width: 320 }}>
            <Image source={project.image} style={styles.image}>
              <View
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  width: 48,
                  height: 48,
                }}
              >
                <BlurView
                  tint="extraLight"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: 8,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  intensity={20}
                >
                  <View>
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      {getMonthAbbreviation(project.date)}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {project.date.getDate()}
                    </Text>
                  </View>
                </BlurView>
              </View>
            </Image>
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
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    top: 0,
    borderRadius: 32,
    padding: 16,
  },
});

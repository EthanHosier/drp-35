import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { ImageBackground } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { getMonthAbbreviation } from "@/utils/utils";
import { BlurView } from "expo-blur";
import { Project } from "@/utils/store/projects-store";
interface ProjectPreviewProps {
  project: Project;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  return (
    <View
      style={{
        marginLeft: 24,
      }}
    >
      <Link asChild href={`/(modals)/view-project/${project.projectId}`}>
        <TouchableOpacity>
          <View
            style={{
              width: 320,
              aspectRatio: 5 / 3,
            }}
          >
            <ImageBackground
              source={{ uri: project.image }}
              style={{ borderRadius: 24, aspectRatio: 5 / 3, width: "100%" }}
              imageStyle={styles.image}
            >
              <View style={styles.imageOverlay}>
                <View
                  style={{
                    margin: 16,
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
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      {getMonthAbbreviation(project.startDateTime)}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {project.startDateTime.getDate()}
                    </Text>
                  </BlurView>
                </View>
              </View>
            </ImageBackground>
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
              {project.minGroupSize === project.maxGroupSize
                ? `${project.minGroupSize} team members`
                : `${project.minGroupSize}-${project.maxGroupSize} team members`}
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
    borderRadius: 24,
    padding: 16,
  },
  imageOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 24,
  },
});

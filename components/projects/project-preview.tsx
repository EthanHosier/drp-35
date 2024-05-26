import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import Colors from "@/constants/Colors";

const ProjectPreview = ({ name, description } : {name: string, description: string}) => {
  return (
      <TouchableOpacity style={styles.preview}>
        <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
          {name}
        </Text>
        <Text style={{ color: "white", fontSize: 10, fontWeight: "500" }}>
          {description}
        </Text>
      </TouchableOpacity>
  );
};

export default ProjectPreview;

const styles = StyleSheet.create({
  preview: {
    backgroundColor: Colors.primaryMuted,
    margin: 10,
    borderRadius: 10,
    height: 60
  }
})

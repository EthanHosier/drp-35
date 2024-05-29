import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const PROJECT_FIELDS = [
  "Name",
  "Description",
  "Min Group Size",
  "Max Group Size",
  "Start Date",
];

const AddProjectPage = () => {
  const [projectFields, setProjectFields] = useState({
    img: "",
    name: "",
    description: "",
    minGroupSize: 0,
    maxGroupSize: 0,
    start: new Date(),
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          onPress={() => alert("TODO")}
          style={{
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {projectFields.img === "" ? (
            <MaterialCommunityIcons
              name="file-image-plus-outline"
              size={64}
              color={Colors.gray}
            />
          ) : (
            <Image source={projectFields.img} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.fieldsContainer, { paddingBottom: 20 }]}>
        <ProjectField
          label={PROJECT_FIELDS[0]}
          value={projectFields["name"]}
          onChange={(text: string) =>
            setProjectFields({ ...projectFields, name: text })
          }
        />
        <ProjectField
          label={PROJECT_FIELDS[1]}
          value={projectFields["description"]}
          style={{ height: 100 }}
          onChange={(text: string) =>
            setProjectFields({ ...projectFields, description: text })
          }
        />
        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <ProjectField
              label={PROJECT_FIELDS[2]}
              placeholder={"0"}
              value={projectFields["minGroupSize"].toString()}
              onChange={(text: string) =>
                setProjectFields({
                  ...projectFields,
                  minGroupSize: parseInt(text),
                })
              }
            />
          </View>
          <View style={{ flex: 1 }}>
            <ProjectField
              placeholder={"0"}
              label={PROJECT_FIELDS[3]}
              value={projectFields["maxGroupSize"].toString()}
              onChange={(text: string) =>
                setProjectFields({
                  ...projectFields,
                  maxGroupSize: parseInt(text),
                })
              }
            />
          </View>
        </View>
      </View>
      <View style={[styles.fieldsContainer]}>
        <Text style={styles.fieldLabel}>Start Date & Time</Text>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 8, gap: 8 }}>
          <RNDateTimePicker
            onChange={() => {}}
            value={new Date()}
            style={{ marginLeft: -8 }}
          />
          <RNDateTimePicker
            onChange={() => {}}
            value={new Date()}
            mode="time"
            style={{ marginLeft: -10 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const ProjectField = ({
  label,
  placeholder = label,
  value,
  onChange,
  style,
}: {
  label: string;
  placeholder?: string;
  value: string;
  height?: number;
  onChange: (value: any) => void;
  style?: any;
}) => {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={{
          marginTop: 8,
          width: "100%",
          height: 40,
          borderWidth: 1,
          borderColor: Colors.lightGray,
          padding: 8,
          borderRadius: 12,
        }}
        placeholder={placeholder}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: "100%",
    marginBottom: 50,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "bottom",
  },
  imgContainer: {
    marginTop: 24,
    width: "100%",
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.gray,
    borderStyle: "dashed",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    top: 0,
    borderRadius: 24,
    padding: 16,
  },
  fieldsContainer: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 16,
  },
  fieldInput: {
    fontSize: 16,
    color: "black",
    textAlignVertical: "top",
    textAlign: "justify",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Colors.primary,
    marginBottom: 50,
    height: 50,
  },
});

export default AddProjectPage;

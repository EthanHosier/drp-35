import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {router} from "expo-router";
import { Image } from "expo-image";
import {ScrollView} from "react-native-gesture-handler";

const PROJECT_FIELDS = [
    "Name",
    "Description",
    "Min Group Size",
    "Max Group Size",
    "Start Date",
]

const AddProjectPage = () => {
  const [projectFields, setProjectFields] = React.useState({
    img: "",
    name: "",
    description: "",
    minGroupSize: 0,
    maxGroupSize: 0,
    start: new Date(),
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Add New Project</Text>
        <TouchableOpacity
            style={{alignSelf: "flex-end"}}
            onPress={router.back}
        >
          <AntDesign name="close" size={24} color="black"/>
        </TouchableOpacity>
      </View>
      <View style={styles.imgContainer}>
        <TouchableOpacity onPress={() => alert("TODO")} style={{height: 200}}>
          <Image
              source="https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"
              style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <ProjectField
          label={PROJECT_FIELDS[0]}
          value={projectFields["name"]}
          onChange={(text: string) => setProjectFields({...projectFields, name: text})}
      />
      <ProjectField
          label={PROJECT_FIELDS[1]}
          value={projectFields["description"]}
          style={{height: 100}}
          onChange={(text: string) => setProjectFields({...projectFields, description: text})}
      />
      <View style={{flexDirection: "row", gap: 8, width: "100%"}}>
        <View style={{flex: 1}}>
          <Text style={styles.fieldLabel}>{PROJECT_FIELDS[2]}</Text>
          <ProjectField
              label={'0'}
              value={projectFields["minGroupSize"].toString()}
              onChange={(text: string) => setProjectFields({...projectFields, minGroupSize: parseInt(text)})}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.fieldLabel}>{PROJECT_FIELDS[3]}</Text>
          <ProjectField
              label={'0'}
              value={projectFields["maxGroupSize"].toString()}
              onChange={(text: string) => setProjectFields({...projectFields, maxGroupSize: parseInt(text)})}
          />
        </View>
      </View>
      <ProjectField // TODO: date picker
          label={PROJECT_FIELDS[4]}
          value={"Start Date"}
          style={{height: 100}}
          onChange={(text: string) => setProjectFields({...projectFields, description: text})}
      />
      <View style={styles.button}>
        <TouchableOpacity onPress={() => alert("TODO")}>
          <Text style={{color: "white", fontSize: 24, fontWeight: "700"}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const ProjectField = (
    {label, value, onChange, style}:
        {label: string, value: string, height?: number, onChange: (value: any) => void, style?: any}
) => {
  return (
    <View style={styles.fieldContainer}>
      <TextInput
        style={[styles.fieldInput, style]}
        value={value}
        onChangeText={onChange}
        placeholder={label}
        placeholderTextColor={Colors.gray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    width: "100%",
    marginBottom: 50,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  fieldContainer: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray,
    marginBottom: 16,
  },
  fieldLabel: {
    paddingLeft: 8,
    fontSize: 12,
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
    height: 50
  }
});

export default AddProjectPage;

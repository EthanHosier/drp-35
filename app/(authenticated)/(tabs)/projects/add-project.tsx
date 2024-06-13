import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useProjectFieldsStore } from "@/utils/store/add-project-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "@tanstack/react-query";
import {
  Organisation,
  getOrganisationsByLeader,
} from "@/utils/api/organisations";
import { getUserId } from "@/utils/supabase";
import SelectDropdown from "react-native-select-dropdown";
import Skeleton from "@/components/LoadingSkeleton";

const PROJECT_FIELDS = [
  "Name",
  "Description",
  "Min Group Size",
  "Max Group Size",
  "Start Date",
  "End Date",
];

const AddProjectPage = () => {
  const {
    imageUri,
    setImageFromPicker,
    name,
    setName,
    organisation,
    setOrganisation,
    description,
    setDescription,
    minGroupSize,
    setMinGroupSize,
    maxGroupSize,
    setMaxGroupSize,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
  } = useProjectFieldsStore();

  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });
    if (canceled) return;
    setImageFromPicker(assets[0]);
  };

  const { data: myOrgs, isLoading } = useQuery({
    queryKey: ["myOrgs"],
    queryFn: async () => {
      const userId = await getUserId();
      return getOrganisationsByLeader(userId!);
    },
    staleTime: Infinity,
  });

  if (isLoading) return <Skeleton />;

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageUri === "" ? (
            <MaterialCommunityIcons
              name="file-image-plus-outline"
              size={64}
              color={Colors.gray}
            />
          ) : (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.fieldsContainer, { paddingBottom: 20 }]}>
        <ProjectField
          label={PROJECT_FIELDS[0]}
          value={name}
          onChange={(text: string) => setName(text)}
        />
        <OrganisationPicker
          orgs={myOrgs!.data!}
          setOrganisation={setOrganisation}
        />
        <ProjectField
          label={PROJECT_FIELDS[1]}
          value={description}
          style={{ height: 100 }}
          onChange={(text: string) => setDescription(text)}
        />
        <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <ProjectField
              label={PROJECT_FIELDS[2]}
              placeholder={"0"}
              value={minGroupSize}
              onChange={(text: string) => setMinGroupSize(text)}
              keyboardType={"numeric"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ProjectField
              placeholder={"0"}
              label={PROJECT_FIELDS[3]}
              value={maxGroupSize}
              onChange={(text: string) => setMaxGroupSize(text)}
              keyboardType={"numeric"}
            />
          </View>
        </View>
      </View>
      <View style={[styles.fieldsContainer]}>
        <Text style={styles.fieldLabel}>Start Date & Time</Text>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 8, gap: 8 }}>
          <RNDateTimePicker
            onChange={(_, date) => {
              setStartDateTime(date!);
            }}
            value={startDateTime}
            mode="datetime"
            style={{ marginLeft: -10 }}
          />
        </View>
        <Text style={styles.fieldLabel}>End Date & Time</Text>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 8, gap: 8 }}>
          <RNDateTimePicker
            onChange={(_, date) => {
              setEndDateTime(date!);
            }}
            value={endDateTime}
            mode="datetime"
            style={{ marginLeft: -10 }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const ProjectField = ({
  label,
  placeholder = label,
  value,
  onChange,
  keyboardType = "default",
  style,
}: {
  label: string;
  placeholder?: string;
  value: string;
  height?: number;
  onChange: (value: any) => void;
  keyboardType?: "default" | "numeric";
  style?: any;
}) => {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[
          {
            marginTop: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
            borderColor: Colors.lightGray,
            padding: 8,
            borderRadius: 12,
          },
          style,
        ]}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        keyboardType={keyboardType}
      />
    </>
  );
};

const OrganisationPicker = ({
  orgs,
  setOrganisation,
}: {
  orgs: Organisation[];
  setOrganisation: (organisation: string) => void;
}) => {
  return (
    <>
      <Text style={styles.fieldLabel}>Organisation</Text>
      <SelectDropdown
        data={orgs}
        onSelect={(selectedItem: Organisation, index) => {
          console.log(selectedItem.name);
          setOrganisation(selectedItem.org_id);
        }}
        renderButton={(selectedItem, isOpened) => (
          <View style={dropdownStyles.dropdownButtonStyle}>
            <Text style={styles.fieldInput}>
              {(selectedItem && selectedItem.name) || "Select organisation"}
            </Text>
            <Ionicons
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={dropdownStyles.dropdownButtonArrowStyle}
              color={Colors.gray}
            />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View
            style={{
              ...dropdownStyles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Text style={dropdownStyles.dropdownItemTxtStyle}>{item.name}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        dropdownStyle={dropdownStyles.dropdownMenuStyle}
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
});

const dropdownStyles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default AddProjectPage;

import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "@/constants/Colors";
import { FilterStore, useFilterStore } from "@/utils/store/filter-store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

const FilterMain = () => {
  const [numMembers, setNumMembers] = React.useState(
    useFilterStore((state) => state.numMembers.toString())
  );
  const [rating, setRating] = React.useState(
    useFilterStore((state) => state.rating.toString())
  );

  return (
    <View style={{ height: "100%" }}>
      <KeyboardAwareScrollView
        style={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.fieldsContainer, { paddingBottom: 20 }]}>
          <Text style={styles.fieldsTitle}>Number of Members</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            value={numMembers}
            placeholderTextColor={Colors.gray}
            placeholder={"0"}
            onChangeText={(text) => {
              setNumMembers(text);
              useFilterStore.setState({ numMembers: parseInt(text) });
            }}
          />
        </View>
        <View style={[styles.fieldsContainer, { paddingBottom: 20 }]}>
          <Text style={styles.fieldsTitle}>Rating</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            value={rating}
            placeholderTextColor={Colors.gray}
            placeholder={"0"}
            onChangeText={(text) => {
              setRating(text);
              useFilterStore.setState({ rating: parseInt(text) });
            }}
          />
        </View>
        <Selector
          title="Languages"
          href="./languages"
          storeToString={(state) => state.languages}
        />
        <Selector
          title="Skills"
          href="./skills"
          storeToString={(state) => state.skills}
        />
      </KeyboardAwareScrollView>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            useFilterStore.setState({
              numMembers: 0,
              languages: [],
              skills: [],
            });
            setNumMembers("0");
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.gray }}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Selector = ({
  title,
  href,
  storeToString,
}: {
  title: string;
  href: string;
  storeToString: (store: FilterStore) => string[];
}) => (
  <Link
    asChild
    href={href}
    style={[styles.fieldsContainer, { paddingBottom: 20, paddingRight: 32 }]}
  >
    <TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 16 }}>
        {title}
      </Text>
      <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.skillsText}>
          {useFilterStore(storeToString).join(", ")}
        </Text>
        <FontAwesome name="chevron-right" size={16} color={Colors.dark} />
      </View>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  textInput: {
    marginTop: 8,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 8,
    borderRadius: 12,
  },
  skillsText: {
    width: "100%", // You can set a specific width or maxWidth instead
    overflow: "hidden",
    color: Colors.gray,
  },
  img: {
    marginTop: 20,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    alignSelf: "center",
  },
  fieldsContainer: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  fieldsTitle: { fontSize: 16, fontWeight: "500", marginTop: 16 },
  button: {
    margin: 20,
    padding: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    height: 40,
  },
});

export default FilterMain;

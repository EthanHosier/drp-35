import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Colors from "@/constants/Colors";
import {useFilterStore} from "@/utils/store/filter-store";
import {TouchableOpacity} from "react-native-gesture-handler";
import {FontAwesome} from "@expo/vector-icons";
import {Link} from "expo-router";

const Filter = () => {

  const [numMembers, setNumMembers] = React.useState(
      useFilterStore((state) => state.numMembers.toString())
  );

  return (
      <KeyboardAwareScrollView
          style={{ padding: 16, backgroundColor: Colors.background }}
          showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 16 }}>
            Number of Members
          </Text>
          <TextInput
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
        <Link
            asChild
            href="/(authenticated)/projects/languages"
            style={[
              styles.fieldsContainer,
              { paddingBottom: 20, paddingRight: 32 },
            ]}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 16 }}>
              Languages
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
              <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.skillsText}
              >
                {useFilterStore(state => state.languages).join(", ")}
              </Text>
              <FontAwesome name="chevron-right" size={16} color={Colors.dark} />
            </View>
          </TouchableOpacity>
        </Link>
      </KeyboardAwareScrollView>
  );
};

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
  fieldsContainer: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  skillsText: {
    width: "100%", // You can set a specific width or maxWidth instead
    overflow: "hidden",
    color: Colors.gray,
  },
})

export default Filter;

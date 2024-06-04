import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Badge from "@/components/profile/badge";
import { defaultStyles } from "@/constants/DefaultStyles";
import { LANGUAGES } from "@/constants/Languages";

const SELECTED = ["🇬🇧 English"];

const Languages = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Languages</Text>
        <Text style={{ color: Colors.gray }}>1 of 5</Text>
      </View>
      <View style={{ height: 48 }}>
        <ScrollView
          horizontal
          style={{ marginTop: 8 }}
          showsHorizontalScrollIndicator={false}
        >
          {SELECTED.map((skill, i) => (
            <TouchableOpacity
              key={skill}
              style={{
                backgroundColor: Colors.primary,
                padding: 8,
                borderRadius: 16,
                marginRight: 8,
                height: 32,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: i == 0 ? 16 : 0,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>{skill}</Text>
              <FontAwesome
                name="times"
                size={12}
                color="white"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <View
          style={[
            defaultStyles.textInput,
            {
              height: 36,
              paddingVertical: 0,
              paddingHorizontal: 8,
              gap: 8,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            },
          ]}
        >
          <Ionicons name="search" size={16} color={Colors.gray} />
          <TextInput placeholder="Search" style={{ height: "100%" }} />
        </View>

        <ScrollView
          contentContainerStyle={{
            marginTop: 8,
            flexWrap: "wrap",
            width: "100%",
            flexDirection: "row",
            gap: 8,
            paddingBottom: 192,
          }}
          showsVerticalScrollIndicator={false}
        >
          {LANGUAGES.map((e, i) => (
            <Badge text={e} key={i} selected={SELECTED.includes(e)} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Languages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 16,
  },
});

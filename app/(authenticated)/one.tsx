import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/DefaultStyles";
import Colors from "@/constants/Colors";

const One = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => supabase.auth.signOut()}
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.primary, width: 100 },
          ]}
        >
          <Text style={{ color: "white" }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default One;

const styles = StyleSheet.create({});

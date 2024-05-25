import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { supabase } from "@/utils/supabase";

const One = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default One;

const styles = StyleSheet.create({});

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.description}>
        Enter the email you wish to be associated with your account
      </Text>
      <TextInput placeholder="Email" style={styles.textInput} />
      <View style={styles.dontHaveAccountContainer}>
        <Text style={{ color: Colors.gray }}>Already have an account? </Text>
        <Link href={""}>
          <Text style={{ color: Colors.primary, fontWeight: 600 }}>
            Sign In
          </Text>
        </Link>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={120}
      >
        <TouchableOpacity style={styles.signInButton}>
          <Text style={{ color: "white" }}>Create Account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Colors.background,
    height: "100%",
  },
  dontHaveAccountContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    marginTop: 8,
    color: Colors.gray,
  },
  textInput: {
    backgroundColor: Colors.lightGray,
    width: "100%",
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: "auto",
    alignItems: "center",
  },
});

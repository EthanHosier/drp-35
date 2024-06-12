import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import SignUpButton from "@/components/auth/SignUpButton";

const Index = () => {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.description}>
        Enter the email associated with your account
      </Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <View style={styles.dontHaveAccountContainer}>
        <Text style={{ color: Colors.gray }}>Don't have an account yet? </Text>
        <Link href={"signup"}>
          <Text style={{ color: Colors.primary, fontWeight: 600 }}>
            Sign Up
          </Text>
        </Link>
      </View>
      <SignUpButton signIn shouldCreateUser={false} email={email} />
    </View>
  );
};

export default Index;

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
    marginTop: "auto",
    alignItems: "center",
  },
});

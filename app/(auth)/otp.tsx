import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";

const Otp = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  if (!email) return null;

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) {
      alert(error.message);
    } else {
      alert("SignIn successful");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your OTP</Text>
      <Text style={styles.description}>
        Enter the OTP you received on your email address
      </Text>
      <TextInput
        placeholder="OTP"
        style={styles.textInput}
        value={token}
        onChangeText={(text) => setToken(text)}
      />
      <View style={styles.dontHaveAccountContainer}>
        <Text style={{ color: Colors.gray }}>Haven't received OTP? </Text>
        <Link href={""}>
          <Text style={{ color: Colors.primary, fontWeight: 600 }}>
            Placeholder
          </Text>
        </Link>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={120}
      >
        <TouchableOpacity
          style={styles.signInButton}
          disabled={loading}
          onPress={() => verifyOtp()}
        >
          <Text style={{ color: "white" }}>Verify</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Otp;

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

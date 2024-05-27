import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, Text, TouchableOpacity, StyleSheet} from "react-native";
import {defaultStyles} from "@/constants/DefaultStyles";
import Colors from "@/constants/Colors";
import {supabase} from "@/utils/supabase";
import {router} from "expo-router";

const SignUpButton = (
    { shouldCreateUser, email }: {shouldCreateUser: boolean, email: string}
) => {
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: shouldCreateUser,
      },
    });
    if (error) {
      alert(error.message);
    } else {
      router.push({ pathname: "/otp", params: { email } });
    }
    setLoading(false);
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={70}
      >
        <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              styles.signInButton,
              loading && { opacity: 0.5 },
            ]}
            disabled={loading}
            onPress={() => signUpWithEmail()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Create Account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
  );
};

export default SignUpButton;

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    marginTop: "auto",
    alignItems: "center",
  },
}) ;

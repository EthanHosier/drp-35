import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, Fragment } from "react";
import Colors from "@/constants/Colors";
import { Link, router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const CELL_COUNT = 6;

const Otp = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({ value: token, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: token,
    setValue: setToken,
  });

  const { email } = useLocalSearchParams<{ email: string }>();
  if (!email) return null;

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
      router.navigate("/(tabs)");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your OTP</Text>
      <Text style={styles.description}>
        Enter the OTP you received on your email address
      </Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={token}
        onChangeText={setToken}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={
          Platform.select({
            android: "sms-otp",
            default: "one-time-code",
          }) as any
        }
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.seperator} />
            ) : null}
          </Fragment>
        )}
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
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  focusCell: {
    paddingBottom: 8,
  },
  seperator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },

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

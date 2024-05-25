import Colors from "@/constants/Colors";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.background }}>
      <Slot />
    </SafeAreaView>
  );
}

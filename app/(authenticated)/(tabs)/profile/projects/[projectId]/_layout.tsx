import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="view-members" />
      <Stack.Screen options={{ headerShown: false }} name="[userId]" />
      <Stack.Screen options={{ headerShown: false }} name="view-interested" />
    </Stack>
  );
};

export default Layout;

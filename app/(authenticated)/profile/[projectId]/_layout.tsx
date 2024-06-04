import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="view-members" />
    </Stack>
  );
};

export default Layout;

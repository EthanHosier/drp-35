import React from "react";
import { Stack, useRouter } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[profileId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

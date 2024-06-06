import React from "react";
import { Stack, useRouter } from "expo-router";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="[orgId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

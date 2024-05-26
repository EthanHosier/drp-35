import React from 'react';
import {Stack} from "expo-router";

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="projects" />
        <Stack.Screen name="add-project" />
        <Stack.Screen name="join-project" />
      </Stack>
  );
};

export default Layout;
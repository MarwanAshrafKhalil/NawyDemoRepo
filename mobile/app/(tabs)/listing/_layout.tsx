import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ListingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[apartmentId]" options={{ headerShown: false }} />
    </Stack>
  );
}

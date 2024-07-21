import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          tabBarLabel: "Sell",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-home-work" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

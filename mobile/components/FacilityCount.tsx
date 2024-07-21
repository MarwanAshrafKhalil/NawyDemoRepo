import React from "react";
import { View, Text, StyleSheet } from "react-native";

type FacilityCountProps = {
  count: number;
  children: React.ReactElement;
};

const FacilityCount: React.FC<FacilityCountProps> = ({ count, children }) => {
  return (
    <View className="relative flex-row items-center  mx-2">
      <View className="bg-gray-200 rounded-lg p-2 w-11 h-11 justify-center items-center">
        {React.cloneElement(children, {
          style: { width: "100%", height: "100%", color: "#4A4A4A" },
        })}
      </View>

      <Text className="text-black font-medium text-xs absolute top-0 left-0 flex items-center justify-center w-full h-full">
        {count}
      </Text>
    </View>
  );
};

export default FacilityCount;

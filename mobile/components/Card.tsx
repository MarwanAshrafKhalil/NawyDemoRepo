import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";
import FacilityCount from "./FacilityCount";
import { ApartsDataType } from "@/app/(tabs)/home";
import { SafeAreaView } from "react-native-safe-area-context";

const Card: React.FC<{ data: ApartsDataType }> = ({ data: apartment }) => {
  const navigation = useNavigation();
  const monthlyPrice = Math.ceil(
    apartment.apt_price / apartment.installment_period / 12
  );

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {/* <TouchableOpacity
        className="bg-white max-w-xl w-full h-auto shadow-md rounded-md border border-gray-500"
        onPress={() =>
          navigation.navigate("ApartmentDetails", { id: apartment.id })
        }
      > */}
      <View className="bg-white max-w-96 w-full h-auto shadow-md rounded-md border boreder-1 border-gray-500">
        <View className="overflow-hidden h-48">
          <Image
            className="w-full h-full object-cover"
            source={{ uri: apartment.Url }}
            resizeMode="cover"
          />
        </View>
        <View className="p-3">
          <View className="mb-5">
            <Text className="text-black text-lg font-bold">
              {apartment.apt_name}
            </Text>
            <Text className="text-black">
              {apartment.apt_city}, {apartment.apt_country}
            </Text>
          </View>

          <View className=" flex-row items-center justify-between mt-2 align-middle">
            <View className="flex-row">
              <FacilityCount count={apartment.bedrooms_count}>
                <Ionicons name="bed-outline" size={24} color="#000" />
              </FacilityCount>

              <FacilityCount count={apartment.bathrooms_count}>
                <FontAwesome5 name="bath" size={24} color="#000" />
              </FacilityCount>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="home" size={24} color="#707070" />
              <Text className="text-black text-xl font-semibold">
                {apartment.area_m2} m²
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center gap-5 my-3">
            <View className="gap-3">
              <Text className="text-sm text-gray-500">
                {monthlyPrice} Monthly / {apartment.installment_period} years
              </Text>
              <Text className="text-xl text-black font-bold">
                {Math.ceil(apartment.apt_price)} EGP
              </Text>
            </View>
            <View className="flex-row  gap-5 mr-2">
              <Pressable
                className="bg-slate-200 rounded-full w-12 h-12 flex items-center justify-center"
                onPress={() => {}}
              >
                <Ionicons name="call-outline" size={28} color="#007BFF" />
              </Pressable>
              <Pressable
                className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center"
                onPress={() => {}}
              >
                <Ionicons name="logo-whatsapp" size={28} color="#FFF" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {/* </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Card;

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ApartsDataType } from ".";
import { fetchApartment } from "@/api/apartments";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Apartment() {
  const { apartmentId } = useLocalSearchParams();

  const [apartData, setApartData] = useState<ApartsDataType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAparts = async () => {
      setIsLoading(true);
      try {
        const result = await fetchApartment(apartmentId as string);
        setApartData(result);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchAparts();
  }, [apartmentId]);

  return (
    <SafeAreaView className="flex-1 ">
      {isLoading && !apartData ? (
        <View className="flex-1 justify-center items-center bg-white rounded-lg">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView
          className="flex-1 mx-5"
          showsVerticalScrollIndicator={false}
        >
          {apartData && (
            <View className="flex-1 w-full justify-center items-center">
              <View className="overflow-hidden rounded-lg">
                <Image
                  source={{ uri: apartData.Url }}
                  className=" h-96 w-full object-contain rounded-lg"
                  resizeMode="contain"
                />
              </View>

              <View className="flex flex-row w-full  gap-5 px-2 mx-auto items-center  bg-white rounded-xl py-3">
                <Image
                  source={require("../../../assets/images/nawy-logo.png")}
                  className="rounded-full w-16 h-16  p-2"
                  resizeMode="contain"
                />
                <View className="flex flex-col items-start justify-start">
                  <View className="flex flex-col w-full">
                    <View className="flex flex-col gap-1 ">
                      <Text className="text-primary text-2xl font-semibold">
                        {apartData.apt_name}
                      </Text>
                      <Text className="text-black font-medium bg-gray-100 rounded-full w-16 p-2">
                        {apartData.compound}
                      </Text>
                    </View>
                    <Text className="text-black text-md font-normal mt-5 sm:mt-1">
                      {apartData.apt_city}, {apartData.apt_country}
                    </Text>
                  </View>

                  <View className="flex flex-col  justify-between items-start  mt-4">
                    <View>
                      <Text className="text-sm text-gray-500">
                        {apartData &&
                          Math.ceil(
                            apartData.apt_price /
                              apartData.installment_period /
                              12
                          )}{" "}
                        Monthly / {apartData.installment_period} years"
                      </Text>
                      <Text className="text-xl text-black font-bold">
                        {apartData && Math.ceil(apartData.apt_price)} EGP
                      </Text>
                    </View>

                    <View className="flex flex-row gap-2 mt-5">
                      <Pressable className="bg-slate-200 rounded-full w-16 h-16 flex items-center justify-center ">
                        <Ionicons
                          name="call-outline"
                          size={24}
                          color="#1f4163"
                        />
                      </Pressable>
                      <Pressable className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center ">
                        <FontAwesome6 name="whatsapp" size={24} color="white" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex flex-col gap-2 my-2 mx-auto">
                <Text className="text-primary text-xl font-bold">Details</Text>
                <View className="flex flex-row gap-4">
                  <TouchableOpacity className="flex flex-col gap-1 w-auto h-20 border border-1 border-gray-300 rounded-lg items-center justify-center p-2">
                    <FontAwesome6 name="images" size={24} color="#6b7280" />
                    <Text>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex flex-col gap-1 w-auto h-20 border border-1 border-gray-300 rounded-lg items-center justify-center p-2">
                    <FontAwesome6
                      name="map-location-dot"
                      size={24}
                      color="#6b7280"
                    />
                    <Text>Master Plan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex flex-col gap-1 w-auto h-20 border border-1 border-gray-300 rounded-lg items-center justify-center p-2">
                    <FontAwesome6 name="map-pin" size={24} color="#6b7280" />
                    <Text>View on Map</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-1 my-5 w-full gap-2  ">
                <Text className="text-primary text-xl font-bold">
                  Amenities
                </Text>
                <View className="grid w-full bg-white rounded-xl p-5 mx-auto  gap-2">
                  <View className="flex flex-row gap-2">
                    <Ionicons
                      name="business-outline"
                      size={24}
                      color="#111827"
                    />
                    <Text className="text-gray-900 font-medium text-lg">
                      Business Park
                    </Text>
                  </View>
                  <View className="flex flex-row gap-2">
                    <FontAwesome6 name="school" size={24} color="#111827" />
                    <Text className="text-gray-900 font-medium text-lg">
                      Schools
                    </Text>
                  </View>
                  <View className="flex flex-row gap-2">
                    <FontAwesome6 name="mosque" size={24} color="#111827" />
                    <Text className="text-gray-900 font-medium text-lg">
                      Mosque
                    </Text>
                  </View>
                  <View className="flex flex-row gap-2">
                    <MaterialIcons
                      name="sports-soccer"
                      size={24}
                      color="#111827"
                    />
                    <Text className="text-gray-900 font-medium text-lg">
                      Sports Clubs
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex flex-col">
                <Text className="text-primary text-xl font-bold">
                  About Palm Hills New Cairo
                </Text>
                <Text className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  At auctor urna nunc id cursus metus aliquam eleifend mi. Sed
                  blandit libero volutpat sed cras ornare arcu. Gravida quis
                  blandit turpis cursus in hac habitasse platea dictumst. Morbi
                  tincidunt augue interdum velit. Vulputate enim nulla aliquet
                  porttitor lacus. Tortor at auctor urna nunc id cursus metus
                  aliquam. Sit amet justo donec enim diam vulputate ut pharetra
                  sit. Egestas integer eget aliquet nibh praesent. A erat nam at
                  lectus urna duis convallis. At imperdiet dui accumsan sit amet
                  nulla facilisi. Lacus vel facilisis volutpat est velit egestas
                  dui id. Pharetra et ultrices neque ornare. Vestibulum morbi
                  blandit cursus risus at ultrices mi tempus. Quis varius quam
                  quisque id diam. Nunc eget lorem dolor sed. In fermentum et
                  sollicitudin ac orci phasellus egestas tellus. Sit amet nisl
                  purus in mollis nunc sed. Netus et malesuada fames ac.
                  Fermentum odio eu feugiat pretium nibh ipsum consequat. Sed
                  adipiscing diam donec adipiscing tristique risus nec. Neque
                  aliquam vestibulum morbi blandit cursus risus. Faucibus purus
                  in massa tempor nec. Mattis vulputate enim nulla aliquet
                  porttitor lacus.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

import { fetchData } from "../../../api/apartments";
import Card from "@/components/Card";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export type ApartsDataType = {
  id: number;
  apt_name: string;
  apt_city: string;
  apt_country: string;
  bedrooms_count: number;
  bathrooms_count: number;
  area_m2: number;
  installment_period: number;
  apt_price: number;
  apt_delivery_date: Date;
  compound: string;
  imagename: string;
  Url: string;
};

export default function Listing() {
  const [apartsData, setApartsData] = useState<ApartsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAparts = async () => {
      setIsLoading(true);
      try {
        const result = await fetchData();
        setApartsData(result);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAparts();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      {isLoading ? (
        <View className="flex-1 w-full justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        apartsData.length > 0 && (
          <View>
            <Text className="text-2xl font-bold text-center   text-secondary">
              Explore Properties
            </Text>

            {/* {apartsData?.map((apartment) => (
                <View key={apartment.id}>
                  <Card data={apartment} />
                </View>
              ))} */}

            <FlatList
              data={apartsData}
              renderItem={({ item }) => <Card data={item} />}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )
      )}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

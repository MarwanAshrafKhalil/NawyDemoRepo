import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require(`../assets/images/nawy-1.png`)}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1 justify-center items-center"
          colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.8)"]}
        >
          <SafeAreaView className="flex-1 px-1 items-center justify-between mx-10 ">
            <View className="flex-1 justify-center items-center">
              <Image
                source={require(`../assets/images/nawy-logo.png`)}
                className=" flex w-52 h-52"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-primary text-center shadow-lg shadow-slate-50">
                Explore Real Estate Market Easily!
              </Text>
            </View>
            <View className="flex justify-center items-center mb-16 ">
              <Pressable
                // activeOpacity={0.7}
                onPress={() => router.push("/home")}
                className="rounded-lg bg-secondary  min-h-[62px] justify-center items-center w-52 "
              >
                <Text className=" font-semibold text-lg text-white">
                  Explore Market
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({});

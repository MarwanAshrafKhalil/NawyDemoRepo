import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { postApartment } from "@/api/apartments";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/JPEG",
  "image/jpg",
  "image/JPG",
  "image/png",
  "png",
  "image/PNG",
  "PNG",
  "image/webp",
  "image/WEBP",
];

const SellSchema = z.object({
  apt_name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Few words are enough please"),
  apt_city: z
    .string()
    .min(1, "Mobile number must be 11 digits")
    .max(15, "Mobile number is not valid"),
  bedrooms_count: z
    .string()
    .min(1, "Enter a valid number")
    .max(2, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  bathrooms_count: z
    .string()
    .min(1, "Enter a valid number")
    .max(2, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  area_m2: z
    .string()
    .min(1, "Enter a valid number")
    .max(6, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  installment_plan: z
    .string()
    .min(1, "Enter a valid number")
    .max(2, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  apt_price: z
    .string()
    .min(1, "Enter a valid number")
    .max(10, "Enter valid number")
    .regex(/^\d+$/, "Enter a valid number"),
  apt_delivery_date: z
    .date()
    .transform((val) => new Date(val))
    .refine((date) => date >= getToday(), {
      message: "Date must not be older than today",
    }),
  compound: z.string().min(1, "Select a Compound"),
  image_file: z.any().refine((file) => {
    if (file && file.size) {
      console.log("Image size:", file.size);
      return file.size <= 5000000; // 5MB in bytes
    }
    return true;
  }, "Max image size is 5MB."),
});

type SellFormValues = z.infer<typeof SellSchema>;

const city_test = ["Cairo", "Giza"];
type ImagePickerAsset = ImagePicker.ImagePickerAsset | null;

export default function Sell() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SellFormValues>({
    resolver: zodResolver(SellSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset>(null);

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = async (data: SellFormValues) => {
    console.log("data:", data);
    const formData = new FormData();
    formData.append("apt_name", data.apt_name);
    formData.append("apt_city", data.apt_city);
    formData.append("bedrooms_count", data.bedrooms_count);
    formData.append("bathrooms_count", data.bathrooms_count);
    formData.append("area_m2", data.area_m2);
    formData.append("installment_plan", data.installment_plan);
    formData.append("apt_price", data.apt_price);
    formData.append("apt_delivery_date", data.apt_delivery_date.toISOString());
    formData.append("compound", data.compound);
    formData.append("image", data.image_file);

    setIsLoading(true);

    await postApartment(formData)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error posting apartment:", error);
        setIsLoading(false);
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Convert asset to file object
      const { uri, type, width, height } = result.assets[0];
      const fileName = uri.split("/").pop() || "image.jpg";
      const fileType = type || "image/jpeg";

      setSelectedImage({
        uri,
        type: fileType,
        name: fileName,
        width,
        height,
      });
    }
  };

  const handleDateChange = (event: any, date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date;
      setValue("apt_delivery_date", formattedDate);
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className=" bg-primary  ">
        <Text className="mt-4 text-center text-xl font-bold  text-white my-10">
          Complete The Form
        </Text>
      </View>
      <View className=" items-center justify-center mx-8 mb-20">
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView className="w-full " showsVerticalScrollIndicator={false}>
            <View className="my-10 ">
              <Controller
                control={control}
                name="apt_name"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4 gap-3">
                    <Text className="font-semibold text-lg">
                      Apartment Title
                    </Text>
                    <TextInput
                      className="border border-1 border-gray-400 focus:border-secondary rounded-lg h-10"
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.apt_name && (
                      <Text className="text-red-500">
                        {errors.apt_name.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="apt_city"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4 gap-3">
                    <Text className="font-semibold text-lg">City</Text>
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      className="border border-1 border-gray-400 focus:border-secondary rounded-lg h-10 "
                    >
                      <Picker.Item label="--Select City--" value="" />
                      {city_test.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                      ))}
                    </Picker>
                    {errors.apt_city && (
                      <Text className="text-red-500">
                        {errors.apt_city.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="bedrooms_count"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4 gap-3">
                    <Text className="font-semibold text-lg">
                      Number of Bedrooms
                    </Text>
                    <TextInput
                      className="border border-1 border-gray-400 focus:border-secondary rounded-lg h-10 "
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                    {errors.bedrooms_count && (
                      <Text className="text-red-500">
                        {errors.bedrooms_count.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="bathrooms_count"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4 gap-3">
                    <Text className="font-semibold text-lg">
                      Number of Bathrooms
                    </Text>
                    <TextInput
                      className="border border-1 border-gray-400 focus:border-secondary rounded-lg h-10 "
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                    {errors.bathrooms_count && (
                      <Text className="text-red-500">
                        {errors.bathrooms_count.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="area_m2"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4 gap-3">
                    <Text className="font-semibold text-lg">
                      Apartment Area
                    </Text>
                    <TextInput
                      className="border border-1 border-gray-400 focus:border-secondary rounded-lg h-10 "
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                    {errors.area_m2 && (
                      <Text className="text-red-500">
                        {errors.area_m2.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="installment_plan"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4 gap-3">
                    <Text className="font-semibold text-lg">
                      Installment Plan
                    </Text>
                    <TextInput
                      className="border border-1 border-gray-400 focus:border-secondary rounded-lg h-10 "
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                    {errors.installment_plan && (
                      <Text className="text-red-500">
                        {errors.installment_plan.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="apt_price"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4 gap-3">
                    <Text className="font-semibold text-lg">
                      Apartment Price
                    </Text>
                    <TextInput
                      className="border border-1 border-gray-400 focus:border-secondary rounded-lg h-10 "
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                    {errors.apt_price && (
                      <Text className="text-red-500">
                        {errors.apt_price.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="apt_delivery_date"
                render={({ field: { value } }) => (
                  <View className="items-start justify-center w-full my-10">
                    <Text className="font-semibold text-lg text-start">
                      Delivery Date
                    </Text>
                    <Button
                      title="Select Date"
                      onPress={() => setShow(true)}
                      color="#007BFF"
                    />
                    {show && (
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                      />
                    )}
                    <Text className="mt-2 text-lg">
                      {value ? `Selected Date: ${value}` : "No date selected"}
                    </Text>
                  </View>
                )}
              />
              {errors.apt_delivery_date && (
                <Text className="text-red-500">
                  {errors.apt_delivery_date.message}
                </Text>
              )}

              <Controller
                control={control}
                name="compound"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4 ">
                    <Text className="font-semibold text-lg">Compound</Text>
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      className="gap-0 mt-0 "
                    >
                      <Picker.Item label="Select Compound" value="" />
                      <Picker.Item label="Compound A" value="Compound A" />
                      <Picker.Item label="Compound B" value="Compound B" />
                    </Picker>
                    {errors.compound && (
                      <Text className="text-red-500">
                        {errors.compound.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <View className="mb-4 gap-3">
                <Text className="font-semibold text-lg">Apartment Image</Text>
                <TouchableOpacity
                  onPress={pickImage}
                  className="bg-blue-500 p-2 rounded-lg"
                >
                  <Text className="text-white text-lg text-center ">
                    Pick an image from gallery
                  </Text>
                </TouchableOpacity>
                {selectedImage && (
                  <Text className="text-success text-md">Image selected</Text>
                )}
                {errors.image_file && (
                  <Text className="text-red-500">
                    {String(errors.image_file.message)}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="bg-green-500 p-4 rounded-full mt-10"
              >
                <Text className="text-white text-center text-lg">Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

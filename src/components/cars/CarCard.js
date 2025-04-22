import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useLocale } from "../../contexts/LocaleContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { brands } from "../../mock-data";
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext"; // ✅ NEW

export default function CarCard({ car }) {
  const { locale } = useLocale();
  const navigation = useNavigation();
  const { addToRecentlyViewed } = useRecentlyViewed(); // ✅ Access tracking
  const [scale] = useState(new Animated.Value(1));

  const getLang = (field) =>
    typeof field === "object" ? field?.[locale] : field;

  const brandName = brands?.[car.brand]?.[locale] || "";

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const goToGallery = () => {
    addToRecentlyViewed(car); // ✅ Track car as recently viewed

    // Clean up non-serializable values (if needed)
    const { brandLogo, ...serializableCar } = car;

    navigation.navigate("Gallery", { car: serializableCar });
  };

  return (
    <View className="w-full h-80 mr-2 mb-5 bg-white rounded-[10px] shadow-md">
      <TouchableOpacity
        activeOpacity={0.97}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={goToGallery}
        style={{ transform: [{ scale }] }}
        className="overflow-hidden rounded-[10px]"
      >
        {/* 🔸 Car Image */}
        <View className="relative w-full h-40 bg-white px-4 py-2">
          <Image
            source={car.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* 🔸 Car Info */}
        <View className="p-4 space-y-2">
          {/* 🔹 Model + Brand */}
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-base font-bold text-gray-800">
              {getLang(car.name)}
            </Text>
            <Text className="text-sm font-medium text-gray-500">
              {brandName}
            </Text>
          </View>

          {/* 🔹 Price + Installment */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Icon name="money" size={14} color="#46194F" />
              <Text className="text-base font-bold text-[#46194F] ml-1">
                {`${car.cashPrice?.toLocaleString() || ""} ${
                  locale === "en" ? "SAR" : "ر.س"
                }`}
              </Text>
            </View>

            <View className="bg-[#f0e6f5] px-2.5 py-1 rounded-md">
              <Text className="text-xs font-semibold text-[#46194F] text-center">
                {`${locale === "en" ? "From" : "من"} ${
                  car.installmentPrice || ""
                } ${locale === "en" ? "/mo" : "/شهر"}`}
              </Text>
            </View>
          </View>

          {/* 🔹 Specs */}
          <View className="flex flex-row items-center justify-between py-3 border-t border-b border-gray-100 mt-2">
            <View className="flex flex-row items-center">
              <Icon name="calendar" size={14} color="#666" />
              <Text className="text-xs text-gray-600 ml-1.5">
                {car.specs?.year?.toString() || "-"}
              </Text>
            </View>

            <View className="flex flex-row items-center">
              <Icon name="tachometer" size={14} color="#666" />
              <Text className="text-xs text-gray-600 ml-1.5">
                {car.specs?.mileage
                  ? getLang(car.specs?.mileage)
                  : locale === "ar"
                  ? "٠ كم"
                  : "0 km"}
              </Text>
            </View>

            <View className="flex flex-row items-center">
              <Icon name="gear" size={14} color="#666" />
              <Text className="text-xs text-gray-600 ml-1.5">
                {getLang(car.specs?.transmission) || "-"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
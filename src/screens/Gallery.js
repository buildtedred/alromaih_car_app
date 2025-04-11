import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLocale } from "../contexts/LocaleContext";

const GalleryScreen = ({ route }) => {
  const { car } = route.params;
  const { locale, direction } = useLocale();
  const isRTL = direction === "rtl";

  const getLang = (field) => (locale === "en" ? field?.en : field?.ar);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Hero Image */}
      <View className="h-64 bg-gray-100 justify-center items-center">
        <Image
          source={car.image}
          resizeMode="contain"
          className="w-[90%] h-[90%]"
        />
      </View>

      {/* Basic Info */}
      <View className={`p-5 border-b border-gray-200 ${isRTL ? "items-end" : ""}`}>
        <Text className="text-2xl font-bold text-gray-800">{getLang(car.name)}</Text>
        <Text className="text-base text-gray-600 mt-1">{getLang(car.modelYear)}</Text>

        <View className={`flex-row items-center mt-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <Text className="text-2xl font-bold text-[#46194F]">
            {car.cashPrice?.toLocaleString()} {locale === "en" ? "SAR" : "ر.س"}
          </Text>
          <View className="bg-[#f0e6f5] px-3 py-1.5 rounded-full ml-3">
            <Text className="text-[#46194F] font-semibold text-sm">
              {locale === "en" ? "From" : "من"} {car.installmentPrice}{" "}
              {locale === "en" ? "/mo" : "/شهر"}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Specs */}
      <View className="flex-row justify-around p-5 border-b border-gray-200">
        {[
          ["calendar", car.specs.year],
          ["tachometer", car.specs.mileage || "0 km"],
          ["gear", getLang(car.specs.transmission)],
        ].map(([icon, value]) => (
          <View
            key={icon}
            className={`flex-row items-center ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Icon name={icon} size={20} color="#46194F" />
            <Text className={`text-base text-gray-600 ${isRTL ? "mr-2" : "ml-2"}`}>
              {value}
            </Text>
          </View>
        ))}
      </View>

      {/* Detailed Specs */}
      <View className="p-5 border-b border-gray-200">
        <Text className={`text-xl font-bold text-gray-800 mb-4 ${isRTL ? "text-right" : ""}`}>
          {locale === "en" ? "Specifications" : "المواصفات"}
        </Text>

        {[
          ["Fuel Type", car.specs.fuelType],
          ["Seats", car.specs.seats],
          ["Transmission", car.specs.transmission],
          ["Drive Type", car.specs.driveType],
          ["Driving Modes", car.specs.drivingMode],
          ["Engine", car.specs.engine],
          ["Power", car.specs.power],
          ["Torque", car.specs.torque],
          ["Acceleration", car.specs.acceleration],
          ["Length", car.specs.length],
          ["Width", car.specs.width],
          ["Height", car.specs.height],
          ["Wheelbase", car.specs.wheelbase],
          ["Fuel Tank", car.specs.fuelTank],
          ["Cargo Capacity", car.specs.cargoCapacity],
        ].map(([label, value]) => (
          <View key={label} className="flex-row justify-between mb-3">
            <Text className="text-base text-gray-600 font-medium">
              {locale === "en" ? `${label}:` : `${getLang({ en: label, ar: label })} :`}
            </Text>
            <Text className="text-base text-gray-800 font-semibold">
              {getLang(value)}
            </Text>
          </View>
        ))}
      </View>

      {/* Features */}
      <View className="p-5 border-b border-gray-200">
        <Text className={`text-xl font-bold text-gray-800 mb-4 ${isRTL ? "text-right" : ""}`}>
          {locale === "en" ? "Features" : "المميزات"}
        </Text>

        {[
          ["Airbags", car.specs.airbags],
          ["Brakes", car.specs.brakes],
          ["Parking Sensors", car.specs.parkingSensors],
          ["Camera", car.specs.camera],
        ].map(([label, value]) => (
          <View
            key={label}
            className={`flex-row items-center mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Icon name="check-circle" size={16} color="#46194F" />
            <Text className={`text-base text-gray-800 ${isRTL ? "mr-2" : "ml-2"}`}>
              {locale === "en" ? `${label}:` : `${getLang({ en: label, ar: label })} :`}{" "}
              {getLang(value)}
            </Text>
          </View>
        ))}
      </View>

      {/* Call to Action */}
      <TouchableOpacity className="bg-[#46194F] p-4 mx-5 my-6 rounded-lg items-center">
        <Text className="text-white text-lg font-bold">
          {locale === "en" ? "Contact Us" : "اتصل بنا"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default GalleryScreen;

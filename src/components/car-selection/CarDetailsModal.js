"use client";

import { View, TouchableOpacity, Dimensions, Text, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AlmaraiFonts from "../../constants/fonts";
import RiyalIcon from "../../assets/Icon/riyal_icon.svg";
import JetourLogo from "../../assets/brands/jetour.svg";
import CheckBoxIcon from "../../assets/Icon/checkbox.svg";

const { width, height } = Dimensions.get("window");
const MODAL_HEIGHT = height * 0.75;

const CarDetailsModal = ({ isVisible, onClose, carData, locale, navigation, paymentType }) => {
  if (!carData) return null;

  const handleViewDetails = () => {
    onClose();
    navigation.navigate("CarDetails", {
      carId: carData.id,
      brand: carData.brand,
      model: carData.model,
      year: carData.year,
      category: carData.category,
      price: carData.price,
      paymentType,
    });
  };

  const cashPrice =
    typeof carData.price === "number"
      ? carData.price
      : Number.parseInt(carData.price?.replace(/[^0-9]/g, "") || "0");

  const monthlyPayment = Math.round(cashPrice / 60).toLocaleString();

  const selectedValues = [
    carData.brand || "",
    carData.model || "",
    carData.category || "",
    carData.year || "",
    cashPrice.toLocaleString() || "",
  ];

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0}
      style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
      hideModalContentWhileAnimating
      onBackdropPress={onClose}
    >
      <View className="w-full bg-white rounded-t-2xl" style={{ height: MODAL_HEIGHT }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-3">
            <TouchableOpacity onPress={onClose}>
              <Text
                className="text-2xl font-bold text-[#46194F]"
                style={{
                  transform: [{ scaleX: locale === "ar" ? -1 : 1 }],
                  fontFamily: AlmaraiFonts.bold,
                }}
              >
                {locale === "ar" ? ">" : "<"}
              </Text>
            </TouchableOpacity>

            <Text
              className="text-lg font-bold text-[#46194F] flex-1 text-center"
              style={{ fontFamily: AlmaraiFonts.bold }}
            >
              {locale === "ar" ? "استكشف سيارتك" : "Explore Your Car"}
            </Text>

            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 border border-gray-300 rounded-md items-center justify-center"
            >
              <FontAwesome name="times-circle-o" size={20} color="#46194F" />
            </TouchableOpacity>
          </View>

          {/* Selected Values and Step Indicators */}
          <View className="px-4 mt-2">
            <View className="flex-row justify-center gap-6 mb-2">
              {selectedValues.map((label, index) => (
                <View key={`label-${index}`} style={{ width: 60, alignItems: "center" }}>
                  {label ? (
                    <View
                      className="px-2 py-2 rounded-[5px] bg-[#46194F]"
                      style={{ width: "100%", minHeight: 26, justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        className="text-white text-xs text-center"
                        style={{ fontFamily: AlmaraiFonts.bold }}
                        numberOfLines={1}
                      >
                        {label}
                      </Text>
                    </View>
                  ) : (
                    <View style={{ height: 26 }} />
                  )}
                </View>
              ))}
            </View>

            {/* Step Indicators with checkbox */}
            <View className="flex-row items-center justify-center mb-4">
              {[0, 1, 2, 3, 4].map((step, index, arr) => (
                <View key={`step-${step}`} className="flex-row items-center">
                  <View className="h-7 w-7 items-center justify-center">
                    <CheckBoxIcon width={22} height={22} />
                  </View>
                  {step < arr.length - 1 && (
                    <View className="h-0.5 bg-[#46194F]" style={{ minWidth: 60, maxWidth: 40 }} />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Car Details Content */}
          <View className="items-center w-full mt-2">
            <View className="flex-1 px-4 rounded-lg" style={{ maxWidth: width * 0.9 }}>
              {/* Detail Card */}
              <View className="border-2 rounded-[10px] mt-4 overflow-hidden">
                <View className="p-3 border-b border-[#46194F]">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-xl font-bold text-[#46194F]" style={{ fontFamily: AlmaraiFonts.bold }}>
                        {locale === "ar"
                          ? `${carData.model} ${carData.brand}`
                          : `${carData.brand} ${carData.model}`}
                      </Text>
                      <Text className="text-sm text-gray-600" style={{ fontFamily: AlmaraiFonts.regular }}>
                        {locale === "ar" ? `الدفعي كامل ${carData.year}` : `Full payment ${carData.year}`}
                      </Text>
                    </View>
                    <View className="w-20 h-8 justify-center items-center">
                      <JetourLogo width={80} height={24} />
                    </View>
                  </View>
                </View>

                {/* Price Info */}
                <View className="flex-row border-b border-[#46194F]">
                  <View className="flex-1 p-3 items-center">
                    <Text className="text-sm text-gray-600" style={{ fontFamily: AlmaraiFonts.regular }}>
                      {locale === "ar" ? "سعر الكاش" : "Cash price"}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-lg font-bold text-[#46194F]" style={{ fontFamily: AlmaraiFonts.bold }}>
                        {cashPrice.toLocaleString()}
                      </Text>
                      <View className="ml-1">
                        <RiyalIcon width={20} height={20} />
                      </View>
                    </View>
                  </View>

                  <View className="w-0.5 bg-[#46194F]" />

                  <View className="flex-1 p-3 items-center">
                    <Text className="text-sm text-gray-600" style={{ fontFamily: AlmaraiFonts.regular }}>
                      {locale === "ar" ? "القسط من" : "Monthly from"}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-lg font-bold text-[#46194F]" style={{ fontFamily: AlmaraiFonts.bold }}>
                        {monthlyPayment}
                      </Text>
                      <View className="ml-1">
                        <RiyalIcon width={14} height={14} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Car Image */}
              <View className="items-center justify-center mt-6 mb-2">
                <Image
                  source={carData.image || require("../../assets/images/car1.png")}
                  style={{ width: width * 0.7, height: 160 }}
                  resizeMode="contain"
                />
              </View>

              {/* View Details Button */}
              <TouchableOpacity
                className="bg-[#46194F] rounded-[10px] py-3 px-6 items-center mx-auto"
                style={{ minWidth: 200 }}
                onPress={handleViewDetails}
              >
                <Text className="text-white font-bold text-base" style={{ fontFamily: AlmaraiFonts.bold }}>
                  {locale === "ar" ? "تفاصيل السيارة" : "Car Details"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CarDetailsModal;

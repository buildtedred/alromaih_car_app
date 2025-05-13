"use client";

import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useLocale } from "../contexts/LocaleContext";

import AppHeader from "../components/common/AppHeader";
import CarSelectionModal from "../components/car-selection/CarSelectionModal";

import CashIcon from "../assets/icons/cash.svg";
import FinanceIcon from "../assets/icons/finance.svg";
import CarDiscoverSvg from "../assets/images/cardescover.svg";
import AlmaraiFonts from "../constants/fonts";

const { width } = Dimensions.get("window");

export default function CarDiscoverScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { locale } = useLocale();

  const [loading, setLoading] = useState(true);
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const closeSelectionModal = () => {
    setSelectionModalVisible(false);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white">
        <AppHeader />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#46194F" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <AppHeader />

      <ScrollView showsVerticalScrollIndicator={false} className="pb-5">
        <View className="items-center justify-center mt-12 mb-6">
          <CarDiscoverSvg width={width * 0.85} height={width * 0.85} />
        </View>

        <View className="px-4 mt-8 mb-4">
          <Text
            style={{
              fontSize: 20,
              color: "#46194F",
              textAlign: "center",
              marginBottom: 6,
              width: "100%",
              lineHeight: 28,
              fontFamily: AlmaraiFonts.bold,
            }}
          >
            {locale === "ar"
              ? "اعثر على سيارتك المثالية\nبخطوات بسيطة"
              : "Find your ideal car\nin simple steps"}
          </Text>

          <View className="mt-3">
            <Text
              style={{
                fontSize: 16,
                color: "#46194F",
                textAlign: "center",
                marginBottom: 4,
                fontFamily: AlmaraiFonts.bold,
              }}
            >
              {locale === "ar" ? "اختر طريقة الدفع" : "Choose Payment Method"}
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#46194F",
                textAlign: "center",
                marginBottom: 12,
                lineHeight: 20,
                width: "80%",
                alignSelf: "center",
                fontFamily: AlmaraiFonts.regular,
              }}
            >
              {locale === "ar"
                ? "اختر الطريقة التي تناسبك لامتلاك سيارتك الجديدة التمويل المرن أو الدفع النقدي المباشر"
                : "Choose the method that suits you to own your new car, either through flexible financing or direct cash payment"}
            </Text>

            <View className="flex-row justify-center mb-32 mt-4">
              {/* Cash Button */}
              <TouchableOpacity
                className={`rounded-[5px] py-2 px-4 mx-2 min-w-[170px] bg-white ${
                  activeButton === "cash" ? "border-2 border-[#46194F]" : ""
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                onPress={() => {
                  setModalType("cash");
                  setActiveButton("cash");
                  setSelectionModalVisible(true);
                }}
              >
                <View className="flex-row items-center justify-start gap-2">
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#46194F",
                      fontFamily: AlmaraiFonts.bold,
                    }}
                  >
                    {locale === "ar" ? "كاش" : "Cash"}
                  </Text>
                  <View className="bg-white w-10 h-10 rounded-md justify-center items-center">
                    <CashIcon width={32} height={32} />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Finance Button */}
              <TouchableOpacity
                className={`rounded-[5px] py-2 px-4 mx-2 min-w-[170px] bg-white ${
                  activeButton === "finance"
                    ? "border-2 border-[#46194F]"
                    : ""
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                onPress={() => {
                  setModalType("finance");
                  setActiveButton("finance");
                  setSelectionModalVisible(true);
                }}
              >
                <View className="flex-row items-center justify-start gap-2">
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#46194F",
                      fontFamily: AlmaraiFonts.bold,
                    }}
                  >
                    {locale === "ar" ? "تمويل" : "Finance"}
                  </Text>
                  <View className="bg-[#46194F] w-10 h-10 rounded-md justify-center items-center">
                    <FinanceIcon width={32} height={32} fill="#FFFFFF" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Car Selection Modal */}
      <CarSelectionModal
        isVisible={isSelectionModalVisible}
        onClose={closeSelectionModal}
        paymentType={modalType}
        locale={locale}
        navigation={navigation}
      />
    </View>
  );
}

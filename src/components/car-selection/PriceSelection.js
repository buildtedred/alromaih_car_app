"use client";

import { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { carDataService } from "../../services/carDataService";
import AlmaraiFonts from "../../constants/fonts";

import Bank1 from "../../assets/banks/bank1.svg";
import Bank2 from "../../assets/banks/bank2.svg";
import Bank3 from "../../assets/banks/bank3.svg";
import Bank4 from "../../assets/banks/bank4.svg";
import Bank5 from "../../assets/banks/bank5.svg";
import Bank6 from "../../assets/banks/bank6.svg";
import Bank7 from "../../assets/banks/bank7.svg";
import Bank8 from "../../assets/banks/bank8.svg";

const bankLogos = {
  1: Bank1,
  2: Bank2,
  3: Bank3,
  4: Bank4,
  5: Bank5,
  6: Bank6,
  7: Bank7,
  8: Bank8,
};

const PriceSelection = ({
  selectedPrice,
  onSelectPrice,
  selectedBrand,
  selectedModel,
  selectedCategory,
  selectedYear,
  onFinish,
  locale,
}) => {
  const [priceRanges, setPriceRanges] = useState([]);
  const [matchingCars, setMatchingCars] = useState([]);

  useEffect(() => {
    setPriceRanges(carDataService.getPriceRanges(locale));

    if (selectedBrand && selectedModel && selectedCategory && selectedYear) {
      try {
        const filteredCars = carDataService.filterCars({
          brand: selectedBrand.key,
          model: selectedModel.key,
          bodyType: selectedCategory.key,
          year: selectedYear,
        });
        setMatchingCars(filteredCars || []);
      } catch (error) {
        console.error("Error filtering cars:", error);
        setMatchingCars([]);
      }
    }
  }, [selectedBrand, selectedModel, selectedCategory, selectedYear, locale]);

  const getSelectedCar = () => {
    if (!selectedPrice || matchingCars.length === 0) return null;
    return matchingCars[0];
  };

  const selectedCar = getSelectedCar();

  const handlePriceAndFinish = (price) => {
    onSelectPrice(price);
    if (onFinish) onFinish();
  };

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-start mb-4">
        {priceRanges.map((price) => {
          const isSelected = selectedPrice?.id === price.id;
          const BankLogo = bankLogos[price.id];

          return (
            <TouchableOpacity
              key={String(price.id)}
              className={`m-2 p-2 rounded-[10px] items-center justify-center w-[28%] min-h-[70px] ${
                isSelected
                  ? "border-2 border-[#46194F]"
                  : "border border-gray-200"
              }`}
              onPress={() => handlePriceAndFinish(price)}
            >
              {BankLogo ? (
                <BankLogo width={50} height={30} />
              ) : (
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: "center",
                    color: "#333",
                    fontFamily: isSelected
                      ? AlmaraiFonts.bold
                      : AlmaraiFonts.regular,
                  }}
                >
                  {price.label || ""}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedPrice && selectedCar && (
        <View className="items-center mt-4">
          <Image
            source={selectedCar.image}
            style={{
              width: 200,
              height: 120,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: 16,
              marginTop: 8,
              color: "#46194F",
              fontFamily: AlmaraiFonts.bold,
            }}
          >
            {selectedCar.name?.[locale] || ""}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666",
              fontFamily: AlmaraiFonts.regular,
            }}
          >
            {String(selectedCar.specs?.year)} • {selectedCar.specs?.seats?.[locale] || ""}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 4,
              color: "#46194F",
              fontFamily: AlmaraiFonts.bold,
            }}
          >
            {selectedCar.cashPrice?.toLocaleString() || "0"} SAR
          </Text>

          <TouchableOpacity
            className="bg-[#46194F] rounded-lg py-2.5 px-6 items-center mt-6"
            onPress={onFinish}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontFamily: AlmaraiFonts.bold,
              }}
            >
              {locale === "ar" ? "اختيار السيارة" : "Select Car"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PriceSelection;

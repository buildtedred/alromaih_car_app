"use client";

import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { carDataService } from "../../services/carDataService";
import AlmaraiFonts from "../../constants/fonts";

const BrandSelection = ({ selectedBrand, onSelectBrand, locale }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    try {
      const brandsData = carDataService.getBrands(locale);
      setBrands(brandsData || []);
    } catch (error) {
      console.error("Error loading brands:", error);
      setBrands([]);
    }
  }, [locale]);

  const handleSelectBrand = (brand) => {
    try {
      onSelectBrand(brand);
    } catch (error) {
      console.error("Error selecting brand:", error);
    }
  };

  if (!brands || brands.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text
          style={{
            fontSize: 14,
            fontFamily: AlmaraiFonts.regular,
            color: "#666",
          }}
        >
          {locale === "ar" ? "لا توجد علامات متاحة" : "No brands available"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-center">
        {brands.map((brand) => {
          if (!brand || !brand.key) return null;

          const BrandLogo = brand.logo;
          const brandName = brand.name || "";
          const isSelected = selectedBrand?.key === brand.key;

          return (
            <TouchableOpacity
              key={brand.key}
              className={`m-2 p-2 rounded-[10px] items-center justify-center w-[28%] min-h-[70px] ${
                isSelected
                  ? "border-2 border-[#46194F]"
                  : "border border-gray-200"
              }`}
              onPress={() => handleSelectBrand(brand)}
            >
              {BrandLogo && (
                <BrandLogo width={35} height={35} style={{ marginBottom: 4 }} />
              )}
              <Text
                style={{
                  fontSize: 13,
                  textAlign: "center",
                  color: "#333",
                  textTransform: "capitalize",
                  fontFamily: isSelected
                    ? AlmaraiFonts.bold
                    : AlmaraiFonts.regular,
                }}
              >
                {brandName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BrandSelection;

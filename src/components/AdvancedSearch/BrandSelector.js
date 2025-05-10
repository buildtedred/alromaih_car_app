"use client";

import { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocale } from "../../contexts/LocaleContext";
import { getBrands, brandLogos } from "../../mock-data";
import AlmaraiFonts from "../../constants/fonts";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function BrandSelector({
  selected,
  setSelected,
  showIcon = true,
  showText = true,
  showTitle = true,
  textClass = "",
  isRTL = false,
  titlePadding = "px-1",
  layout = "scroll", // NEW: default layout is scroll
}) {
  const { locale } = useLocale();
  const allBrands = isRTL ? [...getBrands(locale)].reverse() : getBrands(locale);
  const scrollViewRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleContentSizeChange = (width) => {
    setContentWidth(width);
  };

  useEffect(() => {
    if (isRTL && scrollViewRef.current && contentWidth > 0) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [isRTL, contentWidth, locale]);

  const displayedBrands =
    layout === "grid" && !showAll ? allBrands.slice(0, 11) : allBrands;

  const renderBrand = (brand) => {
    const isSelected = selected === brand.key;
    const LogoComponent = brandLogos[brand.key];

    return (
      <TouchableOpacity
        key={brand.key}
        onPress={() => setSelected(isSelected ? null : brand.key)}
        activeOpacity={0.85}
        style={{
          margin: layout === "grid" ? 4 : isRTL ? 0 : 12,
          marginLeft: layout === "grid" ? 4 : isRTL ? 12 : 0,
          paddingHorizontal: layout === "grid" ? 0 : 16,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: "#fff",
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? "#46194F" : "#D1D5DB",
          elevation: isSelected ? 3 : 1,
          alignItems: "center",
          justifyContent: "center",
          width: layout === "grid" ? "22%" : undefined,
          position: "relative",
        }}
      >
        {isSelected && (
          <View
            style={{
              position: "absolute",
              top: 4,
              right: isRTL ? "auto" : -4,
              left: isRTL ? -4 : "auto",
              zIndex: 10,
              backgroundColor: "white",
              borderRadius: 12,
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#D1D5DB",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1,
              elevation: 2,
            }}
          >
            <MaterialIcons name="close" size={14} color="#333" />
          </View>
        )}

        <View className="items-center">
          {showIcon && LogoComponent && (
            <LogoComponent width={40} height={30} style={{ marginBottom: 6 }} />
          )}
          {showText && (
            <Text
              style={{
                fontSize: 12,
                fontFamily: isSelected
                  ? AlmaraiFonts.bold
                  : AlmaraiFonts.regular,
                color: isSelected ? "#46194F" : "#4B5563",
                textAlign: "center",
              }}
            >
              {brand.name}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {showTitle && (
        <View className={`flex-row items-center justify-between ${titlePadding} mb-3`}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: AlmaraiFonts.bold,
              color: "#46194F",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {locale === "ar" ? "موزع معتمد" : "Authorized Distributor"}
          </Text>
        </View>
      )}

      {layout === "scroll" ? (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          inverted={isRTL}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={handleContentSizeChange}
          contentContainerStyle={{
            paddingHorizontal: 8,
          }}
        >
          {allBrands.map(renderBrand)}
        </ScrollView>
      ) : (
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {displayedBrands.map(renderBrand)}

          {!showAll && (
            <TouchableOpacity
              onPress={() => setShowAll(true)}
              style={{
                flexBasis: "22%",
                margin: 4,
                paddingVertical: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#D1D5DB",
                backgroundColor: "#f3f4f6",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: AlmaraiFonts.bold,
                  fontSize: 12,
                  color: "#46194F",
                }}
              >
                {locale === "ar" ? "المـزيـد" : "More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

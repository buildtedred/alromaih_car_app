"use client"

import { useRef, useEffect, useState } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useLocale } from "../../contexts/LocaleContext"
import { getBrands, brandLogos } from "../../mock-data"
import AlmaraiFonts from "../../constants/fonts"

export default function BrandSelector({
  selected,
  setSelected,
  showIcon = true,
  showText = true,
  showTitle = true,
  textClass = "",
  isRTL = false,
}) {
  const { locale } = useLocale()
  const allBrands = isRTL ? [...getBrands(locale)].reverse() : getBrands(locale)
  const scrollViewRef = useRef(null)
  const [contentWidth, setContentWidth] = useState(0)

  // Effect to scroll to the end when RTL and component mounts or language changes
  useEffect(() => {
    if (isRTL && scrollViewRef.current && contentWidth > 0) {
      // Small delay to ensure the ScrollView has rendered properly
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: false })
      }, 100)
    }
  }, [isRTL, contentWidth, locale])

  // Handle content size change to get the width
  const handleContentSizeChange = (width) => {
    setContentWidth(width)
  }

  return (
    <View className="">
      {/* 🔹 Title: Authorized Distributor */}
      {showTitle && (
        <View className="flex-row items-center justify-between px-6 mb-3">
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

      {/* 🔸 Brand Scroll List */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        inverted={isRTL}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(width) => handleContentSizeChange(width)}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
      >
        {allBrands.map((brand) => {
          const isSelected = selected === brand.key
          const LogoComponent = brandLogos[brand.key]

          return (
            <TouchableOpacity
              key={brand.key}
              onPress={() => setSelected(isSelected ? null : brand.key)}
              activeOpacity={0.85}
              style={{
                marginRight: isRTL ? 0 : 12,
                marginLeft: isRTL ? 12 : 0,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: isSelected ? "#46194F" : "#D1D5DB",
                elevation: isSelected ? 3 : 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View className="items-center">
                {showIcon && LogoComponent && <LogoComponent width={40} height={30} style={{ marginBottom: 6 }} />}
                {showText && (
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                      color: isSelected ? "#46194F" : "#4B5563",
                      textAlign: "center",
                    }}
                  >
                    {brand.name}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

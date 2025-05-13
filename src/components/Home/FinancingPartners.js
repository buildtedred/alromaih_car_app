"use client"
import { useState, useEffect, useMemo } from "react"
import { View, Text, FlatList, Dimensions } from "react-native"
import { useLocale } from "../../contexts/LocaleContext"
import NCBLogo from "../../assets/banks/ncb_logo.svg"
import AlmaraiFonts from "../../constants/fonts"

const financingPartners = [
  { id: "1", subtext: "شركاؤنا" },
  { id: "2", subtext: "شركاؤنا" },
  { id: "3", subtext: "شركاؤنا" },
  { id: "4", subtext: "شركاؤنا" },
  { id: "5", subtext: "شركاؤنا" },
]

export default function FinancingPartners({ isRTL, sizeClass: propSizeClass }) {
  const { locale } = useLocale()
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)

    return () => subscription.remove()
  }, [])

  // Determine size class based on screen width if not provided by parent
  const sizeClass = useMemo(() => {
    if (propSizeClass) return propSizeClass
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth, propSizeClass])

  // Get responsive values based on size class
  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          titleSize: 13,
          subtitleSize: 12,
          subtextSize: 10, // Reduced text size
          cardWidth: 100, // Reduced from 120
          cardHeight: 65, // Reduced from 75
          logoWidth: 70, // Reduced from 80
          logoHeight: 40, // Reduced from 48
          itemMargin: 6, // Reduced from 12
        }
      case "medium":
        return {
          titleSize: 14,
          subtitleSize: 13,
          subtextSize: 11, // Reduced text size
          cardWidth: 110, // Reduced from 130
          cardHeight: 70, // Reduced from 82
          logoWidth: 80, // Reduced from 90
          logoHeight: 45, // Reduced from 54
          itemMargin: 8, // Reduced from 16
        }
      default: // large
        return {
          titleSize: 15,
          subtitleSize: 14,
          subtextSize: 12, // Reduced text size
          cardWidth: 120, // Reduced from 140
          cardHeight: 75, // Reduced from 90
          logoWidth: 90, // Reduced from 100
          logoHeight: 50, // Reduced from 60
          itemMargin: 10, // Reduced from 16
        }
    }
  }, [sizeClass])

  // Determine spacing classes based on size class
  const spacingClasses = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          sectionSpacing: "mb-1.5",
          containerPadding: "px-3 py-1.5",
          headerPadding: "px-3",
        }
      case "medium":
        return {
          sectionSpacing: "mb-2",
          containerPadding: "px-4 py-2",
          headerPadding: "px-4",
        }
      default: // large
        return {
          sectionSpacing: "mb-2.5",
          containerPadding: "px-5 py-2.5",
          headerPadding: "px-5",
        }
    }
  }, [sizeClass])

  const ItemSeparatorComponent = () => <View style={{ width: sizes.itemMargin }} />

  const renderItem = ({ item }) => (
    <View
      className="bg-white rounded-xl items-center justify-center border border-gray-200 shadow-sm"
      style={{
        height: sizes.cardHeight,
        width: sizes.cardWidth,
      }}
    >
      <NCBLogo width={sizes.logoWidth} height={sizes.logoHeight} className="mb-0.5" />
      <Text
        className="text-gray-500 text-center"
        style={{
          fontSize: sizes.subtextSize,
          fontFamily: AlmaraiFonts.regular,
        }}
      >
        {item.subtext}
      </Text>
    </View>
  )

  const data = isRTL ? [...financingPartners].reverse() : financingPartners

  return (
    <View className="bg-white mt-2">
      <View className={spacingClasses.headerPadding}>
        <Text
          className="text-[#46194F] text-center"
          style={{
            fontSize: sizes.titleSize,
            fontFamily: AlmaraiFonts.bold,
            marginBottom: sizeClass === "small" ? 2 : sizeClass === "medium" ? 2 : 4,
          }}
        >
          {locale === "ar" ? "شركاء التمويل" : "Financing Partners"}
        </Text>

        <Text
          className="text-gray-600 text-center"
          style={{
            fontSize: sizes.subtitleSize,
            fontFamily: AlmaraiFonts.regular,
            marginBottom: sizeClass === "small" ? 2 : sizeClass === "medium" ? 2 : 4,
          }}
        >
          {locale === "ar"
            ? "نتعاون مع أفضل البنوك وشركات التمويل في المملكة"
            : "We cooperate with the best banks and financing companies in the Kingdom"}
        </Text>
      </View>

      <FlatList
        horizontal
        inverted={isRTL}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: sizeClass === "small" ? 12 : sizeClass === "medium" ? 8 : 10,
          paddingVertical: sizeClass === "small" ? 8 : sizeClass === "medium" ? 12 : 16,
        }}
        snapToInterval={sizes.cardWidth + sizes.itemMargin}
        decelerationRate="fast"
      />
    </View>
  )
}

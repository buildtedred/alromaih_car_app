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

  // Get responsive values based on size class - REDUCED HEIGHT ONLY
  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          titleSize: 13,
          subtitleSize: 12,
          subtextSize: 10,
          cardWidth: 100, // Original width
          cardHeight: 50, // Reduced height (was 65)
          logoWidth: 70, // Original width
          logoHeight: 30, // Reduced height (was 40)
          itemMargin: 6,
        }
      case "medium":
        return {
          titleSize: 14,
          subtitleSize: 13,
          subtextSize: 11,
          cardWidth: 110, // Original width
          cardHeight: 55, // Reduced height (was 70)
          logoWidth: 80, // Original width
          logoHeight: 35, // Reduced height (was 45)
          itemMargin: 8,
        }
      default: // large
        return {
          titleSize: 15,
          subtitleSize: 14,
          subtextSize: 12,
          cardWidth: 120, // Original width
          cardHeight: 60, // Reduced height (was 75)
          logoWidth: 90, // Original width
          logoHeight: 40, // Reduced height (was 50)
          itemMargin: 10,
        }
    }
  }, [sizeClass])

  // Determine spacing classes based on size class - REDUCED SPACING
  const spacingClasses = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          sectionSpacing: "mb-1",
          containerPadding: "px-2 py-1",
          headerPadding: "px-2",
        }
      case "medium":
        return {
          sectionSpacing: "mb-1.5",
          containerPadding: "px-3 py-1.5",
          headerPadding: "px-3",
        }
      default: // large
        return {
          sectionSpacing: "mb-2",
          containerPadding: "px-4 py-2",
          headerPadding: "px-4",
        }
    }
  }, [sizeClass])

  const ItemSeparatorComponent = () => <View style={{ width: sizes.itemMargin }} />

  const renderItem = ({ item }) => (
    <View
      className="bg-white rounded-xl items-center justify-center mb-4 border border-gray-200 shadow-sm"
      style={{
        height: sizes.cardHeight,
        width: sizes.cardWidth,
      }}
    >
      <NCBLogo width={sizes.logoWidth} height={sizes.logoHeight} className="mb-0" />
      <Text
        className="text-gray-500 text-center mt-0.5"
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
    <View className="bg-white mt-1.5">
      <View className={spacingClasses.headerPadding}>
        <Text
          className="text-[#46194F] text-center"
          style={{
            fontSize: sizes.titleSize,
            fontFamily: AlmaraiFonts.bold,
            marginBottom: sizeClass === "small" ? 1 : sizeClass === "medium" ? 1.5 : 2,
          }}
        >
          {locale === "ar" ? "شركاء التمويل" : "Financing Partners"}
        </Text>

        <Text
          className="text-gray-600 text-center"
          style={{
            fontSize: sizes.subtitleSize,
            fontFamily: AlmaraiFonts.regular,
            marginBottom: sizeClass === "small" ? 1 : sizeClass === "medium" ? 1.5 : 2,
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
          paddingHorizontal: sizeClass === "small" ? 8 : sizeClass === "medium" ? 10 : sizeClass === "large" ? 12 : 12,
          paddingVertical: sizeClass === "small" ? 6 : sizeClass === "medium" ? 8 : sizeClass === "large" ? 10 : 10,
        }}
        snapToInterval={sizes.cardWidth + sizes.itemMargin}
        decelerationRate="fast"
      />
    </View>
  )
}

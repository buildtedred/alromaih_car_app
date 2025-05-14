"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native"
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
  titlePadding = "px-1",
  layout = "scroll",
  sizeClass: propSizeClass,
}) {
  const { locale } = useLocale()
  const allBrands = isRTL ? [...getBrands(locale)].reverse() : getBrands(locale)
  const scrollViewRef = useRef(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)

    return () => subscription.remove()
  }, [])

  const sizeClass = useMemo(() => {
    if (propSizeClass) return propSizeClass
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth, propSizeClass])

  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          logoSize: { width: 30, height: 22 },
          titleSize: 13,
          textSize: 10,
          iconSize: 12,
          itemMargin: 4,
          itemPadding: 8,
          gridItemWidth: "30%",
          closeButtonSize: 16,
          closeIconSize: 12,
          titlePaddingClass: "px-4 mb-0.5",
        }
      case "medium":
        return {
          logoSize: { width: 35, height: 26 },
          titleSize: 14,
          textSize: 11,
          iconSize: 13,
          itemMargin: 4,
          itemPadding: 12,
          gridItemWidth: "22%",
          closeButtonSize: 18,
          closeIconSize: 13,
          titlePaddingClass: "px-4 mb-1",
        }
      default:
        return {
          logoSize: { width: 40, height: 30 },
          titleSize: 15,
          textSize: 12,
          iconSize: 14,
          itemMargin: 8,
          itemPadding: 16,
          gridItemWidth: "22%",
          closeButtonSize: 20,
          closeIconSize: 14,
          titlePaddingClass: "px-4 mb-1",
        }
    }
  }, [sizeClass])

  const handleContentSizeChange = (width) => {
    setContentWidth(width)
  }

  useEffect(() => {
    if (isRTL && scrollViewRef.current && contentWidth > 0) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: false })
      }, 100)
    }
  }, [isRTL, contentWidth, locale])

  const displayedBrands = layout === "grid" && !showAll ? allBrands.slice(0, 11) : allBrands

  const renderBrand = (brand) => {
    const isSelected = selected === brand.key
    const LogoComponent = brandLogos[brand.key]

    return (
      <TouchableOpacity
        key={brand.key}
        onPress={() => setSelected(isSelected ? null : brand.key)}
        activeOpacity={0.85}
        style={{
          margin: layout === "grid" ? sizes.itemMargin : isRTL ? 0 : sizes.itemMargin * 1.5,
          marginLeft: layout === "grid" ? sizes.itemMargin / 2 : isRTL ? sizes.itemMargin * 1.5 : 0,
          paddingHorizontal: layout === "grid" ? 0 : sizes.itemPadding,
          paddingVertical: layout === "grid" ? sizes.itemPadding / 2 : 0,
          borderRadius: 10,
          backgroundColor: "#fff",
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? "#46194F" : "#D1D5DB",
          elevation: isSelected ? 3 : 1,
          alignItems: "center",
          justifyContent: "center",
          width: layout === "grid" ? sizes.gridItemWidth : undefined,
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
              width: sizes.closeButtonSize,
              height: sizes.closeButtonSize,
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
            <Text
              style={{
                fontSize: sizes.closeIconSize,
                color: "#333",
                fontFamily: AlmaraiFonts.bold,
                marginTop: -1,
                lineHeight: sizes.closeIconSize + 2,
              }}
            >
              ×
            </Text>
          </View>
        )}

        <View className="items-center">
          {showIcon && LogoComponent && (
            <LogoComponent width={sizes.logoSize.width} height={sizes.logoSize.height} style={{ marginBottom: 0 }} />
          )}
          {showText && (
            <Text
              style={{
                fontSize: sizes.textSize,
                fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                color: isSelected ? "#46194F" : "#4B5563",
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              {brand.name}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      {showTitle && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Text
            style={{
              fontSize: sizes.titleSize,
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
            paddingLeft: isRTL ? 8 : sizes.itemMargin,
            paddingRight: isRTL ? sizes.itemMargin : 8,
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
                flexBasis: sizes.gridItemWidth,
                margin: sizes.itemMargin,
                paddingVertical: sizes.itemPadding / 2,
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
                  fontSize: sizes.textSize,
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
  )
}

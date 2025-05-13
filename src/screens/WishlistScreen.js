"use client"

import { useState, useEffect, useMemo } from "react"
import { View, FlatList, Dimensions, TouchableOpacity, Text, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../contexts/LocaleContext"
import { useWishlist } from "../contexts/WishlistContext"
import AppText from "../components/common/AppText"
import WishlistCard from "../components/cars/WishlistCard"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AlmaraiFonts from "../constants/fonts"

export default function WishlistScreen() {
  const navigation = useNavigation()
  const { locale, direction } = useLocale()
  const { wishlist } = useWishlist()
  const isRTL = direction === "rtl"
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)
    return () => subscription.remove()
  }, [])

  // Hide status bar when component mounts
  useEffect(() => {
    StatusBar.setHidden(true)

    // Show status bar again when component unmounts
    return () => {
      StatusBar.setHidden(false)
    }
  }, [])

  const sizeClass = useMemo(() => {
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth])

  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          titleSize: 16,
          subtitleSize: 12,
          emptyTextSize: 14,
          iconSize: 50,
          buttonTextSize: 14,
          containerPadding: "px-2 py-2",
          headerTitleSize: 18,
          backIconSize: 22,
        }
      case "medium":
        return {
          titleSize: 18,
          subtitleSize: 14,
          emptyTextSize: 16,
          iconSize: 60,
          buttonTextSize: 16,
          containerPadding: "px-3 py-3",
          headerTitleSize: 20,
          backIconSize: 24,
        }
      default:
        return {
          titleSize: 20,
          subtitleSize: 16,
          emptyTextSize: 18,
          iconSize: 70,
          buttonTextSize: 18,
          containerPadding: "px-4 py-4",
          headerTitleSize: 22,
          backIconSize: 26,
        }
    }
  }, [sizeClass])

  const renderEmptyList = () => (
    <View className="flex-1 items-center justify-center py-10">
      <Icon name="heart-off-outline" size={sizes.iconSize} color="#46194F" />
      <AppText
        style={{
          fontSize: sizes.emptyTextSize,
          color: "#46194F",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        {locale === "ar" ? "لا توجد سيارات في المفضلة" : "No cars in your wishlist"}
      </AppText>
      <TouchableOpacity className="bg-[#46194F] rounded-lg py-2 px-4" onPress={() => navigation.navigate("HomeTab")}>
        <AppText
          style={{
            fontSize: sizes.buttonTextSize,
            color: "white",
          }}
        >
          {locale === "ar" ? "استكشف السيارات" : "Explore Cars"}
        </AppText>
      </TouchableOpacity>
    </View>
  )

  return (
    <View className="flex-1 bg-white">
      {/* Hide the status bar */}
      <StatusBar hidden />

      {/* Custom header with back button */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-8 h-8 rounded-full border border-gray-300 items-center justify-center"
        >
          <Icon name={isRTL ? "chevron-right" : "chevron-left"} size={sizes.backIconSize} color="#46194F" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: sizes.headerTitleSize,
            fontFamily: AlmaraiFonts.bold,
            color: "#46194F",
            textAlign: "center",
          }}
        >
          {locale === "ar" ? "قائمة الرغبات" : "Wishlist"}
        </Text>

        <View style={{ width: 32 }} />
      </View>

      <View className={`${sizes.containerPadding}`}>
        <AppText
          style={{
            fontSize: sizes.subtitleSize,
            color: "#666",
            marginBottom: 10,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {locale === "ar" ? `${wishlist.length} سيارات في المفضلة` : `${wishlist.length} cars in your wishlist`}
        </AppText>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingBottom: 8, alignItems: "center" }}>
            <WishlistCard car={item} />
          </View>
        )}
        numColumns={1}
        contentContainerStyle={{
          paddingBottom: 100,
          flexGrow: wishlist.length === 0 ? 1 : undefined,
        }}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

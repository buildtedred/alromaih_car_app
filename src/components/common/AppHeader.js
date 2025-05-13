"use client"
import { View, TouchableOpacity, Text, Dimensions } from "react-native"
import { useLocale } from "../../contexts/LocaleContext"
import { useNavigation } from "@react-navigation/native"
import { useWishlist } from "../../contexts/WishlistContext"
import BellIcon from "../../assets/Icon/BellIcon1.svg"
import FavoriteIcon from "../../assets/Icon/FavoriteIcon.svg"
import SearchIcon1 from "../../assets/Icon/SearchIcon1.svg"
import UserIcon from "../../assets/Icon/UserIcon.svg"
import LogoSvg from "../../assets/Icon/logo.svg"
import { useState, useEffect, useMemo } from "react"

export default function AppHeader() {
  const { locale, toggleLocale } = useLocale()
  const navigation = useNavigation()
  const { wishlist } = useWishlist()
  const [favoriteCount, setFavoriteCount] = useState(0) // Will be updated from wishlist
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  // Update favorite count when wishlist changes
  useEffect(() => {
    setFavoriteCount(wishlist.length)
  }, [wishlist])

  // Listen for dimension changes
  useEffect(() => {
    const dimensionsHandler = ({ window }) => {
      setScreenWidth(window.width)
    }

    const subscription = Dimensions.addEventListener("change", dimensionsHandler)

    return () => subscription.remove()
  }, [])

  // Determine size class based on screen width
  const sizeClass = useMemo(() => {
    if (screenWidth < 360) return "small"
    if (screenWidth < 480) return "medium"
    return "large"
  }, [screenWidth])

  // Get responsive values based on size class
  const sizes = useMemo(() => {
    switch (sizeClass) {
      case "small":
        return {
          logoWidth: 100,
          logoHeight: 30,
          iconSize: 18,
          userIconSize: 22,
          badgeSize: 12,
          containerPadding: "px-2 pt-4 pb-4",
          iconSpacing: "mx-1",
          iconContainer: "w-5 h-5",
          userIconContainer: "w-8 h-8",
          badgeClasses: "w-2.5 h-2.5 -top-0.5 -left-1.5",
          badgeText: "text-[7px]",
        }
      case "medium":
        return {
          logoWidth: 120,
          logoHeight: 35,
          iconSize: 20,
          userIconSize: 26,
          badgeSize: 15,
          containerPadding: "px-3 pt-5 pb-5",
          iconSpacing: "mx-1.5",
          iconContainer: "w-6 h-6",
          userIconContainer: "w-10 h-10",
          badgeClasses: "w-3 h-3 -top-1 -left-2",
          badgeText: "text-[8px]",
        }
      default: // large
        return {
          logoWidth: 140,
          logoHeight: 45,
          iconSize: 24,
          userIconSize: 30,
          badgeSize: 18,
          containerPadding: "px-4 pt-6 pb-6",
          iconSpacing: "mx-2",
          iconContainer: "w-8 h-8",
          userIconContainer: "w-12 h-12",
          badgeClasses: "w-4 h-4 -top-1.5 -left-2.5",
          badgeText: "text-[10px]",
        }
    }
  }, [sizeClass])

  const handleUserIconPress = () => {
    toggleLocale()
  }

  const navigateToWishlist = () => {
    navigation.navigate("Wishlist")
  }

  return (
    <View className={`bg-white shadow-md rounded-b-2xl ${sizes.containerPadding}`}>
      {/* Header row: logo and icons */}
      <View className="flex-row items-center justify-between">
        {/* Logo on the left */}
        <View className="flex-1 max-w-[50%] justify-center">
          <LogoSvg width={sizes.logoWidth} height={sizes.logoHeight} />
        </View>

        {/* Icons container on the right */}
        <View className="flex-row items-center">
          <TouchableOpacity
            className={`${sizes.iconContainer} rounded-full justify-center items-center ${sizes.iconSpacing}`}
            onPress={() => navigation.navigate("Search")}
          >
            <SearchIcon1 width={sizes.iconSize} height={sizes.iconSize} />
          </TouchableOpacity>

          <TouchableOpacity
            className={`${sizes.iconContainer} rounded-full justify-center items-center ${sizes.iconSpacing}`}
            onPress={() => navigation.navigate("Notifications")}
          >
            <BellIcon width={sizes.iconSize} height={sizes.iconSize} />
          </TouchableOpacity>

          {/* Favorite icon with badge */}
          <TouchableOpacity
            className={`${sizes.iconContainer} rounded-full justify-center items-center ${sizes.iconSpacing} relative`}
            onPress={navigateToWishlist}
          >
            <FavoriteIcon width={sizes.iconSize} height={sizes.iconSize} />

            {/* Badge showing favorite count */}
            {favoriteCount > 0 && (
              <View
                className={`absolute bg-[#46194F] rounded-full flex items-center justify-center ${sizes.badgeClasses}`}
              >
                <Text className={`text-white font-bold ${sizes.badgeText}`}>{favoriteCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Gap before user icon */}
          <View className="w-2" />

          {/* Larger user icon */}
          <TouchableOpacity
            className={`${sizes.userIconContainer} rounded-full justify-center items-center ml-1.5`}
            onPress={handleUserIconPress}
          >
            <UserIcon width={sizes.userIconSize} height={sizes.userIconSize} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

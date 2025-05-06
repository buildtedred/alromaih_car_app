"use client"
import { View, TouchableOpacity, Text } from "react-native"
import { useLocale } from "../../contexts/LocaleContext"
import { useNavigation } from "@react-navigation/native"
import BellIcon from "../../assets/Icon/BellIcon1.svg"
import FavoriteIcon from "../../assets/Icon/FavoriteIcon.svg"
import SearchIcon1 from "../../assets/Icon/SearchIcon1.svg"
import UserIcon from "../../assets/Icon/UserIcon.svg"
import LogoSvg from "../../assets/Icon/logo.svg"
import { useState } from "react"

export default function AppHeader() {
  const { locale, toggleLocale } = useLocale()
  const navigation = useNavigation()
  const [favoriteCount, setFavoriteCount] = useState(2) // Set a default value for demo

  const handleUserIconPress = () => {
    toggleLocale()
  }

  return (
    <View className="bg-white px-4 pt-6 pb-6 shadow-md rounded-b-2xl">
      {/* Header row: logo and icons */}
      <View className="flex-row items-center justify-between">
        {/* Logo on the left */}
        <View className="w-[140px] h-10 justify-center">
          <LogoSvg width={140} height={40} />
        </View>

        {/* Icons container on the right */}
        <View className="flex-row items-center">
          <TouchableOpacity
            className="w-9 h-9 rounded-full justify-center items-center mx-1.5"
            onPress={() => navigation.navigate("Search")}
          >
            <SearchIcon1 width={24} height={24} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-9 h-9 rounded-full justify-center items-center mx-1.5"
            onPress={() => navigation.navigate("Notifications")}
          >
            <BellIcon width={24} height={24} />
          </TouchableOpacity>

          {/* Favorite icon with badge */}
          <TouchableOpacity
            className="w-9 h-9 rounded-full justify-center items-center mx-1.5 relative"
            onPress={() => navigation.navigate("Favorites")}
          >
            <FavoriteIcon width={24} height={24} />

            {/* Badge showing favorite count */}
            {favoriteCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-[#46194F] rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white text-xs font-bold">{favoriteCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Gap before user icon */}
          <View className="w-2" />

          {/* Larger user icon */}
          <TouchableOpacity
            className="w-11 h-11 rounded-full justify-center items-center ml-1.5"
            onPress={handleUserIconPress}
          >
            <UserIcon width={28} height={28} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

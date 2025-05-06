"use client"
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../contexts/LocaleContext"
import AppHeader from "../components/common/AppHeader"
import Ionicons from "react-native-vector-icons/Ionicons"

// This would typically come from your API or state management
const getFavorites = () => {
  return [
    {
      id: 1,
      name: { en: "Toyota Camry 2023", ar: "تويوتا كامري 2023" },
      image: require("../assets/images/car1.jpg"),
      price: 120000,
      brand: "Toyota",
    },
    {
      id: 2,
      name: { en: "Honda Accord 2023", ar: "هوندا أكورد 2023" },
      image: require("../assets/images/car2.jpg"),
      price: 130000,
      brand: "Honda",
    },
  ]
}

export default function FavoritesScreen() {
  const { locale } = useLocale()
  const navigation = useNavigation()
  const [favorites, setFavorites] = useState([])
  const isRTL = locale === "ar"

  useEffect(() => {
    // Fetch favorites data
    const favoritesData = getFavorites()
    setFavorites(favoritesData)
  }, [])

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  const renderFavoriteItem = ({ item }) => (
    <View className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm">
      <View className="flex-row">
        <Image source={item.image} className="w-32 h-32" resizeMode="cover" />
        <View className="flex-1 p-4 justify-between">
          <View>
            <Text className="text-gray-500 text-sm">{item.brand}</Text>
            <Text className="text-lg font-semibold text-gray-800 mb-2">{item.name[locale]}</Text>
            <Text className="text-[#46194F] font-bold">{item.price.toLocaleString()} SAR</Text>
          </View>

          <View className={`flex-row items-center ${isRTL ? "justify-start" : "justify-end"}`}>
            <TouchableOpacity
              onPress={() => removeFavorite(item.id)}
              className="w-8 h-8 rounded-full bg-red-50 items-center justify-center mr-2"
            >
              <Ionicons name="heart" size={18} color="#FF3B30" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("CarDetailScreen", { carId: item.id })}
              className="flex-row items-center"
            >
              <Text className="text-[#46194F] font-medium mr-1">
                {locale === "ar" ? "عرض التفاصيل" : "View Details"}
              </Text>
              <Ionicons 
                name={isRTL ? "chevron-back" : "chevron-forward"} 
                size={16} 
                color="#46194F" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View className="flex-1 bg-gray-50">
      <AppHeader />

      <View className="px-4 pt-4 pb-20">
        <Text className="text-2xl font-bold text-gray-800 mb-6">{locale === "ar" ? "المفضلة" : "Favorites"}</Text>

        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="heart-outline" size={60} color="#CCCCCC" />
            <Text className="text-gray-400 text-lg mt-4 text-center">
              {locale === "ar" ? "لا توجد سيارات في المفضلة" : "No cars in favorites"}
            </Text>
            <TouchableOpacity
              className="mt-6 bg-[#46194F] px-6 py-3 rounded-full"
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text className="text-white font-medium">{locale === "ar" ? "استكشف السيارات" : "Explore Cars"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from "react-native"
import { useTranslation } from "react-i18next"
import { useNavigation, CommonActions } from "@react-navigation/native"
import { useRecentlyViewed } from "../../contexts/RecentlyViewedContext"
import PopularCarCard from "./PopularCarCard"

export default function PopularCars({ cars, isRTL }) {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const { addToRecentlyViewed } = useRecentlyViewed()

  const handleCarPress = (car) => {
    addToRecentlyViewed(car)
    const { brandLogo, image, ...safeCar } = car // remove non-serializable values

    // Use CommonActions to navigate to the root stack navigator's Gallery screen
    navigation.dispatch(
      CommonActions.navigate({
        name: "Gallery",
        params: { car: safeCar },
      }),
    )
  }

  const data = isRTL ? [...cars.slice(0, 6)].reverse() : cars.slice(0, 6)

  // Item separator component to create gap between cards
  const ItemSeparatorComponent = () => <View style={{ width: 16 }} />

  return (
    <View>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-xl font-bold text-gray-900">
          {t("home.popularCars", { defaultValue: "Popular Cars" })}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllCars")}>
          <Text className="text-sm font-medium text-[#46194F]">
            {t("common.view_all", { defaultValue: "View All" })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Car List */}
      <FlatList
        horizontal
        inverted={isRTL}
        data={data}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => <PopularCarCard car={item} onPress={() => handleCarPress(item)} />}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 8,
        }}
        snapToInterval={width * 0.65 + 16} // Updated to match the new card width (65%)
        decelerationRate="fast"
      />
    </View>
  )
}

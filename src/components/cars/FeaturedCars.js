import { View, Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import CarCard from "./CarCard"
import AlmaraiFonts from "../../constants/fonts"

const FeaturedCars = ({ cars, isRTL }) => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const data = isRTL ? [...cars.slice(0, 6)].reverse() : cars.slice(0, 6)

  return (
    <View>
      {/* Header Row */}
      <View className="flex-row justify-between items-center px-6 mb-3">
        <Text
          style={{
            fontSize: 15,
            fontFamily: AlmaraiFonts.bold,
            color: "#111827", // Tailwind's text-gray-900
          }}
        >
          {t("home.title", { defaultValue: "Featured Cars" })}
        </Text>
      </View>

      {/* Car List */}
      <FlatList
        horizontal
        inverted={isRTL}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 4 }}>
            <CarCard car={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
      />
    </View>
  )
}

export default FeaturedCars

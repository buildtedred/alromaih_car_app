"use client"
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../../contexts/LocaleContext"
import { useState, useEffect, useMemo } from "react"
import CompareVsIcon from "../../assets/Icon/campar_vs.svg"
import JetourLogo from "../../assets/brands/jetour_logo.svg"
import AlmaraiFonts from "../../constants/fonts"

const carComparisons = [
  {
    id: "1",
    car1: {
      name: "T2",
      image: require("../../assets/images/cam_2.png"),
      year: "2023",
      description: "الكجري فل كامل",
    },
    car2: {
      name: "T1",
      image: require("../../assets/images/car5.png"),
      year: "2023",
      description: "الكجري فل كامل",
    },
  },
  {
    id: "2",
    car1: {
      name: "T2",
      image: require("../../assets/images/cam_2.png"),
      year: "2023",
      description: "الكجري فل كامل",
    },
    car2: {
      name: "T1",
      image: require("../../assets/images/car5.png"),
      year: "2023",
      description: "الكجري فل كامل",
    },
  },
  {
    id: "3",
    car1: {
      name: "T2",
      image: require("../../assets/images/cam_2.png"),
      year: "2023",
      description: "الكجري فل كامل",
    },
    car2: {
      name: "T1",
      image: require("../../assets/images/car5.png"),
      year: "2023",
      description: "الكجري فل كامل",
    },
  },
  {
    id: "4",
    car1: {
      name: "T2",
      image: require("../../assets/images/cam_2.png"),
      year: "2023",
      description: "الكجري فل كامل",
    },
    car2: {
      name: "T1",
      image: require("../../assets/images/car5.png"),
      year: "2023",
      description: "الكجري فل كامل",
    },
  },
]

export default function CarComparisonNew({ isRTL, sizeClass: propSizeClass }) {
  const { locale } = useLocale()
  const navigation = useNavigation()
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
          cardWidth: 180, // Match CarCard width
          vsIconSize: 24,
          logoWidth: 40,
          logoHeight: 12,
          carNameSize: 11,
          carDescSize: 9,
          imageHeight: 70,
          itemMargin: 2, // Reduced from 4
        }
      case "medium":
        return {
          titleSize: 14,
          cardWidth: 180, // Match CarCard width
          vsIconSize: 26,
          logoWidth: 45,
          logoHeight: 13,
          carNameSize: 12,
          carDescSize: 10,
          imageHeight: 80,
          itemMargin: 3, // Reduced from 5
        }
      default: // large
        return {
          titleSize: 15,
          cardWidth: 180, // Match CarCard width
          vsIconSize: 30,
          logoWidth: 50,
          logoHeight: 15,
          carNameSize: 13,
          carDescSize: 10,
          imageHeight: 90,
          itemMargin: 2, // Reduced from 6
        }
    }
  }, [sizeClass])

  const handleComparisonPress = (comparison) => {
    // navigation.navigate('ComparisonDetails', { comparisonId: comparison.id });
  }

  const renderVsIcon = () => {
    try {
      return <CompareVsIcon width={sizes.vsIconSize} height={sizes.vsIconSize} />
    } catch {
      return (
        <View
          className="bg-[#46194F] items-center justify-center rounded-full"
          style={{
            width: sizes.vsIconSize + 2,
            height: sizes.vsIconSize + 2,
          }}
        >
          <Text
            className="text-white"
            style={{
              fontSize: sizes.vsIconSize / 2.5,
              fontFamily: AlmaraiFonts.bold,
            }}
          >
            VS
          </Text>
        </View>
      )
    }
  }

  const renderJetourLogo = () => {
    try {
      return <JetourLogo width={sizes.logoWidth} height={sizes.logoHeight} />
    } catch {
      return (
        <Text
          className="text-[#46194F]"
          style={{
            fontSize: sizes.carNameSize - 2,
            fontFamily: AlmaraiFonts.bold,
          }}
        >
          JETOUR
        </Text>
      )
    }
  }

  // Item separator component for consistent spacing
  const ItemSeparatorComponent = () => <View style={{ width: sizes.itemMargin * 2 }} />

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleComparisonPress(item)}
      activeOpacity={0.9}
      className="bg-[#ede8ee] rounded-xl overflow-hidden shadow"
      style={{
        width: sizes.cardWidth,
        marginHorizontal: sizes.itemMargin,
        padding: sizeClass === "small" ? 8 : sizeClass === "medium" ? 10 : 12,
        paddingBottom: sizeClass === "small" ? 12 : sizeClass === "medium" ? 14 : 16,
      }}
    >
      {/* Images */}
      <View className="flex-row justify-between relative" style={{ height: sizes.imageHeight }}>
        <View
          className="absolute z-10"
          style={{
            left: -30,
            top: 0,
            width: sizes.cardWidth / 1.8,
            height: sizes.imageHeight,
          }}
        >
          <Image
            source={locale === "ar" ? item.car2.image : item.car1.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <View
          className="absolute z-10"
          style={{
            right: -30,
            top: 0,
            width: sizes.cardWidth / 1.8,
            height: sizes.imageHeight,
          }}
        >
          <Image
            source={locale === "ar" ? item.car1.image : item.car2.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* VS Icon */}
      <View className="items-center">{renderVsIcon()}</View>

      {/* Details */}
      <View className="flex-row justify-between px-0 mt-0.5">
        {/* Car 1 */}
        <View className="items-center w-[48%]">
          <View className="mb-1">{renderJetourLogo()}</View>
          <Text
            numberOfLines={1}
            className="text-center w-full text-[#46194F]"
            style={{
              fontSize: sizes.carNameSize,
              fontFamily: AlmaraiFonts.bold,
            }}
          >
            {locale === "ar" ? `جيتور ${item.car2.name}` : `Jetour ${item.car1.name}`}
          </Text>
          <Text
            numberOfLines={1}
            className="text-center w-full text-[#46194F]"
            style={{
              fontSize: sizes.carDescSize,
              fontFamily: AlmaraiFonts.regular,
            }}
          >
            {locale === "ar"
              ? `${item.car2.description} ${item.car2.year}`
              : `${item.car1.description} ${item.car1.year}`}
          </Text>
        </View>

        {/* Car 2 */}
        <View className="items-center w-[48%]">
          <View className="mb-1">{renderJetourLogo()}</View>
          <Text
            numberOfLines={1}
            className="text-center w-full text-[#46194F]"
            style={{
              fontSize: sizes.carNameSize,
              fontFamily: AlmaraiFonts.bold,
            }}
          >
            {locale === "ar" ? `جيتور ${item.car1.name}` : `Jetour ${item.car2.name}`}
          </Text>
          <Text
            numberOfLines={1}
            className="text-center w-full text-[#46194F]"
            style={{
              fontSize: sizes.carDescSize,
              fontFamily: AlmaraiFonts.regular,
            }}
          >
            {locale === "ar"
              ? `${item.car1.description} ${item.car1.year}`
              : `${item.car2.description} ${item.car2.year}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const data = isRTL ? [...carComparisons].reverse() : carComparisons

  return (
    <View className="my-1">
      <View className="flex-row justify-between items-center px-3 mb-1">
        <Text
          className="text-[#46194F]"
          style={{
            fontSize: sizes.titleSize,
            fontFamily: AlmaraiFonts.bold,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {locale === "ar" ? "قارن بين السيارات" : "Compare Cars"}
        </Text>
      </View>
      <FlatList
        horizontal
        inverted={isRTL}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 4,
          paddingRight: 4,
          paddingVertical: 2,
        }}
        snapToInterval={sizes.cardWidth + sizes.itemMargin * 4}
        decelerationRate="fast"
      />
    </View>
  )
}

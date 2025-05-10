"use client"
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useLocale } from "../../contexts/LocaleContext"
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

export default function CarComparisonNew({ isRTL }) {
  const { locale } = useLocale()
  const navigation = useNavigation()

  const handleComparisonPress = (comparison) => {
    // navigation.navigate('ComparisonDetails', { comparisonId: comparison.id });
  }

  const renderVsIcon = () => {
    try {
      return <CompareVsIcon width={30} height={30} />
    } catch {
      return (
        <View className="w-8 h-8 rounded-full bg-[#46194F] items-center justify-center">
          <Text style={{ fontSize: 12, color: "#fff", fontFamily: AlmaraiFonts.bold }}>VS</Text>
        </View>
      )
    }
  }

  const renderJetourLogo = () => {
    try {
      return <JetourLogo width={50} height={15} />
    } catch {
      return (
        <Text
          style={{
            fontSize: 11,
            fontFamily: AlmaraiFonts.bold,
            color: "#46194F",
          }}
        >
          JETOUR
        </Text>
      )
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleComparisonPress(item)}
      activeOpacity={0.9}
      className="bg-[#ede8ee] rounded-xl p-3 pb-4 shadow-sm"
      style={{
        width: 180,
        overflow: "hidden",
        marginHorizontal: 6,
      }}
    >
      {/* Images */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 90,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: -30,
            top: 0,
            width: 100,
            height: 90,
            zIndex: 1,
          }}
        >
          <Image
            source={locale === "ar" ? item.car2.image : item.car1.image}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>

        <View
          style={{
            position: "absolute",
            right: -30,
            top: 0,
            width: 100,
            height: 90,
            zIndex: 1,
          }}
        >
          <Image
            source={locale === "ar" ? item.car1.image : item.car2.image}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
      </View>

      {/* VS Icon */}
      <View className="items-center">{renderVsIcon()}</View>

      {/* Details */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 0,
          marginTop: 1,
        }}
      >
        {/* Car 1 */}
        <View style={{ alignItems: "center", width: "48%" }}>
          <View className="mb-1">{renderJetourLogo()}</View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontFamily: AlmaraiFonts.bold,
              color: "#46194F",
              textAlign: "center",
              width: "100%",
            }}
          >
            {locale === "ar" ? `جيتور ${item.car2.name}` : `Jetour ${item.car1.name}`}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              fontFamily: AlmaraiFonts.regular,
              color: "#46194F",
              textAlign: "center",
              width: "100%",
            }}
          >
            {locale === "ar"
              ? `${item.car2.description} ${item.car2.year}`
              : `${item.car1.description} ${item.car1.year}`}
          </Text>
        </View>

        {/* Car 2 */}
        <View style={{ alignItems: "center", width: "48%" }}>
          <View className="mb-1">{renderJetourLogo()}</View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontFamily: AlmaraiFonts.bold,
              color: "#46194F",
              textAlign: "center",
              width: "100%",
            }}
          >
            {locale === "ar" ? `جيتور ${item.car1.name}` : `Jetour ${item.car2.name}`}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              fontFamily: AlmaraiFonts.regular,
              color: "#46194F",
              textAlign: "center",
              width: "100%",
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
    <View className="my-4">
      <View className="flex-row justify-between items-center px-6 mb-3">
        <Text
          style={{
            fontSize: 15,
            fontFamily: AlmaraiFonts.bold,
            color: "#46194F",
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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  )
}

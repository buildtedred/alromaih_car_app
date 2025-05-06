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
]

export default function CarComparisonNew({ isRTL }) {
  const { locale } = useLocale()
  const navigation = useNavigation()

  const handleComparisonPress = (comparison) => {
    // navigation.navigate('ComparisonDetails', { comparisonId: comparison.id });
  }

  const renderVsIcon = () => {
    try {
      return <CompareVsIcon width={40} height={40} />
    } catch {
      return (
        <View className="w-10 h-10 rounded-full bg-[#46194F] items-center justify-center">
          <Text
            style={{
              fontSize: 13,
              color: "#fff",
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
      return <JetourLogo width={70} height={20} />
    } catch {
      return (
        <Text
          style={{
            fontSize: 13,
            fontFamily: AlmaraiFonts.bold,
            color: "#46194F",
          }}
        >
          JETOUR
        </Text>
      )
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleComparisonPress(item)}
        activeOpacity={0.9}
        className="bg-[#ede8ee] rounded-xl p-4 shadow-sm"
        style={{
          width: 280,
          overflow: "hidden",
          marginHorizontal: 10,
        }}
      >
        {/* Car Images Container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 120,
            position: "relative",
          }}
        >
          {/* Left car image */}
          <View
            style={{
              position: "absolute",
              left: -50,
              top: 0,
              width: 150,
              height: 120,
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

          {/* Right car image */}
          <View
            style={{
              position: "absolute",
              right: -40,
              top: 0,
              width: 150,
              height: 120,
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

        {/* VS Icon - Centered between the cars */}
        <View className="items-center">{renderVsIcon()}</View>

        {/* Car Details */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            marginTop: 5,
          }}
        >
          {/* Left car details */}
          <View
            style={{
              alignItems: "center",
              width: "48%",
            }}
          >
            <View className="mb-1">{renderJetourLogo()}</View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
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
                fontSize: 12,
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

          {/* Right car details */}
          <View
            style={{
              alignItems: "center",
              width: "48%",
            }}
          >
            <View className="mb-1">{renderJetourLogo()}</View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
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
                fontSize: 12,
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
  }

  const data = isRTL ? [...carComparisons].reverse() : carComparisons

  return (
    <View className="my-4">
      {/* Header Row */}
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

      {/* Car Comparison Cards List */}
      <FlatList
        horizontal
        inverted={isRTL}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      />
    </View>
  )
}

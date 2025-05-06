"use client"
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native"
import { useState } from "react"
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import { useLocale } from "../../contexts/LocaleContext"
import CustomTabBarBackground from "./CustomTabBarBackground"

// Screens
import HomeScreen from "../../screens/HomeScreen"
import AllCarScreen from "../../screens/AllCarsScreen"
import CompareBuilderScreen from "../../screens/CompareBuilderScreen"
import MoreScreen from "../../screens/MoreScreen"
import ChatScreen from "../../screens/ChatScreen"

// Icons
import TabCarsIcon from "../../assets/Icon/TabCarsIcon.svg"
import TabChatIcon from "../../assets/Icon/TabChatIcon.svg"
import TabHomeIcon from "../../assets/Icon/TabHomeIcon.svg"
import TabExploreIcon from "../../assets/Icon/TabExploreIcon.svg"
import TabServicesIcon from "../../assets/Icon/TabServicesIcon.svg"

const Tab = createBottomTabNavigator()
const { width } = Dimensions.get("window")

const tabList = [
  { name: "CarsTab", icon: TabCarsIcon, labelAr: "السيارات", labelEn: "Cars", component: AllCarScreen },
  { name: "ChatTab", icon: TabChatIcon, labelAr: "المحادثة", labelEn: "Chat", component: ChatScreen },
  { name: "HomeTab", icon: TabHomeIcon, labelAr: "الرئيسية", labelEn: "Home", component: HomeScreen },
  {
    name: "ExploreTab",
    icon: TabExploreIcon,
    labelAr: "الاستكشاف",
    labelEn: "Explore",
    component: CompareBuilderScreen,
  },
  { name: "ServicesTab", icon: TabServicesIcon, labelAr: "خدماتي", labelEn: "Services", component: MoreScreen },
]

// Improved CustomTabButton component that preserves original UI
function CustomTabButton(props) {
  const { onPress, children } = props

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
}

function CustomTabBarIcon({ focused, Icon, label, index, activeIndex }) {
  const tabWidth = width / tabList.length
  const distanceFromActive = Math.abs(index - activeIndex)
  const isFirstTab = index === 0
  const isLastTab = index === tabList.length - 1
  const isMiddleTab = !isFirstTab && !isLastTab

  // Calculate shift amount based on distance from active tab
  const shiftAmount = focused ? 0 : distanceFromActive * (tabWidth * 0)

  // Get position styles for active tab based on its position
  const getActiveTabPositionStyle = () => {
    if (isFirstTab) {
      // First tab moves left when active
      return { right: -17 }
    } else if (isLastTab) {
      // Last tab moves right when active
      return { left: -17 }
    } else {
      // Middle tabs stay centered
      return { alignSelf: "center" }
    }
  }

  return (
    <View
      style={{
        width: tabWidth,
        alignItems: "center",
        justifyContent: "center",
        height: 110,
        transform: [
          {
            translateX: focused ? 0 : index < activeIndex ? -shiftAmount : shiftAmount,
          },
        ],
      }}
    >
      {focused ? (
        <View
          style={[
            {
              position: "absolute",
              top: -2,
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 1,
              elevation: 2,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            },
            getActiveTabPositionStyle(),
          ]}
        >
          <Icon width={28} height={28} fill="#46194F" />
          <Text
            style={{
              fontSize: 11,
              color: "#46194F",
              marginTop: 4,
              fontWeight: "bold",
            }}
          >
            {label}
          </Text>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            borderRadius: 8,
            marginTop: 10,
            opacity: 0.5, // Add opacity to create a faded effect
          }}
        >
          <Icon width={24} height={24} fill="#9CA3AF" /> 
        </View>
      )}
    </View>
  )
}

export default function TabNavigator() {
  const { locale } = useLocale()
  const isRTL = locale === "ar"
  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenListeners={{
        state: (e) => {
          const index = e.data.state.index
          setActiveIndex(index)
        },
      }}
      tabBar={(props) => (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width,
            height: 70,
          }}
        >
          <CustomTabBarBackground
            width={width}
            height={80}
            activeIndex={activeIndex}
            tabCount={tabList.length}
            isRTL={isRTL}
          />
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          padding: 0,
          margin: 0,
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarPressColor: "transparent",
        tabBarPressOpacity: 1,
      }}
    >
      {tabList.map((tab, index) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabBarIcon
                focused={focused}
                Icon={tab.icon}
                label={locale === "ar" ? tab.labelAr : tab.labelEn}
                index={index}
                activeIndex={activeIndex}
              />
            ),
            tabBarButton: (props) => <CustomTabButton {...props} />,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

"use client"

import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native"
import { useState, useRef } from "react"
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useLocale } from "../../contexts/LocaleContext"
import { useNavigation } from "@react-navigation/native"
import CustomTabBarBackground from "./CustomTabBarBackground"
import ScreenLayout from "../common/ScreenLayout"

// Screens
import HomeScreen from "../../screens/HomeScreen"
import AllCarScreen from "../../screens/AllCarsScreen"
import MoreScreen from "../../screens/MoreScreen"
import ChatScreen from "../../screens/ChatScreen"
import CarDiscoverScreen from "../../screens/CarDiscoverScreen"
import WishlistScreen from "../../screens/WishlistScreen"

// Additional Screens
import Gallery from "../../screens/Gallery"
import SearchScreen from "../../screens/SearchScreen"
import AdvancedSearchScreen from "../../screens/AdvancedSearchScreen"
import CompareScreen from "../../screens/CompareScreen"
import AboutScreen from "../moresection/AboutScreen"
import TermsScreen from "../moresection/TermsScreen"
import PrivacyScreen from "../moresection/PrivacyScreen"
import ContactUsScreen from "../moresection/ContactUsScreen"
import FAQScreen from "../moresection/FAQScreen"
import BlogScreen from "../../screens/BlogScreen"
import NewsDetailScreen from "../../screens/NewsDetailScreen"
import BrowseScreen from "../../screens/BrowseScreen"
import ReviewScreen from "../../screens/ReviewScreen"
import AccountScreen from "../moresection/AccountScreen"
import PersonalInfo from "../moresection/PersonalInfo"
import CompareDetailsScreen from "../../screens/CompareDetailsScreen" // Import the CompareDetailsScreen

// Icons
import TabCarsIcon from "../../assets/Icon/TabCarsIcon.svg"
import TabChatIcon from "../../assets/Icon/TabChatIcon.svg"
import TabHomeIcon from "../../assets/Icon/TabHomeIcon.svg"
import TabExploreIcon from "../../assets/Icon/TabExploreIcon.svg"
import TabServicesIcon from "../../assets/Icon/TabServicesIcon.svg"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
const { width } = Dimensions.get("window")

const excludedScreensFromHeader = ["Gallery"]

const wrapWithLayout = (Component, screenName) => (props) =>
  excludedScreensFromHeader.includes(screenName) ? (
    <Component {...props} />
  ) : (
    <ScreenLayout>
      <Component {...props} />
    </ScreenLayout>
  )

const createStackWithCommonScreens = (initialScreen, initialScreenName, additionalScreens = []) => {
  return () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name={initialScreenName} component={wrapWithLayout(initialScreen, initialScreenName)} />
      {additionalScreens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={wrapWithLayout(screen.component, screen.name)}
          options={screen.options || {}}
        />
      ))}
      {[
        {
          name: "Gallery",
          component: Gallery,
        },
        {
          name: "Search",
          component: SearchScreen,
        },
        {
          name: "AdvancedSearch",
          component: AdvancedSearchScreen,
        },
        {
          name: "Blog",
          component: BlogScreen,
        },
        {
          name: "NewsDetail",
          component: NewsDetailScreen,
        },
        {
          name: "ReviewScreen",
          component: ReviewScreen,
        },
        {
          name: "BrowseScreen",
          component: BrowseScreen,
        },
        {
          name: "Wishlist",
          component: WishlistScreen,
        },
        {
          name: "CompareDetails",
          component: CompareDetailsScreen,
          options: {
            headerShown: false,
            animation: "slide_from_right",
            presentation: "card",
          },
        },
      ].map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={wrapWithLayout(screen.component, screen.name)}
          options={screen.options || { headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  )
}

const exploreAdditionalScreens = [{ name: "CompareScreen", component: CompareScreen, options: { headerShown: false } }]

const servicesAdditionalScreens = [
  { name: "About", component: AboutScreen, options: { headerShown: false } },
  { name: "Terms", component: TermsScreen, options: { headerShown: false } },
  { name: "Privacy", component: PrivacyScreen, options: { headerShown: false } },
  { name: "ContactUs", component: ContactUsScreen, options: { headerShown: false } },
  { name: "FAQ", component: FAQScreen, options: { headerShown: false } },
  { name: "AccountScreen", component: AccountScreen, options: { headerShown: false } },
  { name: "PersonalInfo", component: PersonalInfo, options: { headerShown: false } },
]

const HomeStack = createStackWithCommonScreens(HomeScreen, "HomeScreen")
const CarsStack = createStackWithCommonScreens(AllCarScreen, "AllCarsScreen")
const ChatStack = createStackWithCommonScreens(ChatScreen, "ChatScreen")
const ExploreStack = createStackWithCommonScreens(CarDiscoverScreen, "CarDiscoverScreen", exploreAdditionalScreens)
const ServicesStack = createStackWithCommonScreens(MoreScreen, "MoreScreen", servicesAdditionalScreens)

const tabList = [
  { name: "CarsTab", icon: TabCarsIcon, labelAr: "السيارات", labelEn: "Cars", component: CarsStack },
  { name: "ChatTab", icon: TabChatIcon, labelAr: "المحادثة", labelEn: "Chat", component: ChatStack },
  { name: "HomeTab", icon: TabHomeIcon, labelAr: "الرئيسية", labelEn: "Home", component: HomeStack },
  { name: "ExploreTab", icon: TabExploreIcon, labelAr: "الاستكشاف", labelEn: "Explore", component: ExploreStack },
  { name: "ServicesTab", icon: TabServicesIcon, labelAr: "خدماتي", labelEn: "Services", component: ServicesStack },
]

function CustomTabButton(props) {
  const { onPress, children } = props
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

function CustomTabBarIcon({ focused, Icon, label = "", index, activeIndex }) {
  const tabWidth = (width * 0.9) / tabList.length
  return (
    <View style={{ width: tabWidth, alignItems: "center", justifyContent: "center", height: 70 }}>
      {focused ? (
        <View
          style={{
            position: "absolute",
            top: -8,
            width: 60,
            height: 60,
            borderRadius: 30,
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
          }}
        >
          <Icon width={22} height={22} fill="#4CAF50" />
          {label ? (
            <Text style={{ fontSize: 9, color: "#000000", marginTop: 1, fontWeight: "bold" }}>{label}</Text>
          ) : null}
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 6,
            borderRadius: 8,
            marginTop: 6,
            opacity: 0.5,
          }}
        >
          <Icon width={24} height={24} fill="#FFFFFF" />
        </View>
      )}
    </View>
  )
}

function TabNavigator() {
  const { locale } = useLocale()
  const isRTL = locale === "ar"
  const [activeIndex, setActiveIndex] = useState(2)
  const tabBarHeight = 60
  const effectiveWidth = width * 0.9
  const sideMargin = (width - effectiveWidth) / 2
  const navigationRef = useRef(null)

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenListeners={{
        state: (e) => {
          const index = e.data?.state?.index ?? 2
          setActiveIndex(index)
        },
      }}
      tabBar={(props) => (
        <View style={{ position: "absolute", bottom: 0, width, height: tabBarHeight }}>
          <CustomTabBarBackground
            width={width}
            height={tabBarHeight}
            activeIndex={activeIndex}
            tabCount={tabList.length}
            isRTL={isRTL}
            effectiveWidth={effectiveWidth}
            sideMargin={sideMargin}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "center", width: width, position: "absolute", bottom: 0 }}
          >
            <View style={{ width: effectiveWidth, flexDirection: "row", height: tabBarHeight }}>
              <BottomTabBar
                {...props}
                style={{
                  width: effectiveWidth,
                  backgroundColor: "transparent",
                  borderTopWidth: 0,
                  elevation: 0,
                  height: tabBarHeight,
                }}
              />
            </View>
          </View>
        </View>
      )}
      screenOptions={{
        tabBarStyle: {
          height: tabBarHeight,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
        tabBarItemStyle: { padding: 0, margin: 0 },
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

// Create a custom hook for navigation
export const useAppNavigation = () => {
  const navigation = useNavigation()

  const navigateWithFallback = (screenName, params = {}) => {
    try {
      navigation.navigate(screenName, params)
    } catch (error) {
      console.error(`Navigation error to ${screenName}:`, error)
      // Fallback to a safe screen
      navigation.navigate("HomeTab")
    }
  }

  return {
    ...navigation,
    navigateWithFallback,
  }
}

export default function MainNavigator() {
  return <TabNavigator />
}

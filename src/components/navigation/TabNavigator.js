// "use client";
// import React from "react";
// import { View, Text, TouchableOpacity, Dimensions } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import CustomTabBarBackground from "./CustomTabBarBackground";

// // Screens
// import HomeScreen from "../../screens/HomeScreen";
// import AllCarScreen from "../../screens/AllCarsScreen";
// import CompareBuilderScreen from "../../screens/CompareBuilderScreen";
// import MoreScreen from "../../screens/MoreScreen";
// import ChatScreen from "../../screens/ChatScreen";

// // Icons
// import TabCarsIcon from "../../assets/Icon/TabCarsIcon.svg";
// import TabChatIcon from "../../assets/Icon/TabChatIcon.svg";
// import TabHomeIcon from "../../assets/Icon/TabHomeIcon.svg";
// import TabExploreIcon from "../../assets/Icon/TabExploreIcon.svg";
// import TabServicesIcon from "../../assets/Icon/TabServicesIcon.svg";

// const { width } = Dimensions.get("window");

// const TABS = [
//   { 
//     name: "CarsTab", 
//     label: "السيارات", 
//     icon: TabCarsIcon, 
//     component: AllCarScreen 
//   },
//   { 
//     name: "ChatTab", 
//     label: "المحادثة", 
//     icon: TabChatIcon, 
//     component: ChatScreen 
//   },
//   { 
//     name: "HomeTab", 
//     label: "الرئيسية", 
//     icon: TabHomeIcon, 
//     component: HomeScreen 
//   },
//   { 
//     name: "ExploreTab", 
//     label: "الاستكشاف", 
//     icon: TabExploreIcon, 
//     component: CompareBuilderScreen 
//   },
//   { 
//     name: "ServicesTab", 
//     label: "خدماتي", 
//     icon: TabServicesIcon, 
//     component: MoreScreen 
//   },
// ];

// const Tab = createBottomTabNavigator();

// function MyTabBar({ state, navigation }) {
//   const activeIndex = state.index;

//   return (
//     <View style={{ 
//       position: 'absolute',
//       bottom: 0,
//       width: '100%',
//       height: 70,
//       flexDirection: 'column',
//       direction: 'ltr' // Force LTR
//     }}>
//       {/* Background with cutout */}
//       <CustomTabBarBackground
//         width={width}
//         height={70}
//         activeIndex={activeIndex}
//         tabCount={TABS.length}
//       />

//       {/* Tab buttons */}
//       <View style={{ 
//         flexDirection: 'row', // Force LTR layout
//         height: 70,
//         width: '100%'
//       }}>
//         {TABS.map((tab, index) => {
//           const isFocused = state.index === index;
//           const Icon = tab.icon;

//           return (
//             <TouchableOpacity
//               key={tab.name}
//               accessibilityRole="button"
//               accessibilityState={isFocused ? { selected: true } : {}}
//               onPress={() => {
//                 const event = navigation.emit({
//                   type: "tabPress",
//                   target: tab.name,
//                 });
//                 if (!isFocused && !event.defaultPrevented) {
//                   navigation.navigate(tab.name);
//                 }
//               }}
//               style={{ 
//                 flex: 1,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 position: 'relative'
//               }}
//             >
//               {isFocused ? (
//                 <View style={{
//                   position: 'absolute',
//                   top: -12,
//                   width: 70,
//                   height: 70,
//                   borderRadius: 35,
//                   backgroundColor: 'white',
//                   borderWidth: 1,
//                   borderColor: '#E5E7EB',
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 4,
//                   elevation: 5,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   zIndex: 50
//                 }}>
//                   <Icon width={28} height={28} fill="#46194F" />
//                   <Text style={{
//                     fontSize: 11,
//                     color: '#46194F',
//                     marginTop: 4,
//                     fontWeight: '600'
//                   }}>
//                     {tab.label}
//                   </Text>
//                 </View>
//               ) : (
//                 <View style={{ alignItems: "center", justifyContent: "center" }}>
//                   <Icon width={24} height={24} fill="#CCCCCC" />
//                   <Text style={{
//                     fontSize: 12,
//                     marginTop: 4,
//                     color: '#CCCCCC',
//                     fontWeight: 'bold'
//                   }}>
//                     {tab.label}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// export default function TabNavigator() {
//   return (
//     <Tab.Navigator
//       tabBar={(props) => <MyTabBar {...props} />}
//       screenOptions={{ 
//         headerShown: false,
//         tabBarHideOnKeyboard: true 
//       }}
//     >
//       {TABS.map((tab) => (
//         <Tab.Screen 
//           key={tab.name} 
//           name={tab.name} 
//           component={tab.component} 
//         />
//       ))}
//     </Tab.Navigator>
//   );
// }
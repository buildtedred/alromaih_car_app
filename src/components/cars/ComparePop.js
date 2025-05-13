"use client"

import React from "react"
import { View, Text, TouchableOpacity, Image, I18nManager } from "react-native"
import Car1 from "../../assets/images/car2.png"     // white SUV
import Car2 from "../../assets/images/car2.png"    // gray sedan
import PlusIcon from "../../assets/icons/PlusIcon.svg" // plus icon
import Campar_vs from "../../assets/Icon/campar_vs.svg" // comparison icon
import IsolationMode from "../../assets/icons/Isolation_Mode.svg"
import Car7 from "../../assets/images/car7.png"
import PlusIconCompare from "../../assets/icons/PlusIconCompare.svg"

export default function ComparePop({ onStartCompare }) {
  const isRTL = I18nManager.isRTL

  return (
    <View className="absolute bottom-[90px] left-2 right-2 z-50">

     {/* Card 1 */}
  <View className="bg-[#46194F] rounded-xl p-4 flex-row-reverse justify-between items-center mb-4">

    {/* Text on the right side */}
    <View className="flex-1 pr-2">
      <Text className="text-white font-bold text-xl text-left">رائع!</Text>
      <Text className="text-white text-base text-right mt-1">الآن قم باختيار أي سيارة أخرى</Text>
    </View>

    {/* Divider */}
    <View style={{ width: 2, height: 50, backgroundColor: "#fff", marginHorizontal: 6 }} />

    {/* Icon + Car on the left */}
    <View className="flex-row-reverse items-center space-x-reverse space-x-2">
      <PlusIconCompare width={16} height={16} />
      <Image 
        source={Car1} 
        className="w-[110px] h-[65px]" 
        resizeMode="contain" 
      />
    </View>

  </View>

<View className="bg-[#46194F] rounded-xl p-4 flex-row justify-between items-center">

  {/* Left side: Car + Icons + car7 + Divider */}
  <View className="flex-row items-center space-x-2">
    <Image 
      source={Car1} 
      className="w-[80px] h-[50px]" 
      resizeMode="contain" 
    />
    <IsolationMode width={22} height={22} />
    <Image 
      source={Car7} 
      className="w-[75px] h-[50px]" 
      resizeMode="contain" 
    />
    
    {/* Vertical Divider */}
    <View style={{ width: 2, height: 40, backgroundColor: "#fff", marginHorizontal: 4 }} />
  </View>

  {/* Right side: Button */}
  <TouchableOpacity
    onPress={onStartCompare}
    className="bg-white px-6 py-2.5 rounded-xl"
  >
    <Text className="text-[#46194F] font-bold text-sm">ابدأ المقارنة الآن</Text>
  </TouchableOpacity>

</View>






    </View>
  )
}

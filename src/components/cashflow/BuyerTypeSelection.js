"use client"

import { View, TouchableOpacity, Text } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AlmaraiFonts from "../../constants/fonts"

const BuyerTypeSelection = ({ onSelect, selectedType }) => {
  return (
    <View className="px-6 py-6">
      {/* Title */}
      <Text
        className="text-lg font-bold text-[#46194F] text-center mb-8"
        style={{ fontFamily: AlmaraiFonts.bold }}
      >
        ما نوع المشتري الذي أنت عليه؟
      </Text>

      {/* Selection Boxes */}
      <View className="flex-row justify-center gap-6 mb-8">
        {/* Individual */}
        <TouchableOpacity
          className={`border rounded-xl p-4 w-32 h-24 items-center justify-center ${
            selectedType === "individual" ? "border-[#46194F] border-2" : "border-gray-300"
          }`}
          onPress={() => onSelect("individual")}
        >
          <View
            className={`w-6 h-6 rounded-full border items-center justify-center mb-2 ${
              selectedType === "individual" ? "border-[#46194F] bg-[#46194F]" : "border-gray-400"
            }`}
          />
          <Text
            className={`text-center ${
              selectedType === "individual" ? "text-[#46194F] font-bold" : "text-gray-700"
            }`}
            style={{
              fontFamily:
                selectedType === "individual" ? AlmaraiFonts.bold : AlmaraiFonts.regular,
            }}
          >
            للأفراد
          </Text>
        </TouchableOpacity>

        {/* Company */}
        <TouchableOpacity
          className={`border rounded-xl p-4 w-32 h-24 items-center justify-center ${
            selectedType === "company" ? "border-[#46194F] border-2" : "border-gray-300"
          }`}
          onPress={() => onSelect("company")}
        >
          <View
            className={`w-6 h-6 rounded-full border items-center justify-center mb-2 ${
              selectedType === "company" ? "border-[#46194F] bg-[#46194F]" : "border-gray-400"
            }`}
          />
          <Text
            className={`text-center ${
              selectedType === "company" ? "text-[#46194F] font-bold" : "text-gray-700"
            }`}
            style={{
              fontFamily:
                selectedType === "company" ? AlmaraiFonts.bold : AlmaraiFonts.regular,
            }}
          >
            للشركات
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <View className="items-right">
        <TouchableOpacity
         className="bg-[#46194F] rounded-xl py-2 px-6 items-center self-end mt-2 mr-6"
          onPress={() => selectedType && onSelect(selectedType)}
          disabled={!selectedType}
        >
          <Text className="text-white font-bold text-sm" style={{ fontFamily: AlmaraiFonts.bold }}>
            التالي
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BuyerTypeSelection

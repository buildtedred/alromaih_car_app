"use client"

import { View, TouchableOpacity, Text } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AlmaraiFonts from "../../constants/fonts"

const BuyerTypeSelection = ({ onSelect, selectedType, locale }) => {
  return (
    <View className="px-4 py-6">
      <Text className="text-lg font-bold text-[#46194F] text-center mb-8" style={{ fontFamily: AlmaraiFonts.bold }}>
        {locale === "ar" ? "ما نوع المشتري الذي أنت عليه؟" : "What type of buyer are you?"}
      </Text>

      <View className="flex-row justify-center space-x-4 mb-8">
        <TouchableOpacity
          className={`border rounded-lg p-4 w-40 h-24 items-center justify-center ${
            selectedType === "individual" ? "border-[#46194F] border-2" : "border-gray-300"
          }`}
          onPress={() => onSelect("individual")}
        >
          <View
            className={`w-6 h-6 rounded-full border ${
              selectedType === "individual" ? "border-[#46194F] bg-[#46194F]" : "border-gray-400"
            } items-center justify-center mb-2`}
          >
            {selectedType === "individual" && <FontAwesome name="check" size={12} color="#FFFFFF" />}
          </View>
          <Text
            className={`text-center ${selectedType === "individual" ? "text-[#46194F] font-bold" : "text-gray-700"}`}
            style={{ fontFamily: selectedType === "individual" ? AlmaraiFonts.bold : AlmaraiFonts.regular }}
          >
            {locale === "ar" ? "للأفراد" : "For Individuals"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`border rounded-lg p-4 w-40 h-24 items-center justify-center ${
            selectedType === "company" ? "border-[#46194F] border-2" : "border-gray-300"
          }`}
          onPress={() => onSelect("company")}
        >
          <View
            className={`w-6 h-6 rounded-full border ${
              selectedType === "company" ? "border-[#46194F] bg-[#46194F]" : "border-gray-400"
            } items-center justify-center mb-2`}
          >
            {selectedType === "company" && <FontAwesome name="check" size={12} color="#FFFFFF" />}
          </View>
          <Text
            className={`text-center ${selectedType === "company" ? "text-[#46194F] font-bold" : "text-gray-700"}`}
            style={{ fontFamily: selectedType === "company" ? AlmaraiFonts.bold : AlmaraiFonts.regular }}
          >
            {locale === "ar" ? "للشركات" : "For Companies"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-[#46194F] rounded-lg py-3 items-center mt-4"
        onPress={() => selectedType && onSelect(selectedType)}
        disabled={!selectedType}
      >
        <Text className="text-white font-bold" style={{ fontFamily: AlmaraiFonts.bold }}>
          {locale === "ar" ? "التالي" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BuyerTypeSelection

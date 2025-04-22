import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const FinanceOption = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("FinanceBrand");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-gray-50 rounded-md shadow-sm border-l-4 border-[#FFCC00] flex-row items-center justify-between px-3 py-3 my-1"
    >
      <View className="flex-row items-center">
        <View className="bg-[#F3F0FF] p-2 rounded-md mr-2">
          <Ionicons name="card-outline" size={20} color="#8B5CF6" />
        </View>
        <View>
          <Text className="text-sm font-bold text-[#333333]">
            Finance Options
          </Text>
          <Text className="text-xs text-gray-400">Comfortable monthly...</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <View className="bg-[#FFF1F2] px-2 py-1 rounded-full mr-2">
          <Text className="text-[10px] text-[#FF4D6D] font-medium">
            SAVE UP TO 50%
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
};

export default FinanceOption;

import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FinanceCategory = ({ navigation, route }) => {
  const { brand, model } = route.params;
  const [searchCategory, setSearchCategory] = useState("");

  const categories = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible","Truck"];
  const filteredCategories = categories.filter((c) =>
    c.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const handleCategorySelect = (category) => {
    navigation.navigate("CashYear", { brand, model, category });
    console.log("Selected:", brand, model, category);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-light mt-2.5">
      <View className="bg-white rounded-xl shadow-md overflow-hidden mx-4">
        {/* Step Indicator */}
        <View className="bg-gray-100 px-4 pt-4 pb-2 mt-2">
          <View className="flex-row justify-between items-center mb-1">
            {[1, 2, 3].map((step) => (
              <View key={step} className="flex-row items-center flex-1">
                <View className="items-center">
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center ${
                      step === 3 ? "bg-brand-primary" : "bg-gray-300"
                    }`}
                  >
                    <Text className="font-bold text-xs text-white">{step}</Text>
                  </View>
                </View>
                {step < 3 && (
                  <View className="flex-1 items-center justify-center px-1">
                    <View className="h-0.5 bg-brand-primary w-full rounded-full" />
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Step Labels */}
          <View className="flex-row justify-between items-center mt-1">
            {["Choose brand", "Select model", "Select category"].map((label, index) => (
              <View key={index} className="flex-1 items-center">
                <Text className="text-[10px] text-brand-primary text-center w-16">{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Content */}
        <ScrollView className="p-4 pt-2" showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center mb-4"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#46194F" />
            <Text className="ml-1 text-brand-primary text-sm">Back</Text>
          </TouchableOpacity>

          {/* Selected Info */}
          <View className="flex-row mb-3 flex-wrap">
            <Text className="text-brand-primary mr-2 text-sm">{brand}</Text>
            <Text className="text-brand-primary text-sm">{model}</Text>
          </View>

          {/* Search Input */}
          <View className="border border-brand-dark rounded-lg mb-4 px-3 py-2 flex-row items-center bg-white">
            <Ionicons name="search-outline" size={18} color="#C6AECC" />
            <TextInput
              placeholder="Search category"
              placeholderTextColor="#C6AECC"
              value={searchCategory}
              onChangeText={setSearchCategory}
              className="flex-1 ml-2 text-sm text-brand-primary h-8 p-0"
            />
          </View>

          {/* Compact Category Grid */}
          <View className="flex-row flex-wrap justify-between">
            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(category)}
                className="w-[31%] border border-brand-dark rounded-md px-2 py-1 mb-2 bg-white shadow-sm items-center justify-center h-[34px]"
                activeOpacity={0.7}
              >
                <Text className="text-[11px] text-brand-primary">{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FinanceCategory;

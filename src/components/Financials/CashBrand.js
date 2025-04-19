import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CashBrand = () => {
  const [searchBrand, setSearchBrand] = useState("");
  const navigation = useNavigation();

  const brands = [
    { name: "Jetour", display: "JETOUR", icon: null, color: "#7E22CE" },
    { name: "Toyota", display: null, icon: "car", color: "#EF4444" },
    { name: "Honda", display: "H", icon: null, color: "#3B82F6" },
    { name: "BMW", display: "B", icon: null, color: "#000000" },
    { name: "Audi", display: "A", icon: null, color: "#FF0000" },
    { name: "Mercedes", display: "M", icon: null, color: "#222222" }
  ];

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const handleBrandSelection = (brandName) => {
    navigation.navigate('CashModel', { 
      brand: brandName,
      // Add any additional parameters you need
    });
  };

  return (
    <SafeAreaView className="mt-2.5 flex-1 bg-gray-50">
      <View className="bg-white rounded-xl shadow-md overflow-hidden mx-4 my-2">
        {/* Step Indicator */}
        <View className="bg-gray-700 p-4 pb-2">
          <View className="flex-row justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <View className="items-center">
                  <View className={`w-7 h-7 ${step === 1 ? 'bg-white' : 'bg-gray-500'} rounded-full items-center justify-center`}>
                    <Text className={`${step === 1 ? 'text-gray-700' : 'text-white'} font-bold text-xs`}>{step}</Text>
                  </View>
                  <Text className="text-[10px] text-white mt-1">
                    {step === 1 ? 'Choose brand' : step === 2 ? 'Select model' : 'Select category'}
                  </Text>
                </View>
                {step < 3 && (
                  <View className="flex-1 items-center justify-center mx-1">
                    <View className="h-px bg-gray-500 w-full" />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Content Section */}
        <View className="p-4">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center mb-4"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#666" />
            <Text className="ml-1 text-gray-600 text-sm">Back</Text>
          </TouchableOpacity>

          {/* Search Input */}
          <View className="border border-gray-200 rounded-lg mb-4 px-3 py-2 flex-row items-center bg-gray-50">
            <Ionicons name="search-outline" size={18} color="#9ca3af" />
            <TextInput
              placeholder="Search brand..."
              placeholderTextColor="#9ca3af"
              value={searchBrand}
              onChangeText={setSearchBrand}
              className="flex-1 ml-2 text-sm text-gray-800 h-8 p-0"
              clearButtonMode="while-editing"
            />
          </View>

          {/* Brand Grid */}
          <View className="flex-row flex-wrap justify-between">
            {filteredBrands.map((brand) => (
              <TouchableOpacity
                key={brand.name}
                onPress={() => handleBrandSelection(brand.name)}
                className="w-[48%] bg-white border border-gray-200 rounded-lg p-3 mb-3 items-center justify-center shadow-sm"
                activeOpacity={0.7}
              >
                {brand.icon ? (
                  <View className="w-10 h-10 items-center justify-center mb-2">
                    <Ionicons 
                      name={brand.icon} 
                      size={24} 
                      color={brand.color || "#333"} 
                    />
                  </View>
                ) : (
                  <View className="w-10 h-10 items-center justify-center mb-2">
                    <Text 
                      className={`text-xl font-bold`}
                      style={{ color: brand.color || "#7E22CE" }}
                    >
                      {brand.display || brand.name.charAt(0)}
                    </Text>
                  </View>
                )}
                <Text 
                  className="text-gray-800 text-sm font-medium"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {brand.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CashBrand;
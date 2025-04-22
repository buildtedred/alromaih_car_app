import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FinanceBrand = () => {
  const [searchBrand, setSearchBrand] = useState("");
  const navigation = useNavigation();

  const brands = [
    { name: "Jetour", display: "JETOUR", icon: null, color: "#46194F" },
    { name: "Toyota", display: null, icon: "car", color: "#46194F" },
    { name: "Honda", display: "H", icon: null, color: "#46194F" },
    { name: "BMW", display: "B", icon: null, color: "#46194F" },
    { name: "Audi", display: "A", icon: null, color: "#46194F" },
    { name: "Mercedes", display: "M", icon: null, color: "#46194F" },
    { name: "Hyundai", display: "H", icon: null, color: "#46194F" },
    { name: "Kia", display: "K", icon: null, color: "#46194F" },
    { name: "Ford", display: "F", icon: null, color: "#46194F" }
  ];

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const handleBrandSelection = (brandName) => {
    navigation.navigate('FinanceModel', { brand: brandName });
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-light">
      <View className="bg-white rounded-xl shadow-md overflow-hidden mx-4 my-2">
        {/* Step Indicator */}
        <View className="bg-gray-100 p-4 pb-2">
          <View className="flex-row justify-between items-center mb-2">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <View className="items-center">
                  <View className={`w-7 h-7 ${step === 1 ? 'bg-brand-primary' : 'bg-gray-300'} rounded-full items-center justify-center`}>
                    <Text className={`${step === 1 ? 'text-white' : 'text-white'} font-bold text-xs`}>{step}</Text>
                  </View>
                  <Text className="text-[10px] text-brand-primary mt-1">
                    {step === 1 ? 'Choose brand' : step === 2 ? 'Select model' : 'Select category'}
                  </Text>
                </View>
                {step < 3 && (
                  <View className="flex-1 items-center justify-center px-1">
                    <View className="h-0.5 bg-brand-primary w-full rounded-full" />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Content Section */}
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

          {/* Search Input */}
          <View className="border border-brand-dark rounded-lg mb-4 px-3 py-2 flex-row items-center bg-white">
            <Ionicons name="search-outline" size={18} color="#C6AECC" />
            <TextInput
              placeholder="Search brand..."
              placeholderTextColor="#C6AECC"
              value={searchBrand}
              onChangeText={setSearchBrand}
              className="flex-1 ml-2 text-sm text-brand-primary h-8 p-0"
              clearButtonMode="while-editing"
            />
          </View>

          {/* Brand Grid (Compact Style) */}
          <View className="flex-row flex-wrap justify-between">
            {filteredBrands.map((brand) => (
              <TouchableOpacity
                key={brand.name}
                onPress={() => handleBrandSelection(brand.name)}
                className="w-[31%] border border-brand-dark rounded-md px-2 py-1 mb-2 bg-white shadow-sm items-center justify-center h-[34px]"
                activeOpacity={0.7}
              >
                {brand.icon ? (
                  <Ionicons 
                    name={brand.icon}
                    size={20}
                    color={brand.color || "#46194F"}
                    className="mb-1"
                  />
                ) : (
                  <Text
                    className="text-base font-bold mb-1"
                    style={{ color: brand.color || "#46194F" }}
                  >
                    {brand.display || brand.name.charAt(0)}
                  </Text>
                )}
                <Text
                  className="text-[10px] text-brand-primary text-center"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {brand.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FinanceBrand;

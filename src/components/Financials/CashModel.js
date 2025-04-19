import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CashModel = () => {
  const [searchModel, setSearchModel] = React.useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { brand } = route.params;

  // Sample models data
  const brandModels = {
    "Jetour": ["Jetour T2", "Jetour T2 Plus", "Jetour T2 Sport", "Jetour X70", "Jetour X90", "Jetour Dashing"],
    "Toyota": ["Corolla", "Camry", "RAV4", "Highlander", "Land Cruiser", "Hilux"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "City", "BR-V"],
    "BMW": ["3 Series", "5 Series", "X1", "X3", "X5", "X7"],
    "Audi": ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
    "Mercedes": ["A-Class", "C-Class", "E-Class", "GLA", "GLC", "GLE"]
  };

  const models = brandModels[brand] || [];
  const filteredModels = models.filter(model => 
    model.toLowerCase().includes(searchModel.toLowerCase())
  );

  return (
    <SafeAreaView className="mt-2.5">
      <View className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Step Indicator */}
        <View className="bg-gray-700 p-4 pb-2">
          <View className="flex-row justify-between mb-2">
            <View className="items-center">
              <View className="w-7 h-7 bg-gray-500 rounded-full items-center justify-center">
                <Text className="text-white font-bold text-xs">1</Text>
              </View>
              <Text className="text-[10px] text-white mt-1">Choose brand</Text>
            </View>
            <View className="flex-1 items-center justify-center mx-1">
              <View className="h-px bg-gray-500 w-full" />
            </View>
            <View className="items-center">
              <View className="w-7 h-7 bg-white rounded-full items-center justify-center">
                <Text className="text-gray-700 font-bold text-xs">2</Text>
              </View>
              <Text className="text-[10px] text-white mt-1">Select model</Text>
            </View>
            <View className="flex-1 items-center justify-center mx-1">
              <View className="h-px bg-gray-500 w-full" />
            </View>
            <View className="items-center">
              <View className="w-7 h-7 bg-gray-500 rounded-full items-center justify-center">
                <Text className="text-white font-bold text-xs">3</Text>
              </View>
              <Text className="text-[10px] text-white mt-1">Select category</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="p-4">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center mb-4"
          >
            <Ionicons name="arrow-back" size={16} color="#666" />
            <Text className="ml-1 text-gray-600 text-sm">Back</Text>
          </TouchableOpacity>

          {/* Selected Brand */}
          <View className="mb-3">
            <Text className="text-purple-600 font-medium text-sm">{brand}</Text>
          </View>

          {/* Search Input */}
          <View className="border border-gray-200 rounded-lg mb-4 px-3 py-2 flex-row items-center">
            <Ionicons name="search-outline" size={16} color="#9ca3af" />
            <TextInput
              placeholder="Search Model"
              placeholderTextColor="#9ca3af"
              value={searchModel}
              onChangeText={setSearchModel}
              className="flex-1 ml-2 text-xs text-gray-800 h-6 p-0"
            />
          </View>

          {/* Model Grid */}
          <View className="flex-row flex-wrap justify-between">
            {filteredModels.map((model) => (
              <TouchableOpacity
                key={model}
                onPress={() => navigation.navigate('CashCatagory', { 
                  brand: brand, 
                  model: model 
                })}
                className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
              >
                <Text className="text-purple-600 text-[10px]">{model}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CashModel;
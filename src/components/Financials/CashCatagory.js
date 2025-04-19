import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class CategorySelection extends Component {
  state = {
    searchCategory: "",
  };

  handleSearchCategory = (text) => {
    this.setState({ searchCategory: text });
  };

  render() {
    const { searchCategory } = this.state;
    const { brand, model } = this.props; // Changed from route.params to props

    const categories = [
      "Crossover", "SUV", "Sedan", 
      "Hatchback", "Coupe", "Convertible"
    ];

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
                <View className="w-7 h-7 bg-gray-500 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-xs">2</Text>
                </View>
                <Text className="text-[10px] text-white mt-1">Select model</Text>
              </View>
              <View className="flex-1 items-center justify-center mx-1">
                <View className="h-px bg-gray-500 w-full" />
              </View>
              <View className="items-center">
                <View className="w-7 h-7 bg-white rounded-full items-center justify-center">
                  <Text className="text-gray-700 font-bold text-xs">3</Text>
                </View>
                <Text className="text-[10px] text-white mt-1">Select category</Text>
              </View>
            </View>
          </View>

          {/* Content Section */}
          <View className="p-4">
            {/* Selected Brand and Model */}
            <View className="flex-row mb-3">
              <Text className="text-purple-600 mr-2 text-sm">{brand}</Text>
              <Text className="text-purple-600 text-sm">{model}</Text>
            </View>

            {/* Search Input */}
            <View className="border border-gray-200 rounded-lg mb-4 px-3 py-2 flex-row items-center">
              <Ionicons name="search-outline" size={16} color="#9ca3af" />
              <TextInput
                placeholder="Search category"
                placeholderTextColor="#9ca3af"
                value={searchCategory}
                onChangeText={this.handleSearchCategory}
                className="flex-1 ml-2 text-xs text-gray-800 h-6 p-0"
              />
            </View>

            {/* Category Grid */}
            <View className="flex-row flex-wrap justify-between">
              {categories.map((category) => (
                <TouchableOpacity 
                  key={category}
                  className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                >
                  <Text className="text-purple-600 text-[10px]">{category}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Finance Options Information */}
            <View className="mt-4 bg-purple-50 p-3 rounded-lg border border-purple-200">
              <Text className="text-sm font-bold text-gray-800 mb-2">Finance Options</Text>
              <Text className="text-xs text-gray-600 mb-2">
                Flexible monthly payments with low interest rates.
              </Text>
              
              <View className="flex-row justify-between mb-2">
                <View>
                  <Text className="text-xs text-gray-500">Down Payment</Text>
                  <Text className="text-sm font-bold text-gray-800">20%</Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500">Monthly Payment</Text>
                  <Text className="text-sm font-bold text-purple-600">$350</Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500">Term</Text>
                  <Text className="text-sm font-bold text-gray-800">48 months</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CategorySelection;
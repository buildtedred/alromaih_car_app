import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CashModel = () => {
  const [searchModel, setSearchModel] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { brand } = route.params;

  const brandModels = {
    Jetour: ["Jetour T2", "Jetour T2 Plus", "Jetour T2 Sport", "Jetour X70", "Jetour X90", "Jetour Dashing"],
    Toyota: ["Corolla", "Camry", "RAV4", "Highlander", "Land Cruiser", "Hilux"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "City", "BR-V"],
    BMW: ["3 Series", "5 Series", "X1", "X3", "X5", "X7"],
    Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
    Mercedes: ["A-Class", "C-Class", "E-Class", "GLA", "GLC", "GLE"],
    Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Venue"],
    Kia: ["Sportage", "Seltos", "Sorento", "Carnival"],
    Ford: ["Focus", "Mustang", "Explorer", "Ranger"],
  };

  const models = brandModels[brand] || [];
  const filteredModels = models.filter(model =>
    model.toLowerCase().includes(searchModel.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-brand-light mt-2.5">
      <View className="bg-white rounded-xl shadow-md overflow-hidden mx-4">
        {/* Step Indicator */}
        <View className="bg-gray-100 p-4 pb-2">
          <View className="flex-row justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <View className="items-center">
                  <View className={`w-7 h-7 ${step === 2 ? 'bg-brand-primary' : 'bg-gray-300'} rounded-full items-center justify-center`}>
                    <Text className={`${step === 2 ? 'text-white' : 'text-white'} font-bold text-xs`}>{step}</Text>
                  </View>
                  <Text className="text-[10px] text-brand-primary mt-1">
                    {step === 1 ? 'Choose brand' : step === 2 ? 'Select model' : 'Select category'}
                  </Text>
                </View>
                {step < 3 && (
                  <View className="flex-1 items-center justify-center mx-1">
                    <View className="h-0.5 bg-brand-primary w-full rounded-full" />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Content */}
        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mb-4" activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={20} color="#46194F" />
            <Text className="ml-1 text-brand-primary text-sm">Back</Text>
          </TouchableOpacity>

          {/* Selected Brand */}
          <View className="mb-3">
            <Text className="text-brand-primary font-medium text-sm">{brand}</Text>
          </View>

          {/* Search Box */}
          <View className="border border-brand-dark rounded-lg mb-4 px-3 py-2 flex-row items-center bg-white">
            <Ionicons name="search-outline" size={18} color="#C6AECC" />
            <TextInput
              placeholder="Search model..."
              placeholderTextColor="#C6AECC"
              value={searchModel}
              onChangeText={setSearchModel}
              className="flex-1 ml-2 text-sm text-brand-primary h-8 p-0"
              clearButtonMode="while-editing"
            />
          </View>

          {/* Model Grid */}
          <View className="flex-row flex-wrap justify-between">
            {filteredModels.map((model) => (
              <TouchableOpacity
                key={model}
                onPress={() =>
                  navigation.navigate('CashCategory', {
                    brand,
                    model,
                  })
                }
                className="w-[31%] bg-white border border-brand-light rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                activeOpacity={0.7}
              >
                <Text className="text-brand-primary text-[10px] font-medium" numberOfLines={1}>
                  {model}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CashModel;

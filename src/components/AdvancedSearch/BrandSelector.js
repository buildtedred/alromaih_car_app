import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import { getBrands } from '../../mock-data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function BrandSelector({ selected, setSelected }) {
  const { locale } = useLocale();
  const brands = getBrands(locale); // Fully dynamic from mock-data.js

  return (
    <View className="mb-6 px-1">
      {/* Title with Icon */}
      <View className="flex-row items-center mb-3">
        <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-3">
          <MaterialIcons name="directions-car" size={20} color="#6B7280" />
        </View>
        <Text className="text-base font-semibold text-brand">
          {locale === 'ar' ? 'الماركة' : 'Brand'}
        </Text>
      </View>

      {/* Scrollable Brand Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {brands.map((brand) => {
          // console.log("object", brand);
          const isSelected = selected === brand.key;
          return (
            <TouchableOpacity
              key={brand.key}
              onPress={() => setSelected(isSelected ? null : brand.key)}
              className={`mr-3 px-4 py-2 rounded-full border ${
                isSelected ? 'bg-brand border-brand' : 'bg-white border-gray-300'
              }`}
              style={{ elevation: isSelected ? 3 : 1 }}
              activeOpacity={0.85}
            >
              <MaterialIcons
                name="directions-car"
                size={26}
                color={isSelected ? '#fff' : '#6B7280'}
              />
              <Text
                className={`text-xs font-bold mt-2 text-center ${
                  isSelected ? 'text-white' : 'text-gray-700'
                }`}
                numberOfLines={1}
              >
                {brand.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

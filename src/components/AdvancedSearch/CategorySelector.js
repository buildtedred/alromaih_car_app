"use client"

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import { getCategories } from '../../mock-data';
import AlmaraiFonts from '../../constants/fonts';

export default function CategorySelector({ selected, setSelected }) {
  const { locale } = useLocale();
  const categories = getCategories(locale);

  return (
    <View className="mb-6">
      <Text
        className="text-base mb-2 text-brand"
        style={{ fontFamily: AlmaraiFonts.bold }}
      >
        {locale === 'ar' ? 'الفئة' : 'Category'}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item) => {
          const isSelected = selected === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelected(isSelected ? null : item.key)}
              className={`mr-3 px-4 py-2 rounded-[10px] border ${
                isSelected ? 'bg-brand border-brand' : 'bg-white border-gray-300'
              }`}
            >
              <Text
                className={`text-xs ${
                  isSelected ? 'text-white' : 'text-gray-600'
                }`}
                style={{
                  fontFamily: isSelected ? AlmaraiFonts.bold : AlmaraiFonts.regular,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

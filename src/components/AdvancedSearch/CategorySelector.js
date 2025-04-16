import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import { getCategories } from '../../mock-data';

export default function CategorySelector({ selected, setSelected }) {
  const { locale } = useLocale();
  const categories = getCategories(locale);

  return (
    <View className="mb-6">
      <Text className="text-base font-semibold text-brand mb-2">
        {locale === 'ar' ? 'الفئة' : 'Category'}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item) => {
          const isSelected = selected === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelected(isSelected ? null : item.key)}
              className={`mr-3 px-4 py-2 rounded-full border ${
                isSelected ? 'bg-brand border-brand' : 'bg-white border-gray-300'
              }`}
            >
              <Text className={`text-xs ${isSelected ? 'text-white font-semibold' : 'text-gray-600'}`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

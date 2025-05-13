import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import { getBodyTypes } from '../../mock-data';
import AlmaraiFonts from '../../constants/fonts';

export default function BodyTypeSelector({ selected, setSelected }) {
  const { locale } = useLocale();
  const bodyTypes = getBodyTypes(locale);

  return (
    <View className="mb-6">
      <Text
        className="text-base font-semibold text-brand mb-2"
        style={{ fontFamily: AlmaraiFonts.bold }}
      >
        {locale === 'ar' ? 'نوع الهيكل' : 'Body Type'}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {bodyTypes.map((item) => {
          const isSelected = selected === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelected(isSelected ? null : item.key)}
              className={`mr-3 w-[85px] py-2 items-center rounded-[10px] border ${
                isSelected ? 'bg-brand border-brand' : 'bg-white border-gray-300'
              }`}
            >
              <Text
                className={`text-xs mt-1 text-center ${
                  isSelected ? 'text-white' : 'text-gray-600'
                }`}
                style={{
                  fontFamily: isSelected
                    ? AlmaraiFonts.bold
                    : AlmaraiFonts.regular,
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

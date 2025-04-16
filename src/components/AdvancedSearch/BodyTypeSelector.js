import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import { getBodyTypes } from '../../mock-data';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function BodyTypeSelector({ selected, setSelected }) {
  const { locale } = useLocale();
  const bodyTypes = getBodyTypes(locale);

  return (
    <View className="mb-6">
      <Text className="text-base font-semibold text-brand mb-2">
        {locale === 'ar' ? 'نوع الهيكل' : 'Body Type'}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {bodyTypes.map((item) => {
          const isSelected = selected === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelected(isSelected ? null : item.key)}
              className={`mr-3 w-[85] py-2 items-center font-semibold rounded-[10px] border ${
                isSelected ? 'bg-brand border-brand' : 'bg-white border-gray-300'
              }`}
            >
              <FontAwesome5 name="car" size={16} color={isSelected ? '#fff' : '#333'} />
              <Text className={`text-xs mt-1 text-center ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import carsData, { getBrands, brandLogos } from '../../mock-data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function BrandSelector({
  selected,
  setSelected,
  showIcon = true,
  showText = true,
  showTitle = true,
  textClass = 'text-xs font-bold',
}) {
  const { locale } = useLocale();
  const allBrands = getBrands(locale);

  return (
    <View className="mb-6">
      {/* 🔹 Title Header */}
      {showTitle && (
        <View className="flex-row items-center mb-3">
          {showIcon && (
            <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-3">
              <MaterialIcons name="directions-car" size={20} color="#6B7280" />
            </View>
          )}
          <Text className="text-base font-semibold text-brand">
            {locale === 'ar' ? 'الماركة' : 'Brand'}
          </Text>
        </View>
      )}

      {/* 🔸 Brand Scroll List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allBrands.map((brand) => {
          const isSelected = selected === brand.key;
          const LogoComponent = brandLogos[brand.key];

          return (
            <TouchableOpacity
              key={brand.key}
              onPress={() => setSelected(isSelected ? null : brand.key)}
              className={`mr-3 px-4 py-2 rounded-xl border items-center justify-center ${
                isSelected ? 'bg-brand border-brand' : 'bg-white border-gray-300'
              }`}
              style={{ elevation: isSelected ? 3 : 1 }}
              activeOpacity={0.85}
            >
              {LogoComponent && (
                <LogoComponent
                  width={40}
                  height={30}
                  style={{ marginBottom: showText ? 6 : 0 }}
                />
              )}
              {showText && (
                <Text
                  className={`${textClass} ${
                    isSelected ? 'text-white' : 'text-gray-700'
                  } text-center`}
                >
                  {brand.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

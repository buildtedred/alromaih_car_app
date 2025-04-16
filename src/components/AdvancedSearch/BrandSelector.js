import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import carsData, { getBrands } from '../../mock-data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { brandLogos } from '../../mock-data'; // Make sure this is imported

export default function BrandSelector({ selected, setSelected }) {
  const { locale } = useLocale();
  const allBrands = getBrands(locale);

  const usedBrandKeys = new Set(carsData.map((car) => car.brand));
  const filteredBrands = allBrands.filter((brand) => usedBrandKeys.has(brand.key));

  return (
    <View className="mb-6 px-1">
      <View className="flex-row items-center mb-3">
        <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-3">
          <MaterialIcons name="directions-car" size={20} color="#6B7280" />
        </View>
        <Text className="text-base font-semibold text-brand">
          {locale === 'ar' ? 'الماركة' : 'Brand'}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredBrands.map((brand) => {
          const isSelected = selected === brand.key;
          const LogoComponent = brandLogos[brand.key]; // ❗ Use brand key to fetch logo safely here

          return (
            <TouchableOpacity
              key={brand.key}
              onPress={() => setSelected(isSelected ? null : brand.key)}
              className={`mr-3 px-4 py-2 rounded-[10px] border items-center ${
                isSelected ? 'bg-brand border-brand' : 'bg-white border-gray-300'
              }`}
              style={{ elevation: isSelected ? 3 : 1 }}
              activeOpacity={0.85}
            >
              {LogoComponent && (
                <LogoComponent width={40} height={30} style={{ marginBottom: 6 }} />
              )}
              <Text
                className={`text-xs font-bold text-center ${
                  isSelected ? 'text-white' : 'text-gray-700'
                }`}
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

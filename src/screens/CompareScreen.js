import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getAllSpecGroups, brandLogos } from '../mock-data';
import { useLocale } from '../contexts/LocaleContext';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CompareScreen() {
  const route = useRoute();
  const { selectedCars = [] } = route.params || {};
  const { language } = useLocale();
  const [expandedGroups, setExpandedGroups] = useState({});

  if (!selectedCars.length || selectedCars.length < 2) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Text className="text-lg font-semibold text-gray-600">
          Select at least 2 cars to compare.
        </Text>
      </View>
    );
  }

  const specGroups = getAllSpecGroups(selectedCars[0], language);

  const getMaxValue = (groupIndex, specIndex) => {
    const values = selectedCars.map(
      (car) => getAllSpecGroups(car, language)[groupIndex]?.specs[specIndex]?.value
    );

    const numericValues = values.map((val) => {
      const num = parseFloat(val?.toString().replace(/[^0-9.]/g, ''));
      return isNaN(num) ? null : num;
    }).filter(Boolean);

    return numericValues.length ? Math.max(...numericValues) : null;
  };

  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Sticky Header */}
      <View className="bg-white pt-4 pb-2 shadow-md z-20">
        <Text className="text-xl font-bold text-center text-brand-primary mb-2">
          CAR COMPARISON
        </Text>

        <View className="flex-row justify-around items-center px-2">
          {selectedCars.map((car, idx) => {
            const BrandLogo = brandLogos[car.brand];
            return (
              <View key={idx} className="items-center w-[45%] bg-white py-3 rounded-xl border border-gray-100 shadow-sm">
                {car.image && (
                  <Image
                    source={car.image}
                    className="w-28 h-20 rounded-lg mb-1"
                    resizeMode="contain"
                  />
                )}
                {BrandLogo && <BrandLogo width={60} height={20} style={{ marginBottom: 4 }} />}
                <Text className="text-sm font-bold text-brand-primary capitalize">
                  {car.brand}
                </Text>
                <Text className="text-xs text-gray-500 mt-1 text-center px-1">{car.name?.[language]}</Text>
              </View>
            );
          })}
        </View>

        <View className="flex-row justify-center items-center mt-3 mb-2">
          <View className="flex-1 h-px bg-gray-200" />
          <View className="mx-3 bg-brand-primary rounded-full w-8 h-8 items-center justify-center">
            <Text className="text-white font-bold">VS</Text>
          </View>
          <View className="flex-1 h-px bg-gray-200" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-2" contentContainerStyle={{ paddingBottom: 20 }}>
        {specGroups.map((group, gIndex) => (
          <View key={gIndex} className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden">
            <TouchableOpacity
              onPress={() => toggleGroup(group.groupKey)}
              className="flex-row justify-between items-center px-4 py-3 bg-gray-50"
              activeOpacity={0.7}
            >
              <Text className="text-sm font-bold text-brand-primary">
                {group.groupName}
              </Text>
              <View className="flex-row items-center">
                <Ionicons
                  name={expandedGroups[group.groupKey] ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#46194F"
                />
              </View>
            </TouchableOpacity>

            {expandedGroups[group.groupKey] && (
              <View className="px-4 pt-3 pb-4">
                {group.specs.map((spec, sIndex) => {
                  const max = getMaxValue(gIndex, sIndex);
                  return (
                    <View key={sIndex} className="mb-4">
                      <Text className="text-xs font-medium text-gray-500 mb-2">{spec.name}</Text>
                      <View className="flex-row items-center justify-between">
                        {selectedCars.map((car, index) => {
                          const specData = getAllSpecGroups(car, language)[gIndex]?.specs[sIndex];
                          const value = specData?.value ?? '—';
                          const numeric = parseFloat(value?.toString().replace(/[^0-9.]/g, ''));
                          const percentage = max && !isNaN(numeric) ? Math.min((numeric / max) * 100, 100) : 100;

                          return (
                            <View key={index} className="w-[48%]">
                              <View className="h-1.5 rounded-full bg-gray-100 mb-1 overflow-hidden">
                                <LinearGradient
                                  colors={['#46194F', '#C6AECC']}
                                  start={{ x: 0, y: 0 }}
                                  end={{ x: 1, y: 0 }}
                                  style={{
                                    width: `${percentage}%`,
                                    height: '100%',
                                    borderRadius: 9999,
                                  }}
                                />
                              </View>
                              <Text className="text-xs text-center font-medium text-brand-primary mt-1">
                                {value}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

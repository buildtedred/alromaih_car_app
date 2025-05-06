import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useFinanceFlow } from '../../../contexts/FinanceFlowContext';
import { useLocale } from '../../../contexts/LocaleContext';
import { BottomSheetHeader } from '../../common/BottomSheetHeader';
import carsData from '../../../mock-data';

export default function YearSelectionSheet({ isVisible, onClose, onBack, onSelectYear }) {
  const { locale, direction } = useLocale();
  const { selectedYear, setSelectedYear } = useFinanceFlow();

  // Dynamically get all available years from mock data
  const yearOptions = Array.from(
    new Set(carsData.map((car) => car.specs?.year))
  )
    .filter(Boolean)
    .sort((a, b) => b - a);

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setTimeout(() => {
      onSelectYear(year);
    }, 10);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8 max-h-[80%]" style={{ direction }}>
        <BottomSheetHeader
          title={locale === 'ar' ? 'اختر سنة الصنع' : 'Select Year'}
          description={locale === 'ar' ? 'اختر سنة الموديل التي تفضلها' : 'Choose the model year you prefer.'}
          onClose={onClose}
          onBack={onBack}
        />

        <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
          <View className="flex flex-row flex-wrap gap-3 justify-start">
            {yearOptions.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <TouchableOpacity
                  key={year}
                  onPress={() => handleSelectYear(year)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium ${
                    isSelected
                      ? 'bg-[#46194F] text-white border-[#46194F]'
                      : 'border-gray-300 text-gray-600'
                  }`}
                  activeOpacity={0.8}
                >
                  <Text>{year}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

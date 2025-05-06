import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useFinanceFlow } from '../../../contexts/FinanceFlowContext';
import { useLocale } from '../../../contexts/LocaleContext';
import carsData, { specGroups, getSpecsByGroup } from '../../../mock-data';
import { BottomSheetHeader } from '../../common/BottomSheetHeader';

import StaticCarImage from '../../../assets/images/car14.jpg'; // ✅ Static image

export default function CarDetailSheet({ isVisible, onClose, onBack }) {
  const { selectedBrand, selectedModel, selectedYear, closeFlow } = useFinanceFlow();
  const { locale, direction } = useLocale();

  const selectedCar = carsData.find(
    (car) =>
      car.brand === selectedBrand?.key &&
      car.model === selectedModel?.key &&
      car.specs.year === selectedYear
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View
        className="bg-white rounded-t-3xl px-6 pt-6 pb-12 max-h-[92%]"
        style={{ direction }}
      >
        <BottomSheetHeader
          title={selectedCar?.name?.[locale] || (locale === 'ar' ? 'تفاصيل السيارة' : 'Car Details')}
          description={
            locale === 'ar'
              ? 'تفاصيل كاملة عن السيارة المختارة.'
              : 'Here are the complete details of your selected car.'
          }
          onClose={onClose}
          onBack={onBack}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={StaticCarImage} // ✅ Always use static image
            className="w-full h-48 rounded-2xl mb-5"
            resizeMode="cover"
          />

          {selectedCar ? (
            Object.keys(specGroups).map((groupKey) => {
              const specs = getSpecsByGroup(selectedCar, groupKey, locale);
              if (specs.length === 0) return null;

              return (
                <View key={groupKey} className="mb-6">
                  <Text className="text-lg font-bold text-[#46194F] mb-2">
                    {specGroups[groupKey][locale]}
                  </Text>
                  {specs.map((spec) => (
                    <View
                      key={spec.key}
                      className="flex-row justify-between items-start border-b border-gray-100 py-2"
                    >
                      <Text className="text-sm text-gray-600 font-medium w-1/2">
                        {spec.name}
                      </Text>
                      <Text className="text-sm text-gray-900 w-1/2 text-right">
                        {spec.value}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })
          ) : (
            <Text className="text-red-500 text-center font-semibold py-8">
              {locale === 'ar' ? 'السيارة غير موجودة' : 'Car not found!'}
            </Text>
          )}

          {/* Finish Button */}
          <TouchableOpacity
            onPress={closeFlow}
            className="mt-6 bg-[#46194F] py-4 rounded-full items-center shadow-md"
            activeOpacity={0.85}
          >
            <Text className="text-white text-base font-semibold">
              {locale === 'ar' ? 'إنهاء' : 'Finish & Close'}
            </Text>
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            onPress={onBack}
            className="mt-3 py-3 px-4 rounded-full border border-gray-300 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-gray-700 font-semibold text-sm">
              {locale === 'ar' ? 'العودة إلى البنوك' : 'Back to Banks'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

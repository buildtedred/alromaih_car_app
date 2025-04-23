import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useFinanceFlow } from '../../../contexts/FinanceFlowContext';
import { useLocale } from '../../../contexts/LocaleContext';
import { BottomSheetHeader } from '../../common/BottomSheetHeader';

const banks = [
  'Al Rajhi Bank',
  'SNB (Saudi National Bank)',
  'Riyad Bank',
  'Banque Saudi Fransi',
  'Alinma Bank',
  'SABB',
];

export default function BankSelectionSheet({ isVisible, onClose, onBack, onSelectBank }) {
  const { locale, direction } = useLocale();
  const { selectedBank, setSelectedBank } = useFinanceFlow();

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setTimeout(() => {
      onSelectBank(bank);
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
          title={locale === 'ar' ? 'اختر البنك' : 'Select Bank'}
          description={locale === 'ar' ? 'اختر البنك المفضل لديك للتمويل' : 'Choose your preferred financing bank'}
          onClose={onClose}
          onBack={onBack}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-col gap-3">
            {banks.map((bank) => {
              const isSelected = selectedBank === bank;
              return (
                <TouchableOpacity
                  key={bank}
                  onPress={() => handleBankSelect(bank)}
                  className={`py-4 px-5 rounded-xl border text-sm font-medium ${
                    isSelected
                      ? 'bg-[#46194F] text-white border-[#46194F]'
                      : 'border-gray-200 text-gray-800 bg-gray-50'
                  }`}
                  activeOpacity={0.8}
                >
                  <Text>{bank}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

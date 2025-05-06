import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useFinanceFlow } from '../../../contexts/FinanceFlowContext';
import { useLocale } from '../../../contexts/LocaleContext';
import { BottomSheetHeader } from '../../common/BottomSheetHeader';
import { getCategories } from '../../../mock-data';

export default function CategorySelectionSheet({ isVisible, onClose, onBack, onSelectCategory }) {
  const { locale } = useLocale();
  const { selectedModel, setSelectedCategory } = useFinanceFlow();
  const categories = getCategories(locale);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      onSelectCategory(category);
    }, 10);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8 max-h-[80%]">
        <BottomSheetHeader
          title={locale === 'ar' ? 'اختر الفئة' : 'Select Category'}
          description={
            selectedModel?.name
              ? `${locale === 'ar' ? 'الموديل:' : 'Model:'} ${selectedModel.name}`
              : ''
          }
          onClose={onClose}
        />

        <FlatList
          data={categories}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50"
              onPress={() => handleSelectCategory(item.key)}
              activeOpacity={0.7}
            >
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
}
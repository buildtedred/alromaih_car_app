import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { getModelsByBrand } from '../../../mock-data';
import { useFinanceFlow } from '../../../contexts/FinanceFlowContext';
import { useLocale } from '../../../contexts/LocaleContext';
import { BottomSheetHeader } from '../../common/BottomSheetHeader';

export default function ModelSelectionSheet({ isVisible, onClose, onBack, onSelectModel }) {
  const { locale, direction } = useLocale();
  const { selectedBrand, setSelectedModel } = useFinanceFlow();

  const models = selectedBrand ? getModelsByBrand(selectedBrand.key, locale) : [];

  const handleModelSelect = (model) => {
    // Update context with selected model
    setSelectedModel({
      id: model.key,
      name: model.name,
      brandId: selectedBrand.key,
      brandName: selectedBrand.name
    });
    
    // Trigger next step after a small delay
    setTimeout(() => {
      onSelectModel(model);
    }, 10);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      animationIn={direction === 'rtl' ? 'slideInLeft' : 'slideInRight'}
      animationOut={direction === 'rtl' ? 'slideOutLeft' : 'slideOutRight'}
    >
      <View
        className="bg-white rounded-t-3xl px-6 pt-6 pb-8 max-h-[80%]"
        style={{ direction }}
      >
        <BottomSheetHeader
          title={locale === 'ar' ? 'اختر الموديل' : 'Select Model'}
          description={
            selectedBrand?.name
              ? `${locale === 'ar' ? 'العلامة التجارية:' : 'Brand:'} ${selectedBrand.name}`
              : ''
          }
          onClose={onClose}
        />

        <FlatList
          data={models}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-16">
              <Text className="text-gray-400 text-sm font-medium">
                {locale === 'ar' ? 'لا توجد موديلات متاحة' : 'No models available'}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleModelSelect(item)}
              activeOpacity={0.85}
              className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100"
              style={{
                flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
                alignItems: 'center',
              }}
            >
              <View className="flex-1">
                <Text className="text-gray-900 text-base font-semibold" style={{
                  textAlign: direction === 'rtl' ? 'right' : 'left'
                }}>
                  {item.name}
                </Text>
                {item.description && (
                  <Text className="text-xs text-gray-500 mt-1 leading-tight" style={{
                    textAlign: direction === 'rtl' ? 'right' : 'left'
                  }}>
                    {item.description}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
}
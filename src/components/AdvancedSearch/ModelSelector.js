import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';

export default function ModelSelector({
  selectedModels,
  modelOptions,
  toggleModel,
  setModelModalVisible,
}) {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <View className="mb-6">
      <Text className="text-[16px] font-semibold text-brand mb-2">
        {t('advanced.car_make_model', { defaultValue: 'Car Make & Model' })}
      </Text>

      <View className="border-b border-brand-dark pb-2 min-h-[42px] flex-row flex-wrap items-center">
        {selectedModels.map((key) => {
          const model = modelOptions.find((m) => m.key === key);
          const name = typeof model?.name === 'object' ? model?.name[locale] : model?.name;

          return (
            <View
              key={key}
              className="flex-row items-center bg-brand-light rounded-[10px] px-4 py-3 mr-2 mb-2"
            >
              <Text className="text-[15px] text-brand font-semibold mr-1">
                {name}
              </Text>
              <TouchableOpacity onPress={() => toggleModel(key)}>
                <Ionicons name="close" size={16} color="#46194F" />
              </TouchableOpacity>
            </View>
          );
        })}

        <TouchableOpacity
          onPress={() => setModelModalVisible(true)}
          className="border border-brand-dark bg-white rounded-full px-[10px] py-[5px] mr-2 mb-2"
        >
          <Ionicons name="add" size={20} color="#46194F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

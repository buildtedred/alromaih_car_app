import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';

export default function ModelSelectModal({
  visible,
  onClose,
  options,
  toggleModel,
  selectedModels,
  search,
  setSearch,
}) {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const getLocalizedName = (name) =>
    typeof name === 'object' ? name[locale] : name;

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-white px-4 pt-6">
        <Text className="text-[18px] font-bold text-gray-900 mb-5">
          {t('advanced.search_make_model', { defaultValue: 'Search Make or Model' })}
        </Text>

        <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-[10px] px-4 py-2 mb-5">
          <Ionicons
            name="search-outline"
            size={18}
            color="#888"
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder={t('advanced.search_placeholder', {
              defaultValue: 'Search makes and models...',
            })}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#999"
            className="flex-1 text-[15px] text-gray-800"
          />
        </View>

        {selectedModels.length > 0 && (
          <View className="mb-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 6 }}
            >
              {selectedModels.map((modelKey) => {
                const model = options.find((m) => m.key === modelKey);
                if (!model) return null;
                return (
                  <View
                    key={modelKey}
                    className="flex-row items-center bg-brand px-6 py-3 rounded-[10px] mr-2 max-w-[90%]"
                  >
                    <Text className="text-white text-lg mr-2">
                      {getLocalizedName(model.name)}
                    </Text>
                    <TouchableOpacity onPress={() => toggleModel(modelKey)}>
                      <Ionicons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        <FlatList
          data={options}
          keyExtractor={(item) => item.key}
          className="flex-1"
          renderItem={({ item }) => {
            const isSelected = selectedModels.includes(item.key);
            return (
              <TouchableOpacity
                onPress={() => toggleModel(item.key)}
                className={`flex-row items-center justify-between mt-2 px-3 py-4 border-b border-gray-200 ${
                  isSelected ? 'bg-brand-light rounded-[10px]' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="car-outline"
                    size={30}
                    color={isSelected ? '#46194F' : '#666'}
                    style={{ marginRight: 12 }}
                  />
                  <Text
                    className={`text-[16px] ${
                      isSelected ? 'text-brand font-semibold' : 'text-gray-800'
                    }`}
                  >
                    {getLocalizedName(item.name)}
                  </Text>
                </View>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={25} color="#46194F" />
                )}
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity
          className="bg-brand py-3 rounded-xl items-center mt-6 mb-6"
          onPress={onClose}
        >
          <Text className="text-white font-semibold m-1 text-xl">
            {t('advanced.apply', { defaultValue: 'Apply' })}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

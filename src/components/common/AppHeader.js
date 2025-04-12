import React from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import EnglishSvg from '../../assets/english.svg';
import ArabicSvg from '../../assets/arabic.svg';

export default function AppHeader({ onSearchChange }) {
  const { t } = useTranslation();
  const { toggleLocale, locale } = useLocale();

  return (
    <View className="bg-white p-4 shadow-md rounded-b-2xl">
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-3">
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={{ width: 100, height: 30, resizeMode: 'contain' }}
        />
        <TouchableOpacity onPress={toggleLocale}>
          {locale === 'en' ? (
            <EnglishSvg width={32} height={24} />
          ) : (
            <ArabicSvg width={32} height={24} />
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2">
        <Feather name="search" size={20} color="#999" />
        <TextInput
          placeholder={t('common.search_placeholder')}
          onChangeText={onSearchChange}
          className="ml-2 flex-1 text-sm text-gray-800"
        />
      </View>
    </View>
  );
}

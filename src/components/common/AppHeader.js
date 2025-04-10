import React from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import EnglishSvg from '../../assets/english.svg';
import ArabicSvg from '../../assets/arabic.svg';


export default function AppHeader({ onSearchChange }) {
  const { t } = useTranslation();
  const { toggleLocale, direction, locale } = useLocale();

  // Dynamic classes based on direction
  const flexDirection = direction === 'rtl' ? 'flex-row-reverse' : 'flex-row';
  const textAlign = direction === 'rtl' ? 'text-right' : 'text-left';
  const marginDirection = direction === 'rtl' ? 'mr-2' : 'ml-2';

  return (
    <View className="bg-white p-4 shadow-md rounded-b-2xl">
      {/* Header Row */}
      <View className={`${flexDirection} justify-between items-center mb-3`}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={{ width: 100, height: 30, resizeMode: 'contain' }}
        />
        <TouchableOpacity onPress={toggleLocale}>
          {/* Render SVG based on current locale */}
          {locale === 'en' ? (
            <EnglishSvg width={32} height={24} />
          ) : (
            <ArabicSvg width={32} height={24} />
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className={`${flexDirection} items-center bg-gray-100 rounded-xl px-3 py-2`}>
        <Feather name="search" size={20} color="#999" />
        <TextInput
          placeholder={t('common.search_placeholder')}
          onChangeText={onSearchChange}
          className={`${marginDirection} flex-1 text-sm text-gray-800 ${textAlign}`}
          textAlign={direction === 'rtl' ? 'right' : 'left'}
        />
      </View>
    </View>
  );
}

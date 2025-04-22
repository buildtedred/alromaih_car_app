import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { newsData } from '../../mock-data';
import { useLocale } from '../../contexts/LocaleContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewsSection() {
  const { locale } = useLocale();
  const primaryColor = '#1C74D9';
  const { width } = Dimensions.get('window');

  const getLocalized = (value) =>
    typeof value === 'object' ? value?.[locale] : value;

  const renderItem = ({ item }) => (
    <View className="px-4 mb-4">
      <TouchableOpacity
        activeOpacity={0.9}
        className="bg-white rounded-2xl border border-gray-100 flex-row overflow-hidden"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        {/* Image on the left */}
        <View
          style={{
            width: width * 0.3,
            height: width * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f8f8',
          }}
        >
          <Image
            source={item.image}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        {/* Text on the right */}
        <View className="flex-1 py-3 pr-3 pl-4 justify-center">
          <Text
            className="text-sm font-semibold mb-1"
            style={{ color: primaryColor }}
            numberOfLines={2}
          >
            {getLocalized(item.title)}
          </Text>
          <Text className="text-xs text-gray-600" numberOfLines={2}>
            {getLocalized(item.description)}
          </Text>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-xs text-gray-400">{item.date}</Text>
            <Icon name="chevron-right" size={18} color={primaryColor} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="mb-8">
      <Text
        className="text-xl font-bold px-4 mb-4"
        style={{ color: primaryColor }}
      >
        {locale === 'ar' ? 'آخر الأخبار' : 'Latest News'}
      </Text>

      <FlatList
        data={newsData.slice(0, 3)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );
}

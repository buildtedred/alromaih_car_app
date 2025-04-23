// src/screens/BlogScreen.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocale } from '../contexts/LocaleContext';
import { newsData } from '../mock-data';
import { useNavigation } from '@react-navigation/native';

export default function BlogScreen() {
  const { locale } = useLocale();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const getLocalized = (value) => (typeof value === 'object' ? value?.[locale] : value);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewsDetail', { news: item })}
      className="flex-row bg-white border border-gray-100 rounded-xl mb-3 mx-4 overflow-hidden"
    >
      <Image
        source={item.image}
        style={{ width: width * 0.3, height: width * 0.2 }}
        resizeMode="cover"
      />
      <View className="flex-1 px-4 py-3 justify-center">
        <Text className="text-sm font-bold mb-1" numberOfLines={2}>{getLocalized(item.title)}</Text>
        <Text className="text-xs text-gray-500">{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white pt-3">
      <FlatList
        data={newsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

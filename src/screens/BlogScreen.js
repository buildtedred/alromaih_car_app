import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocale } from '../contexts/LocaleContext';
import { newsData } from '../mock-data';
import { useNavigation } from '@react-navigation/native';

export default function BlogScreen() {
  const { locale } = useLocale();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const getLocalized = (value) => {
    if (typeof value === 'object' && value !== null) {
      return value[locale] || value['en'] || '';
    }
    return value || '';
  };

  const handlePress = (item) => {
    navigation.navigate('NewsDetail', { news: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      activeOpacity={0.85}
      className="flex-row bg-white rounded-2xl mx-4 mb-5 border border-gray-200"
      style={{
        height: 110, // ✅ Increased height
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: width * 0.3,
          height: 100,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 10, // ✅ Added left padding to car
          backgroundColor: '#fff', // ✅ No dark background/shadow
        }}
      >
        <Image
          source={item.image}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain', // ✅ Full car visible, no cut
          }}
        />
      </View>

      <View className="flex-1 px-4 justify-center">
        <Text className="text-base font-bold text-gray-900 mb-2" numberOfLines={2}>
          {getLocalized(item.title)}
        </Text>
        <Text className="text-xs text-gray-500">{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 pt-4">
      <FlatList
        data={newsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-gray-500 text-sm">No news available</Text>
          </View>
        )}
      />
    </View>
  );
}

import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const moreItems = [
  {
    title: 'Forums',
    subtitle: 'Discuss about everything on wheel',
    icon: 'forum-outline',
  },
  {
    title: 'Blog',
    subtitle: 'Latest auto industry updates',
    icon: 'newspaper-variant-outline',
  },
  {
    title: 'New Car Prices',
    subtitle: 'Get the latest price list',
    icon: 'tag-outline',
  },
  {
    title: 'Car Reviews',
    subtitle: 'Help you find the right car',
    icon: 'star-outline',
  },
  {
    title: 'Car Comparisons',
    subtitle: 'Compare car specifications and features',
    icon: 'car-sports',
  },
];

export default function BrowseScreen() {
  const navigation = useNavigation();

  const handlePress = (item) => {
    switch(item.title) {
      case 'Car Reviews':
        navigation.navigate('ReviewScreen');
        break;
      case 'Blog':
        navigation.navigate('Blog'); // Simple navigation without payload
        break;
      // Add other cases as needed
      default:
        console.log('No navigation defined for', item.title);
    }
  };

  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm mt-4 mx-4 flex-1">
      <Text className="text-lg font-bold text-gray-900 mb-4">
        Browse More
      </Text>

      <FlatList
        data={moreItems}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View className="border-b border-gray-100 my-2" />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            activeOpacity={0.8}
            className="flex-row items-center justify-between py-2"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center mr-3">
                <Icon name={item.icon} size={22} color="#4B5563" />
              </View>
              <View>
                <Text className="text-base font-semibold text-gray-800">
                  {item.title}
                </Text>
                <Text className="text-xs text-gray-500">
                  {item.subtitle}
                </Text>
              </View>
            </View>

            <Icon name="chevron-right" size={22} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
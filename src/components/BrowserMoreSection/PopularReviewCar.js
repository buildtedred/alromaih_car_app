import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// All cars use the same image
const popularCars = [
  {
    id: '1',
    name: 'Toyota Corolla',
    image: require('../../assets/images/car10.png'),
    rating: 5,
    reviews: 636,
  },
  {
    id: '2',
    name: 'Honda Civic',
    image: require('../../assets/images/car10.png'),
    rating: 4,
    reviews: 512,
  },
  {
    id: '3',
    name: 'Hyundai Elantra',
    image: require('../../assets/images/car10.png'),
    rating: 4,
    reviews: 488,
  },
  {
    id: '4',
    name: 'Kia Sportage',
    image: require('../../assets/images/car10.png'),
    rating: 5,
    reviews: 745,
  },
  {
    id: '5',
    name: 'Honda City',
    image: require('../../assets/images/car10.png'),
    rating: 4,
    reviews: 398,
  },
];

export default function PopularReviewCar() {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color="#facc15"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const renderCarItem = ({ item }) => (
    <View className="bg-white rounded-xl shadow-md overflow-hidden mr-4 w-44">
      <View className="bg-white justify-center items-center h-32 px-2 pt-2">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="contain" // ✅ prevent cut/crop
        />
      </View>
      <View className="p-3">
        <Text className="text-base font-bold text-gray-800 mb-2 text-center">
          {item.name}
        </Text>
        <View className="flex-row justify-center mb-1">
          {renderStars(item.rating)}
        </View>
        <Text className="text-center text-gray-500 text-sm">
          {item.reviews} Reviews
        </Text>
      </View>
    </View>
  );
  
  return (
    <View className="px-4 py-6 bg-white">
      <Text className="text-lg font-bold text-gray-900 mb-4">
        Popular Reviewed Cars
      </Text>
      <FlatList
        data={popularCars}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCarItem}
      />
    </View>
  );
}

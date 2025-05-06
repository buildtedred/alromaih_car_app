import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, Dimensions, ActivityIndicator, Text } from 'react-native';

const { width } = Dimensions.get('window');

export default function SliderBanner() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch('https://67c7bf7cc19eb8753e7a9248.mockapi.io/api/alromaihCarousel')
      .then((res) => res.json())
      .then((data) => {
        setSlides(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching slides:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }, 3000); // change every 3 seconds

      return () => clearInterval(intervalRef.current);
    }
  }, [currentIndex, slides]);

  if (loading) {
    return (
      <View className="h-48 justify-center items-center">
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  if (!slides.length) {
    return (
      <View className="h-48 justify-center items-center">
        <Text>No slides available</Text>
      </View>
    );
  }

  return (
    <View className="mt-4 mb-2">
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={{ width, paddingHorizontal: 10 }}>
            <Image
              source={{ uri: item.avatar }}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 180,
                borderRadius: 10,
                backgroundColor: '#eee',
              }}
              onError={() => console.warn('Image failed to load:', item.avatar)}
            />
          </View>
        )}
      />
    </View>
  );
}

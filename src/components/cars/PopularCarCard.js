
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLocale } from '../../contexts/LocaleContext';

export default function PopularCarCard({ car, onPress }) {
  const { locale } = useLocale();
  const { width } = useWindowDimensions();

  const getLocalized = (value) => {
    if (!value) return '';
    return typeof value === 'object' ? value[locale] : value;
  };

  // Responsive values
  const imageSize = width < 400 ? 100 : 120;
  const cardMargin = width < 400 ? 1 : 2;
  const textBaseSize = width < 400 ? 'sm' : 'base';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className={`
        bg-white rounded-2xl shadow-md flex-row py-3 mb-5 
        mx-${cardMargin} items-center
        ${width < 350 ? 'w-[95%] self-center' : ''}
      `}
    >
      {/* Car Image */}
      <Image
        source={car.image}
        resizeMode="contain"
        className="rounded-lg mr-4"
        style={{ 
          width: imageSize, 
          height: imageSize * 0.875, // Maintain aspect ratio
        }}
      />

      {/* Car Info */}
      <View className="flex-1">
        <Text
          className={`text-${textBaseSize} font-bold text-gray-900 mb-1`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {`${getLocalized(car.name)} | ${getLocalized(car.brand)}`}
        </Text>

        <Text className="text-lg font-bold text-[#46194F] mb-2">
          {`${car.cashPrice?.toLocaleString() || ''} ${
            locale === 'en' ? 'SAR' : 'ر.س'
          }`}
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {car.specs?.fuelType && (
            <View className="w-[48%] flex-row items-center mb-2">
              <Icon name="gas-station" size={14} color="#777" className="mr-1" />
              <Text className="text-xs text-gray-600">
                {getLocalized(car.specs.fuelType)}
              </Text>
            </View>
          )}

          {car.specs?.year && (
            <View className="w-[48%] flex-row items-center mb-2">
              <Icon name="calendar" size={14} color="#777" className="mr-1" />
              <Text className="text-xs text-gray-600">{car.specs.year}</Text>
            </View>
          )}

          {car.specs?.mileage && (
            <View className="w-[48%] flex-row items-center mb-2">
              <Icon name="speedometer" size={14} color="#777" className="mr-1" />
              <Text className="text-xs text-gray-600">
                {getLocalized(car.specs.mileage)}
              </Text>
            </View>
          )}

          {car.specs?.location && (
            <View className="w-[48%] flex-row items-center mb-2">
              <Icon name="map-marker" size={14} color="#777" className="mr-1" />
              <Text className="text-xs text-gray-600">
                {getLocalized(car.specs.location)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
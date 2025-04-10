import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useLocale } from '../../contexts/LocaleContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CarCard({ car }) {
  const { locale, direction } = useLocale();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { width } = useWindowDimensions();
  
  // Calculate responsive dimensions
  const cardWidth = width * 0.85; // 85% of screen width
  const imageHeight = cardWidth * 0.6; // 60% of card width

  const getLang = (field) => (locale === 'en' ? field?.en : field?.ar);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  // RTL/LTR styling
  const flexDir = direction === 'rtl' ? 'flex-row-reverse' : 'flex-row';
  const textAlign = direction === 'rtl' ? 'text-right' : 'text-left';
  const marginDir = direction === 'rtl' ? 'mr-2' : 'ml-2';
  const cardMargin = direction === 'rtl' ? 'mr-4 ml-0' : 'ml-4 mr-0';

  return (
    <View 
      className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
      style={{ 
        width: cardWidth,
        marginHorizontal: cardMargin 
      }}
    >
     <View className="w-full bg-gray-100 rounded-t-2xl overflow-hidden" 
      style={{ height: imageHeight }}>
  <Image
    source={car.image}
    className="w-full h-full"
    resizeMode="contain"
    style={{
      backgroundColor: 'transparent',
    }}
  />
</View>
      {/* Car Info */}
      <View className="p-4 space-y-3">
        {/* Car Title and Brand */}
        <View className={`${flexDir} justify-between items-center`}>
          <Text className={`text-xl font-bold text-gray-800 ${textAlign} flex-1`}>
            {getLang(car.name)}
          </Text>
          <Image 
            source={car.brandLogo} 
            className="w-12 h-12"
            resizeMode="contain" 
          />
        </View>

        {/* Price and Installment Price */}
        <View className={`${flexDir} justify-between items-center`}>
          <Text className={`text-lg font-semibold text-green-600 ${textAlign}`}>
            {car.cashPrice?.toLocaleString()} {locale === 'en' ? 'SAR' : 'ر.س'}
          </Text>
          <Text className={`text-sm text-gray-600 ${textAlign}`}>
            {locale === 'en' ? 'Installment' : 'أقساط'}: {car.installmentPrice} {locale === 'en' ? 'SAR/month' : 'ر.س/شهر'}
          </Text>
        </View>

        {/* Model Year and Year */}
        <View className={`${flexDir} justify-between border-t border-gray-200 pt-2`}>
          <Text className={`text-sm text-gray-600 ${textAlign}`}>{getLang(car.modelYear)}</Text>
          <Text className={`text-sm text-gray-600 ${textAlign}`}>{car.specs.year}</Text>
        </View>

        {/* Specs Section */}
        {isDetailsVisible && (
          <View className="space-y-2">
            {/* Fuel, Seats, Transmission */}
            <View className={`${flexDir} justify-between`}>
              <View className={`${flexDir} items-center`}>
                <Icon name="tint" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.fuelType)}
                </Text>
              </View>
              <View className={`${flexDir} items-center`}>
                <Icon name="users" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.seats)}
                </Text>
              </View>
              <View className={`${flexDir} items-center`}>
                <Icon name="cogs" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.transmission)}
                </Text>
              </View>
            </View>

            {/* Drive Type, Mode */}
            <View className={`${flexDir} justify-between`}>
              <View className={`${flexDir} items-center`}>
                <Icon name="car" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.driveType)}
                </Text>
              </View>
              <View className={`${flexDir} items-center`}>
                <Icon name="road" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.drivingMode)}
                </Text>
              </View>
            </View>

            {/* Engine, Power, Torque */}
            <View className={`${flexDir} justify-between`}>
              <View className={`${flexDir} items-center`}>
                <Icon name="rocket" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.engine)}
                </Text>
              </View>
              <View className={`${flexDir} items-center`}>
                <Icon name="bolt" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.power)}
                </Text>
              </View>
              <View className={`${flexDir} items-center`}>
                <Icon name="tachometer" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.torque)}
                </Text>
              </View>
            </View>

            {/* Dimensions */}
            <View className={`${flexDir} justify-between`}>
              <View className={`${flexDir} items-center`}>
                <Icon name="ravelry" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.length)}
                </Text>
              </View>
              <View className={`${flexDir} items-center`}>
                <Icon name="arrows-alt-h" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.width)}
                </Text>
              </View>
              <View className={`${flexDir} items-center`}>
                <Icon name="arrows-alt-v" size={20} color="gray" />
                <Text className={`text-sm text-gray-700 ${marginDir} ${textAlign}`}>
                  {getLang(car.specs.height)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* View More/Less Button */}
        <TouchableOpacity 
          className={`${flexDir} justify-between items-center mt-4`} 
          onPress={toggleDetails}
        >
          <Text className="text-sm font-semibold text-blue-500">
            {isDetailsVisible ? 
              (locale === 'en' ? 'View Less' : 'عرض أقل') : 
              (locale === 'en' ? 'View More Details' : 'عرض المزيد')}
          </Text>
          <Icon 
            name={isDetailsVisible ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="blue" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
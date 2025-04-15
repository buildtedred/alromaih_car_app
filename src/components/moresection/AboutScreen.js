import React from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import LocationPin from '../../assets/images/LocationPin.svg';
import Car from '../../assets/images/Car.svg';
import Handshake from '../../assets/images/Handshake.svg';
import MobileMap from '../../assets/images/MobileMap.svg';
import SteeringWheel from '../../assets/images/SteeringWheel.svg';
import Coin from '../../assets/images/Coin.svg'; // Added Coin SVG
import AppFooter from '../../components/common/AppFooter'; 
const AboutScreen = () => {
  const route = useRoute();
  const locale = route.params?.locale || 'ar';
  const isRTL = locale === 'ar';
  const { width } = Dimensions.get('window');

  return (
    <ScrollView 
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Image */}
      <View className="px-4 pt-4">
        <Image
          source={require('../../assets/images/companyimg.jpg')}
          className="w-full rounded-2xl"
          style={{ height: width * 0.6 }}
          resizeMode="cover"
        />
      </View>

      {/* Main Card */}
      <View className="bg-white mx-4 my-4 p-4 rounded-2xl shadow-md">
        {/* Heading */}
        <Text
          className={`text-xl font-bold text-blue-900 mb-4 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
        >
          {isRTL ? 'تعرف على الرميح للسيارات' : 'About Al Rumaih Cars'}
        </Text>

        {/* Timeline Section */}
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text
              className={`text-lg text-gray-700 mb-6 ${
                isRTL ? 'text-right mr-2' : 'text-left'
              }`}
              style={isRTL ? { writingDirection: 'rtl' } : {}}
            >
              {isRTL
                ? 'منذ عام 1996م انطلقنا في رحلة مليئة بالشغف والابتكار، نحو مستقبلٍ مشرق في عالم السيارات. بخطى واثقة ورؤية واضحة، بنينا جسور الثقة مع عملائنا، وحققنا نجاحات متتالية نفاخر بها.'
                : 'Since 1996, we embarked on a journey full of passion and innovation towards a bright future in the world of cars. With confident steps and a clear vision, we built bridges of trust with our customers and achieved successive successes that we are proud of.'}
            </Text>

            <View className="flex-row justify-center items-center mb-4">
              <LocationPin width={60} height={60} style={{ marginHorizontal: 10 }} />
              <Car width={160} height={150} style={{ marginHorizontal: 10 }} />
              <LocationPin width={60} height={60} style={{ marginHorizontal: 10 }} />
            </View>
          </View>
        </View>
      </View>

      {/* First Additional Card */}
      <View className="bg-white mx-4 my-2 p-4 rounded-2xl shadow-md">
        <Text
          className={`text-xl font-bold text-blue-900 mb-3 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
        >
          {isRTL ? 'رؤيتنا' : 'Creating a Giant Entity'}
        </Text>
        <Text
          className={`text-base text-gray-700 mb-2 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
          style={isRTL ? { writingDirection: 'rtl' } : {}}
        >
          {isRTL
            ? 'أن نكون الوجهة الأولى للعملاء في مجال السيارات الفاخرة، وأن نقدم تجربة فريدة ومتميزة تلبي جميع توقعاتهم.'
            : 'With Multiple Branches'}
        </Text>
        <Text
          className={`text-base text-gray-700 mb-4 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
          style={isRTL ? { writingDirection: 'rtl' } : {}}
        >
          {isRTL
            ? ''
            : 'To be the premier destination for luxury car customers, offering a unique and distinguished experience that meets all their expectations.'}
        </Text>
        
        <View className="flex-row justify-center items-center">
          <MobileMap width={180} height={180} />
        </View>
      </View>

      {/* Second Additional Card */}
      <View className="bg-white mx-4 my-2 p-4 rounded-2xl shadow-md">
        <Text
          className={`text-xl font-bold text-blue-900 mb-3 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
        >
          {isRTL ? 'قيمنا' : 'Our Values'}
        </Text>
        
        <Text
          className={`text-base text-gray-700 mb-4 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
          style={isRTL ? { writingDirection: 'rtl' } : {}}
        >
          {isRTL
            ? 'الثقة، الجودة، الابتكار، والالتزام بتجربة العميل هي القيم الأساسية التي تقود أعمالنا.'
            : 'Trust, quality, innovation, and commitment to customer experience are the core values that drive our business.'}
        </Text>
        
        <View className="flex-row justify-center items-center">
          <Handshake width={180} height={180} />
        </View>
      </View>

      {/* Third Additional Card */}
      <View className="bg-white mx-4 my-2 p-4 rounded-2xl shadow-md">
        <Text
          className={`text-xl font-bold text-blue-900 mb-3 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
        >
          {isRTL ? 'خبرتنا' : 'Our Expertise'}
        </Text>
        
        <Text
          className={`text-base text-gray-700 mb-4 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
          style={isRTL ? { writingDirection: 'rtl' } : {}}
        >
          {isRTL
            ? 'أكثر من عقدين من الخبرة في مجال السيارات الفاخرة وتقديم أفضل الحلول لعملائنا الكرام.'
            : 'Over two decades of expertise in luxury cars, delivering premium solutions for our valued customers.'}
        </Text>
        
        <View className="flex-row justify-center items-center">
          <SteeringWheel width={180} height={180} />
        </View>
      </View>

      {/* Fourth Additional Card - Financing */}
      <View className="bg-white mx-4 my-2 p-4 rounded-2xl shadow-md">
        <Text
          className={`text-xl font-bold text-blue-900 mb-3 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
        >
          {isRTL ? 'تسهيل عملية البيع' : 'Facilitating the sales process through'}
        </Text>
        
        <Text
          className={`text-base text-gray-700 mb-2 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
          style={isRTL ? { writingDirection: 'rtl' } : {}}
        >
          {isRTL
            ? 'مصادر تمويل متنوعة'
            : 'various financing sources'}
        </Text>
        
        <Text
          className={`text-base text-gray-700 mb-4 ${
            isRTL ? 'text-right mr-2' : 'text-left'
          }`}
          style={[
            isRTL ? { writingDirection: 'rtl' } : {},
            { textAlign: 'center', fontStyle: 'italic' }
          ]}
        >
          {'(Cash - Banks - Finance Companies)'}
        </Text>
        
        <View className="flex-row justify-center items-center">
          <Coin width={180} height={180} />
        </View>
      </View>

      {/* Bottom padding */}
      <View className="pb-8" />
      <AppFooter />
    </ScrollView>
  );
};

export default AboutScreen;
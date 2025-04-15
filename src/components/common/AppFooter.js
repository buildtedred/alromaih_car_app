import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, SafeAreaView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Import your images
const Visa = require('../../assets/images/Visa.png');
const Vat = require('../../assets/images/Vat.png');
const MasterCard = require('../../assets/images/MasterCard.png');
const Maroof = require('../../assets/images/Maroof.png');
const Mada = require('../../assets/images/Mada.png');

const AppDesign = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-brand-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View className="bg-brand-primary mx-4 my-4 p-6 rounded-xl">
          <Text className="text-3xl font-bold mb-4 text-white">Welcome</Text>
          <Text className="text-brand-light text-lg leading-6">
            Discover our premium services and exclusive offers tailored just for you.
          </Text>
        </View>

        {/* Contact Section */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Phone Button */}
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:+920031202')}
              activeOpacity={0.9}
            >
              <View className="flex-row items-center p-5 border-b border-gray-100">
                <View className="bg-purple-100 p-3 rounded-full mr-4">
                  <MaterialIcons name="phone" size={24} color="#7e22ce" />
                </View>
                <View>
                  <Text className="text-gray-500 text-xs">Phone Number</Text>
                  <Text className="text-black text-lg font-semibold">9200 31 202</Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="#9ca3af"
                  style={{ marginLeft: 'auto' }}
                />
              </View>
            </TouchableOpacity>

            {/* Email Button */}
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:info@alomalhcars.com')}
              activeOpacity={0.9}
            >
              <View className="flex-row items-center p-5">
                <View className="bg-brand-primary p-3 rounded-full mr-4">
                  <MaterialIcons name="email" size={24} color="#EDE8EE" />
                </View>
                <View>
                  <Text className="text-gray-500 text-xs">Email Address</Text>
                  <Text className="text-black text-lg font-semibold">info@alomalhcars.com</Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="#9ca3af"
                  style={{ marginLeft: 'auto' }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Methods Section */}
        <View className="bg-white mx-6 p-6 rounded-xl shadow-lg mb-8">
          <Text className="text-gray-700 text-center text-lg font-medium mb-4">
            We Accept
          </Text>
          <View className="flex-row justify-around items-center mb-6">
            <Image source={Visa} className="w-8 h-6 object-contain" />
            <Image source={MasterCard} className="w-8 h-6 object-contain" />
            <Image source={Mada} className="w-8 h-6 object-contain" />
            <Image source={Maroof} className="w-8 h-6 object-contain" />
            <Image source={Vat} className="w-8 h-6 object-contain" />
          </View>
          
          {/* Links Section */}
          <View className="flex-col items-center space-y-1.5">
            <View className="flex-row items-center px-2">
              <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text className="text-brand-primary text-xs pr-2">About Us</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                <Text className="text-brand-primary text-xs pl-">|  Privacy Policy </Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                <Text className="text-brand-primary text-xs pr-2"> |  Terms & Condition </Text>
              </TouchableOpacity>
            </View>
            
            <Text className="text-gray-400 text-xs text-center px-2 pt-2">
              © 2025 Alromaih. All rights reserved
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppDesign;
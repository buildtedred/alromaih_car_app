import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Bank logos
import SNB from '../assets/images/SNB.png';
import RiyadBank from '../assets/images/RiyadBank.png';
import BankAlbilad from '../assets/images/Bank_Albilad.png';
import BanqueSaud from '../assets/images/banque-saud.png';
import Alrajhi from '../assets/images/alrajhi.png';
import Alyusr from '../assets/images/alyusr.png';

export default function MoreScreen({ navigation }) {
  const menuItems = [
    { id: 1, icon: 'call-outline', title: 'Call us' },
    { id: 2, icon: 'information-circle-outline', title: 'About Syarah' },
    { id: 3, icon: 'document-text-outline', title: 'Terms and Conditions' },
    { id: 4, icon: 'shield-checkmark-outline', title: 'Privacy Policy' }
  ];

  const handlePress = (item) => {
    switch (item.title) {
      case 'Call us':
        Linking.openURL('tel:920002470'); // Replace with your actual number
        break;
      case 'About Syarah':
        navigation.navigate('About');
        break;
      case 'Terms and Conditions':
        navigation.navigate('Terms');
        break;
      case 'Privacy Policy':
        navigation.navigate('Privacy');
        break;
      default:
        console.log(`Pressed: ${item.title}`);
    }
  };

  return (
    <ScrollView className="bg-gray-50 p-4">
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-primary mb-2">Alromaih</Text>
        <Text className="text-xl font-semibold text-gray-700">Buy New Car</Text>
      </View>

      {/* Menu Items */}
      <View className="bg-white rounded-lg shadow-sm mb-6">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center p-4 border-b border-gray-100"
            onPress={() => handlePress(item)}
          >
            <Ionicons name={item.icon} size={24} color="#003366" />
            <Text className="text-base text-gray-800 ml-4">{item.title}</Text>
            <View className="ml-auto">
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View className="bg-white rounded-lg shadow-sm p-4 items-center">
        <Text className="text-sm text-gray-500 text-center mb-4">
          Syarah is a registered company at the Ministry of Trade and Investment 
          and with the support of Elm Company, with a commercial record No. 1010538980
        </Text>

        {/* Bank Logos */}
        <View className="flex-row flex-wrap justify-center gap-x-4 gap-y-3 mt-2">
          <Image source={SNB} style={{ width: 60, height: 30, resizeMode: 'contain' }} />
          <Image source={RiyadBank} style={{ width: 60, height: 30, resizeMode: 'contain' }} />
          <Image source={BankAlbilad} style={{ width: 60, height: 30, resizeMode: 'contain' }} />
          <Image source={BanqueSaud} style={{ width: 60, height: 30, resizeMode: 'contain' }} />
          <Image source={Alrajhi} style={{ width: 60, height: 30, resizeMode: 'contain' }} />
          <Image source={Alyusr} style={{ width: 60, height: 30, resizeMode: 'contain' }} />
        </View>
      </View>
    </ScrollView>
  );
}
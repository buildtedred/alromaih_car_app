import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MoreScreen() {
  const menuItems = [
    { id: 1, icon: 'call-outline', title: 'Call us' },
    { id: 2, icon: 'information-circle-outline', title: 'About Syarah' },
    { id: 3, icon: 'document-text-outline', title: 'Terms and Conditions' },
    { id: 4, icon: 'shield-checkmark-outline', title: 'Privacy Policy' }
  ];



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
      <View className="bg-white rounded-lg shadow-sm p-4">
        <Text className="text-sm text-gray-500 text-center">
          Syarah is a registered company at the Ministry of Trade and Investment 
          and with the support of Elm Company, with a commercial record No. 1010538980
        </Text>
      </View>
    </ScrollView>
  );
}
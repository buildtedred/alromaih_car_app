import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import EnglishTerms from '../../assets/images/English-Terms.svg';
import AppFooter from '../../components/common/AppFooter'; 

export default function TermsScreen() {
  return (
    <ScrollView className="bg-white px-6 py-6">
      {/* Image at the top */}
      <View className="items-center mb-6">
        <EnglishTerms width={300} height={200} />
      </View>

      {/* Introduction paragraph */}
      <View className="mb-8 mx-4">
        <Text className="text-3xl font-bold text-gray-900">Terms & Conditions</Text>
        <Text className="text-sm text-gray-800 leading-6 text-justify mt-4">
          Welcome to Al Rumaih Cars! These Terms of Service govern your access to and use of 
          Al Rumaih Cars application, products, and services. By using our services, you agree to 
          be bound by these terms. Please read them carefully.
        </Text>
      </View>

      {/* Terms Sections */}
      <View className="space-y-8 mx-4">
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">1. Acceptance of Terms</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            By accessing or using Al Rumaih Cars application, products, or services, you agree 
            to be bound by these Terms of Service. If you do not agree to all the terms and 
            conditions of this agreement, you may not access the application or use any services.
          </Text>
        </View>

        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">2. Use of Services</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            You agree to use Al Rumaih Cars services only for lawful purposes and in a manner 
            consistent with all applicable laws and regulations. You may not use the car services 
            in any unauthorized or unlawful activities.
          </Text>
        </View>

        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">3. Intellectual Property</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            All content included on Al Rumaih Cars application, such as text, graphics, logos, 
            button icons, images, audio clips, digital downloads, data compilations, and 
            software, is the property of Al Rumaih Cars or its content suppliers and protected 
            by copyright laws.
          </Text>
        </View>

        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">4. Limitation of Liability</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            Al Rumaih Cars, its officers, directors, employees, or agents will not be liable 
            to you under any circumstances for any direct, indirect, incidental, special, 
            punitive, or consequential damages whatsoever resulting from any errors, mistakes, 
            or inaccuracies in content or personal information, injury or property damage, of 
            any nature whatsoever, resulting from your access to and use of our services.
          </Text>
        </View>

        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">5. Governing Law</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
            These Terms of Service shall be governed by and construed in accordance with the 
            laws of the Kingdom of Saudi Arabia.
          </Text>
        </View>
      </View>

      {/* Footer Note */}
      <View className="mt-12 mb-10 mx-4">
        <Text className="text-sm text-gray-700 italic leading-relaxed mb-8 text-justify">
          If you have any questions about these Terms, please contact us at 
          <Text className="text-primary font-semibold"> info@alrumaihcars.com</Text>.
        </Text>
      </View>

      {/* ✅ Footer Component */}
      <AppFooter />
    </ScrollView>
  );
}

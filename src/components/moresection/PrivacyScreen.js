import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Privacy from '../../assets/images/Privacy.svg';
import AppFooter from '../../components/common/AppFooter'; 

export default function PrivacyScreen() {
  return (
    <ScrollView className="bg-white px-6 py-6">
      {/* Image at the top */}
      <View className="items-center mb-6">
        <Privacy width={300} height={200} />
      </View>


     {/* Introduction paragraph with margins */}
<View className="mb-8 mx-4">
  <Text className="text-3xl font-bold text-gray-900">Privacy Policy</Text>
  <Text className="text-sm text-gray-800 leading-6 text-justify mt-4">
  At Al Rumaih Cars, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application. We encourage you to read this policy carefully to understand how we handle your data.
  </Text>
</View>

      {/* Terms Sections with margins */}
      <View className="space-y-8 mx-4">
        {/* Section 1 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">1. Information We Collect</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
          Al Rumaih Cars may collect personal information from you when you visit our application or interact with us in any way. This information may include your name, email address, phone number, and any other information you provide to us.
          </Text>
        </View>

        {/* Section 2 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">2. How We Use Your Information</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
          We may use the information we collect from you to communicate with you, personalize your experience, and provide offers and promotions to you.
          </Text>
        </View>

        {/* Section 3 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">3. Information Sharing</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
          We may share your information with third-party service providers who help us operate our application, conduct our business, or serve you. We may also share your information when required by law or to protect our rights.
          </Text>
        </View>

        {/* Section 4 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">4. Security</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
          We take reasonable measures to protect the information we collect from you against unauthorized access, alteration, disclosure, or destruction.
          </Text>
        </View>

        {/* Section 5 */}
        <View>
          <Text className="text-base font-bold text-gray-900 mb-2">5. Your Choices</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
          You can choose not to provide certain information to us, but this may limit your ability to use some features of our services. You can also opt out of receiving promotional emails from us.
          </Text>
        </View>

         {/* Section 6 */}
         <View>
          <Text className="text-base font-bold text-gray-900 mb-2">6. Changes to This Privacy Policy</Text>
          <Text className="text-sm text-gray-800 leading-6 text-justify mb-8">
          Al Rumaih Cars reserves the right to update or change this Privacy Policy at any time. Any changes will be posted on this page.

By using our application or services, you consent to the collection and use of your information as described in this Privacy Policy.

If you have any questions about our Terms of Service or Privacy Policy, please contact us through our 'Contact Us' page.
          </Text>
        </View>
      </View>

     <AppFooter />
    </ScrollView>
  );
}
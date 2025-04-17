// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';

// // Enable animation on Android
// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental &&
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default function FinancialDetailsScreen() {
//   const [isFinancialExpanded, setIsFinancialExpanded] = useState(false);

//   const toggleFinancialDetails = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setIsFinancialExpanded(!isFinancialExpanded);
//   };

//   return (
//     <View className="flex-1 p-5 bg-white">
//       {/* Financial Section */}
//       <TouchableOpacity
//         onPress={toggleFinancialDetails}
//         className="bg-gray-100 p-4 rounded-2xl mb-4 shadow-sm"
//       >
//         <Text className="text-lg font-semibold text-gray-800">Financial</Text>
//         {isFinancialExpanded && (
//           <View className="mt-3">
//             <Text className="text-gray-600">• Monthly Installments</Text>
//             <Text className="text-gray-600">• 0% Down Payment Available</Text>
//             <Text className="text-gray-600">• Up to 5 Years Plan</Text>
//             <Text className="text-gray-600">• Partnered Banks: Al Rajhi, NCB</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       {/* Cash Section */}
//       <View className="bg-gray-100 p-4 rounded-2xl shadow-sm">
//         <Text className="text-lg font-semibold text-gray-800">Cash</Text>
//         <View className="mt-3">
//           <Text className="text-gray-600">• Special Discounts</Text>
//           <Text className="text-gray-600">• Immediate Delivery</Text>
//           <Text className="text-gray-600">• No Processing Fees</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

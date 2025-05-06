// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Modal from 'react-native-modal';
// import { useFinanceFlow } from '../../contexts/FinanceFlowContext';

// export default function CenterTabIcon({ focused }) {
//   const [isVisible, setIsVisible] = useState(false);
//   const { startFlow } = useFinanceFlow();

//   const closeModal = () => setIsVisible(false);

//   return (
//     <View className="items-center justify-center">
//       <TouchableOpacity
//         onPress={() => setIsVisible(true)}
//         className="absolute -top-8 w-16 h-16 rounded-full bg-[#46194F] justify-center items-center shadow-md"
//         style={{
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.2,
//           shadowRadius: 4,
//           elevation: 8,
//         }}
//       >
//         <Ionicons name="add" size={28} color="#fff" />
//       </TouchableOpacity>

//       <Text className={`mt-9 text-[14px] font-bold ${focused ? 'text-[#46194F]' : 'text-gray-400'}`}>
//         Finance
//       </Text>

//       <Modal
//         isVisible={isVisible}
//         onBackdropPress={closeModal}
//         onBackButtonPress={closeModal}
//         style={{ justifyContent: 'flex-end', margin: 0 }}
//       >
//         <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8">
//           <Text className="text-2xl font-bold text-gray-900 mb-1">Get Your Dream Car</Text>
//           <Text className="text-sm text-gray-500 mb-6">Explore flexible options</Text>

//           <TouchableOpacity
//             onPress={() => {
//               closeModal();
//               startFlow('cash');
//             }}
//             className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200 flex-row justify-between items-center"
//           >
//             <View>
//               <Text className="text-base font-semibold text-gray-900">Cash Payment</Text>
//               <Text className="text-xs text-gray-500 mt-1">Pay the full amount upfront</Text>
//             </View>
//             <Text className="text-xs font-bold text-red-500">10% OFF</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => {
//               closeModal();
//               startFlow('finance');
//             }}
//             className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 flex-row justify-between items-center"
//           >
//             <View>
//               <Text className="text-base font-semibold text-gray-900">Finance Options</Text>
//               <Text className="text-xs text-gray-500 mt-1">Comfortable monthly plans</Text>
//             </View>
//             <Text className="text-xs font-bold text-pink-500">SAVE UP TO 50%</Text>
//           </TouchableOpacity>

//           <View className="bg-purple-50 rounded-xl p-4 mb-4">
//             <Text className="text-sm font-semibold text-gray-800 text-center">
//               Need Help?
//             </Text>
//             <TouchableOpacity
//               onPress={closeModal}
//               className="mt-4 bg-[#46194F] py-3 px-6 rounded-full self-center"
//             >
//               <Text className="text-white text-sm font-medium text-center">
//                 Talk to an Expert
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }
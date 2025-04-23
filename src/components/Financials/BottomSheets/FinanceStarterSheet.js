import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { FinanceFlowContext } from '../../../contexts/FinanceFlowContext';
import BottomSheetHeader from '../../common/BottomSheetHeader';

export default function FinanceStarterSheet({ isVisible, onClose }) {
  const { goToStep, resetFlow } = useContext(FinanceFlowContext);

  const startFlow = () => {
    resetFlow();
    goToStep('brand');
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10">
        <BottomSheetHeader
          title="Get Your Dream Car"
          description="Select a payment method to begin."
        />

        <TouchableOpacity
          onPress={startFlow}
          className="mb-4 p-4 bg-purple-50 border border-purple-100 rounded-xl"
        >
          <Text className="text-base font-semibold text-purple-800">
            Cash Payment
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            Start with selecting a car brand
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <Text className="text-base font-semibold text-gray-900">
            Finance Plans
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            Easy monthly installments and financing
          </Text>
        </TouchableOpacity>

        <Text className="text-[10px] text-center text-gray-400 mt-8">
          Financing powered by Alromaih Partners
        </Text>
      </View>
    </Modal>
  );
}

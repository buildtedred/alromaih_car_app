import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const FinanceBank = ({ navigation }) => {
  const banks = ["Bank Al Habib", "Meezan Bank", "HBL"]

  return (
    <SafeAreaView className="flex-1 bg-brand-light mt-2.5">
      <View className="bg-white rounded-xl shadow-md overflow-hidden mx-4">
        {/* Step Indicator */}
        <View className="bg-gray-100 px-4 pt-4 pb-2 mt-2">
          {/* Step Bubbles + Line */}
          <View className="flex-row justify-between items-center mb-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <View key={step} className="flex-row items-center flex-1">
                <View className="items-center">
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center ${
                      step === 5 ? "bg-brand-primary" : "bg-gray-300"
                    }`}
                  >
                    <Text className="font-bold text-xs text-white">{step}</Text>
                  </View>
                </View>
                {step < 5 && (
                  <View className="flex-1 items-center justify-center px-1">
                    <View className="h-0.5 bg-brand-primary w-full rounded-full" />
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Step Labels (aligned under step bubbles) */}
          <View className="flex-row justify-between items-center mt-1">
            {["Choose brand", "Select model", "Select category", "Select year", "Select bank"].map((label, index) => (
              <View key={index} className="flex-1 items-center">
                <Text className="text-[10px] text-brand-primary text-center w-16">{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Content */}
        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center mb-4"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#46194F" />
            <Text className="ml-1 text-brand-primary text-sm">Back</Text>
          </TouchableOpacity>

          {/* Bank Grid */}
          <View className="flex-row flex-wrap justify-between">
            {banks.map((bank) => (
              <TouchableOpacity
                key={bank}
                className="w-[48%] border border-brand-dark rounded-lg px-3 py-2 mb-3 bg-white shadow-sm"
                activeOpacity={0.7}
              >
                <Text className="text-sm text-brand-primary text-center">{bank}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default FinanceBank

import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const FinanceYear = ({ navigation, route }) => {
  const [searchYear, setSearchYear] = useState("")
  const { brand, model, category } = route.params

  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"]
  const filteredYears = years.filter((y) =>
    y.toLowerCase().includes(searchYear.toLowerCase())
  )

  const handleYearSelect = (year) => {
    navigation.navigate("FinanceBank", { brand, model, category, year })
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-light mt-2.5">
      <View className="bg-white rounded-xl shadow-md overflow-hidden mx-4">
        {/* Step Indicator */}
        <View className="bg-gray-100 px-4 pt-4 pb-2 mt-2">
          <View className="flex-row justify-between items-center mb-1">
            {[1, 2, 3, 4].map((step) => (
              <View key={step} className="flex-row items-center flex-1">
                <View className="items-center">
                  <View
                    className={`w-7 h-7 rounded-full items-center justify-center ${
                      step === 4 ? "bg-brand-primary" : "bg-gray-300"
                    }`}
                  >
                    <Text className="font-bold text-xs text-white">{step}</Text>
                  </View>
                </View>
                {step < 4 && (
                  <View className="flex-1 items-center justify-center px-1">
                    <View className="h-0.5 bg-brand-primary w-full rounded-full" />
                  </View>
                )}
              </View>
            ))}
          </View>
          <View className="flex-row justify-between items-center mt-1">
            {["Choose brand", "Select model", "Select category", "Select year"].map(
              (label, index) => (
                <View key={index} className="flex-1 items-center">
                  <Text className="text-[10px] text-brand-primary text-center w-16">
                    {label}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Content */}
        <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center mb-4"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#46194F" />
            <Text className="ml-1 text-brand-primary text-sm">Back</Text>
          </TouchableOpacity>

          <View className="flex-row mb-3 flex-wrap">
            <Text className="text-brand-primary mr-2 text-sm">{brand}</Text>
            <Text className="text-brand-primary mr-2 text-sm">{model}</Text>
            <Text className="text-brand-primary text-sm">{category}</Text>
          </View>

          <View className="border border-brand-dark rounded-lg mb-4 px-3 py-2 flex-row items-center bg-white">
            <Ionicons name="search-outline" size={18} color="#C6AECC" />
            <TextInput
              placeholder="Search year"
              placeholderTextColor="#C6AECC"
              value={searchYear}
              onChangeText={setSearchYear}
              className="flex-1 ml-2 text-sm text-brand-primary h-8 p-0"
            />
          </View>

          <View className="flex-row flex-wrap justify-between">
            {filteredYears.map((year) => (
              <TouchableOpacity
                key={year}
                onPress={() => handleYearSelect(year)}
                className="w-[31%] bg-white border border-brand-light rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                activeOpacity={0.7}
              >
                <Text className="text-brand-primary text-[10px] font-medium">{year}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default FinanceYear

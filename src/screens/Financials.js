import { Component } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

export class Financials extends Component {
  state = {
    activeType: null,
    selectedBrand: null,
    selectedModel: null,
    currentStep: 1,
    financeStep: 1, // Start at step 1 for finance
  }

  handleTypePress = (type) => {
    this.setState({
      activeType: type,
      currentStep: 1,
      financeStep: 1,
      selectedBrand: null,
      selectedModel: null,
    })
  }

  handleBrandSelect = (brand) => {
    if (this.state.activeType === "cash") {
      this.setState({ selectedBrand: brand, currentStep: 2 })
    } else {
      this.setState({ selectedBrand: brand, financeStep: 2 })
    }
  }

  handleModelSelect = (model) => {
    if (this.state.activeType === "cash") {
      this.setState({ selectedModel: model, currentStep: 3 })
    } else {
      this.setState({ selectedModel: model, financeStep: 3 })
    }
  }

  handleBackToStep1 = () => {
    if (this.state.activeType === "cash") {
      this.setState({ selectedBrand: null, currentStep: 1 })
    } else {
      this.setState({ selectedBrand: null, financeStep: 1 })
    }
  }

  handleBackToStep2 = () => {
    if (this.state.activeType === "cash") {
      this.setState({ selectedModel: null, currentStep: 2 })
    } else {
      this.setState({ selectedModel: null, financeStep: 2 })
    }
  }

  render() {
    const { activeType, selectedBrand, selectedModel, currentStep, financeStep } = this.state

    return (
      <ScrollView className="flex-1 bg-gray-50">
        <View className="flex-1 p-4">
        
          {!activeType && (
            <View className="px-2">
              <Text className="text-xl font-bold text-center text-gray-900 mb-1">Find Your Perfect Car</Text>
              <Text className="text-sm font-medium text-center text-purple-800 mb-2">Choose Payment Method</Text>
              <Text className="text-xs text-center text-gray-500 mb-4">
                Choose the way that suits you to secure your vehicle through convenient financing or direct cash
                payment.
              </Text>

              {/* Cash Payment Card */}
              <TouchableOpacity
                onPress={() => this.handleTypePress("cash")}
                className="bg-white rounded-lg mb-3 shadow-sm overflow-hidden"
              >
                <View className="p-3 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="bg-gray-100 p-2 rounded-full mr-2">
                      <Ionicons name="cash-outline" size={20} color="#6B7280" />
                    </View>
                    <View>
                      <Text className="text-sm font-bold text-gray-800">Cash Payment</Text>
                      <Text className="text-xs text-gray-500">Pay the full amount upfront</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-red-50 px-2 py-1 rounded-full mr-2">
                      <Text className="text-[10px] text-red-500 font-medium">10% OFF</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Finance Option Card */}
              <TouchableOpacity
                onPress={() => this.handleTypePress("financial")}
                className="bg-white rounded-lg mb-3 shadow-sm overflow-hidden border-l-4 border-yellow-400"
              >
                <View className="p-3 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="bg-gray-100 p-2 rounded-full mr-2">
                      <Ionicons name="card-outline" size={20} color="#6B7280" />
                    </View>
                    <View>
                      <Text className="text-sm font-bold text-gray-800">Finance Options</Text>
                      <Text className="text-xs text-gray-500">Flexible monthly payments</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center space-x-1">
                    <View className="bg-yellow-100 px-1 py-1 rounded-full">
                      <Text className="text-[10px] text-yellow-700 font-medium">POPULAR</Text>
                    </View>
                    <View className="bg-blue-50 px-1 py-1 rounded-full">
                      <Text className="text-[10px] text-blue-700 font-medium">Save 50%</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Cash Payment Flow */}
          {activeType === "cash" && (
            <View className="bg-white rounded-xl p-4 shadow-md">
              {/* Step Indicator */}
              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <View className="w-6 h-6 bg-purple-600 rounded-full items-center justify-center">
                    {currentStep > 1 ? (
                      <Ionicons name="checkmark" size={14} color="white" />
                    ) : (
                      <Text className="text-white font-bold text-xs">1</Text>
                    )}
                  </View>
                  <Text className="text-[10px] text-gray-600 mt-1">Choose brand</Text>
                </View>
                <View className="flex-1 items-center justify-center mx-1">
                  <View className="h-px bg-gray-200 w-full" />
                </View>
                <View className="items-center">
                  <View
                    className={`w-6 h-6 ${currentStep >= 2 ? "bg-purple-600" : "bg-gray-200"} rounded-full items-center justify-center`}
                  >
                    {currentStep > 2 ? (
                      <Ionicons name="checkmark" size={14} color="white" />
                    ) : (
                      <Text className={`${currentStep >= 2 ? "text-white" : "text-gray-400"} font-bold text-xs`}>2</Text>
                    )}
                  </View>
                  <Text className={`text-[10px] ${currentStep >= 2 ? "text-gray-600" : "text-gray-400"} mt-1`}>
                    Select model
                  </Text>
                </View>
                <View className="flex-1 items-center justify-center mx-1">
                  <View className="h-px bg-gray-200 w-full" />
                </View>
                <View className="items-center">
                  <View
                    className={`w-6 h-6 ${currentStep === 3 ? "bg-purple-600" : "bg-gray-200"} rounded-full items-center justify-center`}
                  >
                    <Text className={`${currentStep === 3 ? "text-white" : "text-gray-400"} font-bold text-xs`}>3</Text>
                  </View>
                  <Text className={`text-[10px] ${currentStep === 3 ? "text-gray-600" : "text-gray-400"} mt-1`}>
                    Select category
                  </Text>
                </View>
              </View>

              {currentStep === 1 && (
                <>
                  {/* Back Button */}
                  <TouchableOpacity
                    onPress={() => this.setState({ activeType: null })}
                    className="flex-row items-center mb-4"
                  >
                    <Ionicons name="arrow-back" size={16} color="#666" />
                    <Text className="ml-1 text-gray-600 text-sm">Back</Text>
                  </TouchableOpacity>

                  {/* Search Input */}
                  <View className="border border-gray-200 rounded-lg mb-4 px-3 py-1 flex-row items-center h-8">
                    <Ionicons name="search-outline" size={16} color="#9ca3af" />
                    <TextInput
                      placeholder="Search brand"
                      placeholderTextColor="#9ca3af"
                      className="ml-2 flex-1 text-gray-800 text-xs"
                    />
                  </View>

                  {/* Brand Grid */}
                  <View className="flex-row flex-wrap justify-between">
                    {/* Jetour */}
                    <TouchableOpacity
                      onPress={() => this.handleBrandSelect("Jetour")}
                      className="w-[48%] border border-gray-200 rounded-lg p-2 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 font-bold text-xs">JETOUR</Text>
                      <Text className="text-gray-800 text-xs">Jetour</Text>
                    </TouchableOpacity>

                    {/* Toyota */}
                    <TouchableOpacity
                      onPress={() => this.handleBrandSelect("Toyota")}
                      className="w-[48%] border border-gray-200 rounded-lg p-2 mb-3 items-center justify-center"
                    >
                      <View className="w-10 h-6 items-center justify-center mb-1">
                        <Ionicons name="car" size={20} color="#333" />
                      </View>
                      <Text className="text-gray-800 text-xs">Toyota</Text>
                    </TouchableOpacity>

                    {/* Honda */}
                    <TouchableOpacity
                      onPress={() => this.handleBrandSelect("Honda")}
                      className="w-[48%] border border-gray-200 rounded-lg p-2 items-center justify-center"
                    >
                      <View className="w-10 h-6 items-center justify-center mb-1">
                        <Text className="text-xl font-bold">H</Text>
                      </View>
                      <Text className="text-gray-800 text-xs">Honda</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Back Button */}
                  <TouchableOpacity onPress={this.handleBackToStep1} className="flex-row items-center mb-4">
                    <Ionicons name="arrow-back" size={16} color="#666" />
                    <Text className="ml-1 text-gray-600 text-sm">Back</Text>
                  </TouchableOpacity>

                  {/* Search Input */}
                  <View className="border border-gray-200 rounded-lg mb-4 px-3 py-1 flex-row items-center h-8">
                    <Ionicons name="search-outline" size={16} color="#9ca3af" />
                    <TextInput
                      placeholder="Search Model"
                      placeholderTextColor="#9ca3af"
                      className="ml-2 flex-1 text-gray-800 text-xs"
                    />
                  </View>

                  {/* Model Grid */}
                  <View className="flex-row flex-wrap justify-between">
                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour T2")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour T2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour T2 Plus")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour T2 Plus</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour T2 Sport")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour T2 Sport</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour X70")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour X70</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour X90")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour X90</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour Dashing")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour Dashing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour X95")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour X95</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour T1")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour T1</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {currentStep === 3 && (
                <>
                  {/* Back Button */}
                  <TouchableOpacity onPress={this.handleBackToStep2} className="flex-row items-center mb-4">
                    <Ionicons name="arrow-back" size={16} color="#666" />
                    <Text className="ml-1 text-gray-600 text-sm">Back</Text>
                  </TouchableOpacity>

                  {/* Selected Brand and Model */}
                  <View className="flex-row mb-3">
                    <Text className="text-purple-600 mr-2 text-sm">{selectedBrand}</Text>
                    <Text className="text-purple-600 text-sm">{selectedModel}</Text>
                  </View>

                  {/* Search Input */}
                  <View className="border border-gray-200 rounded-lg mb-4 px-3 py-1 flex-row items-center h-8">
                    <Ionicons name="search-outline" size={16} color="#9ca3af" />
                    <TextInput
                      placeholder="Search category"
                      placeholderTextColor="#9ca3af"
                      className="ml-2 flex-1 text-gray-800 text-xs"
                    />
                  </View>

                  {/* Category Grid */}
                  <View className="flex-row flex-wrap justify-between">
                    <TouchableOpacity className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center">
                      <Text className="text-purple-600 text-xs">Crossover</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center">
                      <Text className="text-purple-600 text-xs">SUV</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center">
                      <Text className="text-purple-600 text-xs">Sedan</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}

          {/* Finance Option Flow */}
          {activeType === "financial" && (
            <View className="bg-white rounded-xl p-4 shadow-md">
              {/* Step Indicator */}
              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <View className="w-6 h-6 bg-purple-600 rounded-full items-center justify-center">
                    {financeStep > 1 ? (
                      <Ionicons name="checkmark" size={14} color="white" />
                    ) : (
                      <Text className="text-white font-bold text-xs">1</Text>
                    )}
                  </View>
                  <Text className="text-[10px] text-gray-600 mt-1">Choose brand</Text>
                </View>
                <View className="flex-1 items-center justify-center mx-1">
                  <View className="h-px bg-gray-200 w-full" />
                </View>
                <View className="items-center">
                  <View
                    className={`w-6 h-6 ${financeStep >= 2 ? "bg-purple-600" : "bg-gray-200"} rounded-full items-center justify-center`}
                  >
                    {financeStep > 2 ? (
                      <Ionicons name="checkmark" size={14} color="white" />
                    ) : (
                      <Text className={`${financeStep >= 2 ? "text-white" : "text-gray-400"} font-bold text-xs`}>2</Text>
                    )}
                  </View>
                  <Text className={`text-[10px] ${financeStep >= 2 ? "text-gray-600" : "text-gray-400"} mt-1`}>
                    Select model
                  </Text>
                </View>
                <View className="flex-1 items-center justify-center mx-1">
                  <View className="h-px bg-gray-200 w-full" />
                </View>
                <View className="items-center">
                  <View
                    className={`w-6 h-6 ${financeStep === 3 ? "bg-purple-600" : "bg-gray-200"} rounded-full items-center justify-center`}
                  >
                    <Text className={`${financeStep === 3 ? "text-white" : "text-gray-400"} font-bold text-xs`}>3</Text>
                  </View>
                  <Text className={`text-[10px] ${financeStep === 3 ? "text-gray-600" : "text-gray-400"} mt-1`}>
                    Select category
                  </Text>
                </View>
              </View>

              {financeStep === 1 && (
                <>
                  {/* Back Button */}
                  <TouchableOpacity
                    onPress={() => this.setState({ activeType: null })}
                    className="flex-row items-center mb-4"
                  >
                    <Ionicons name="arrow-back" size={16} color="#666" />
                    <Text className="ml-1 text-gray-600 text-sm">Back</Text>
                  </TouchableOpacity>

                  {/* Search Input */}
                  <View className="border border-gray-200 rounded-lg mb-4 px-3 py-1 flex-row items-center h-8">
                    <Ionicons name="search-outline" size={16} color="#9ca3af" />
                    <TextInput
                      placeholder="Search brand"
                      placeholderTextColor="#9ca3af"
                      className="ml-2 flex-1 text-gray-800 text-xs"
                    />
                  </View>

                  {/* Brand Grid */}
                  <View className="flex-row flex-wrap justify-between">
                    {/* Jetour */}
                    <TouchableOpacity
                      onPress={() => this.handleBrandSelect("Jetour")}
                      className="w-[48%] border border-gray-200 rounded-lg p-2 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 font-bold text-xs">JETOUR</Text>
                      <Text className="text-gray-800 text-xs">Jetour</Text>
                    </TouchableOpacity>

                    {/* Toyota */}
                    <TouchableOpacity
                      onPress={() => this.handleBrandSelect("Toyota")}
                      className="w-[48%] border border-gray-200 rounded-lg p-2 mb-3 items-center justify-center"
                    >
                      <View className="w-10 h-6 items-center justify-center mb-1">
                        <Ionicons name="car" size={20} color="#333" />
                      </View>
                      <Text className="text-gray-800 text-xs">Toyota</Text>
                    </TouchableOpacity>

                    {/* Honda */}
                    <TouchableOpacity
                      onPress={() => this.handleBrandSelect("Honda")}
                      className="w-[48%] border border-gray-200 rounded-lg p-2 items-center justify-center"
                    >
                      <View className="w-10 h-6 items-center justify-center mb-1">
                        <Text className="text-xl font-bold">H</Text>
                      </View>
                      <Text className="text-gray-800 text-xs">Honda</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {financeStep === 2 && (
                <>
                  {/* Back Button */}
                  <TouchableOpacity onPress={this.handleBackToStep1} className="flex-row items-center mb-4">
                    <Ionicons name="arrow-back" size={16} color="#666" />
                    <Text className="ml-1 text-gray-600 text-sm">Back</Text>
                  </TouchableOpacity>

                  {/* Search Input */}
                  <View className="border border-gray-200 rounded-lg mb-4 px-3 py-1 flex-row items-center h-8">
                    <Ionicons name="search-outline" size={16} color="#9ca3af" />
                    <TextInput
                      placeholder="Search Model"
                      placeholderTextColor="#9ca3af"
                      className="ml-2 flex-1 text-gray-800 text-xs"
                    />
                  </View>

                  {/* Model Grid */}
                  <View className="flex-row flex-wrap justify-between">
                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour T2")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour T2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour T2 Plus")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour T2 Plus</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour T2 Sport")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour T2 Sport</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour X70")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour X70</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour X90")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour X90</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour Dashing")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour Dashing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour X95")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour X95</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.handleModelSelect("Jetour T1")}
                      className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center"
                    >
                      <Text className="text-purple-600 text-xs">Jetour T1</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {financeStep === 3 && (
                <>
                  {/* Back Button */}
                  <TouchableOpacity onPress={this.handleBackToStep2} className="flex-row items-center mb-4">
                    <Ionicons name="arrow-back" size={16} color="#666" />
                    <Text className="ml-1 text-gray-600 text-sm">Back</Text>
                  </TouchableOpacity>

                  {/* Selected Brand and Model */}
                  <View className="flex-row mb-3">
                    <Text className="text-purple-600 mr-2 text-sm">{selectedBrand}</Text>
                    <Text className="text-purple-600 text-sm">{selectedModel}</Text>
                  </View>

                  {/* Search Input */}
                  <View className="border border-gray-200 rounded-lg mb-4 px-3 py-1 flex-row items-center h-8">
                    <Ionicons name="search-outline" size={16} color="#9ca3af" />
                    <TextInput
                      placeholder="Search category"
                      placeholderTextColor="#9ca3af"
                      className="ml-2 flex-1 text-gray-800 text-xs"
                    />
                  </View>

                  {/* Category Grid */}
                  <View className="flex-row flex-wrap justify-between">
                    <TouchableOpacity className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center">
                      <Text className="text-purple-600 text-xs">Crossover</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center">
                      <Text className="text-purple-600 text-xs">SUV</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-[48%] border border-gray-200 rounded-lg p-1 mb-3 items-center justify-center">
                      <Text className="text-purple-600 text-xs">Sedan</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    )
  }
}

export default Financials
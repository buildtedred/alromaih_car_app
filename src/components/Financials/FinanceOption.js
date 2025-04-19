import { Component } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, SafeAreaView } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

export class FinanceOption extends Component {
  state = {
    isExpanded: false,
    selectedBrand: null,
    selectedModel: null,
    financeStep: 1,
    selectedCategory: null,
    searchBrand: "",
    searchModel: "",
    searchCategory: "",
  }

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  handleBrandSelect = (brand) => {
    this.setState({ selectedBrand: brand, financeStep: 2 })
  }

  handleModelSelect = (model) => {
    this.setState({ selectedModel: model, financeStep: 3 })
  }

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category })
    // You can add additional logic here for what happens after category selection
  }

  handleBackToStep1 = () => {
    this.setState({ selectedBrand: null, financeStep: 1 })
  }

  handleBackToStep2 = () => {
    this.setState({ selectedModel: null, financeStep: 2 })
  }

  handleSearchBrand = (text) => {
    this.setState({ searchBrand: text })
  }

  handleSearchModel = (text) => {
    this.setState({ searchModel: text })
  }

  handleSearchCategory = (text) => {
    this.setState({ searchCategory: text })
  }

  render() {
    const { isExpanded, selectedBrand, selectedModel, financeStep, searchBrand, searchModel, searchCategory } = this.state
    const { onBack } = this.props

    // If not expanded, just show the Finance Option card with the new design
    if (!isExpanded) {
      return (
        <TouchableOpacity 
          onPress={this.toggleExpand}
          className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border-l-4 border-yellow-400"
        >
          <View className="p-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-purple-100 p-2 rounded-lg mr-2">
                <Ionicons name="card-outline" size={20} color="#8B5CF6" />
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-800">Finance Options</Text>
                <Text className="text-xs text-gray-500">Comfortable monthly...</Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <View className="bg-pink-50 px-2 py-1 rounded-full mr-2">
                <Text className="text-[10px] text-pink-600 font-medium">SAVE UP TO 50%</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    // If expanded, show the premium design with separated sections
    return (
      <SafeAreaView className="mt-2.5">
        <View className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Top Section - Step Indicator with gray background */}
          <View className="bg-gray-700 p-4 pb-2">
            <View className="flex-row justify-between mb-2">
              <View className="items-center">
                <View className={`w-7 h-7 ${financeStep === 1 ? "bg-white" : "bg-gray-500"} rounded-full items-center justify-center`}>
                  <Text className={`${financeStep === 1 ? "text-gray-700" : "text-white"} font-bold text-xs`}>1</Text>
                </View>
                <Text className="text-[10px] text-white mt-1">Choose brand</Text>
              </View>
              <View className="flex-1 items-center justify-center mx-1">
                <View className="h-px bg-gray-500 w-full" />
              </View>
              <View className="items-center">
                <View className={`w-7 h-7 ${financeStep === 2 ? "bg-white" : "bg-gray-500"} rounded-full items-center justify-center`}>
                  <Text className={`${financeStep === 2 ? "text-gray-700" : "text-white"} font-bold text-xs`}>2</Text>
                </View>
                <Text className="text-[10px] text-white mt-1">Select model</Text>
              </View>
              <View className="flex-1 items-center justify-center mx-1">
                <View className="h-px bg-gray-500 w-full" />
              </View>
              <View className="items-center">
                <View className={`w-7 h-7 ${financeStep === 3 ? "bg-white" : "bg-gray-500"} rounded-full items-center justify-center`}>
                  <Text className={`${financeStep === 3 ? "text-gray-700" : "text-white"} font-bold text-xs`}>3</Text>
                </View>
                <Text className="text-[10px] text-white mt-1">Select category</Text>
              </View>
            </View>
          </View>

          {/* Content Section */}
          <View className="p-4">
            {financeStep === 1 && (
              <>
                {/* Back Button */}
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isExpanded: false });
                    onBack && onBack();
                  }}
                  className="flex-row items-center mb-4"
                >
                  <Ionicons name="arrow-back" size={16} color="#666" />
                  <Text className="ml-1 text-gray-600 text-sm">Back</Text>
                </TouchableOpacity>

                {/* Search Input */}
                <View className="border border-gray-200 rounded-lg mb-4 px-3 py-2 flex-row items-center">
                  <Ionicons name="search-outline" size={16} color="#9ca3af" />
                  <TextInput
                    placeholder="Search brand"
                    placeholderTextColor="#9ca3af"
                    value={searchBrand}
                    onChangeText={this.handleSearchBrand}
                    className="flex-1 ml-2 text-xs text-gray-800 h-6 p-0"
                  />
                </View>

                {/* Brand Grid - More premium and compact */}
                <View className="flex-row flex-wrap justify-between">
                  {/* Jetour */}
                  <TouchableOpacity
                    onPress={() => this.handleBrandSelect("Jetour")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[60px]"
                  >
                    <Text className="text-yellow-600 font-bold text-[10px] mb-1">JETOUR</Text>
                    <Text className="text-gray-800 text-[10px]">Jetour</Text>
                  </TouchableOpacity>

                  {/* Toyota */}
                  <TouchableOpacity
                    onPress={() => this.handleBrandSelect("Toyota")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[60px]"
                  >
                    <View className="w-8 h-5 items-center justify-center mb-1">
                      <Ionicons name="car" size={16} color="#333" />
                    </View>
                    <Text className="text-gray-800 text-[10px]">Toyota</Text>
                  </TouchableOpacity>

                  {/* Honda */}
                  <TouchableOpacity
                    onPress={() => this.handleBrandSelect("Honda")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[60px]"
                  >
                    <View className="w-8 h-5 items-center justify-center mb-1">
                      <Text className="text-base font-bold">H</Text>
                    </View>
                    <Text className="text-gray-800 text-[10px]">Honda</Text>
                  </TouchableOpacity>

                  {/* Additional brands for a more complete grid */}
                  <TouchableOpacity
                    onPress={() => this.handleBrandSelect("BMW")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[60px]"
                  >
                    <View className="w-8 h-5 items-center justify-center mb-1">
                      <Text className="text-base font-bold">B</Text>
                    </View>
                    <Text className="text-gray-800 text-[10px]">BMW</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.handleBrandSelect("Audi")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[60px]"
                  >
                    <View className="w-8 h-5 items-center justify-center mb-1">
                      <Text className="text-base font-bold">A</Text>
                    </View>
                    <Text className="text-gray-800 text-[10px]">Audi</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.handleBrandSelect("Mercedes")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[60px]"
                  >
                    <View className="w-8 h-5 items-center justify-center mb-1">
                      <Text className="text-base font-bold">M</Text>
                    </View>
                    <Text className="text-gray-800 text-[10px]">Mercedes</Text>
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

                {/* Selected Brand */}
                <View className="mb-3">
                  <Text className="text-yellow-600 font-medium text-sm">{selectedBrand}</Text>
                </View>

                {/* Search Input */}
                <View className="border border-gray-200 rounded-lg mb-4 px-3 py-2 flex-row items-center">
                  <Ionicons name="search-outline" size={16} color="#9ca3af" />
                  <TextInput
                    placeholder="Search Model"
                    placeholderTextColor="#9ca3af"
                    value={searchModel}
                    onChangeText={this.handleSearchModel}
                    className="flex-1 ml-2 text-xs text-gray-800 h-6 p-0"
                  />
                </View>

                {/* Model Grid - More premium and compact */}
                <View className="flex-row flex-wrap justify-between">
                  <TouchableOpacity
                    onPress={() => this.handleModelSelect("Jetour T2")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">Jetour T2</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.handleModelSelect("Jetour T2 Plus")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">T2 Plus</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.handleModelSelect("Jetour T2 Sport")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">T2 Sport</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.handleModelSelect("Jetour X70")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">X70</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.handleModelSelect("Jetour X90")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">X90</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.handleModelSelect("Jetour Dashing")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">Dashing</Text>
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
                  <Text className="text-yellow-600 mr-2 text-sm">{selectedBrand}</Text>
                  <Text className="text-yellow-600 text-sm">{selectedModel}</Text>
                </View>

                {/* Search Input */}
                <View className="border border-gray-200 rounded-lg mb-4 px-3 py-2 flex-row items-center">
                  <Ionicons name="search-outline" size={16} color="#9ca3af" />
                  <TextInput
                    placeholder="Search category"
                    placeholderTextColor="#9ca3af"
                    value={searchCategory}
                    onChangeText={this.handleSearchCategory}
                    className="flex-1 ml-2 text-xs text-gray-800 h-6 p-0"
                  />
                </View>

                {/* Category Grid - More premium and compact */}
                <View className="flex-row flex-wrap justify-between">
                  <TouchableOpacity 
                    onPress={() => this.handleCategorySelect("Crossover")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">Crossover</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => this.handleCategorySelect("SUV")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">SUV</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => this.handleCategorySelect("Sedan")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">Sedan</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => this.handleCategorySelect("Hatchback")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">Hatchback</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => this.handleCategorySelect("Coupe")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">Coupe</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => this.handleCategorySelect("Convertible")}
                    className="w-[31%] bg-white border border-gray-100 rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  >
                    <Text className="text-yellow-600 text-[10px]">Convertible</Text>
                  </TouchableOpacity>
                </View>

                {/* Finance Options Information */}
                <View className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <Text className="text-sm font-bold text-gray-800 mb-2">Finance Options</Text>
                  <Text className="text-xs text-gray-600 mb-2">Flexible monthly payments with low interest rates.</Text>
                  
                  <View className="flex-row justify-between mb-2">
                    <View>
                      <Text className="text-xs text-gray-500">Down Payment</Text>
                      <Text className="text-sm font-bold text-gray-800">20%</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">Monthly Payment</Text>
                      <Text className="text-sm font-bold text-yellow-600">$350</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">Term</Text>
                      <Text className="text-sm font-bold text-gray-800">48 months</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default FinanceOption
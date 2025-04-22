import { Component } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

export class CashCategory extends Component {
  state = {
    searchCategory: "",
  }

  handleSearchCategory = (text) => {
    this.setState({ searchCategory: text })
  }

  handleCategorySelect = (category) => {
    const { brand, model } = this.props.route.params
    this.props.navigation.navigate("CashYear", { brand, model, category })
  }

  render() {
    const { searchCategory } = this.state
    const { brand, model } = this.props.route.params

    const categories = [
      "Crossover",
      "SUV",
      "Sedan",
      "Hatchback",
      "Coupe",
      "Convertible",
    ]
    const filteredCategories = categories.filter((cat) =>
      cat.toLowerCase().includes(searchCategory.toLowerCase())
    )

    return (
      <SafeAreaView className="flex-1 bg-brand-light mt-2.5">
        <View className="bg-white rounded-xl shadow-md overflow-hidden mx-4">
          {/* Step Indicator */}
          <View className="bg-gray-100 p-4 pb-2">
            <View className="flex-row justify-between mb-2">
              <View className="items-center">
                <View className="w-7 h-7 bg-gray-300 rounded-full items-center justify-center">
                  <Text className="font-bold text-xs text-white">1</Text>
                </View>
                <Text className="text-[10px] text-brand-primary mt-1">
                  Choose brand
                </Text>
              </View>

              {/* Custom brand-colored line */}
              <View className="flex-1 items-center justify-center mx-1">
                <View style={{ height: 2, backgroundColor: "#46194F", width: "100%" }} />
              </View>

              <View className="items-center">
                <View className="w-7 h-7 bg-gray-300 rounded-full items-center justify-center">
                  <Text className="font-bold text-xs text-white">2</Text>
                </View>
                <Text className="text-[10px] text-brand-primary mt-1">
                  Select model
                </Text>
              </View>

              {/* Custom brand-colored line */}
              <View className="flex-1 items-center justify-center mx-1">
                <View style={{ height: 2, backgroundColor: "#46194F", width: "100%" }} />
              </View>

              <View className="items-center">
                <View className="w-7 h-7 bg-brand-primary rounded-full items-center justify-center">
                  <Text className="font-bold text-xs text-white">3</Text>
                </View>
                <Text className="text-[10px] text-brand-primary mt-1">
                  Select category
                </Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              className="flex-row items-center mb-4"
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={20} color="#46194F" />
              <Text className="ml-1 text-brand-primary text-sm">Back</Text>
            </TouchableOpacity>

            {/* Brand & Model Info */}
            <View className="flex-row mb-3">
              <Text className="text-brand-primary mr-2 text-sm">{brand}</Text>
              <Text className="text-brand-primary text-sm">{model}</Text>
            </View>

            {/* Search Input */}
            <View className="border border-brand-dark rounded-lg mb-4 px-3 py-2 flex-row items-center bg-white">
              <Ionicons name="search-outline" size={18} color="#C6AECC" />
              <TextInput
                placeholder="Search category..."
                placeholderTextColor="#C6AECC"
                value={searchCategory}
                onChangeText={this.handleSearchCategory}
                className="flex-1 ml-2 text-sm text-brand-primary h-8 p-0"
                clearButtonMode="while-editing"
              />
            </View>

            {/* Category Buttons */}
            <View className="flex-row flex-wrap justify-between mb-4">
              {filteredCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => this.handleCategorySelect(category)}
                  className="w-[31%] bg-white border border-brand-light rounded-lg p-2 mb-3 items-center justify-center shadow-sm h-[40px]"
                  activeOpacity={0.7}
                >
                  <Text
                    className="text-brand-primary text-[10px] font-medium"
                    numberOfLines={1}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

export default CashCategory

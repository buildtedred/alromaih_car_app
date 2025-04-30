// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import AppHeader from '../components/common/AppHeader';
// import carsData from '../mock-data';
// import SortBottomSheet from '../components/AdvancedSearch/SortBottomSheet';
// import AllCarCard from '../components/cars/AllCarCard';

// export default function FilteredCarsScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { filteredCars = [], selectedFilters = {} } = route.params || {};

//   const [activeFilters, setActiveFilters] = useState(selectedFilters);
//   const [filteredList, setFilteredList] = useState(filteredCars);
//   const [isSortModalVisible, setSortModalVisible] = useState(false);
//   const [selectedSortOption, setSelectedSortOption] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Apply filters and sorting whenever dependencies change
//   useEffect(() => {
//     const applyFiltersAndSort = async () => {
//       setIsLoading(true);
      
//       try {
//         // Simulate API call delay
//         await new Promise(resolve => setTimeout(resolve, 300));
        
//         let newList = [...carsData];

//         // Apply filters
//         if (activeFilters.brand) {
//           newList = newList.filter((car) => car.brand === activeFilters.brand);
//         }
//         if (activeFilters.models) {
//           const modelArr = activeFilters.models.split(',').map((m) => m.trim());
//           newList = newList.filter((car) => modelArr.includes(car.model));
//         }
//         if (activeFilters.category) {
//           newList = newList.filter((car) => car.category === activeFilters.category);
//         }
//         if (activeFilters.bodyType) {
//           newList = newList.filter((car) => car.bodyType === activeFilters.bodyType);
//         }
//         if (activeFilters.location) {
//           newList = newList.filter(
//             (car) => car.specs?.location?.toLowerCase() === activeFilters.location.toLowerCase()
//           );
//         }
//         if (activeFilters.transmission) {
//           newList = newList.filter(
//             (car) => car.specs?.transmission?.en?.toLowerCase() === activeFilters.transmission.toLowerCase()
//           );
//         }
//         if (activeFilters.fuel) {
//           newList = newList.filter(
//             (car) => car.specs?.fuelType?.en?.toLowerCase() === activeFilters.fuel.toLowerCase()
//           );
//         }
//         if (activeFilters.price) {
//           const [min, max] = activeFilters.price.split('-').map((v) => parseInt(v.replace(/,/g, '')));
//           newList = newList.filter((car) => car.cashPrice >= min && car.cashPrice <= max);
//         }
//         if (activeFilters.year) {
//           const [min, max] = activeFilters.year.split('-').map((v) => parseInt(v.trim()));
//           newList = newList.filter((car) => car.specs?.year >= min && car.specs?.year <= max);
//         }

//         // Apply sorting if selected
//         if (selectedSortOption) {
//           newList = sortCars(newList, selectedSortOption);
//         }

//         setFilteredList(newList);
//       } catch (error) {
//         console.error('Error applying filters:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     applyFiltersAndSort();
//   }, [activeFilters, selectedSortOption]);

//   const sortCars = (cars, option) => {
//     const sorted = [...cars];
//     switch (option) {
//       case 'price_low':
//         sorted.sort((a, b) => (a.cashPrice || 0) - (b.cashPrice || 0));
//         break;
//       case 'price_high':
//         sorted.sort((a, b) => (b.cashPrice || 0) - (a.cashPrice || 0));
//         break;
//       case 'year_newest':
//         sorted.sort((a, b) => (b.specs?.year || 0) - (a.specs?.year || 0));
//         break;
//       case 'year_oldest':
//         sorted.sort((a, b) => (a.specs?.year || 0) - (b.specs?.year || 0));
//         break;
//       default:
//         break;
//     }
//     return sorted;
//   };

//   const handleRemoveFilter = (key) => {
//     const updated = { ...activeFilters };
//     delete updated[key];
//     setActiveFilters(updated);
//   };

//   const handleSort = (option) => {
//     setSelectedSortOption(option);
//     setSortModalVisible(false);
//   };

//   const clearAllFilters = () => {
//     setActiveFilters({});
//     setSelectedSortOption(null);
//   };

//   const renderFilterTag = ([key, value]) => (
//     <TouchableOpacity
//       key={key}
//       onPress={() => handleRemoveFilter(key)}
//       className="flex-row items-center border border-gray-300 px-4 py-1.5 mr-2 mb-2 rounded-full bg-white"
//     >
//       <Text className="text-gray-800 font-medium mr-2">{value}</Text>
//       <Icon name="close" size={16} color="#6b7280" />
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <AppHeader />

//       {/* Filter Controls Section */}
//       <View className="px-4 pt-4 pb-2">
//         {/* Sort & Filter Row */}
//         <View className="flex-row items-center justify-between mb-3">
//           <View className="flex-row items-center gap-3 space-x-6">
//             {/* Sort Button */}
//             <TouchableOpacity 
//               onPress={() => setSortModalVisible(true)} 
//               className="flex-row items-center"
//             >
//               <Icon name="sort" size={20} color="#111" />
//               <Text className="ml-1 text-gray-900 font-bold text-base">Sort</Text>
//               {selectedSortOption && (
//                 <View className="ml-1 w-2 h-2 bg-blue-500 rounded-full" />
//               )}
//             </TouchableOpacity>

//             {/* Filter Button */}
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               className="flex-row items-center relative"
//             >
//               <Icon name="filter-variant" size={20} color="#111" />
//               <Text className="ml-1 text-gray-900 font-bold text-base">Filter</Text>
//               {Object.keys(activeFilters).length > 0 && (
//                 <View className="absolute -top-2 -right-3 bg-red-600 rounded-full w-5 h-5 items-center justify-center">
//                   <Text className="text-white text-xs font-semibold">
//                     {Object.keys(activeFilters).length}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>

//           {Object.keys(activeFilters).length > 0 && (
//             <TouchableOpacity onPress={clearAllFilters}>
//               <Text className="text-blue-600 text-sm font-semibold">Clear All</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Active Filter Tags */}
//         {(Object.keys(activeFilters).length > 0 || selectedSortOption) && (
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             className="mb-2"
//             contentContainerStyle={{ paddingRight: 16 }}
//           >
//             <View className="flex-row">
//               {Object.entries(activeFilters).map(renderFilterTag)}
//               {selectedSortOption && (
//                 <TouchableOpacity
//                   onPress={() => setSelectedSortOption(null)}
//                   className="flex-row items-center border border-gray-300 px-4 py-1.5 mr-2 mb-2 rounded-full bg-white"
//                 >
//                   <Text className="text-gray-800 font-medium mr-2">
//                     {selectedSortOption === 'price_low' && 'Price: Low to High'}
//                     {selectedSortOption === 'price_high' && 'Price: High to Low'}
//                     {selectedSortOption === 'year_newest' && 'Year: Newest First'}
//                     {selectedSortOption === 'year_oldest' && 'Year: Oldest First'}
//                   </Text>
//                   <Icon name="close" size={16} color="#6b7280" />
//                 </TouchableOpacity>
//               )}
//             </View>
//           </ScrollView>
//         )}

//         <Text className="text-gray-500 text-sm">
//           {filteredList.length} {filteredList.length === 1 ? 'result' : 'results'}
//         </Text>
//       </View>

//       {/* Sort Bottom Sheet */}
//       <SortBottomSheet
//         isVisible={isSortModalVisible}
//         onClose={() => setSortModalVisible(false)}
//         onSelect={handleSort}
//         selectedOption={selectedSortOption}
//       />

//       {/* Loading Indicator */}
//       {isLoading && (
//         <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-10 z-10">
//           <ActivityIndicator size="large" color="#3b82f6" />
//         </View>
//       )}

//       {/* Car List */}
//       <FlatList
//         data={filteredList}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingBottom: 24 }}
//         renderItem={({ item }) => (
//           <AllCarCard
//             car={item}
//             onPress={() => navigation.navigate('Gallery', { car: item })}
//           />
//         )}
//         ListEmptyComponent={
//           <View className="flex-1 justify-center items-center py-20">
//             <Icon name="car-off" size={40} color="#9ca3af" />
//             <Text className="text-lg text-gray-600 mt-4">No cars match your search.</Text>
//             <TouchableOpacity
//               onPress={clearAllFilters}
//               className="mt-4 px-6 py-2 bg-blue-600 rounded-full"
//             >
//               <Text className="text-white font-medium">Reset Filters</Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// }
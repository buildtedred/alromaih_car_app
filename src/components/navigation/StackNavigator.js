import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../../screens/HomeScreen';
import MoreScreen from '../../screens/MoreScreen';
import FindCarScreen from '../../screens/FindCarsScreen';
import AllCarScreen from '../../screens/AllCarsScreen';
import Gallery from '../../screens/Gallery';
import FilteredCarsScreen from '../../screens/FilteredCarsScreen';
import SearchScreen from '../../screens/SearchScreen';
import AdvancedSearchScreen from '../../screens/AdvancedSearchScreen';
import CompareBuilderScreen from '../../screens/CompareBuilderScreen';
import CompareScreen from '../../screens/CompareScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#003366',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          height: 80,
          paddingBottom: 12,
          paddingTop: 8,
          backgroundColor: '#f8f8f8',
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="AllCars"
        component={AllCarScreen}
        options={{
          title: 'All Cars',
          tabBarIcon: ({ color }) => (
            <Ionicons name="car-sport" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="FindCar"
        component={FindCarScreen}
        options={{
          title: 'Find Car',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Compare"
        component={CompareBuilderScreen}
        options={{
          title: 'Compare',
          tabBarIcon: ({ color }) => (
            <Ionicons name="git-compare" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="menu" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{ title: 'Gallery' }}
      />
      <Stack.Screen
        name="FilteredCars"
        component={FilteredCarsScreen}
        options={{ title: 'Filtered Cars' }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Stack.Screen
        name="AdvancedSearch"
        component={AdvancedSearchScreen}
        options={{ title: 'Refine Your Search' }}
      />
      <Stack.Screen
        name="CompareScreen"
        component={CompareScreen}
        options={{ title: 'Comparison' }}
      />
    </Stack.Navigator>
  );
}

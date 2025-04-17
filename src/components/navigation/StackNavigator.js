import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../../screens/HomeScreen';
import MoreScreen from '../../screens/MoreScreen';
import Financials from '../../screens/Financials';
import CompareCar from '../../screens/CompareCar';
import AllCarScreen from '../../screens/AllCarsScreen';
import Gallery from '../../screens/Gallery';
import FilteredCarsScreen from '../../screens/FilteredCarsScreen';
import SearchScreen from '../../screens/SearchScreen';
import AdvancedSearchScreen from '../../screens/AdvancedSearchScreen';
import AboutScreen from '../moresection/AboutScreen';
import TermsScreen from '../moresection/TermsScreen';
import PrivacyScreen from '../moresection/PrivacyScreen';
import ContactUsScreen from '../moresection/ContactUsScreen'; // Used in Stack only

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
        name="Financials"
        component={Financials}
        options={{
          title: 'Finance',
          tabBarIcon: ({color }) => (
            <Ionicons
        name="add-circle-outline"
        color={color}
        size={50}
        style={{
          position: 'absolute',
          top: -20, // move icon upward
          zindex:5,
        }}
      />
          ),
        }}
      />
      <Tab.Screen
        name="CompareCar"
        component={CompareCar}
        options={{
          title: 'Compare',
          tabBarIcon: ({ color }) => (
            <Ionicons name="call" color={color} size={30} />
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
      <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Gallery" component={Gallery} options={{ title: 'Gallery' }} />
      <Stack.Screen name="FilteredCars" component={FilteredCarsScreen} options={{ title: 'Filtered Cars' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} options={{ title: 'Refine Your Search' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Syarah' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Terms and Conditions' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ title: 'Contact Us' }} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screen Imports
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
import ContactUsScreen from '../moresection/ContactUsScreen';

// Financial Flow Components
import CashBrand from '../../components/Financials/CashBrand';
import CashModel from '../../components/Financials/CashModel';
import CashCatagory from '../../components/Financials/CashCatagory';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom Center Tab Icon
const CenterTabIcon = ({ color }) => (
  <View style={{
    position: 'absolute',
    top: -20,
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }}>
    <Ionicons name="add-circle" color={color} size={40} />
  </View>
);

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
          elevation: 0,
          shadowOpacity: 0,
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
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AllCars"
        component={AllCarScreen}
        options={{
          title: 'All Cars',
          tabBarIcon: ({ color }) => (
            <Ionicons name="car-sport" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Financials"
        component={Financials}
        options={{
          title: 'Finance',
          tabBarIcon: ({ color }) => <CenterTabIcon color={color} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="CompareCar"
        component={CompareCar}
        options={{
          title: 'Compare',
          tabBarIcon: ({ color }) => (
            <Ionicons name="git-compare" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="menu" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#003366',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
      }}
    >
      {/* Main Bottom Tabs */}
      <Stack.Screen 
        name="Main" 
        component={BottomTabs} 
        options={{ headerShown: false }} 
      />

      {/* General App Screens */}
      <Stack.Screen name="Gallery" component={Gallery} options={{ title: 'Gallery' }} />
      <Stack.Screen name="FilteredCars" component={FilteredCarsScreen} options={{ title: 'Filtered Cars' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} options={{ title: 'Refine Search' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Terms & Conditions' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ title: 'Contact Us' }} />

      {/* Financial Flow Screens */}
      <Stack.Screen 
        name="CashBrand" 
        component={CashBrand} 
        options={{ 
          title: 'Select Brand',
          headerBackTitle: 'Back',
        }} 
      />
      <Stack.Screen 
        name="CashModel" 
        component={CashModel} 
        options={({ route }) => ({ 
          title: `${route.params?.brand || 'Select'} Models`,
          headerBackTitle: 'Back',
        })} 
      />
      <Stack.Screen 
        name="CashCatagory" 
        component={CashCatagory} 
        options={({ route }) => ({ 
          title: `${route.params?.brand || ''} ${route.params?.model || 'Model'}`,
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}
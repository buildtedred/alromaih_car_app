import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../../screens/HomeScreen';
import MoreScreen from '../../screens/MoreScreen';
import FindCarScreen from '../../screens/FindCarsScreen';
import ContactUsScreen from '../../screens/ContectUsScreen';
import AllCarScreen from '../../screens/AllCarsScreen';

const Tab = createBottomTabNavigator();

export default function StackNavigator() {
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={30} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="All Cars"
        component={AllCarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-sport" color={color} size={30} />
          ),
          tabBarLabel: 'All Cars',
        }}
      />
      <Tab.Screen
        name="Find Car"
        component={FindCarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={30} />
          ),
          tabBarLabel: 'Find Car',
        }}
      />
      <Tab.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call" color={color} size={30} />
          ),
          tabBarLabel: 'Contact Us',
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={30} />
          ),
          tabBarLabel: 'More',
        }}
      />
    </Tab.Navigator>
  );
}
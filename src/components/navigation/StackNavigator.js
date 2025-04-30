import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CenterTabIcon from '../../components/common/CenterTabIcon';

// Screens
import HomeScreen from '../../screens/HomeScreen';
import MoreScreen from '../../screens/MoreScreen';
import Financials from '../../screens/Financials';
import AllCarScreen from '../../screens/AllCarsScreen';
import Gallery from '../../screens/Gallery';
import SearchScreen from '../../screens/SearchScreen';
import AdvancedSearchScreen from '../../screens/AdvancedSearchScreen';
import CompareBuilderScreen from '../../screens/CompareBuilderScreen';
import CompareScreen from '../../screens/CompareScreen';
import AboutScreen from '../moresection/AboutScreen';
import TermsScreen from '../moresection/TermsScreen';
import PrivacyScreen from '../moresection/PrivacyScreen';
import ContactUsScreen from '../moresection/ContactUsScreen';
import BlogScreen from '../../screens/BlogScreen';
import NewsDetailScreen from '../../screens/NewsDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigation
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#46194F',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
          paddingBottom: 8,
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute',
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
            <Ionicons name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="AllCarsTab"
        component={AllCarScreen}
        options={{
          title: 'All Cars',
          tabBarIcon: ({ color }) => (
            <Ionicons name="car-sport" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Financials"
        component={Financials}
        options={{
          title: 'Finance',
          tabBarButton: (props) => (
            <CenterTabIcon
              focused={props.accessibilityState.selected}
              onPress={props.onPress}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Compare"
        component={CompareBuilderScreen}
        options={{
          title: 'Compare',
          tabBarIcon: ({ color }) => (
            <Ionicons name="git-compare" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="menu" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigation
export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#003366' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />

      {/* General Screens */}
      <Stack.Screen name="Gallery" component={Gallery} options={{ title: 'Gallery' }} />
      <Stack.Screen name="AllCars" component={AllCarScreen} options={{ title: 'All Cars' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} options={{ title: 'Refine Your Search' }} />
      <Stack.Screen name="CompareScreen" component={CompareScreen} options={{ title: 'Comparison' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Terms & Conditions' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ title: 'Contact Us' }} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
}

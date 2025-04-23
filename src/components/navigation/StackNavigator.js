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
import FilteredCarsScreen from '../../screens/FilteredCarsScreen';
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

// Financial Flow Components
import CashBrand from '../../components/Financials/CashBrand';
import CashModel from '../../components/Financials/CashModel';
import CashCategory from '../../components/Financials/CashCategory';
import CashYear from '../../components/Financials/CashYear';
import CashBank from '../../components/Financials/CashBank';
import FinanceBrand from '../../components/Financials/FinanceBrand';
import FinanceModel from '../../components/Financials/FinanceModel';
import FinanceCategory from '../../components/Financials/FinanceCategory';
import FinanceYear from '../../components/Financials/FinanceYear';
import FinanceBank from '../../components/Financials/FinanceBank';

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
          position: 'absolute', // ✅ important to let Finance button float
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
        name="AllCars"
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
        onPress={props.onPress} // 👈 Only icon is clickable now
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
      <Stack.Screen name="FilteredCars" component={FilteredCarsScreen} options={{ title: 'Filtered Cars' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} options={{ title: 'Refine Your Search' }} />
      <Stack.Screen name="CompareScreen" component={CompareScreen} options={{ title: 'Comparison' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Terms & Conditions' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ title: 'Contact Us' }} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />

      {/* Financial (Cash) Flow */}
      <Stack.Screen name="CashBrand" component={CashBrand} options={{ title: 'Select Brand' }} />
      <Stack.Screen
        name="CashModel"
        component={CashModel}
        options={({ route }) => ({ title: `${route.params?.brand || 'Select'} Models` })}
      />
      <Stack.Screen
        name="CashCategory"
        component={CashCategory}
        options={({ route }) => ({
          title: `${route.params?.brand || ''} ${route.params?.model || 'Model'}`,
        })}
      />
      <Stack.Screen
        name="CashYear"
        component={CashYear}
        options={({ route }) => ({
          title: `${route.params?.model || ''} - Year`,
        })}
      />
      <Stack.Screen name="CashBank" component={CashBank} options={{ title: 'Select Bank' }} />

      {/* Financial (Installment) Flow */}
      <Stack.Screen name="FinanceBrand" component={FinanceBrand} options={{ title: 'Select Brand' }} />
      <Stack.Screen name="FinanceModel" component={FinanceModel} options={{ title: 'Select Model' }} />
      <Stack.Screen name="FinanceCategory" component={FinanceCategory} options={{ title: 'Select Category' }} />
      <Stack.Screen name="FinanceYear" component={FinanceYear} options={{ title: 'Select Year' }} />
      <Stack.Screen name="FinanceBank" component={FinanceBank} options={{ title: 'Select Bank' }} />
    </Stack.Navigator>
  );
}
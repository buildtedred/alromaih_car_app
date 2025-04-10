import './src/services/localization';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LocaleProvider } from './src/contexts/LocaleContext';
import RTLManager from './src/components/RTLManager';
import StackNavigator from './src/components/navigation/StackNavigator';
import './global.css';

export default function App() {
  return (
    <LocaleProvider>
      <RTLManager />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </LocaleProvider>
  );
}
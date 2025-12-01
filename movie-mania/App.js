import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { StoreProvider, useStore } from './src/store';
import { paperDarkTheme, paperLightTheme } from './src/styles/theme';

function AppContent() {
  const { state } = useStore();
  const theme = state.theme === 'dark' ? paperDarkTheme : paperLightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

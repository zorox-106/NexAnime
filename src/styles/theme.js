import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { darkTheme, lightTheme } from '../constants/colors';

// React Native Paper theme for dark mode
export const paperDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: darkTheme.primary,
        background: darkTheme.background,
        surface: darkTheme.surface,
        onSurface: darkTheme.text,
        error: darkTheme.error,
        // Add other custom colors if needed, but respect MD3 structure
    },
};

// React Native Paper theme for light mode
export const paperLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: lightTheme.primary,
        background: lightTheme.background,
        surface: lightTheme.surface,
        onSurface: lightTheme.text,
        error: lightTheme.error,
    },
};

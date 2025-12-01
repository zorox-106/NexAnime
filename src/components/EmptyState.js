import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

/**
 * Empty state component for lists
 */
export const EmptyState = ({ icon = 'movie-off', title, message }) => {
    const { state } = useStore();
    const theme = state.theme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <MaterialCommunityIcons name={icon} size={80} color={theme.textSecondary} />
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});

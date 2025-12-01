import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

/**
 * Rating badge component with star icon
 */
export const RatingBadge = ({ rating, size = 'medium' }) => {
    const { state } = useStore();
    const theme = state.theme === 'dark' ? darkTheme : lightTheme;

    const sizeConfig = {
        small: { container: 30, icon: 12, text: 10 },
        medium: { container: 40, icon: 16, text: 12 },
        large: { container: 50, icon: 20, text: 14 },
    };

    const config = sizeConfig[size] || sizeConfig.medium;
    const displayRating = rating ? String(rating.toFixed(1)) : 'N/A';

    // Color based on rating
    const getRatingColor = () => {
        if (!rating) return theme.textSecondary;
        if (rating >= 7) return theme.success;
        if (rating >= 5) return theme.warning;
        return theme.error;
    };

    return (
        <View
            style={[
                styles.container,
                {
                    width: config.container,
                    height: config.container,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
            ]}
        >
            <MaterialCommunityIcons name="star" size={config.icon} color={theme.rating} />
            <Text
                style={[
                    styles.rating,
                    {
                        fontSize: config.text,
                        color: getRatingColor(),
                    },
                ]}
            >
                {displayRating}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    rating: {
        fontWeight: 'bold',
        marginTop: 2,
    },
});

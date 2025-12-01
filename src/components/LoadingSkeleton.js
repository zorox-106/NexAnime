import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

/**
 * Loading skeleton placeholder component
 */
export const LoadingSkeleton = ({ width, height, borderRadius = 8, style }) => {
    const { state } = useStore();
    const theme = state.theme === 'dark' ? darkTheme : lightTheme;
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animatedValue]);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <Animated.View
            style={[
                styles.skeleton,
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: theme.surface,
                    opacity,
                },
                style,
            ]}
        />
    );
};

/**
 * Movie card skeleton
 */
export const MovieCardSkeleton = () => {
    return (
        <View style={styles.cardContainer}>
            <LoadingSkeleton width={120} height={180} borderRadius={12} />
        </View>
    );
};

/**
 * List of skeleton cards
 */
export const SkeletonList = ({ count = 5, horizontal = false }) => {
    return (
        <View style={horizontal ? styles.horizontalList : styles.verticalList}>
            {Array.from({ length: count }).map((_, index) => (
                <MovieCardSkeleton key={index} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        overflow: 'hidden',
    },
    cardContainer: {
        marginRight: 12,
    },
    horizontalList: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    verticalList: {
        flexDirection: 'column',
        paddingHorizontal: 16,
    },
});

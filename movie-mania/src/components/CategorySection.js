import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MovieCard from './MovieCard';
import { SkeletonList } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

/**
 * Category section with horizontal scrolling movie list
 */
export default function CategorySection({
    title,
    movies = [],
    loading = false,
    onMoviePress,
    onSeeAllPress,
    categoryKey = 'default',
}) {
    const { state } = useStore();
    const theme = state.theme === 'dark' ? darkTheme : lightTheme;

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
                <SkeletonList count={5} horizontal />
            </View>
        );
    }

    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
                {onSeeAllPress && (
                    <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton}>
                        <Text style={[styles.seeAllText, { color: theme.primary }]}>See All</Text>
                        <MaterialCommunityIcons name="chevron-right" size={20} color={theme.primary} />
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                horizontal
                data={movies}
                keyExtractor={(item) => `${categoryKey}-${item.id}`}
                renderItem={({ item }) => <MovieCard movie={item} onPress={onMoviePress} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
    },
    list: {
        paddingHorizontal: 16,
    },
});

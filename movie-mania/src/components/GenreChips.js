import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

/**
 * Genre chips component
 */
export const GenreChips = ({ genreIds, allGenres = [] }) => {
    const { state } = useStore();
    const theme = state.theme === 'dark' ? darkTheme : lightTheme;

    if (!genreIds || genreIds.length === 0) return null;

    const genres = genreIds
        .map((id) => allGenres.find((g) => g.id === id))
        .filter(Boolean)
        .slice(0, 3); // Show max 3 genres

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {genres.map((genre) => (
                <Chip
                    key={genre.id}
                    mode="outlined"
                    style={[styles.chip, { borderColor: theme.primary }]}
                    textStyle={{ color: theme.primary, fontSize: 12 }}
                >
                    {genre.name}
                </Chip>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
    },
    chip: {
        marginRight: 8,
    },
});

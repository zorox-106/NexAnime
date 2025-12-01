import React from 'react';
import { View, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MovieCard from '../components/MovieCard';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

/**
 * Category Screen - Full list view
 */
export default function CategoryScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { state } = useStore();
    const theme = state.theme === 'dark' ? darkTheme : lightTheme;

    const { category, movies } = route.params;

    const handleMoviePress = (movie) => {
        navigation.navigate('MovieDetail', { id: movie.id });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar
                barStyle={state.theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={theme.background}
            />

            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.background }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>{category}</Text>
            </View>

            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard movie={item} onPress={handleMoviePress} />}
                numColumns={3}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    grid: {
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 20,
    },
});

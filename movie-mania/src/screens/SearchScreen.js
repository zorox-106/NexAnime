import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Searchbar, Chip, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MovieCard from '../components/MovieCard';
import { EmptyState } from '../components/EmptyState';
import { SkeletonList } from '../components/LoadingSkeleton';
import { animeService } from '../api/animeService';
import { useDebounce } from '../hooks/useDebounce';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';
import { applySorting, SORT_OPTIONS } from '../utils/sort';

/**
 * Enhanced Search Screen
 */
export default function SearchScreen() {
  const navigation = useNavigation();
  const { state, dispatch } = useStore();
  const theme = state.theme === 'dark' ? darkTheme : lightTheme;

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.RATING_DESC);

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      performSearch(debouncedSearch);
      dispatch({ type: 'ADD_SEARCH_HISTORY', payload: debouncedSearch });
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  const performSearch = async (query) => {
    setLoading(true);
    try {
      const response = await animeService.searchAnime(query, 1);
      setResults(response.results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { id: movie.id });
  };

  const sortedResults = applySorting(results, sortOption);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={state.theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search movies..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.surface }]}
          iconColor={theme.primary}
          inputStyle={{ color: theme.text }}
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      {/* Sort Options */}
      {results.length > 0 && (
        <View style={styles.sortContainer}>
          <Text style={[styles.sortLabel, { color: theme.textSecondary }]}>Sort by:</Text>
          <FlatList
            horizontal
            data={[
              { label: 'Rating ↓', value: SORT_OPTIONS.RATING_DESC },
              { label: 'Rating ↑', value: SORT_OPTIONS.RATING_ASC },
              { label: 'Date ↓', value: SORT_OPTIONS.DATE_DESC },
              { label: 'Title A-Z', value: SORT_OPTIONS.TITLE_ASC },
            ]}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Chip
                selected={sortOption === item.value}
                onPress={() => setSortOption(item.value)}
                style={[
                  styles.chip,
                  sortOption === item.value && { backgroundColor: theme.primary },
                ]}
                textStyle={{
                  color: sortOption === item.value ? '#FFFFFF' : theme.text,
                }}
              >
                {item.label}
              </Chip>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipList}
          />
        </View>
      )}

      {/* Results */}
      {loading ? (
        <SkeletonList count={6} />
      ) : searchQuery.trim() === '' ? (
        <EmptyState
          icon="magnify"
          title="Search Movies"
          message="Enter a movie title to start searching"
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon="movie-off"
          title="No Results"
          message={`No movies found for "${searchQuery}"`}
        />
      ) : (
        <FlatList
          data={sortedResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} onPress={handleMoviePress} />}
          numColumns={3}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    elevation: 2,
  },
  sortContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sortLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  chipList: {
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});

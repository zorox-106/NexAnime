import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Text, Menu, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MovieCard from '../components/MovieCard';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../hooks/useFavorites';
import { animeService } from '../api/animeService';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';
import { applySorting, SORT_OPTIONS } from '../utils/sort';

/**
 * Favorites Screen
 */
export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { state } = useStore();
  const theme = state.theme === 'dark' ? darkTheme : lightTheme;
  const { favorites } = useFavorites();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.RATING_DESC);
  const [menuVisible, setMenuVisible] = useState(false);

  const fetchFavoriteMovies = async () => {
    try {
      setLoading(true);
      const animePromises = favorites.map((id) => animeService.fetchAnimeDetails(id));
      const animeDetails = await Promise.all(animePromises);
      setMovies(animeDetails.filter(Boolean));
    } catch (error) {
      console.error('Error fetching favorite anime:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, [favorites.length]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavoriteMovies();
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { id: movie.id });
  };

  const sortedMovies = applySorting(movies, sortOption);

  const sortOptions = [
    { label: 'Rating (High to Low)', value: SORT_OPTIONS.RATING_DESC },
    { label: 'Rating (Low to High)', value: SORT_OPTIONS.RATING_ASC },
    { label: 'Release Date (Newest)', value: SORT_OPTIONS.DATE_DESC },
    { label: 'Release Date (Oldest)', value: SORT_OPTIONS.DATE_ASC },
    { label: 'Title (A-Z)', value: SORT_OPTIONS.TITLE_ASC },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={state.theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          My Favorites
        </Text>
        <Text style={[styles.count, { color: theme.textSecondary }]}>
          {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
        </Text>
      </View>

      {movies.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No Favorite Movies"
          message="Add movies to your favorites to see them here"
        />
      ) : (
        <>
          {/* Sort Button */}
          <View style={styles.sortContainer}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setMenuVisible(true)}
                  icon="sort"
                  textColor={theme.text}
                  style={{ borderColor: theme.border }}
                >
                  Sort
                </Button>
              }
            >
              {sortOptions.map((option) => (
                <Menu.Item
                  key={option.value}
                  onPress={() => {
                    setSortOption(option.value);
                    setMenuVisible(false);
                  }}
                  title={option.label}
                  titleStyle={{
                    color: sortOption === option.value ? theme.primary : theme.text,
                  }}
                />
              ))}
            </Menu>
          </View>

          <FlatList
            data={sortedMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} onPress={handleMoviePress} />}
            numColumns={3}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.primary}
                colors={[theme.primary]}
              />
            }
          />
        </>
      )}
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    marginTop: 4,
  },
  sortContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});

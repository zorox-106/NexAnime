import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CategorySection from '../components/CategorySection';
import { animeService } from '../api/animeService';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

/**
 * Home Screen with all movie categories
 */
export default function HomeScreen() {
  const navigation = useNavigation();
  const { state } = useStore();
  const theme = state.theme === 'dark' ? darkTheme : lightTheme;

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllCategories = async () => {
    try {
      const [trendingData, popularData, topRatedData, upcomingData] = await Promise.all([
        animeService.fetchTrendingAnime(1),
        animeService.fetchPopularAnime(1),
        animeService.fetchTopRatedAnime(1),
        animeService.fetchUpcomingAnime(1),
      ]);

      // Deduplicate anime by ID within each category
      const deduplicateAnime = (animeList) => {
        const seen = new Set();
        return animeList.filter(anime => {
          if (seen.has(anime.id)) return false;
          seen.add(anime.id);
          return true;
        });
      };

      setTrending(deduplicateAnime(trendingData.results.slice(0, 10)));
      setPopular(deduplicateAnime(popularData.results.slice(0, 10)));
      setTopRated(deduplicateAnime(topRatedData.results.slice(0, 10)));
      setUpcoming(deduplicateAnime(upcomingData.results.slice(0, 10)));
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAllCategories();
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { id: movie.id });
  };

  const handleSeeAll = (category, movies) => {
    navigation.navigate('Category', { category, movies });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={state.theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          Nex Anime
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      >
        {/* Trending Section */}
        <CategorySection
          title="🔥 Trending Now"
          movies={trending}
          loading={loading}
          onMoviePress={handleMoviePress}
          onSeeAllPress={() => handleSeeAll('Trending', trending)}
          categoryKey="trending"
        />

        {/* Popular Section */}
        <CategorySection
          title="⭐ Popular"
          movies={popular}
          loading={loading}
          onMoviePress={handleMoviePress}
          onSeeAllPress={() => handleSeeAll('Popular', popular)}
          categoryKey="popular"
        />

        {/* Top Rated Section */}
        <CategorySection
          title="🏆 Top Rated"
          movies={topRated}
          loading={loading}
          onMoviePress={handleMoviePress}
          onSeeAllPress={() => handleSeeAll('Top Rated', topRated)}
          categoryKey="toprated"
        />

        {/* Upcoming Section */}
        <CategorySection
          title="🎬 Coming Soon"
          movies={upcoming}
          loading={loading}
          onMoviePress={handleMoviePress}
          onSeeAllPress={() => handleSeeAll('Upcoming', upcoming)}
          categoryKey="upcoming"
        />

        <View style={{ height: 20 }} />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
});

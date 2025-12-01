import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Text, IconButton, Button, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RatingBadge } from '../components/RatingBadge';
import { animeService } from '../api/animeService';
import { useFavorites } from '../hooks/useFavorites';
import { useWatchlist } from '../hooks/useWatchlist';
import { shareMovie } from '../utils/share';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

const { width, height } = Dimensions.get('window');

/**
 * Movie Detail Screen
 */
export default function AnimeDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { state } = useStore();
  const theme = state.theme === 'dark' ? darkTheme : lightTheme;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieData();
  }, [id]);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const [movieData, creditsData, similarData] = await Promise.all([
        animeService.fetchAnimeDetails(id),
        animeService.fetchAnimeCharacters(id),
        animeService.fetchSimilarAnime(id),
      ]);

      setMovie(movieData);
      // Map anime characters to cast structure if needed, or update UI to handle it
      // For now, we'll just set it as cast since we mapped it in service
      setCredits({ cast: creditsData, crew: [] });
      setSimilar(similarData.results.slice(0, 10));
    } catch (error) {
      console.error('Error fetching anime details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !movie) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar barStyle="light-content" />
        <Text style={{ color: theme.text, textAlign: 'center', marginTop: 100 }}>
          Loading...
        </Text>
      </View>
    );
  }

  const isFav = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);
  const director = credits.crew.find((person) => person.job === 'Director');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Backdrop Image */}
        <View style={styles.backdropContainer}>
          {movie.backdrop_url_large || movie.poster_url_large ? (
            <Image
              source={{ uri: movie.backdrop_url_large || movie.poster_url_large }}
              style={styles.backdrop}
              resizeMode="cover"
              blurRadius={!movie.backdrop_url_large ? 10 : 0} // Blur if using poster as backdrop
            />
          ) : (
            <View style={[styles.backdrop, { backgroundColor: theme.surface }]} />
          )}

          <LinearGradient
            colors={['transparent', theme.background]}
            style={styles.backdropGradient}
          />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Movie Info */}
        <View style={styles.content}>
          {/* Poster and Title */}
          <View style={styles.headerSection}>
            {movie.poster_url_large && (
              <Image
                source={{ uri: movie.poster_url_large }}
                style={styles.poster}
                resizeMode="cover"
              />
            )}

            <View style={styles.titleSection}>
              <Text style={[styles.title, { color: theme.text }]}>
                {movie.title}
              </Text>

              {movie.tagline && (
                <Text style={[styles.tagline, { color: theme.textSecondary }]}>
                  "{movie.tagline}"
                </Text>
              )}

              <View style={styles.ratingRow}>
                <RatingBadge rating={movie.vote_average} size="large" />
                <View style={{ marginLeft: 12 }}>
                  <Text style={[styles.ratingText, { color: theme.text }]}>
                    {movie.vote_average?.toFixed(1)}/10
                  </Text>
                  <Text style={[styles.voteCount, { color: theme.textSecondary }]}>
                    {movie.vote_count} votes
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              mode={isFav ? 'contained' : 'outlined'}
              icon={isFav ? 'heart' : 'heart-outline'}
              onPress={() => toggleFavorite(movie.id)}
              style={styles.actionButton}
              buttonColor={isFav ? theme.primary : 'transparent'}
              textColor={isFav ? '#FFFFFF' : theme.text}
            >
              Favorite
            </Button>

            <Button
              mode={inWatchlist ? 'contained' : 'outlined'}
              icon={inWatchlist ? 'bookmark' : 'bookmark-outline'}
              onPress={() => toggleWatchlist(movie.id)}
              style={styles.actionButton}
              buttonColor={inWatchlist ? theme.primary : 'transparent'}
              textColor={inWatchlist ? '#FFFFFF' : theme.text}
            >
              Watchlist
            </Button>

            <IconButton
              icon="share-variant"
              size={24}
              iconColor={theme.text}
              onPress={() => shareMovie(movie)}
              style={[styles.shareButton, { borderColor: theme.border }]}
            />
          </View>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  mode="outlined"
                  style={[styles.genreChip, { borderColor: theme.primary }]}
                  textStyle={{ color: theme.primary }}
                >
                  {genre.name}
                </Chip>
              ))}
            </View>
          )}

          {/* Movie Details */}
          <View style={styles.detailsRow}>
            {movie.release_date && (
              <View style={styles.detailItem}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color={theme.textSecondary}
                />
                <Text style={[styles.detailText, { color: theme.text }]}>
                  {new Date(movie.release_date).getFullYear()}
                </Text>
              </View>
            )}

            {movie.runtime && (
              <View style={styles.detailItem}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color={theme.textSecondary}
                />
                <Text style={[styles.detailText, { color: theme.text }]}>
                  {movie.runtime} min
                </Text>
              </View>
            )}

            {director && (
              <View style={styles.detailItem}>
                <MaterialCommunityIcons
                  name="movie-open"
                  size={20}
                  color={theme.textSecondary}
                />
                <Text style={[styles.detailText, { color: theme.text }]} numberOfLines={1}>
                  {director.name}
                </Text>
              </View>
            )}
          </View>

          {/* Overview */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Overview</Text>
            <Text style={[styles.overview, { color: theme.textSecondary }]}>
              {movie.overview || 'No overview available.'}
            </Text>
          </View>

          {/* Cast */}
          {credits.cast.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Cast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {credits.cast.slice(0, 10).map((person) => (
                  <View key={person.id} style={styles.castItem}>
                    {person.profile_url ? (
                      <Image
                        source={{ uri: person.profile_url }}
                        style={styles.castImage}
                      />
                    ) : (
                      <View style={[styles.castImage, { backgroundColor: theme.surface }]}>
                        <MaterialCommunityIcons
                          name="account"
                          size={30}
                          color={theme.textSecondary}
                        />
                      </View>
                    )}
                    <Text
                      style={[styles.castName, { color: theme.text }]}
                      numberOfLines={1}
                    >
                      {person.name}
                    </Text>
                    <Text
                      style={[styles.castCharacter, { color: theme.textSecondary }]}
                      numberOfLines={1}
                    >
                      {person.character}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdropContainer: {
    height: height * 0.35,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    marginTop: -60,
  },
  headerSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginRight: 16,
  },
  titleSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  voteCount: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  shareButton: {
    borderWidth: 1,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  genreChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  overview: {
    fontSize: 15,
    lineHeight: 24,
  },
  castItem: {
    width: 100,
    marginRight: 12,
  },
  castImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  castName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  castCharacter: {
    fontSize: 12,
    textAlign: 'center',
  },
});

import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RatingBadge } from './RatingBadge';
import { useFavorites } from '../hooks/useFavorites';
import { useWatchlist } from '../hooks/useWatchlist';
import { useStore } from '../store';
import { darkTheme, lightTheme } from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 3; // 3 cards per row with padding
const CARD_HEIGHT = CARD_WIDTH * 1.5;

/**
 * Enhanced Movie Card Component
 */
export default function MovieCard({ movie, onPress, size = 'medium' }) {
  const { state } = useStore();
  const theme = state.theme === 'dark' ? darkTheme : lightTheme;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const cardWidth = size === 'large' ? CARD_WIDTH * 1.2 : CARD_WIDTH;
  const cardHeight = size === 'large' ? CARD_HEIGHT * 1.2 : CARD_HEIGHT;

  const posterUrl = movie.poster_url || movie.poster_url_large;
  const isFav = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <TouchableOpacity
      style={[styles.container, { width: cardWidth }]}
      onPress={() => onPress && onPress(movie)}
      activeOpacity={0.9}
    >
      <View style={[styles.card, { height: cardHeight }]}>
        {posterUrl ? (
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: theme.surface }]}>
            <MaterialCommunityIcons name="movie" size={40} color={theme.textSecondary} />
          </View>
        )}

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.gradient}
        >
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {String(movie.title || '')}
            </Text>
          </View>
        </LinearGradient>

        {/* Rating badge */}
        <View style={styles.ratingContainer}>
          <RatingBadge rating={movie.vote_average} size="small" />
        </View>

        {/* Quick actions */}
        <View style={styles.actions}>
          <IconButton
            icon={isFav ? 'heart' : 'heart-outline'}
            iconColor={isFav ? theme.primary : '#FFFFFF'}
            size={20}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.id);
            }}
            style={styles.actionButton}
          />
          <IconButton
            icon={inWatchlist ? 'bookmark' : 'bookmark-outline'}
            iconColor={inWatchlist ? theme.primary : '#FFFFFF'}
            size={20}
            onPress={(e) => {
              e.stopPropagation();
              toggleWatchlist(movie.id);
            }}
            style={styles.actionButton}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginRight: 12,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2A2A2A',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 8,
  },
  info: {
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ratingContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  actions: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'column',
    gap: 4,
  },
  actionButton: {
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 28,
    height: 28,
  },
});

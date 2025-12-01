import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Text, Switch, List, Divider, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../store';
import { useFavorites } from '../hooks/useFavorites';
import { useWatchlist } from '../hooks/useWatchlist';
import { darkTheme, lightTheme } from '../constants/colors';

/**
 * Profile Screen with settings
 */
export default function ProfileScreen() {
  const { state, dispatch } = useStore();
  const theme = state.theme === 'dark' ? darkTheme : lightTheme;
  const { favoritesCount } = useFavorites();
  const { watchlistCount } = useWatchlist();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={state.theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Statistics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Statistics</Text>

          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <MaterialCommunityIcons name="heart" size={32} color={theme.primary} />
              <Text style={[styles.statNumber, { color: theme.text }]}>
                {favoritesCount}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Favorites
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <MaterialCommunityIcons name="bookmark" size={32} color={theme.primary} />
              <Text style={[styles.statNumber, { color: theme.text }]}>
                {watchlistCount}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Watchlist
              </Text>
            </View>
          </View>
        </View>

        <Divider style={{ backgroundColor: theme.border }} />

        {/* Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>

          <List.Item
            title="Dark Mode"
            description="Toggle between light and dark theme"
            left={(props) => (
              <List.Icon
                {...props}
                icon="theme-light-dark"
                color={theme.text}
              />
            )}
            right={() => (
              <Switch
                value={state.theme === 'dark'}
                onValueChange={toggleTheme}
                color={theme.primary}
              />
            )}
            titleStyle={{ color: theme.text }}
            descriptionStyle={{ color: theme.textSecondary }}
          />

          <Divider style={{ backgroundColor: theme.border }} />

          <List.Item
            title="Notifications"
            description="Coming soon"
            left={(props) => (
              <List.Icon {...props} icon="bell-outline" color={theme.text} />
            )}
            titleStyle={{ color: theme.text }}
            descriptionStyle={{ color: theme.textSecondary }}
          />

          <Divider style={{ backgroundColor: theme.border }} />

          <List.Item
            title="Language"
            description="English"
            left={(props) => (
              <List.Icon {...props} icon="translate" color={theme.text} />
            )}
            titleStyle={{ color: theme.text }}
            descriptionStyle={{ color: theme.textSecondary }}
          />
        </View>

        <Divider style={{ backgroundColor: theme.border }} />

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>

          <List.Item
            title="Version"
            description="1.0.0"
            left={(props) => (
              <List.Icon {...props} icon="information-outline" color={theme.text} />
            )}
            titleStyle={{ color: theme.text }}
            descriptionStyle={{ color: theme.textSecondary }}
          />

          <Divider style={{ backgroundColor: theme.border }} />

          <List.Item
            title="Powered by OMDb"
            description="The Open Movie Database API"
            left={(props) => (
              <List.Icon {...props} icon="movie-open" color={theme.text} />
            )}
            titleStyle={{ color: theme.text }}
            descriptionStyle={{ color: theme.textSecondary }}
          />
        </View>

        <View style={{ height: 40 }} />
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
});

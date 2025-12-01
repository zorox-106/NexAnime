import React from 'react';
import { FlatList } from 'react-native';
import MovieCard from './MovieCard';

export default function MovieList({ data, onPressItem }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={() => onPressItem?.(item)} />
      )}
      contentContainerStyle={{ padding: 12 }}
    />
  );
}



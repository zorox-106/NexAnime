import React from 'react';
import { View, TextInput } from 'react-native';
import { colors } from '../constants/colors';

export default function SearchBar({ value, onChangeText, placeholder = 'Search movies...' }) {
  return (
    <View style={{ padding: 12, backgroundColor: colors.background }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        style={{ backgroundColor: colors.surface, color: colors.textPrimary, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 }}
      />
    </View>
  );
}



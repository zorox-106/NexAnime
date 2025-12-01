import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { fontSizes } from '../constants/fonts';

export const globalStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  heading: { color: colors.textPrimary, fontSize: fontSizes.xl },
  text: { color: colors.textPrimary, fontSize: fontSizes.md },
  muted: { color: colors.textSecondary },
});



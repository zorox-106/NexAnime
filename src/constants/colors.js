// Netflix-inspired color scheme
export const darkTheme = {
  primary: '#E50914',      // Netflix red
  background: '#0F0F0F',   // Almost black
  surface: '#1A1A1A',      // Dark gray
  card: '#2A2A2A',         // Card background
  text: '#FFFFFF',         // White text
  textSecondary: '#B3B3B3', // Gray text
  border: '#404040',       // Border color
  success: '#46D369',      // Green
  warning: '#FFA500',      // Orange
  error: '#E50914',        // Red
  rating: '#FFD700',       // Gold for ratings
  overlay: 'rgba(0, 0, 0, 0.7)',
  gradientStart: 'rgba(15, 15, 15, 0)',
  gradientEnd: 'rgba(15, 15, 15, 1)',
};

export const lightTheme = {
  primary: '#E50914',      // Netflix red
  background: '#FFFFFF',   // White
  surface: '#F5F5F5',      // Light gray
  card: '#FFFFFF',         // White card
  text: '#000000',         // Black text
  textSecondary: '#666666', // Gray text
  border: '#E0E0E0',       // Light border
  success: '#46D369',      // Green
  warning: '#FFA500',      // Orange
  error: '#E50914',        // Red
  rating: '#FFD700',       // Gold for ratings
  overlay: 'rgba(255, 255, 255, 0.9)',
  gradientStart: 'rgba(255, 255, 255, 0)',
  gradientEnd: 'rgba(255, 255, 255, 1)',
};

// Legacy export for backward compatibility
export const colors = darkTheme;

# Movie Mania - Discover, Search and Track Movies

A comprehensive React Native mobile application for discovering, searching, and tracking movies using the **OMDb API**.

## Features

### Core Features
- ✅ Fetch movies from OMDb API
- ✅ Display trending, popular, top-rated, and upcoming movies (simulated via search queries)
- ✅ Movie search with debounced input
- ✅ Detailed movie information (poster, title, description, ratings, genres, release date, cast)

### User Features
- ✅ Add movies to Favorites
- ✅ Add movies to Watchlist
- ✅ Persistent storage using AsyncStorage
- ✅ Offline viewing of Watchlist and Favorites
- ✅ Share movie information

### Extra Features
- ✅ Pagination and infinite scroll
- ✅ Pull-to-refresh on lists
- ✅ Light + Dark mode theme
- ✅ Image caching for faster loading
- ✅ Search suggestions and debounced search
- ✅ Sort movies by rating or release date
- ✅ Modern Netflix-like UI

### UI/UX
- ✅ React Native Paper components
- ✅ Minimalistic design with rounded cards
- ✅ Bottom navigation tabs (Home, Search, Favorites, Watchlist, Profile)
- ✅ Horizontal scrolling lists
- ✅ Smooth animations and transitions
- ✅ Loading skeleton placeholders
- ✅ Empty state components

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Get OMDb API Key

1. Go to [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Select "FREE" (1,000 daily limit)
3. Enter your email and name
4. Verify your email to get the key

### 3. Add Your API Key

Open `src/constants/omdb.js` and replace the key if needed:

```javascript
export const OMDB_API_KEY = 'your_api_key_here';
```

### 4. Run the App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
movie-mania/
├── src/
│   ├── api/              # API client and services
│   │   ├── apiClient.js
│   │   └── movieService.js
│   ├── components/       # Reusable UI components
│   │   ├── CategorySection.js
│   │   ├── EmptyState.js
│   │   ├── GenreChips.js
│   │   ├── LoadingSkeleton.js
│   │   ├── MovieCard.js
│   │   └── RatingBadge.js
│   ├── constants/        # App constants
│   │   ├── colors.js
│   │   └── omdb.js
│   ├── hooks/            # Custom React hooks
│   │   ├── useDebounce.js
│   │   ├── useFavorites.js
│   │   ├── useMovies.js
│   │   └── useWatchlist.js
│   ├── navigation/       # Navigation setup
│   │   ├── AppNavigator.js
│   │   └── TabNavigator.js
│   ├── screens/          # App screens
│   │   ├── CategoryScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── HomeScreen.js
│   │   ├── MovieDetailScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── SearchScreen.js
│   │   └── WatchlistScreen.js
│   ├── store/            # Global state management
│   │   └── index.js
│   ├── styles/           # Styling and themes
│   │   └── theme.js
│   └── utils/            # Utility functions
│       ├── share.js
│       ├── sort.js
│       └── storage.js
├── assets/               # App assets
│   ├── icon.png
│   └── splash.png
├── App.js               # Root component
└── package.json         # Dependencies

```

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **React Native Paper** - UI component library
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **Context API + Hooks** - State management

## Screens

1. **Home Screen** - Displays trending, popular, top-rated, and upcoming movies
2. **Search Screen** - Search movies with filters and sorting
3. **Movie Details** - Complete movie information with cast and actions
4. **Favorites** - User's favorite movies
5. **Watchlist** - Movies to watch later
6. **Profile** - User statistics and app settings
7. **Category** - Full list view for movie categories

## Color Theme

### Dark Theme (Default)
- Primary: #E50914 (Netflix Red)
- Background: #0F0F0F (Almost Black)
- Surface: #1A1A1A (Dark Gray)
- Text: #FFFFFF (White)

### Light Theme
- Primary: #E50914 (Netflix Red)
- Background: #FFFFFF (White)
- Surface: #F5F5F5 (Light Gray)
- Text: #000000 (Black)

## Features in Detail

### Favorites & Watchlist
- Persistent storage using AsyncStorage
- Offline access to saved movies
- Quick add/remove from movie cards
- Sort by rating, date, or title

### Search
- Debounced search input (500ms delay)
- Real-time results from OMDb API
- Sort options (rating, date, title)
- Empty state for no results

### Movie Details
- Large backdrop image with gradient
- Poster thumbnail
- Rating with color coding
- Genres as chips
- Cast list with photos
- Share functionality
- Add to Favorites/Watchlist

### Theme Support
- Toggle between light and dark mode
- Persistent theme preference
- Smooth theme transitions
- Netflix-inspired color scheme

## Troubleshooting

### API Key Issues
If you see "API Error" in the console:
1. Make sure you've added your OMDb API key in `src/constants/omdb.js`
2. Verify the API key is active (check your email for activation)
3. Check your internet connection

### Build Issues
If you encounter build errors:
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --clear
```

## License

This project is for educational purposes.

## Credits

- Movie data provided by [The Open Movie Database (OMDb)](http://www.omdbapi.com/)
- UI inspired by Netflix

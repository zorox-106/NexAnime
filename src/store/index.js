import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react';
import { loadItem, saveItem } from '../utils/storage';

const StoreContext = createContext(null);

const initialState = {
  movies: [],
  favorites: [],
  watchlist: [],
  theme: 'dark', // 'light' or 'dark'
  loading: false,
  searchHistory: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'TOGGLE_FAVORITE': {
      const id = action.payload;
      const isFav = state.favorites.includes(id);
      const favorites = isFav
        ? state.favorites.filter((x) => x !== id)
        : [...state.favorites, id];
      return { ...state, favorites };
    }

    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload || [] };

    case 'TOGGLE_WATCHLIST': {
      const id = action.payload;
      const isInWatchlist = state.watchlist.includes(id);
      const watchlist = isInWatchlist
        ? state.watchlist.filter((x) => x !== id)
        : [...state.watchlist, id];
      return { ...state, watchlist };
    }

    case 'SET_WATCHLIST':
      return { ...state, watchlist: action.payload || [] };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };

    case 'ADD_SEARCH_HISTORY': {
      const query = action.payload;
      if (!query || typeof query !== 'string' || query.trim() === '') return state;
      const newHistory = [query, ...state.searchHistory.filter(q => q !== query)].slice(0, 10);
      return { ...state, searchHistory: newHistory };
    }

    case 'SET_SEARCH_HISTORY':
      return { ...state, searchHistory: action.payload || [] };

    case 'CLEAR_SEARCH_HISTORY':
      return { ...state, searchHistory: [] };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    (async () => {
      const [fav, watch, theme, searchHist] = await Promise.all([
        loadItem('favorites', []),
        loadItem('watchlist', []),
        loadItem('theme', 'dark'),
        loadItem('searchHistory', []),
      ]);

      dispatch({ type: 'SET_FAVORITES', payload: fav });
      dispatch({ type: 'SET_WATCHLIST', payload: watch });
      dispatch({ type: 'SET_THEME', payload: theme });
      dispatch({ type: 'SET_SEARCH_HISTORY', payload: searchHist });
    })();
  }, []);

  // Persist favorites
  useEffect(() => {
    saveItem('favorites', state.favorites);
  }, [state.favorites]);

  // Persist watchlist
  useEffect(() => {
    saveItem('watchlist', state.watchlist);
  }, [state.watchlist]);

  // Persist theme
  useEffect(() => {
    saveItem('theme', state.theme);
  }, [state.theme]);

  // Persist search history
  useEffect(() => {
    saveItem('searchHistory', state.searchHistory);
  }, [state.searchHistory]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}



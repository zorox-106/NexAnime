import { useStore } from '../store';
import { useCallback } from 'react';

/**
 * Custom hook for managing favorites
 * @returns {Object} - Favorites state and toggle function
 */
export const useFavorites = () => {
    const { state, dispatch } = useStore();

    const toggleFavorite = useCallback((movieId) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: movieId });
    }, [dispatch]);

    const isFavorite = useCallback((movieId) => {
        return state.favorites.includes(movieId);
    }, [state.favorites]);

    const getFavoriteMovies = useCallback(() => {
        return state.movies.filter((movie) => state.favorites.includes(movie.id));
    }, [state.movies, state.favorites]);

    return {
        favorites: state.favorites,
        toggleFavorite,
        isFavorite,
        getFavoriteMovies,
        favoritesCount: state.favorites.length,
    };
};

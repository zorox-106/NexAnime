import { useStore } from '../store';
import { useCallback } from 'react';

/**
 * Custom hook for managing watchlist
 * @returns {Object} - Watchlist state and toggle function
 */
export const useWatchlist = () => {
    const { state, dispatch } = useStore();

    const toggleWatchlist = useCallback((movieId) => {
        dispatch({ type: 'TOGGLE_WATCHLIST', payload: movieId });
    }, [dispatch]);

    const isInWatchlist = useCallback((movieId) => {
        return state.watchlist.includes(movieId);
    }, [state.watchlist]);

    const getWatchlistMovies = useCallback(() => {
        return state.movies.filter((movie) => state.watchlist.includes(movie.id));
    }, [state.movies, state.watchlist]);

    return {
        watchlist: state.watchlist,
        toggleWatchlist,
        isInWatchlist,
        getWatchlistMovies,
        watchlistCount: state.watchlist.length,
    };
};

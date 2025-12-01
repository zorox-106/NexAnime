import { useState, useCallback } from 'react';

/**
 * Custom hook for fetching movies with pagination and infinite scroll
 * @param {Function} fetchFunction - The API function to fetch movies
 * @returns {Object} - Movies data, loading state, and fetch functions
 */
export const useMovies = (fetchFunction) => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    // Initial fetch
    const fetchMovies = useCallback(async (pageNum = 1, append = false) => {
        try {
            if (pageNum === 1) {
                setLoading(true);
            }
            setError(null);

            const response = await fetchFunction(pageNum);

            if (append) {
                setMovies((prev) => [...prev, ...response.results]);
            } else {
                setMovies(response.results);
            }

            setPage(response.page);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError(err.message || 'Failed to fetch movies');
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [fetchFunction]);

    // Load more (for infinite scroll)
    const loadMore = useCallback(() => {
        if (!loading && page < totalPages) {
            fetchMovies(page + 1, true);
        }
    }, [loading, page, totalPages, fetchMovies]);

    // Refresh (for pull-to-refresh)
    const refresh = useCallback(async () => {
        setRefreshing(true);
        await fetchMovies(1, false);
    }, [fetchMovies]);

    return {
        movies,
        loading,
        refreshing,
        error,
        page,
        totalPages,
        fetchMovies,
        loadMore,
        refresh,
        hasMore: page < totalPages,
    };
};

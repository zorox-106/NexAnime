import { apiClient } from './apiClient';

// Helper to transform Jikan Anime to App structure
const transformAnime = (jikanAnime) => {
    if (!jikanAnime) return null;

    return {
        id: jikanAnime.mal_id,
        title: jikanAnime.title,
        title_english: jikanAnime.title_english,
        poster_path: jikanAnime.images?.jpg?.image_url,
        poster_url: jikanAnime.images?.jpg?.image_url,
        poster_url_large: jikanAnime.images?.jpg?.large_image_url,
        backdrop_path: jikanAnime.trailer?.images?.maximum_image_url || null,
        backdrop_url: jikanAnime.trailer?.images?.maximum_image_url || null,
        overview: jikanAnime.synopsis,
        release_date: jikanAnime.aired?.string,
        year: jikanAnime.year,
        vote_average: jikanAnime.score,
        vote_count: jikanAnime.scored_by,
        genres: jikanAnime.genres?.map((g) => ({ id: g.mal_id, name: g.name })) || [],
        episodes: jikanAnime.episodes,
        status: jikanAnime.status,
        duration: jikanAnime.duration,
        rating: jikanAnime.rating,
        studios: jikanAnime.studios?.map(s => s.name).join(', '),
        trailer_url: jikanAnime.trailer?.url,
    };
};

export const animeService = {
    // Fetch trending anime (Top Airing)
    async fetchTrendingAnime(page = 1) {
        try {
            const response = await apiClient.getTopAnime('airing', page);
            return {
                results: response.data?.map(transformAnime) || [],
                page: response.pagination?.current_page || page,
                hasNextPage: response.pagination?.has_next_page || false,
            };
        } catch (error) {
            console.error('Error fetching trending anime:', error);
            return { results: [], page: 1, hasNextPage: false };
        }
    },

    // Fetch popular anime (By Popularity)
    async fetchPopularAnime(page = 1) {
        try {
            const response = await apiClient.getTopAnime('bypopularity', page);
            return {
                results: response.data?.map(transformAnime) || [],
                page: response.pagination?.current_page || page,
                hasNextPage: response.pagination?.has_next_page || false,
            };
        } catch (error) {
            console.error('Error fetching popular anime:', error);
            return { results: [], page: 1, hasNextPage: false };
        }
    },

    // Fetch top rated anime
    async fetchTopRatedAnime(page = 1) {
        try {
            const response = await apiClient.getTopAnime(null, page); // Default is by rank/score
            return {
                results: response.data?.map(transformAnime) || [],
                page: response.pagination?.current_page || page,
                hasNextPage: response.pagination?.has_next_page || false,
            };
        } catch (error) {
            console.error('Error fetching top rated anime:', error);
            return { results: [], page: 1, hasNextPage: false };
        }
    },

    // Fetch upcoming anime
    async fetchUpcomingAnime(page = 1) {
        try {
            const response = await apiClient.getUpcomingSeason(page);
            return {
                results: response.data?.map(transformAnime) || [],
                page: response.pagination?.current_page || page,
                hasNextPage: response.pagination?.has_next_page || false,
            };
        } catch (error) {
            console.error('Error fetching upcoming anime:', error);
            return { results: [], page: 1, hasNextPage: false };
        }
    },

    // Search anime
    async searchAnime(query, page = 1) {
        try {
            if (!query || query.trim() === '') {
                return { results: [], page: 1, hasNextPage: false };
            }
            const response = await apiClient.searchAnime(query, page);
            return {
                results: response.data?.map(transformAnime) || [],
                page: response.pagination?.current_page || page,
                hasNextPage: response.pagination?.has_next_page || false,
            };
        } catch (error) {
            console.error('Error searching anime:', error);
            return { results: [], page: 1, hasNextPage: false };
        }
    },

    // Fetch anime details
    async fetchAnimeDetails(id) {
        try {
            const response = await apiClient.getAnimeById(id);
            return transformAnime(response.data);
        } catch (error) {
            console.error('Error fetching anime details:', error);
            return null;
        }
    },

    // Fetch anime characters
    async fetchAnimeCharacters(id) {
        try {
            const response = await apiClient.getAnimeCharacters(id);
            return response.data?.map(char => ({
                id: char.character.mal_id,
                name: char.character.name,
                character: char.role,
                profile_url: char.character.images?.jpg?.image_url,
            })) || [];
        } catch (error) {
            console.error('Error fetching anime characters:', error);
            return [];
        }
    },

    // Fetch anime recommendations (similar)
    async fetchSimilarAnime(id) {
        try {
            const response = await apiClient.getAnimeRecommendations(id);
            return {
                results: response.data?.map(rec => ({
                    id: rec.entry.mal_id,
                    title: rec.entry.title,
                    poster_url: rec.entry.images?.jpg?.image_url,
                    poster_url_large: rec.entry.images?.jpg?.large_image_url,
                })) || []
            };
        } catch (error) {
            console.error('Error fetching similar anime:', error);
            return { results: [] };
        }
    },

    // Fetch genres
    async fetchGenres() {
        try {
            const response = await apiClient.getGenres();
            return {
                genres: response.data?.map(g => ({ id: g.mal_id, name: g.name })) || []
            };
        } catch (error) {
            console.error('Error fetching genres:', error);
            return { genres: [] };
        }
    },
};

// Legacy exports for backward compatibility during refactor
export const fetchAllAnime = () => animeService.fetchPopularAnime();
export const fetchGenres = () => animeService.fetchGenres();
export const fetchAnime = (id) => animeService.fetchAnimeDetails(id);

import axios from 'axios';
import { JIKAN_BASE_URL } from '../constants/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: JIKAN_BASE_URL,
  timeout: 10000,
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Client
export const apiClient = {
  // Get top anime (trending/popular)
  async getTopAnime(filter = null, page = 1, limit = 20) {
    const params = { page, limit };
    if (filter) params.filter = filter;
    return axiosInstance.get('/top/anime', { params });
  },

  // Get upcoming seasons
  async getUpcomingSeason(page = 1, limit = 20) {
    return axiosInstance.get('/seasons/upcoming', { params: { page, limit } });
  },

  // Search anime
  async searchAnime(query, page = 1, limit = 20) {
    return axiosInstance.get('/anime', { params: { q: query, page, limit } });
  },

  // Get anime details by ID
  async getAnimeById(id) {
    return axiosInstance.get(`/anime/${id}`);
  },

  // Get anime characters
  async getAnimeCharacters(id) {
    return axiosInstance.get(`/anime/${id}/characters`);
  },

  // Get anime recommendations
  async getAnimeRecommendations(id) {
    return axiosInstance.get(`/anime/${id}/recommendations`);
  },

  // Get anime genres
  async getGenres() {
    return axiosInstance.get('/genres/anime');
  },
};



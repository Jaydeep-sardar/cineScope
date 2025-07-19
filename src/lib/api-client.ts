import axios, { AxiosResponse } from "axios"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "31e5cd5bfe561e5f2c5f68f514d990fd"
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3"
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p"

// Validate API key on startup
if (!API_KEY || API_KEY === "your_tmdb_api_key_here") {
  console.error("🔑 TMDB API Key is missing! Please add VITE_TMDB_API_KEY to your .env file")
}

// In-memory cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Image cache for better performance
const imageCache = new Set<string>()

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    api_key: API_KEY,
  },
})

// Cache interceptor
apiClient.interceptors.request.use((config) => {
  const cacheKey = `${config.url}?${new URLSearchParams(config.params).toString()}`
  const cachedData = cache.get(cacheKey)
  
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    console.log(`📦 Cache hit: ${cacheKey}`)
    // Return cached data by creating a fulfilled promise that axios can handle
    return Promise.reject({
      __cached: true,
      data: cachedData.data
    })
  }
  
  console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
  return config
})

// Response interceptor for caching and error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const cacheKey = `${response.config.url}?${new URLSearchParams(response.config.params).toString()}`
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    })
    
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    // Handle cached responses
    if (error.__cached) {
      return Promise.resolve({ data: error.data })
    }
    
    console.error("❌ Response Error:", error.response?.status, error.message)

    if (error.response?.status === 401) {
      console.error("🔑 Invalid TMDB API Key - Please check your API key configuration")
    }

    if (error.response?.status === 429) {
      console.error("⏰ TMDB API Rate limit exceeded - Please wait before making more requests")
    }

    return Promise.reject(error)
  },
)

// Types for TMDB API responses
export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  original_language: string
  genre_ids: number[]
  adult: boolean
  original_title: string
  video: boolean
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number | null
  status: string
  tagline: string | null
  budget: number
  revenue: number
  homepage: string | null
  imdb_id: string | null
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
}

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

// Image utility functions
export const getImageUrl = (path: string | null, size: string = "w500"): string => {
  if (!path) return "/placeholder.jpg"
  const url = `${IMAGE_BASE_URL}/${size}${path}`
  
  // Preload image for caching
  if (!imageCache.has(url)) {
    const img = new Image()
    img.src = url
    imageCache.add(url)
  }
  
  return url
}

export const preloadImage = (path: string | null, size: string = "w500"): void => {
  if (!path || imageCache.has(`${IMAGE_BASE_URL}/${size}${path}`)) return
  
  const img = new Image()
  img.src = getImageUrl(path, size)
}

// API endpoints
export const movieApi = {
  // Popular movies with pagination
  getPopular: (page: number = 1) => 
    apiClient.get<MovieListResponse>(`/movie/popular`, { params: { page } }),
    
  // Top rated movies with pagination
  getTopRated: (page: number = 1) => 
    apiClient.get<MovieListResponse>(`/movie/top_rated`, { params: { page } }),
    
  // Now playing movies with pagination
  getNowPlaying: (page: number = 1) => 
    apiClient.get<MovieListResponse>(`/movie/now_playing`, { params: { page } }),
    
  // Upcoming movies with pagination
  getUpcoming: (page: number = 1) => 
    apiClient.get<MovieListResponse>(`/movie/upcoming`, { params: { page } }),
    
  // Trending movies
  getTrending: (page: number = 1) => 
    apiClient.get<MovieListResponse>(`/trending/movie/day`, { params: { page } }),
    
  // Movie details
  getDetails: (id: number) => 
    apiClient.get<MovieDetails>(`/movie/${id}`),
    
  // Search movies
  search: (query: string, page: number = 1) =>
    apiClient.get<MovieListResponse>(`/search/movie`, { 
      params: { query: encodeURIComponent(query), page } 
    }),
    
  // Discover movies with filters
  discover: (params: Record<string, any> = {}) =>
    apiClient.get<MovieListResponse>(`/discover/movie`, { params }),
    
  // Get movie genres
  getGenres: () =>
    apiClient.get<{ genres: Genre[] }>(`/genre/movie/list`),
}

// Cache management utilities
export const clearCache = () => {
  cache.clear()
  imageCache.clear()
  console.log("🗑️ Cache cleared")
}

export const getCacheSize = () => {
  return {
    apiCache: cache.size,
    imageCache: imageCache.size
  }
}

// API endpoints
export const endpoints = {
  trending: "/trending/movie/day",
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
  nowPlaying: "/movie/now_playing",
  movieDetails: (id: number) => `/movie/${id}`,
  movieVideos: (id: number) => `/movie/${id}/videos`,
  movieCredits: (id: number) => `/movie/${id}/credits`,
  search: "/search/movie",
  genres: "/genre/movie/list",
  configuration: "/configuration",
}

export default apiClient

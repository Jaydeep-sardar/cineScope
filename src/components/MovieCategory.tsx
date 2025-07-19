import React, { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { movieApi, Movie } from '../lib/api-client'
import MovieCard from './MovieCard'

interface MovieCategoryProps {
  title: string
  endpoint: string
}

const MovieCategory: React.FC<MovieCategoryProps> = ({ title, endpoint }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasInitialLoad, setHasInitialLoad] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Intersection observer for infinite scroll detection
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px',
  })

  const fetchMovies = async (page: number, reset: boolean = false) => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      let response
      switch (endpoint) {
        case 'trending':
          response = await movieApi.getTrending(page)
          break
        case 'popular':
          response = await movieApi.getPopular(page)
          break
        case 'top_rated':
          response = await movieApi.getTopRated(page)
          break
        case 'now_playing':
          response = await movieApi.getNowPlaying(page)
          break
        case 'upcoming':
          response = await movieApi.getUpcoming(page)
          break
        default:
          response = await movieApi.getPopular(page)
      }
      
      const newMovies = response.data.results
      setTotalPages(response.data.total_pages)
      
      if (reset) {
        setMovies(newMovies)
      } else {
        setMovies(prev => [...prev, ...newMovies])
      }
      
      setCurrentPage(page)
    } catch (error) {
      console.error(`Error fetching ${endpoint} movies:`, error)
    } finally {
      setIsLoading(false)
      if (!hasInitialLoad) setHasInitialLoad(true)
    }
  }

  // Initial load
  useEffect(() => {
    fetchMovies(1, true)
  }, [endpoint])

  // Load more when scroll reaches the end
  useEffect(() => {
    if (inView && hasInitialLoad && currentPage < totalPages && !isLoading) {
      fetchMovies(currentPage + 1)
    }
  }, [inView, hasInitialLoad, currentPage, totalPages, isLoading])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  if (!hasInitialLoad && isLoading) {
    return (
      <div className="mb-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="h-8 bg-gray-800 rounded w-48 animate-pulse mb-2"></div>
          <div className="w-16 h-1 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        <div className="flex space-x-6 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-none">
              <div className="w-56 h-80 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (movies.length === 0) {
    return null
  }

  return (
    <div className="mb-12 px-4 sm:px-6 lg:px-8">
      {/* Category Title - Hotstar style */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">
          {title}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
      </div>
      
      {/* Movies Scroll Container */}
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth pb-6 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <div key={`${movie.id}-${index}`} className="flex-none">
              <MovieCard movie={movie} />
            </div>
          ))}
          
          {/* Infinite Scroll Trigger */}
          {currentPage < totalPages && (
            <div ref={loadMoreRef} className="flex-none w-4">
              {isLoading && (
                <div className="w-56 h-80 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl animate-pulse"></div>
              )}
            </div>
          )}
        </div>
        
        {/* Left scroll button */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        {/* Right scroll button */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default MovieCategory

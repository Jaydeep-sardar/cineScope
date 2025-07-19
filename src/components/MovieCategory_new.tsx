import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useInfiniteMovies } from '../hooks/use-infinite-movies'
import { MovieCard } from './MovieCard'

interface MovieCategoryProps {
  title: string
  endpoint: 'popular' | 'top_rated' | 'upcoming' | 'now_playing'
}

export const MovieCategory: React.FC<MovieCategoryProps> = ({ title, endpoint }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMovies(endpoint)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount)
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
    }
  }

  if (error) {
    return (
      <div className="mb-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">{title}</h2>
        <div className="text-red-500">Error loading movies</div>
      </div>
    )
  }

  const allMovies = data?.pages.flatMap(page => page.results) || []

  return (
    <div className="mb-12 px-4 sm:px-6 lg:px-8">
      {/* Category Title - Hotstar style */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">
          {title}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
      </div>
      
      <div className="relative group">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Movies container */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-6 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={(e) => {
            const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
            if (scrollLeft + clientWidth >= scrollWidth - 100 && hasNextPage && !isFetchingNextPage) {
              fetchNextPage()
            }
          }}
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-56 h-80 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl animate-pulse" />
            ))
          ) : (
            allMovies.map((movie, index) => (
              <div key={`${movie.id}-${index}`} className="flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))
          )}
          
          {isFetchingNextPage && (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`loading-${index}`} className="flex-shrink-0 w-56 h-80 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl animate-pulse" />
            ))
          )}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default MovieCategory

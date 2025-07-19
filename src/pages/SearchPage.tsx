import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, X } from 'lucide-react'
import { movieApi, Movie } from '../lib/api-client'
import MovieCard from '../components/MovieCard'

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasSearched, setHasSearched] = useState(false)

  const searchMovies = async (searchQuery: string, page: number = 1, reset: boolean = true) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await movieApi.search(searchQuery, page)
      const newMovies = response.data.results
      setTotalPages(response.data.total_pages)
      
      if (reset) {
        setMovies(newMovies)
      } else {
        setMovies(prev => [...prev, ...newMovies])
      }
      
      setCurrentPage(page)
      setHasSearched(true)
    } catch (error) {
      console.error('Error searching movies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchParams({ q: query.trim() })
      searchMovies(query.trim())
    }
  }

  const clearSearch = () => {
    setQuery('')
    setMovies([])
    setHasSearched(false)
    setSearchParams({})
  }

  const loadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      searchMovies(query, currentPage + 1, false)
    }
  }

  // Search when URL parameter changes
  useEffect(() => {
    const urlQuery = searchParams.get('q')
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery)
      searchMovies(urlQuery)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-black text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Search Movies</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full bg-gray-800 border border-gray-700 rounded-full px-6 py-4 pl-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
            />
            <SearchIcon
              size={24}
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </form>
        </div>

        {/* Search Results */}
        {isLoading && !hasSearched ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : hasSearched ? (
          <div>
            <div className="mb-6">
              <h2 className="text-xl text-gray-300">
                {movies.length > 0 
                  ? `Found ${movies.length} results for "${searchParams.get('q')}"`
                  : `No results found for "${searchParams.get('q')}"`
                }
              </h2>
            </div>
            
            {movies.length > 0 && (
              <>
                {/* Results Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
                  {movies.map((movie) => (
                    <div key={movie.id} className="flex justify-center">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {currentPage < totalPages && (
                  <div className="flex justify-center">
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors duration-200"
                    >
                      {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-xl text-gray-400">
              Enter a search term to find movies
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage

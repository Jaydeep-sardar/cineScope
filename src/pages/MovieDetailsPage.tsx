import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Calendar, Clock, Play } from 'lucide-react'
import { movieApi, getImageUrl, MovieDetails } from '../lib/api-client'

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await movieApi.getDetails(parseInt(id))
        setMovie(response.data)
      } catch (err) {
        setError('Failed to load movie details')
        console.error('Error fetching movie details:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-800"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              <div className="h-32 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Movie</h1>
          <p className="text-gray-400 mb-8">{error || 'Movie not found'}</p>
          <Link
            to="/"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-md font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const releaseYear = new Date(movie.release_date).getFullYear()
  const rating = movie.vote_average.toFixed(1)
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/30" />
        
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center space-x-2 text-white hover:text-orange-400 transition-colors z-10"
        >
          <ArrowLeft size={24} />
          <span className="font-medium">Back</span>
        </Link>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <div className="w-64 mx-auto lg:mx-0">
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex-grow space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-400 italic">"{movie.tagline}"</p>
              )}
            </div>

            {/* Rating and Details */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium text-lg">{rating}</span>
                <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{releaseYear}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{runtime}</span>
              </div>
              
              <div className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
                {movie.status}
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold transition-colors">
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Trailer</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-md font-semibold transition-colors">
                <span>Add to Watchlist</span>
              </button>
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
            </div>

            {/* Production Companies */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Production</h2>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="flex items-center space-x-2">
                      {company.logo_path ? (
                        <img
                          src={getImageUrl(company.logo_path, 'w200')}
                          alt={company.name}
                          className="h-8 max-w-[120px] object-contain"
                        />
                      ) : (
                        <span className="text-gray-400">{company.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-800">
              <div>
                <h3 className="font-semibold mb-2">Budget</h3>
                <p className="text-gray-400">
                  {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : 'Not disclosed'}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Revenue</h3>
                <p className="text-gray-400">
                  {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : 'Not disclosed'}
                </p>
              </div>
              
              {movie.homepage && (
                <div>
                  <h3 className="font-semibold mb-2">Official Website</h3>
                  <a 
                    href={movie.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Visit Website
                  </a>
                </div>
              )}
              
              {movie.imdb_id && (
                <div>
                  <h3 className="font-semibold mb-2">IMDB</h3>
                  <a 
                    href={`https://www.imdb.com/title/${movie.imdb_id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    View on IMDB
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage

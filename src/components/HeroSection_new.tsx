import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Play, VolumeX, Volume2 } from 'lucide-react'
import { movieApi, getImageUrl, Movie } from '../lib/api-client'

const HeroSection: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await movieApi.getTrending(1)
        const movies = response.data.results
        if (movies.length > 0) {
          // Get a random movie from the first 5 trending movies
          const randomIndex = Math.floor(Math.random() * Math.min(5, movies.length))
          setFeaturedMovie(movies[randomIndex])
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedMovie()
  }, [])

  if (isLoading || !featuredMovie) {
    return (
      <div className="relative h-screen bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(featuredMovie.backdrop_path, 'original')}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        {/* Multiple gradient overlays for the demo effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-orange-900/60 to-yellow-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Movie Title - Large stylized text */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider uppercase leading-tight">
              {featuredMovie.title.split(' ').slice(0, 2).join(' ')}
            </h1>
            
            {/* Movie Description */}
            <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed max-w-lg font-light">
              {featuredMovie.overview.length > 150 
                ? `${featuredMovie.overview.substring(0, 150)}...` 
                : featuredMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Play Button */}
              <Link
                to={`/movie/${featuredMovie.id}`}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 font-semibold text-lg uppercase tracking-wide"
              >
                <Play className="w-6 h-6 fill-current" />
                <span>PLAY</span>
              </Link>

              {/* Mute/Unmute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/40 hover:bg-black/60 text-white p-4 rounded-full transition-all duration-300 border border-white/30"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 flex items-center space-x-6 text-white/80">
              <span className="text-sm uppercase tracking-wider">
                {new Date(featuredMovie.release_date).getFullYear()}
              </span>
              <span className="text-sm uppercase tracking-wider">
                ★ {featuredMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm uppercase tracking-wider">
                HD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  )
}

export default HeroSection

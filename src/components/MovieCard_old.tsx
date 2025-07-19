import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Calendar, Play } from 'lucide-react'
import { Movie, getImageUrl } from '../lib/api-client'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const releaseYear = new Date(movie.release_date).getFullYear()
  const rating = movie.vote_average.toFixed(1)

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative w-48 h-72 overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 group-hover:scale-105">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
          
          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
          </div>
          
          {/* Rating badge */}
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{rating}</span>
          </div>
        </div>
      </Link>

      {/* Hover Preview Card */}
      {isHovered && (
        <div className="absolute top-0 left-full ml-4 w-80 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-50 opacity-0 animate-in fade-in-0 slide-up duration-300">
          <div className="p-4">
            {/* Movie backdrop */}
            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
              <img
                src={getImageUrl(movie.backdrop_path, 'w500')}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  to={`/movie/${movie.id}`}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Play className="w-6 h-6 text-white fill-current ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Movie details */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight">
                {movie.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{rating}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{releaseYear}</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                {movie.overview}
              </p>
              
              <Link
                to={`/movie/${movie.id}`}
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-md font-medium transition-colors duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieCard

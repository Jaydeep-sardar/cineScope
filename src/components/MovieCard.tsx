import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Play } from 'lucide-react'
import { Movie, getImageUrl } from '../lib/api-client'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const rating = movie.vote_average.toFixed(1)

  return (
    <div
      className="relative group cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative w-56 h-80 overflow-hidden rounded-xl bg-gray-800 transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-2xl">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 animate-pulse" />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Rating badge */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1 border border-orange-500/30">
            <Star className="w-3 h-3 text-orange-400 fill-current" />
            <span className="text-white text-xs font-bold">{rating}</span>
          </div>
          
          {/* Movie title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-2 group-hover:text-orange-300 transition-colors">
              {movie.title}
            </h3>
            <div className="text-orange-400 text-sm font-medium uppercase tracking-wide">
              {new Date(movie.release_date).getFullYear()}
            </div>
          </div>
          
          {/* Play button on hover */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="w-16 h-16 bg-orange-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 hover:bg-orange-500 transition-colors">
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            </div>
          </div>
          
          {/* Hover shine effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform transition-transform duration-700 ${
            isHovered ? 'translate-x-full' : '-translate-x-full'
          }`} style={{ transform: 'skewX(-25deg)' }} />
        </div>
      </Link>

      {/* Enhanced Hover Preview Card */}
      {isHovered && (
        <div className="absolute top-0 left-full ml-6 w-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-orange-500/20 z-50 opacity-0 animate-in fade-in-0 slide-up duration-300 backdrop-blur-sm">
          <div className="p-6">
            {/* Movie backdrop */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 shadow-lg">
              <img
                src={getImageUrl(movie.backdrop_path, 'w780')}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  to={`/movie/${movie.id}`}
                  className="w-16 h-16 bg-orange-600/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors shadow-lg border-2 border-white/20"
                >
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </Link>
              </div>
              
              {/* Rating in preview */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1 border border-orange-500/30">
                <Star className="w-4 h-4 text-orange-400 fill-current" />
                <span className="text-white text-sm font-bold">{rating}</span>
              </div>
            </div>
            
            {/* Movie details */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-xl line-clamp-2 leading-tight">
                {movie.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="text-orange-400 font-semibold">
                  {new Date(movie.release_date).getFullYear()}
                </div>
                <div className="flex items-center space-x-1 text-orange-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{rating}/10</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm line-clamp-4 leading-relaxed">
                {movie.overview}
              </p>
              
              <Link
                to={`/movie/${movie.id}`}
                className="block w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-center py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg uppercase tracking-wide"
              >
                Watch Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieCard

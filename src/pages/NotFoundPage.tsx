import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-400 leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            It might have been moved, deleted, or never existed.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200"
          >
            <Home size={20} />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>
        
        {/* Suggestions */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 mb-4">You might want to:</p>
          <div className="space-y-2 text-sm">
            <Link to="/?category=popular" className="block text-orange-400 hover:text-orange-300 transition-colors">
              Browse Popular Movies
            </Link>
            <Link to="/?category=trending" className="block text-orange-400 hover:text-orange-300 transition-colors">
              Check Trending Content
            </Link>
            <Link to="/search" className="block text-orange-400 hover:text-orange-300 transition-colors">
              Search for Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

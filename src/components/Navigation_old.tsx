import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">★</span>
            </div>
            <span className="text-white font-bold text-2xl tracking-wider">CINESCOPE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-lg tracking-wide"
            >
              HOMEPAGE
            </Link>
            <Link
              to="/movies"
              className="text-white/80 hover:text-orange-400 transition-colors duration-200 font-medium text-lg tracking-wide"
            >
              PREMIUM
            </Link>
            <Link
              to="/live"
              className="text-white/80 hover:text-orange-400 transition-colors duration-200 font-medium text-lg tracking-wide"
            >
              LIVE
            </Link>
            <Link
              to="/categories"
              className="text-white/80 hover:text-orange-400 transition-colors duration-200 font-medium text-lg tracking-wide"
            >
              CATEGORIES
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <button className="text-white hover:text-orange-400 transition-colors duration-200">
              <Search size={24} />
            </button>
            
            {/* Notifications */}
            <button className="text-white hover:text-orange-400 transition-colors duration-200">
              <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                <span className="text-xs">🔔</span>
              </div>
            </button>

            {/* User Profile */}
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors duration-200"
            >
              <User size={24} />
              <span className="hidden sm:block font-medium">LOGIN</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-orange-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-lg tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                HOMEPAGE
              </Link>
              <Link
                to="/movies"
                className="text-white/80 hover:text-orange-400 transition-colors duration-200 font-medium text-lg tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                PREMIUM
              </Link>
              <Link
                to="/live"
                className="text-white/80 hover:text-orange-400 transition-colors duration-200 font-medium text-lg tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                LIVE
              </Link>
              <Link
                to="/categories"
                className="text-white/80 hover:text-orange-400 transition-colors duration-200 font-medium text-lg tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                CATEGORIES
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
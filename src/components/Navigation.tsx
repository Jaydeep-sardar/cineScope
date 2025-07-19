import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, User, Menu, X, LogOut, Crown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { name: 'HOMEPAGE', path: '/' },
    { name: 'PREMIUM', path: '/premium' },
    { name: 'LIVE', path: '/live' },
    { name: 'CATEGORIES', path: '/categories' },
  ]

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 via-black/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400 bg-clip-text text-transparent tracking-wider">
                CineScope
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-orange-400 border-b-2 border-orange-400'
                    : 'text-white/90 hover:text-orange-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Search and Profile */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-white/80 hover:text-orange-300 transition-colors">
              <Search className="w-6 h-6" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-white/80 hover:text-orange-300 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user?.name}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl py-2">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-white font-medium text-sm">{user?.name}</p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                    {user?.isPremium && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Crown className="w-3 h-3 text-orange-400" />
                        <span className="text-orange-400 text-xs font-medium">Premium</span>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors text-sm"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile Settings
                  </Link>
                  <Link
                    to="/watchlist"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors text-sm"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Watchlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors text-sm flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-orange-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md rounded-lg mt-2 p-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-3 text-base font-semibold uppercase tracking-wide transition-colors duration-200 rounded-lg ${
                    isActive(item.path)
                      ? 'text-orange-400 bg-orange-500/10'
                      : 'text-white/90 hover:text-orange-300 hover:bg-white/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  )
}

export default Navigation

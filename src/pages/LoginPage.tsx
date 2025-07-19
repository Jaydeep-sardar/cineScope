import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Crown, Play } from 'lucide-react'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const success = await login(email, password)
    if (!success) {
      setError('Invalid credentials. Use demo@cinescope.com / demo123')
    }
  }

  const fillDemoCredentials = () => {
    setEmail('demo@cinescope.com')
    setPassword('demo123')
    setError('')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-purple-900/20"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-800 p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                CineScope
              </span>
            </div>
            <p className="text-gray-400 text-sm">Sign in to your account</p>
          </div>

          {/* Demo Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Play className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-semibold text-sm">Demo Account</span>
            </div>
            <p className="text-gray-300 text-xs mb-3">
              Use these credentials to explore CineScope
            </p>
            <button
              onClick={fillDemoCredentials}
              className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium"
            >
              Use Demo Login
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-semibold disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h4 className="text-white font-medium text-sm mb-2">Demo Credentials:</h4>
            <div className="space-y-1 text-xs">
              <p className="text-gray-400">
                <span className="text-orange-400">Email:</span> demo@cinescope.com
              </p>
              <p className="text-gray-400">
                <span className="text-orange-400">Password:</span> demo123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

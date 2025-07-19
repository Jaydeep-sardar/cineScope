import React from 'react'
import { Crown, Star, Zap } from 'lucide-react'

const PremiumPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Crown className="w-12 h-12 text-orange-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              CineScope Premium
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock the ultimate movie experience with exclusive content, 4K streaming, and ad-free viewing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-orange-500/20">
            <Zap className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">4K Ultra HD</h3>
            <p className="text-gray-400">
              Experience movies in stunning 4K resolution with Dolby Atmos sound for the ultimate viewing experience.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-orange-500/20">
            <Star className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Exclusive Content</h3>
            <p className="text-gray-400">
              Access to premium originals, early releases, and exclusive behind-the-scenes content.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-orange-500/20">
            <Crown className="w-12 h-12 text-orange-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Ad-Free Experience</h3>
            <p className="text-gray-400">
              Enjoy uninterrupted viewing with zero ads and instant access to all premium features.
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-3xl font-bold mb-4">Premium Plan</h3>
            <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">
              $9.99<span className="text-lg text-gray-400">/month</span>
            </div>
            <p className="text-gray-400 mb-6">Already activated for demo user!</p>
            <div className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold">
              ✓ Currently Active
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumPage

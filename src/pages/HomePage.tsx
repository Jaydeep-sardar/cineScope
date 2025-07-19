import React from 'react'
import { useSearchParams } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import MovieCategory from '../components/MovieCategory'

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')

  const categories = [
    { id: 'trending', title: 'Trending Now', endpoint: 'trending' },
    { id: 'popular', title: 'New Releases', endpoint: 'popular' },
    { id: 'top_rated', title: 'Top Rated Movies', endpoint: 'top_rated' },
    { id: 'now_playing', title: 'Now Playing', endpoint: 'now_playing' },
    { id: 'upcoming', title: 'Coming Soon', endpoint: 'upcoming' },
  ]

  // If a specific category is requested, show only that category
  const displayCategories = categoryFromUrl 
    ? categories.filter(cat => cat.id === categoryFromUrl)
    : categories

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - only show if no specific category is requested */}
      {!categoryFromUrl && <HeroSection />}
      
      {/* Movie Categories */}
      <div className="space-y-16 pb-20 pt-8">
        {displayCategories.map((category) => (
          <MovieCategory
            key={category.id}
            title={category.title}
            endpoint={category.endpoint}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage

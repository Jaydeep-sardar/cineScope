import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchPage from './pages/SearchPage';
import PremiumPage from './pages/PremiumPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/live" element={<div className="pt-20 p-8 text-center"><h1 className="text-4xl font-bold text-orange-400">Live TV Coming Soon!</h1></div>} />
          <Route path="/categories" element={<HomePage />} />
          <Route path="/profile" element={<div className="pt-20 p-8 text-center"><h1 className="text-4xl font-bold text-orange-400">Profile Settings Coming Soon!</h1></div>} />
          <Route path="/watchlist" element={<div className="pt-20 p-8 text-center"><h1 className="text-4xl font-bold text-orange-400">My Watchlist Coming Soon!</h1></div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Play, Info, Loader2 } from 'lucide-react';
import { fetchAllMovies, getMoviesByCategory } from '../utils/api';
import MovieRow from '../components/MovieRow';

export default function Home() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchAllMovies();
      setMovies(data);
      
      if (data.length > 0) {
        // Randomly pick a hero movie from the loaded data
        setHeroMovie(data[Math.floor(Math.random() * data.length)]);
      }
      
      setIsLoading(false);
    };

    loadMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Đang tải danh sách phim...</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Hero Section */}
      {heroMovie && (
        <div className="relative h-[80vh] w-full">
          <div className="absolute inset-0">
            <img 
              src={heroMovie.backdrop} 
              alt={heroMovie.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          </div>
          
          <div className="absolute inset-0 pt-32 px-4 md:px-12 flex flex-col justify-center max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{heroMovie.title}</h1>
            <p className="text-gray-200 text-sm md:text-lg mb-8 line-clamp-3 leading-relaxed">
              {heroMovie.overview}
            </p>
            
            <div className="flex items-center gap-4">
              <button className="bg-white text-black font-bold py-2 md:py-3 px-6 md:px-8 rounded flex items-center gap-2 hover:bg-white/80 transition">
                <Play className="w-6 h-6 fill-black" />
                Phát
              </button>
              <button className="bg-gray-500/50 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded flex items-center gap-2 hover:bg-gray-500/70 transition">
                <Info className="w-6 h-6" />
                Thông tin khác
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="-mt-32 md:-mt-40 relative z-10 px-4 md:px-12 space-y-12">
        <MovieRow title="Đang Thịnh Hành" movies={getMoviesByCategory(movies, 'trending')} />
        <MovieRow title="Hành Động Khối Óc" movies={getMoviesByCategory(movies, 'action')} />
        <MovieRow title="Mới Phát Hành" movies={getMoviesByCategory(movies, 'new')} />
        <MovieRow title="Top 10 Tại Việt Nam" movies={getMoviesByCategory(movies, 'top')} />
      </div>
    </div>
  );
}

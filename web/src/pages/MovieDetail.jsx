import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, X, Loader2 } from 'lucide-react';
import { fetchMovieById, fetchAllMovies, getMoviesByCategory } from '../utils/api';
import MovieRow from '../components/MovieRow';
import { useAuth } from '../contexts/AuthContext';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Scroll to top when changing movie
    window.scrollTo(0, 0);
    
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchMovieById(id);
      if (data) {
        setMovie(data);
        const all = await fetchAllMovies();
        setSimilarMovies(getMoviesByCategory(all, 'similar'));
      } else {
        navigate('/');
      }
      setIsLoading(false);
    };

    loadData();
  }, [id, navigate]);

  const handlePlay = (episodeId = null) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (episodeId) {
      navigate(`/watch/${movie.id}?episode=${episodeId}`);
    } else {
      navigate(`/watch/${movie.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Đang tải thông tin phim...</p>
      </div>
    );
  }

  if (!movie) return <div className="min-h-screen bg-background"></div>;

  return (
    <div className="pb-20">
      {/* Hero / Header Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={movie.backdrop} 
            alt={movie.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
        </div>

        {/* Cột thông tin phim đè lên ảnh nền */}
        <div className="absolute inset-0 pt-24 px-4 md:px-12 flex flex-col md:flex-row items-center md:items-end pb-12 md:pb-24 max-w-7xl mx-auto gap-8">
          {/* Poster */}
          <div className="hidden md:block w-64 flex-shrink-0 shadow-2xl shadow-black rounded-lg overflow-hidden border border-gray-800">
            <img src={movie.poster} alt={movie.title} className="w-full object-cover" />
          </div>

          {/* Chi tiết */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{movie.title}</h1>
            
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-semibold mb-6">
              <span className="text-green-500">{movie.rating * 10}% Độ trùng khớp</span>
              <span className="text-gray-300 border border-gray-500 px-2 py-0.5 rounded">{movie.year}</span>
              <span className="text-gray-300">{movie.duration}</span>
              <span className="bg-gray-800 text-white px-2 py-0.5 rounded border border-gray-600">HD</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
              <button 
                onClick={() => handlePlay()}
                className="bg-primary text-white font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-primary/80 transition shadow-lg shadow-primary/30"
              >
                <Play className="w-6 h-6 fill-white" />
                Xem Phim
              </button>
              
              {movie.trailerUrl && (
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="bg-gray-500/40 text-white font-bold py-3 px-6 rounded flex items-center gap-2 hover:bg-gray-500/60 transition backdrop-blur-sm border border-gray-500"
                >
                  Trailer
                </button>
              )}

              <button className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white hover:bg-white/10 transition text-white">
                <Plus className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-200 text-sm md:text-lg mb-6 max-w-3xl leading-relaxed">
              {movie.overview}
            </p>

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Đạo diễn:</span>{' '}
                <span className="text-gray-200">{movie.director}</span>
              </p>
              <p>
                <span className="text-gray-400">Diễn viên:</span>{' '}
                <span className="text-gray-200">{movie.cast.join(', ')}</span>
              </p>
              <p>
                <span className="text-gray-400">Thể loại:</span>{' '}
                <span className="text-gray-200">{movie.genre.join(', ')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách tập phim (nếu có) */}
      {movie.type === 'series' && movie.episodes && (
        <div className="max-w-7xl mx-auto px-4 md:px-12 mt-8 md:mt-0 relative z-10 mb-12">
          <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
            <h2 className="text-2xl font-bold text-white">Danh sách tập</h2>
            <span className="text-gray-400 font-medium">Mùa 1</span>
          </div>
          
          <div className="space-y-4">
            {movie.episodes.map((episode, index) => (
              <div 
                key={episode.id} 
                onClick={() => handlePlay(episode.id)}
                className="flex items-center gap-4 p-4 hover:bg-gray-800/50 rounded-lg cursor-pointer transition border border-transparent hover:border-gray-700 group"
              >
                <h3 className="text-2xl font-bold text-gray-500 w-8">{index + 1}</h3>
                <div className="relative w-32 h-20 bg-gray-800 rounded flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <img src={movie.backdrop} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
                  <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition z-10 drop-shadow-md" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1 group-hover:text-primary transition">{episode.title}</h4>
                  <p className="text-gray-400 text-sm">{episode.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phim tương tự */}
      <div className="max-w-7xl mx-auto mt-12 relative z-10">
        <MovieRow title="Nội dung tương tự" movies={similarMovies} />
      </div>

      {/* Modal Video Trailer */}
      {showTrailer && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe 
              src={movie.trailerUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

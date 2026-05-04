import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchMovieById } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export default function WatchMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [episodeName, setEpisodeName] = useState('');
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Nếu chưa đăng nhập, đá về trang login ngay lập tức
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchMovieById(id);
      if (data) {
        setMovie(data);
        
        // Parse query params to find episode
        const searchParams = new URLSearchParams(location.search);
        const epId = searchParams.get('episode');
        
        if (epId && data.type === 'series' && data.episodes) {
          const ep = data.episodes.find(e => e.id.toString() === epId);
          if (ep) {
            setEpisodeName(` - ${ep.title}`);
          }
        }
      } else {
        navigate('/');
      }
      setIsLoading(false);
    };

    loadData();
  }, [id, location, navigate, isAuthenticated]);

  // Handle auto-hiding the top navigation bar when mouse is still
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide after 3 seconds of inactivity
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Đang tải phim...</p>
      </div>
    );
  }

  if (!movie) return <div className="h-screen w-screen bg-black"></div>;

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Thanh điều hướng ở trên cùng */}
      <div 
        className={`absolute top-0 left-0 right-0 z-50 p-6 flex items-center gap-4 transition-opacity duration-500 bg-gradient-to-b from-black/80 to-transparent ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <button 
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="text-white hover:text-gray-300 transition"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h1 className="text-2xl font-bold text-white drop-shadow-md">
          {movie.title} <span className="text-gray-300 font-normal">{episodeName}</span>
        </h1>
      </div>

      {/* Video Player */}
      <video
        autoPlay
        controls
        className="w-full h-full object-contain"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      >
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>
    </div>
  );
}

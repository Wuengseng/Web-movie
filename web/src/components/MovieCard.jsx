import React from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div 
      className="relative group cursor-pointer aspect-[2/3] rounded-md overflow-hidden"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img 
        src={movie.poster} 
        alt={movie.title} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Hiệu ứng gradient khi hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm md:text-base mb-2 line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition">
            <Play className="w-4 h-4 text-black fill-black ml-1" />
          </button>
          <button className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-white hover:bg-white/20 transition text-white">
            <Plus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-white hover:bg-white/20 transition text-white">
            <ThumbsUp className="w-4 h-4" />
          </button>
          <div className="flex-1"></div>
          <button className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-white hover:bg-white/20 transition text-white">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-green-500">{movie.rating * 10}% Độ trùng khớp</span>
          <span className="border border-gray-500 px-1 text-gray-300">{movie.year}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-300 mt-2 line-clamp-1">
          {movie.genre.join(' • ')}
        </div>
      </div>
    </div>
  );
}

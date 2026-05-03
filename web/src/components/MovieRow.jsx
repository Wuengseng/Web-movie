import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MovieCard from './MovieCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function MovieRow({ title, movies }) {
  return (
    <div className="mb-8 px-4 md:px-12 relative group">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 hover:text-gray-300 cursor-pointer flex items-center gap-2">
        {title}
        <span className="text-sm text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
          Xem tất cả &gt;
        </span>
      </h2>
      
      {/* Sử dụng style nội tuyến hoặc CSS class để tuỳ chỉnh nút navigation của Swiper */}
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-button-next, .swiper-button-prev {
          color: white;
          background-color: rgba(0,0,0,0.5);
          height: 100%;
          top: 0;
          margin-top: 0;
          width: 50px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: rgba(0,0,0,0.8);
        }
        .swiper-button-prev { left: 0; }
        .swiper-button-next { right: 0; }
        .group:hover .swiper-button-next, .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 24px;
          font-weight: bold;
        }
      `}} />

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 15 },
          1280: { slidesPerView: 6, spaceBetween: 15 },
        }}
        className="w-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

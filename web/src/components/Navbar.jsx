import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-background' : 'bg-gradient-to-b from-black/30 to-transparent'}`}>
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-primary tracking-wider">
            ANKIPLUS
          </Link>
          
          <div className="hidden md:flex items-center gap-5 text-sm">
            <Link to="/" className="text-white font-medium hover:text-gray-300 transition">Trang chủ</Link>
            <Link to="/series" className="text-gray-300 hover:text-white transition">Phim Bộ</Link>
            <Link to="/movies" className="text-gray-300 hover:text-white transition">Phim Lẻ</Link>
            <Link to="/new" className="text-gray-300 hover:text-white transition">Mới & Phổ biến</Link>
            <Link to="/list" className="text-gray-300 hover:text-white transition">Danh sách của tôi</Link>
          </div>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center gap-5">
          <button className="text-white hover:text-gray-300 transition">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-gray-300 transition">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded bg-gray-600 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-gray-300" />
            </div>
            <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </nav>
  );
}

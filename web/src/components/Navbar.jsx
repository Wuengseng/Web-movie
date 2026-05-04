import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          
          {isAuthenticated ? (
            <div 
              className="relative flex items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="w-8 h-8 rounded bg-gray-600 flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-gray-300" />
              </div>
              <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-300" />
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 border border-gray-800 rounded-md shadow-xl py-2 backdrop-blur-sm">
                  <div className="px-4 py-2 border-b border-gray-800 mb-2">
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-primary hover:bg-primary/80 text-white px-4 py-1.5 rounded font-medium transition text-sm"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

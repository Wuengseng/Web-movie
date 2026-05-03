import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/register then redirect to home
    console.log(isLogin ? "Đăng nhập thành công" : "Đăng ký thành công");
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 bg-surface/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">AnkiPlus Phim</h1>
          <p className="text-textSecondary">
            {isLogin ? "Đăng nhập để trải nghiệm không giới hạn" : "Tạo tài khoản mới ngay hôm nay"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.form 
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Họ và tên" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary w-5 h-5" />
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary w-5 h-5" />
              <input 
                type="password" 
                placeholder="Mật khẩu" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-textSecondary hover:text-white transition-colors">
                  Quên mật khẩu?
                </a>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:gap-3"
            >
              {isLogin ? "Đăng nhập" : "Đăng ký"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.form>
        </AnimatePresence>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-sm text-textSecondary">Hoặc</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <button 
          className="mt-6 w-full bg-white text-black font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Tiếp tục với Google
        </button>

        <div className="mt-8 text-center text-sm text-textSecondary">
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
          <button 
            onClick={toggleMode}
            className="ml-1 text-white hover:text-primary font-medium transition-colors"
          >
            {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

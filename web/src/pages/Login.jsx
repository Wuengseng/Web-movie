import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, loginWithGoogle } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ fullname: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const data = await loginUser(formData.email, formData.password);
        login(data.access_token, formData.email);
        navigate('/');
      } else {
        const data = await registerUser(formData.fullname, formData.email, formData.password);
        login(data.access_token, formData.email);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setIsLoading(true);
    try {
      const data = await loginWithGoogle(credentialResponse.credential);
      // Lấy tạm email từ payload token để hiển thị ở navbar (sau này có thể giải mã JWT để lấy chuẩn hơn)
      // Tạm thời dùng 'Google User' hoặc parse base64
      login(data.access_token, "Người dùng Google");
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Đăng nhập Google thất bại. Vui lòng thử lại.');
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

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

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
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Họ và tên" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary w-5 h-5" />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email của bạn" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary w-5 h-5" />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-textSecondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
                minLength={6}
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
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Đăng nhập" : "Đăng ký"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.form>
        </AnimatePresence>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-sm text-textSecondary">Hoặc</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black"
            shape="rectangular"
            text="continue_with"
            width="100%"
          />
        </div>

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

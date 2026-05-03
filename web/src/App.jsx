import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import WatchMovie from './pages/WatchMovie';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Route trang xem phim (Fullscreen, không có Navbar/Footer) */}
        <Route path="/watch/:id" element={<WatchMovie />} />

        {/* Các trang chính được bọc trong MainLayout */}
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          } 
        />
        <Route 
          path="/movie/:id" 
          element={
            <MainLayout>
              <MovieDetail />
            </MainLayout>
          } 
        />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

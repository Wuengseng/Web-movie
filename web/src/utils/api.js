const API_BASE_URL = 'http://localhost:8000/api';

export const fetchAllMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error('Không thể tải dữ liệu phim');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi fetch phim:', error);
    return [];
  }
};

export const fetchMovieById = async (id) => {
  try {
    const movies = await fetchAllMovies();
    return movies.find(m => m.id === parseInt(id)) || null;
  } catch (error) {
    console.error('Lỗi khi fetch chi tiết phim:', error);
    return null;
  }
};

export const getMoviesByCategory = (movies, category) => {
  // Trộn ngẫu nhiên mảng
  return [...movies].sort(() => 0.5 - Math.random());
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Đăng nhập thất bại');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (fullname, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullname, email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Đăng ký thất bại');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Đăng nhập Google thất bại');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

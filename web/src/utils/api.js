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

// Hàm hỗ trợ lọc danh mục ngẫu nhiên để giống giao diện cũ
export const getMoviesByCategory = (movies, category) => {
  // Trộn ngẫu nhiên mảng
  return [...movies].sort(() => 0.5 - Math.random());
};

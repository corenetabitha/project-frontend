import axiosInstance from './axiosInstance';

export const fetchBooks = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/api/books/', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (bookData) => {
  const dataToSend = {
    title: bookData.title,
    author: bookData.author,
    description: bookData.description,
    price: parseFloat(bookData.price),
    genre: bookData.genre_id || null,
    image_url: bookData.image_url,
    stock_count: parseInt(bookData.stock_count, 10),
    is_available_for_purchase: bookData.availableForBuy,
    is_available_for_lending: bookData.availableForLend,
  };

  try {
    const response = await axiosInstance.post('/api/books/', dataToSend);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axiosInstance.get('/api/genres/');
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};
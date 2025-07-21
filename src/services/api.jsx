// src/services/api.js

// Import the default exported axiosInstance from the correct path
import axiosInstance from '../api/axiosInstance'; // Corrected import: no curly braces, refers to default export

// API functions using the configured axiosInstance
export const fetchBooks = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/books/', { params });
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
    const response = await axiosInstance.post('/books/', dataToSend);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axiosInstance.get('/genres/');
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};
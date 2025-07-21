// src/api/api.jsx
// This file defines the specific API functions using your configured axios instance.

// Import the default exported axiosInstance from the correct path.
// Assuming axiosInstance.js is in the same 'api' directory,
// or adjust path if your axiosInstance file is in a different location.
import axiosInstance from './axiosInstance';

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
    // Ensure genre is sent as an ID, or null if not selected
    genre: bookData.genre_id || null, // Assuming you pass genre_id from frontend form
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

// You can add more API functions here as needed (e.g., updateBook, deleteBook, fetchBookById, etc.)
import axiosInstance from '../api/axiosInstance';

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

export const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get('/user/orders/');
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const fetchLendings = async () => {
  try {
    const response = await axiosInstance.get('/user/lendings/');
    return response.data;
  } catch (error) {
    console.error("Error fetching lendings:", error);
    throw error;
  }
};

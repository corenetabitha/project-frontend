import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Books
export const fetchBooks = (params = {}) => API.get('books/', { params });
export const fetchGenres = () => API.get('genres/');

// Cart Checkout & Lending
export const fetchOrders = () => API.get('user/orders/');
export const fetchLendings = () => API.get('user/lendings/');

export default API;
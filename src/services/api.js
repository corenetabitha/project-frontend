import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const csrfToken = getCookie('csrftoken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.method !== 'get' && config.method !== 'head' && csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(`${API_BASE_URL}token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = refreshResponse.data.access;

          localStorage.setItem('accessToken', newAccessToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed, logging out:', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        console.warn('No refresh token found, redirecting to login.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


export const registerUserAPI = async (userData) => {
  try {
    const response = await axiosInstance.post('register/', userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
    throw new Error(errorMessage);
  }
};

export const loginUserAPI = async (credentials) => {
  try {
    const response = await axiosInstance.post('token/', credentials);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
    throw new Error(errorMessage);
  }
};

export const fetchBooks = async (params = {}) => {
  try {
    const response = await axiosInstance.get('books/', { params });
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results;
    } else if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`books/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await axiosInstance.post('books/', bookData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
    throw new Error(errorMessage);
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await axiosInstance.put(`books/${id}/`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error.response?.data || error.message);
    const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
    throw new Error(errorMessage);
  }
};

export const deleteBook = async (id) => {
  try {
    await axiosInstance.delete(`books/${id}/`);
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axiosInstance.get('genres/');
    return Array.isArray(response.data.results) ? response.data.results : [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// Re-using createOrder for purchase orders
export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post('orders/', orderData); // Assuming 'orders/' is your endpoint
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
    throw new Error(errorMessage);
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get('orders/');
    return Array.isArray(response.data.results) ? response.data.results : [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Renamed from createLending to createLendingRequest for clarity
export const createLendingRequest = async (requestData) => {
  try {
    const response = await axiosInstance.post('lendings/', requestData); // Assuming 'lendings/' is your endpoint
    return response.data;
  } catch (error) {
    console.error("Error creating lending request:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
    throw new Error(errorMessage);
  }
};

export const requestReturn = async (lendingId, returnData) => {
  try {
    const response = await axiosInstance.post(`lendings/${lendingId}/return_request/`, returnData);
    return response.data;
  } catch (error) {
    console.error(`Error requesting return for lending ${lendingId}:`, error.response?.data || error.message);
    const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
    throw new Error(errorMessage);
  }
};

export const fetchLendings = async () => {
  try {
    const response = await axiosInstance.get('lendings/');
    return Array.isArray(response.data.results) ? response.data.results : [];
  } catch (error) {
    console.error("Error fetching lendings:", error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('me/');
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const initiateMpesaCheckout = async (checkoutData) => {
  try {
    const response = await axiosInstance.post('mpesa/stkpush/', checkoutData);
    return response.data;
  } catch (error) {
    console.error("Error initiating M-Pesa checkout:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message;
    throw new Error(errorMessage);
  }
};

export default axiosInstance;
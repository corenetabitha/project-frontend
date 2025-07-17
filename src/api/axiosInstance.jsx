// src/api/axiosInstance.js

import axios from 'axios';

// Base URL for your Django backend API
const API_BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Optional: timeout for requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Utility function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Add an interceptor to include the CSRF token for unsafe methods (POST, PUT, PATCH, DELETE)
axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie('csrftoken');
    // Only add X-CSRFToken header for methods that are not 'get' or 'head'
    if (config.method !== 'get' && config.method !== 'head' && csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the configured axios instance as the DEFAULT export
export default axiosInstance;
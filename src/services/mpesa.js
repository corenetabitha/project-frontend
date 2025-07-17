// src/utils/mpesa.js
import axios from 'axios';

export const payWithMpesa = async (phone, amount, cartId) => {
  const token = localStorage.getItem("token"); // JWT for auth
  try {
    const response = await axios.post(
      '/api/cart/mpesa/checkout/',
      { phone, amount, cart_id: cartId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data; // successful payment message
  } catch (error) {
    console.error("M-Pesa payment failed", error);
    throw error;
  }
};

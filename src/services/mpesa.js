import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

export const payWithMpesa = async (phone, amount, cartItems) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${API_BASE_URL}cart/mpesa/checkout/`,
      { phone, amount, cart_items: cartItems },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("M-Pesa payment failed", error);
    throw error;
  }
};


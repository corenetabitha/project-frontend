import axios from 'axios';

export const payWithMpesa = async (phone, amount, cartId) => {
  const token = localStorage.getItem("token"); 
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
    return response.data; 
  } catch (error) {
    console.error("M-Pesa payment failed", error);
    throw error;
  }
};

import axios from 'axios';

export const payWithMpesa = (phone, amount) => {
  return axios.post('/api/cart/mpesa/checkout/', { phone, amount });
};
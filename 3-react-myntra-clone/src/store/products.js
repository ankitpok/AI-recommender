import api from '../services/api';

export const fetchProducts = async () => {
  try {
    const response = await api.get('/api_2/products/');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

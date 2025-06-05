import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api_2/products/');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
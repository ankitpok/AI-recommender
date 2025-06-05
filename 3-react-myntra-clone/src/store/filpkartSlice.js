// store/flipkartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
  error: null,
  hasMore: true
};

export const flipkartSlice = createSlice({
  name: 'flipkart',
  initialState,
  reducers: {
    setFlipkartProducts: (state, action) => {
      state.products = action.payload;
      state.hasMore = true;
    },
    addProducts: (state, action) => {
      state.products = [...state.products, ...action.payload.results];
      state.hasMore = action.payload.next !== null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const fetchFlipkartProducts = (page = 1) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`http://localhost:8000/api_2/products/`, {
      params: { page }
    });

    if (page === 1) {
      dispatch(setFlipkartProducts(response.data.results));
    } else {
      dispatch(addProducts(response.data));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const { setFlipkartProducts, addProducts, setLoading, setError } = flipkartSlice.actions;
export default flipkartSlice.reducer;
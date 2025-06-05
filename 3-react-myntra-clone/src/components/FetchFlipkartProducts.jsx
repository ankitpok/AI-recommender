// components/FetchFlipkartProducts.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFlipkartProducts } from '../store/filpkartSlice';

const FetchFlipkartProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlipkartProducts(1));
  }, [dispatch]);

  return null; // Or loading indicator
};

export default FetchFlipkartProducts;
// FlipkartProductsList.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlipkartProducts } from '../store/filpkartSlice';
import FlipkartProductItem from './FlipkartProductItems';
import './style.css';

const FlipkartProductsList = () => {
  const { products, loading, error, hasMore } = useSelector((state) => state.flipkart);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // products.forEach(product => {
  //   console.log('Product ID:', product.product_id, 'Product Name:', product.product_name);
  // });
  useEffect(() => {
    dispatch(fetchFlipkartProducts(page));
  }, [dispatch, page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  // Remove similar titles and products without images
  const filteredProducts = useMemo(() => {
    const seen = new Set();
    return products.filter((product) => {
      if (!product.image_url) return false;

      const normalized = product.product_name
        .toLowerCase()
        .replace(/[a-z]*\d{3,}/gi, '')
        .replace(/[^a-zA-Z ]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (seen.has(normalized)) {
        return false;
      } else {
        seen.add(normalized);
        return true;
      }
    });
  }, [products]);

  if (loading && products.length === 0) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (filteredProducts.length === 0) return <div className="empty">No products found</div>;

  return (
    <div className="products-container">
      <h2 className="products-title">Featured Products</h2>
      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <FlipkartProductItem key={`${product.product_id}-${index}`} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FlipkartProductsList;

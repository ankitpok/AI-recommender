import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config/api';
import './recommendations.css';

const ProductRecommendations = ({ currentProduct }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api_ai/recommend/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: currentProduct.product_name })
        });

        const data = await response.json();
        setRecommendedProducts(data.products || []);
      } catch (error) {
        console.error("Recommendation error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentProduct.product_name]);

  if (loading) return <div className="loading">Loading recommendations...</div>;
  if (recommendedProducts.length === 0) return <div className="no-rec">No recommendations found</div>;

  return (
    <div className="recommendations-section">
      <h2>You May Also Like</h2>
      <div className="recommendations-grid">
        {recommendedProducts.map(product => (
          <div key={product.product_id} className="product-card">
            <img
              src={product.image_url}
              alt={product.product_name}
              onError={(e) => e.target.src = 'https://placehold.co/200?text=Product'}
            />
            <h3>{product.product_name}</h3>
            <p className="price">₹{product.discounted_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;

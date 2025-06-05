import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductMain from './ProductMain';
import ProductRecommendations from './ProductRecommendations';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useSelector((state) => state.flipkart);
  
  const product = products.find(item => 
    item.pid === productId || 
    item._id === productId ||
    item.product_id === productId
  );

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <ProductMain product={product} />
      <ProductRecommendations currentProduct={product} />
    </div>
  );
};

export default ProductDetail;
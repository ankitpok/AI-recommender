import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bagActions } from "../store/bagSlice";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { CiCircleRemove } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa6";
import './FlipkartProductItem.css'

const FlipkartProductItem = ({ product }) => {
  const navigate = useNavigate();
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.find(item => item.product_id === product.product_id);
  const dispatch = useDispatch();

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/200x200?text=No+Image';
  };

  const handleProductClick = () => {
    navigate(`/product/${product.product_id}`);
  };
    const handleAddToCart = () => {
        //console.log(product)
        dispatch(bagActions.addToBag(product));
      };
    
      const handleRemoveFromBag = () => {
        dispatch(bagActions.removeFromBag(product.product_id))
      }

  const handleBagAction = (e) => {
    e.stopPropagation(); // Prevents the product click handler from firing
    if (elementFound) {
      dispatch(bagActions.removeFromBag(product.product_id));
    } else {
      dispatch(bagActions.addToBag(product));
    }
  };

  if (!product.image_url) return null;

  return (
    <div className="product-card">
      <div 
        className="product-clickable-area" 
        onClick={handleProductClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="product-image-container">
          <img 
            src={product.image_url} 
            alt={product.product_name}
            className="product-image"
            onError={handleImageError}
          />
        </div>
        <div className="product-details">
          <h3 className="product-title">{product.product_name}</h3>
          
          <div className="price-container">
            <span className="discounted-price">₹{product.discounted_price}</span>
            {product.price && product.price !== product.discounted_price && (
              <>
                <span className="original-price">₹{product.price}</span>
                <span className="discount-badge">
                  {Math.round(product.discount_percent)}% off
                </span>
              </>
            )}
          </div>
          
          <div className="rating-container">
            <span className="rating-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                  {i < Math.floor(product.rating) ? '★' : '☆'}
                </span>
              ))}
            </span>
            <span className="rating-count">({product.rating_count})</span>
          </div>
        </div>
      </div>
      
      {elementFound ? <button type='button' className="btn btn-danger" onClick={handleRemoveFromBag}><CiCircleRemove />
       Remove From Cart</button>:<button type ='button' className="btn btn-success" onClick={handleAddToCart}><FaCartPlus /> Add to cart</button>}
    </div>
  );
};

export default FlipkartProductItem;
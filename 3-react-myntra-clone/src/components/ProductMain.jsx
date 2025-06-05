import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bagActions } from '../store/bagSlice';
import { AiFillDelete } from 'react-icons/ai';
import './productMain.css'
import 'bootstrap/dist/css/bootstrap.css';
import { CiCircleRemove } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa6";


const ProductMain = ({ product }) => {
  
  const dispatch = useDispatch();
  const bagItems = useSelector((state) => state.bag);
  const [isInBag, setIsInBag] = useState(
    bagItems.some(item => item.pid === product.pid)
  );
  const elementFound = bagItems.find(item => item.product_id === product.product_id);

  const handleAddToCart = () => {
      //console.log(product)
      dispatch(bagActions.addToBag(product));
    };
  
    const handleRemoveFromBag = () => {
      dispatch(bagActions.removeFromBag(product.product_id))
    }

  const handleBagAction = () => {
    if (isInBag) {
      dispatch(bagActions.removeFromBag(product.pid));
    } else {
      dispatch(bagActions.addToBag(product));
    }
    setIsInBag(!isInBag);
  };

  return (
    <div className="product-main">
      <div className="product-images">
        <img 
          src={product.image_url} 
          alt={product.product_name}
          onError={(e) => e.target.src = 'https://placehold.co/400?text=Product+Image'}
        />
      </div>
      
      <div className="product-info">
        <h1>{product.product_name}</h1>
        <div className="meta-info">
          {product.brand && <span>{product.brand}</span>}
          {product.category && <span>• {product.category}</span>}
        </div>
        
        <div className="price-section">
          <span className="current-price">₹{product.discounted_price}</span>
          {product.original_price && (
            <span className="original-price">₹{product.original_price}</span>
          )}
        </div>
        
       {elementFound ? <button type='button' className="btn btn-danger" onClick={handleRemoveFromBag}><CiCircleRemove />
 Remove From Cart</button>:<button type ='button' className="btn btn-success" onClick={handleAddToCart}><FaCartPlus /> Add to cart</button>}
        
        {product.description && (
          <div className="description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMain;
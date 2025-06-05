import { useLocation } from "react-router-dom";

const ItemDetail = () => {
  const location = useLocation();
  const item = location.state; 

  if (!item) {
    return <div>No item data available. Please go back and select an item.</div>;
  }

  return <div className="item-container">

        <img className="item-image" src={item.item.image} alt="item image" />
        
        <div className="rating">
          {item.item.rating.stars} ⭐ | {item.item.rating.count}
        </div>
        <div className="company-name">{item.item.company}</div>
        <div className="item-name">{item.item.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {item.item.current_price}</span>
          <span className="original-price">Rs {item.item.original_price}</span>
          <span className="discount">({item.item.discount_percentage}% OFF)</span>
        </div>
        </div>
}
export default ItemDetail;
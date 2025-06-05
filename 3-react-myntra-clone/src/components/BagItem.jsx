import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { AiFillDelete } from "react-icons/ai";

const BagItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleRemoveClick = () => {
    dispatch(bagActions.removeFromBag(item.product_id));
  };
  return (
    <div className="bag-item-container">
      <div className="item-left-part">
        <img className="bag-item-img" src={item.image_url} />
      </div>
      <div className="item-right-part">
        <div className="company">{item.brand}</div>
        <div className="item-name">{item.product_name}</div>
        <div className="price-container">
          <span className="current-price">Rs {item.discounted_price}</span>
          <span className="original-price">Rs {item.price}</span>
        </div>
        <div>
          Category: {item.category}
        </div>
      </div>

      <div className="remove-from-cart" onClick={handleRemoveClick}>
        <AiFillDelete />
      </div>
    </div>
  );
};
export default BagItem;

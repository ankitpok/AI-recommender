import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { Link } from "react-router-dom";

const HomeItem = ({ item }) => {
  const bag = useSelector((store) => store.bag);

  const dispatch = useDispatch();
  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };
  const handleRemoveFromBag = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };
  return (
    <div className="item-container">
      <Link to="/itemdetail" state={{item}}>
      <img className="item-image" src={item.image} alt="item image" />
      </Link>
      <div className="rating">
        {item.rating?.stars ? (
          <>
            {item.rating.stars} ⭐ | {item.rating.count}
          </>
        ) : (
          "No rating available"
        )}
      </div>
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.item_name}</div>
      <div className="price">
        <span className="current-price">Rs {item.current_price}</span>
        <span className="original-price">Rs {item.original_price}</span>
        <span className="discount">({item.discount_percentage}% OFF)</span>
      </div>
      {bag.includes(item.id) ? (
        <button
          className="btn-add-bag btn btn-danger"
          onClick={handleRemoveFromBag}>
          Remove
        </button>
      ) : (
        <button
          className="btn-add-bag btn btn-success"
          onClick={handleAddToBag}>
          Add to Bag
        </button>
      )}
    </div>
  );
};
export default HomeItem;

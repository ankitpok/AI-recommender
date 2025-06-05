import { useSelector } from "react-redux";
import BagItem from "../components/BagItem";
import BagSummary from "../components/BagSummary";

const Bag = () => {
  const bagItems = useSelector((store) => store.bag);
  return (
    <>
      <main>
        <div className="bag-page">
          <div className="bag-items-container">
            {bagItems.map((item) => (
              <BagItem item={item} key={item.product_id} />
            ))}
          </div>
          <div className="bag-summary">
            <BagSummary items={bagItems} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Bag;
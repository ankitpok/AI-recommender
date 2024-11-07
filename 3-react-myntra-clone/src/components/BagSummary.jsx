const BagSummary = ({ items }) => {
  const CONVENIENCE_FEES = 99;
  const totalPrice = items.reduce((sum, item) => sum + item.original_price, 0);
  const totalDiscount = items.reduce(
    (discount, item) => discount + (item.original_price - item.current_price),
    0
  );
  const rounded_discount = Math.round(totalDiscount);
  const bagSummary = {
    totalItem: items.length,
    totalMRP: totalPrice,
    totalDiscount: rounded_discount,
    finalPayment: Math.round(totalPrice - totalDiscount + CONVENIENCE_FEES),
  };
  return (
    <>
      <div className="bag-details-container">
        <div className="price-header">
          PRICE DETAILS ({bagSummary.totalItem} Items){" "}
        </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{bagSummary.totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{bagSummary.totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{bagSummary.finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order">
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </>
  );
};
export default BagSummary;

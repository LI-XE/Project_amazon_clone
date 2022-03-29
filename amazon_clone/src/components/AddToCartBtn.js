import React from "react";

export default function AddToCartBtn({
  productId,
  addToBasket,
  productCountInStock,
  qty,
}) {
  return (
    <div className="row center">
      {productCountInStock > 0 ? (
        <button onClick={addToBasket} type="submit" className="primary">
          Add To Basket
        </button>
      ) : (
        <button type="submit" className="silver">
          Add To Basket
        </button>
      )}
    </div>
  );
}

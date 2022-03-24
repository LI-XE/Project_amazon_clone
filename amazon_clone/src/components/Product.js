import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  const addToBasket = (e) => {
    // ADD_TO_BASKET
  };

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <h2>{product.brand}</h2>
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">${product.price}</div>
        <button onClick={addToBasket} type="submit">
          Add To Basket
        </button>
      </div>
    </div>
  );
}

export default Product;

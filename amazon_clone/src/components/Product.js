import React, { useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

function Product({ product }) {
  const dispatch = useDispatch();
  const productId = product._id;
  const [qty, setQty] = useState(1);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToBasket = () => {
    if(productId){
      setQty(qty + 1);
    dispatch(addToCart(productId, qty));
    }
  };
  

  return (
    <div className="card">
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <h2>{product.brand}</h2>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="price">${product.price}</div>
      </div>
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
    </div>
  );
}

export default Product;

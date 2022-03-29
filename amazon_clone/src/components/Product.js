import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import AddToCartBtn from "./AddToCartBtn";

function Product({ product }) {
  const dispatch = useDispatch();
  // const { id: productId } = useParams();
  const productId = product._id;
  const [qty, setQty] = useState(1);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const existItem = cartItems.find((x) => x.product === productId);

  // if (existItem) {
  //   while ((qty = product.countInStock)) {
  //     setQty(existItem.qty + qty);
  //   }
  // }
  //  =>
  //     item.product === productId && item.qty < product.countInStock
  //       ? setQty((item.qty += 1))
  //       : item.product === productId && item.qty === product.countInStock
  //       ? (item.countInStock = 0 && setQty(item.qty))
  //       : setQty(1)
  //   );
  const addToBasket = () => {
      cartItems?.map((item) => {
        if (item.product === productId) {
          console.log(`Item---QTY---1: ${qty}`);
          setQty(item.qty + 1);
          console.log(`QTY---1: ${qty}`);
        } else {
          setQty(1);
          console.log(`NEW---QTY---2: ${qty}`);
        }
      });
    console.log(`$$$$$QTY: ${qty}`);
    dispatch(addToCart(productId, qty));
  };
  // if (!existItem) {
  //   console.log(`New-QTY: ${qty}`);
  //   dispatch(addToCart(productId, qty));
  // } else if (existItem && existItem.qty < product.countInStock) {
  //   console.log(`existItem-QTY: ${existItem.qty}`);

  //   setQty(existItem.qty + 1);
  //   dispatch(addToCart(productId, qty));
  // }

  // if (!existItem) {
  //   console.log(`New-QTY: ${qty}`);
  //   dispatch(addToCart(productId, qty));
  // } else if (existItem && existItem.qty < product.countInStock) {
  //   console.log(`existItem-QTY: ${existItem.qty}`);

  //   setQty(existItem.qty + 1);
  //   dispatch(addToCart(productId, qty));
  // }

  if (existItem && existItem.qty === product.countInStock) {
    product.countInStock = 0;
  }

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
      <AddToCartBtn
        productId={productId}
        addToBasket={addToBasket}
        productCountInStock={product.countInStock}
        qty={qty}
      />
    </div>
  );
}

export default Product;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { detailsProduct } from "../actions/productActions";
import AddToCartBtn from "../components/AddToCartBtn";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
  // const { id } = useParams();
  // const product = data.products.find((x) => x._id === id); // props.match.params.id ????
  // if (!product) {
  //   return <div>Product Not Found</div>;
  // }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  // const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    console.log(`Product ID: ${productId}`);
    console.log(`QTY: ${qty}`);
    dispatch(addToCart(productId, qty));
    // navigate(`/cart/${productId}?qty=${qty}`);
    navigate("/cart");
  };

  return (
    <div className="row1">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Link to="/">Back to Home</Link>
          <div className="row top">
            <div className="col-2">
              <img
                src={product.image}
                alt={product.name}
                className="large"
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Description:<p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card1 card-body1">
                <ul>
                  <li className="row">
                    <div>Price</div>
                    <div>
                      <strong>${product.price}</strong>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        {/* <button
                        onClick={addToCartHandler}
                        className="primary block"
                      >
                        Add to Cart
                      </button> */}
                        <AddToCartBtn
                          addToBasket={addToCartHandler}
                          productId={productId}
                          productCountInStock={product.countInStock}
                          qty={qty}
                        />
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

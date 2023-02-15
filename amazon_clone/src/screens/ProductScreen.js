import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../types/productTypes";

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
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    review,
  } = productReviewCreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    if (review) {
      alert("Review Submitted Successfully");
      setRating("");
      setComment("");
    }
    dispatch({ type: PRODUCT_REVIEW_CREATE_RESET, payload: null });
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, review]);

  const addToCartHandler = () => {
    console.log(`Product ID: ${productId}`);
    console.log(`QTY: ${qty}`);
    dispatch(addToCart(productId, qty));
    // navigate(`/cart/${productId}?qty=${qty}`);
    navigate("/cart");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.username })
      );
    } else {
      alert("Please enter comment and rating.");
    }
  };

  console.log({ product });
  // console.log(productReviewCreate);

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
            <div className="col-1">
              <img
                src={PF + product.image}
                alt={product.name}
                className="large"
              ></img>
            </div>
            <div className="col-2">
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
                {userInfo && userInfo.isAdmin ? (
                  <li>
                    <Link to={`/admin/products/${product._id}/edit`}>
                      <button type="submit" className="button primary">
                        Edit Product
                      </button>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
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
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews ({product.numReviews} reviews)</h2>
            {product.reviews?.length === 0 && (
              <MessageBox>There is no review!</MessageBox>
            )}
            <ul>
              {product.reviews?.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <div className="row">
                    <Rating
                      rating={review.rating}
                      caption={review.createdAt.substring(0, 10)}
                    ></Rating>
                  </div>

                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin"> Sign In</Link> to write a review.
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

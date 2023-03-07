import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";

function SellerScreen(props) {
  const { id: sellerId } = useParams();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const productList = useSelector((state) => state.productList);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {
    loading: loadingProducts,
    products,
    error: errorProducts,
  } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  console.log(user);
  return (
    <div className="row">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card1 card-body1">
            <li>
              <div className="row start">
                <div>
                  <img
                    className="small"
                    src={PF + user.seller?.logo}
                    alt={user.seller?.name}
                  ></img>
                </div>
                <div className="m1">
                  <h1>{user.seller?.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller?.rating}
                numReviews={`${user.seller?.numReviews}`}
              ></Rating>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => (window.location = `mailto:${user.email}`)}
              >
                Contact Seller
              </Link>
            </li>
            <li>{user.seller?.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {products?.length === 0 && <MessageBox>No Product</MessageBox>}
            <div className="row center">
              {products?.map((product, key) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SellerScreen;

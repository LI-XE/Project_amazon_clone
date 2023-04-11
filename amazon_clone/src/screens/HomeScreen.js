import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SlideShow from "../components/SlideShow";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, allProducts } = productList;

  const [qty, setQty] = useState();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <SlideShow
            className="home_image"
            imgs={[
              "https://m.media-amazon.com/images/S/sonata-images-prod/ACQ_HO_T1/89aa0cfb-43bf-4651-afd5-9ce43a831060._UR3000,600_SX1500_FMwebp_.jpeg",
              "https://m.media-amazon.com/images/S/sonata-images-prod/US_3P_SVOD_Legacy/6ade1e78-5fc1-4061-9bb6-48b7dd7b1f42._UR3000,600_SX1500_FMwebp_.jpeg",
              "https://m.media-amazon.com/images/S/sonata-images-prod/US_TVOD_Sing2_VOD/86b61c4f-a7f6-48a3-a0c9-607c86b9f31a._UR3000,600_SX1500_FMwebp_.jpeg",
            ]}
          />
          {products?.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {allProducts?.map((product, key) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

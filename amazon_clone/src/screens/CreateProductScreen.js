import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../actions/productActions";
import ProductForm from "../components/ProductForm";

function CreateProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    image: "/images/product1.webp",
    price: "",
    countInStock: "",
    rating: 0,
    numReviews: 0,
    description: "",
  });

  const submitHandler = (e) => {
    if (userInfo && userInfo.isAdmin) {
      if (product) {
        alert("Product created successfully.");
        dispatch(createProduct(product));
        console.log(product);
        navigate("/admin/products");
      } else {
        alert("Please complete the form.");
      }
    } else {
      alert("Please login first.");
    }
  };
  return (
    <div>
      <ProductForm
        product={product}
        setProduct={setProduct}
        submitHandler={submitHandler}
        submitButtonLabel={"Create Product"}
        userInfo={userInfo}
      />
    </div>
  );
}

export default CreateProductScreen;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsProduct, editProduct } from "../actions/productActions";
import ProductForm from "../components/ProductForm";

function EditProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [productEdit, setProductEdit] = useState({
    name: product.name,
    brand: product.brand,
    category: product.category,
    image: "/images/product1.webp",
    price: product.price,
    countInStock: product.countInStock,
    rating: product.rating,
    numReviews: product.numReviews,
    description: product.description,
  });

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (productId) {
      setProductEdit(product);
    }
  }, []);

  console.log(product);
  console.log(productEdit);

  const submitHandler = (e) => {
    if (userInfo && userInfo.isAdmin) {
      if (productEdit) {
        alert("Product was updated successfully.");
        dispatch(editProduct(productEdit, productId));
        console.log(productEdit);
        navigate(`/product/${productId}`);
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
        product={productEdit}
        setProduct={setProductEdit}
        submitHandler={submitHandler}
        submitButtonLabel={"Update Product"}
        userInfo={userInfo}
        productId={productId}
      />
    </div>
  );
}

export default EditProductScreen;

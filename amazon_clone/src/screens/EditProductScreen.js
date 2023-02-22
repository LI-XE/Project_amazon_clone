import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsProduct, editProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductForm from "../components/ProductForm";
import { PRODUCT_EDIT_RESET } from "../types/productTypes";

function EditProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [productEdit, setProductEdit] = useState(productDetails.product);

  const productUpdate = useSelector((state) => state.editProduct);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      navigate(`/product/${productId}`);
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_EDIT_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setProductEdit(product);
    }
  }, [dispatch, product, productId, successUpdate, navigate]);

  // console.log(productId);
  // console.log(product);
  // console.log(productEdit);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo && userInfo.isAdmin) {
      if (product) {
        dispatch(editProduct(productId, productEdit));
      } else {
        alert("Please complete the form.");
      }
    } else {
      alert("Please login first.");
    }
  };

  return (
    <div>
      {loadingUpdate && <LoadingBox></LoadingBox>}
      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ProductForm
            product={productEdit}
            setProduct={setProductEdit}
            submitHandler={submitHandler}
            submitButtonLabel={"Update Product"}
            productId={productId}
          />
        </>
      )}
    </div>
  );
}

export default EditProductScreen;

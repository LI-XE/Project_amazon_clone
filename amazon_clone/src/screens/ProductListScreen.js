import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { productListAdmin } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ProductListScreen() {
  const { search, pathname } = useLocation();
  const dispatch = useDispatch();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;
  const productLists = useSelector((state) => state.adminProductList);
  const { loading, error, products, countProducts, pages } = productLists;

  useEffect(() => {
    dispatch(productListAdmin(page));
  }, [dispatch, page]);

  console.log(countProducts, pages);

  return (
    <div className="row1 adminProducts">
      <h1>Products</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pages">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? "btn text-bold" : " btn"}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}{" "}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductListScreen;
